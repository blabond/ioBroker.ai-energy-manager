'use strict';

const nodeCrypto = require('node:crypto');
const utils = require('@iobroker/adapter-core');
const ApiClient = require('./lib/apiClient');
const { requestAndNormalize, normalizeServerConfig } = require('./lib/serverConfigManager');
const DatapointManager = require('./lib/datapointManager');
const StateCollector = require('./lib/stateCollector');
const ControlHandler = require('./lib/controlHandler');
const { isAuthenticationError, isDemoAccountToken, validateAdapterConfig } = require('./lib/validation');
const { sanitizeForLog, debug } = require('./lib/loggerUtils');
const { buildDatapointAssignments } = require('./lib/datapointAssignments');
const { TelemetryQueue } = require('./lib/telemetryQueue');
const { TelemetrySampler } = require('./lib/telemetrySampler');
const { isBackendRequestTimeout, shouldLogBackendError } = require('./lib/errorLogPolicy');

const TELEMETRY_CYCLE_SECONDS = 60;
const SERVER_PULL_DELAY_SECONDS = 30;
const MAX_POLL_OFFSET_SECONDS = 29;
const DEFAULT_DASHBOARD_HORIZON_HOURS = 6;
const BATTERY_CONTROL_ASSIGNMENT_KEY = 'batteryControlMode';

class AiEnergyManager extends utils.Adapter {
    constructor(options = {}) {
        super({
            ...options,
            name: 'ai-energy-manager',
        });

        this.apiClient = null;
        this.datapointManager = null;
        this.stateCollector = null;
        this.controlHandler = null;
        this.telemetrySampler = null;
        this.telemetryQueue = null;
        this.serverConfig = null;
        this.statePayloadTimer = null;
        this.commandTimer = null;
        this.lastPayloadSignature = '';
        this.consecutiveBackendTimeouts = 0;
        this.stopped = false;

        this.on('ready', this.onReady.bind(this));
        this.on('unload', this.onUnload.bind(this));
        this.on('message', this.onMessage.bind(this));
        this.on('stateChange', this.onStateChange.bind(this));
    }

    async onReady() {
        this.stopped = false;
        await this.ensureInfoStates();
        if (this.stopped) {
            return;
        }
        this.datapointManager = new DatapointManager(this);
        this.stateCollector = new StateCollector(this, this.datapointManager);
        this.telemetrySampler = new TelemetrySampler(this, this.datapointManager);

        const config = validateAdapterConfig(this.config);
        if (!config.valid) {
            await this.setError(config.errors.join(' '));
            await this.setStateAsync('info.connection', false, true);
            await this.setStateAsync('info.tokenValid', false, true);
            await this.setStateAsync('info.configValid', false, true);
            await this.resetDashboardStates();
            this.log.warn(`Adapter configuration incomplete: ${config.errors.join(' ')}`);
            return;
        }

        this.apiClient = new ApiClient({
            backendUrl: config.backendUrl,
            token: config.adapterToken,
            logger: this.log,
            timerHost: this,
        });
        this.telemetryQueue = new TelemetryQueue(this, this.apiClient);
        await this.telemetryQueue.load();
        this.controlHandler = new ControlHandler(this, this.datapointManager, this.apiClient, {
            minWriteIntervalSeconds: config.minWriteIntervalSeconds,
        });

        const tokenValid = await this.validateToken();
        if (this.stopped) {
            return;
        }
        if (!tokenValid) {
            this.serverConfig = null;
            await this.setStateAsync('info.configValid', false, true);
            await this.resetDashboardStates();
            this.log.info('Adapter is waiting for a valid stored token and Request Config.');
            return;
        }
        if (this.shouldAutoRequestServerConfig(config.adapterToken)) {
            this.log.info('Server configuration is requested automatically after token change or initial setup.');
            const result = await this.requestConfigFromBackend({ persist: false });
            if (this.stopped) {
                return;
            }
            if (!result.ok) {
                await this.resetDashboardStates();
                this.log.info('Adapter is waiting for a successful server configuration.');
                return;
            }
            await this.applyRuntimeServerConfig(result.serverConfig, result.serverConfigLastRequest);
        }
        if (!this.serverConfig?.valid) {
            await this.loadStoredServerConfig();
            if (this.stopped) {
                return;
            }
        }
        if (!this.serverConfig?.valid) {
            await this.resetDashboardStates();
            this.log.info('Adapter is waiting for a successful manual Request Config.');
            return;
        }
        await this.pullControlCommands();
        if (this.stopped) {
            return;
        }
        if (!this.serverConfig?.valid) {
            await this.resetDashboardStates();
            this.log.info('Adapter is waiting for a successful server configuration.');
            return;
        }
        await this.validateDatapoints();
        if (this.stopped) {
            return;
        }
        await this.configureTelemetrySources();
        if (this.stopped) {
            return;
        }
        await this.sendInitialBackendSync();
        if (this.stopped) {
            return;
        }
        await this.applyBatteryControlFromStoredDashboard();
        if (this.stopped) {
            return;
        }
        this.startTimers();
        this.log.info('AI Energy Manager adapter started.');
    }

    async onUnload(callback) {
        try {
            this.stopped = true;
            this.clearScheduledWork();
            if (this.telemetrySampler) {
                await this.telemetrySampler.close();
            }
            await this.setStateAsync('info.connection', false, true);
            callback();
        } catch {
            callback();
        }
    }

    async onMessage(obj) {
        if (!obj || !obj.command) {
            return;
        }
        if (obj.command === 'requestConfig') {
            const result = await this.requestConfigFromBackend({
                ...(obj.message || {}),
                persist: false,
            });
            if (obj.callback) {
                this.sendTo(obj.from, obj.command, result, obj.callback);
            }
            if (result.ok && result.serverConfig) {
                try {
                    await this.applyRuntimeServerConfig(result.serverConfig, result.serverConfigLastRequest);
                    this.log.debug(
                        `Server configuration loaded: version ${result.version}, revision ${result.configRevision}, features: ${result.detectedFeatures.join(', ') || '-'}`,
                    );
                } catch (error) {
                    await this.setError(error.message);
                }
            }
            return;
        }
        if (obj.command === 'requestDashboardLite') {
            const result = await this.requestDashboardLite({
                ...(obj.message || {}),
            });
            if (obj.callback) {
                this.sendTo(obj.from, obj.command, result, obj.callback);
            }
            return;
        }
        if (obj.command === 'readServerConfigState') {
            const result = await this.readServerConfigState();
            if (obj.callback) {
                this.sendTo(obj.from, obj.command, result, obj.callback);
            }
            return;
        }
        if (obj.command === 'readStateObjects') {
            const result = await this.readStateObjectsForAdmin();
            if (obj.callback) {
                this.sendTo(obj.from, obj.command, result, obj.callback);
            }
            return;
        }
        if (obj.command === 'readDashboardLiteState') {
            const shouldRefresh = obj.message?.refresh === true;
            const result = shouldRefresh
                ? await this.refreshAndReadDashboardLiteState()
                : await this.readDashboardLiteState();
            if (obj.callback) {
                this.sendTo(obj.from, obj.command, result, obj.callback);
            }
            return;
        }
        if (obj.callback) {
            this.sendTo(obj.from, obj.command, { error: `Unknown command ${obj.command}` }, obj.callback);
        }
    }

    async validateToken() {
        try {
            const response = await this.apiClient.validateToken();
            this.resetBackendTimeoutWarnings();
            const valid = response.valid !== false && response.success !== false;
            await this.setStateAsync('info.tokenValid', valid, true);
            await this.setStateAsync('status.backendReachable', true, true);
            await this.setStateAsync('info.connection', valid, true);
            if (!valid) {
                await this.setError(response.message || 'Adapter token was rejected by the backend.');
            }
            return valid;
        } catch (error) {
            await this.setStateAsync('info.tokenValid', false, true);
            await this.setStateAsync('status.backendReachable', false, true);
            await this.setStateAsync('info.connection', false, true);
            await this.setError(error.message);
            return false;
        }
    }

    async requestConfigFromBackend(options = {}) {
        if (this.stopped) {
            return { ok: false, errors: ['Adapter is shutting down.'] };
        }
        const overrideToken = typeof options.adapterToken === 'string' ? options.adapterToken.trim() : '';
        const nativeConfig = overrideToken ? { ...this.config, adapterToken: overrideToken } : this.config;
        const shouldPersist = options.persist === true;
        const config = validateAdapterConfig(nativeConfig);
        if (!config.valid) {
            await this.setError(config.errors.join(' '));
            return { ok: false, errors: config.errors };
        }
        try {
            this.apiClient = new ApiClient({
                backendUrl: config.backendUrl,
                token: config.adapterToken,
                logger: this.log,
                timerHost: this,
            });
            const normalized = await requestAndNormalize(this.apiClient);
            this.resetBackendTimeoutWarnings();
            if (this.stopped) {
                return { ok: false, errors: ['Adapter is shutting down.'] };
            }
            if (!normalized.valid) {
                await this.applyServerConfigStatus(normalized);
                return { ok: false, errors: normalized.errors };
            }
            const serverConfigLastRequest = new Date().toISOString();
            if (shouldPersist) {
                await this.persistServerConfig(normalized, serverConfigLastRequest, config.adapterToken);
                this.serverConfig = normalized;
                await this.applyServerConfigStatus(normalized, serverConfigLastRequest);
                await this.validateDatapoints();
                await this.configureTelemetrySources();
                this.log.debug(
                    `Server configuration loaded: version ${normalized.version}, revision ${normalized.configRevision}, features: ${normalized.detectedFeatureLabels.join(', ') || '-'}`,
                );
            }
            return {
                ok: true,
                version: normalized.version,
                configRevision: normalized.configRevision,
                serverConfig: normalized,
                serverConfigLastRequest,
                detectedFeatures: normalized.detectedFeatureLabels,
                unsupportedFeatures: normalized.unsupportedFeatures,
                datapointAssignments: this.buildAssignmentsForToken(normalized, config.adapterToken),
                requiredDatapoints: normalized.datapoints.filter(item => item.required).map(item => item.key),
            };
        } catch (error) {
            const message = sanitizeForLog(error.message, config.adapterToken);
            await this.setError(message);
            return { ok: false, errors: [message] };
        }
    }

    async requestDashboardLite(options = {}) {
        const overrideToken = typeof options.adapterToken === 'string' ? options.adapterToken.trim() : '';
        const nativeConfig = overrideToken ? { ...this.config, adapterToken: overrideToken } : this.config;
        const config = validateAdapterConfig(nativeConfig);
        if (!config.valid) {
            await this.setError(config.errors.join(' '));
            return { ok: false, errors: config.errors };
        }
        try {
            const client = new ApiClient({
                backendUrl: config.backendUrl,
                token: config.adapterToken,
                logger: this.log,
                timerHost: this,
            });
            const installationId = String(options.installationId || this.config.serverConfig?.plantId || '').trim();
            const decision = await client.requestDashboardDecision(installationId);
            this.resetBackendTimeoutWarnings();
            return {
                ok: true,
                dashboardLite: dashboardLiteFromDecision(decision),
                dashboardLiteLastRequest: new Date().toISOString(),
            };
        } catch (error) {
            const message = sanitizeForLog(error.message, config.adapterToken);
            await this.setError(message);
            return { ok: false, errors: [message] };
        }
    }

    async readDashboardLiteState() {
        try {
            if (!this.serverConfig?.valid) {
                return {
                    ok: true,
                    dashboardLite: null,
                    dashboardLiteLastRequest: '',
                };
            }
            const state = await this.getStateAsync('dashboard.lite');
            const dashboardLite = state?.val ? JSON.parse(String(state.val)) : null;
            const hasDashboard = dashboardLite && Array.isArray(dashboardLite.cards) && dashboardLite.cards.length > 0;
            const lastRequest = await this.getStateAsync('dashboard.lastUpdate');
            return {
                ok: true,
                dashboardLite: hasDashboard ? dashboardLite : null,
                dashboardLiteLastRequest: String(lastRequest?.val || ''),
            };
        } catch (error) {
            return { ok: false, errors: [error.message] };
        }
    }

    async readServerConfigState() {
        try {
            if (!this.serverConfig?.valid) {
                return {
                    ok: true,
                    serverConfig: null,
                    serverConfigLastRequest: '',
                    datapointAssignments: [],
                };
            }
            return {
                ok: true,
                serverConfig: this.serverConfig,
                serverConfigLastRequest: this.config.serverConfigLastRequest || '',
                datapointAssignments: Array.isArray(this.config.datapointAssignments)
                    ? this.config.datapointAssignments
                    : [],
            };
        } catch (error) {
            return { ok: false, errors: [error.message] };
        }
    }

    async readStateObjectsForAdmin() {
        try {
            const objects = await this.readAllStateObjects();
            const states = Object.entries(objects)
                .filter(([, object]) => object?.type === 'state')
                .map(([id, object]) => ({
                    id,
                    name: object.common?.name || id,
                    role: object.common?.role || '',
                    type: object.common?.type || '',
                    value: object.common?.def,
                }))
                .sort((left, right) => left.id.localeCompare(right.id));
            return { ok: true, states };
        } catch (error) {
            return { ok: false, errors: [error.message] };
        }
    }

    async readAllStateObjects() {
        if (typeof this.getForeignObjectsAsync !== 'function') {
            throw new Error('Adapter object API is not available.');
        }
        const objects = await this.getForeignObjectsAsync('*', 'state');
        return objects && typeof objects === 'object' ? objects : {};
    }

    async refreshAndReadDashboardLiteState() {
        try {
            if (this.serverConfig?.valid) {
                await this.updateDashboardLiteFromBackend();
            }
        } catch (error) {
            await this.setError(error.message);
        }
        return this.readDashboardLiteState();
    }

    async loadStoredServerConfig() {
        try {
            const stored = this.config.serverConfig;
            if (!stored) {
                await this.setStateAsync('info.configValid', false, true);
                await this.setError('No server configuration loaded yet. Please run Request Config in the admin UI.');
                await this.resetDashboardStates();
                return;
            }
            const parsed = typeof stored === 'string' ? JSON.parse(stored) : stored;
            const normalized = normalizeServerConfig(parsed.raw || parsed);
            this.serverConfig = normalized.valid ? normalized : null;
            this.config.serverConfig = normalized;
            this.config.datapointAssignments = this.demoAccountMode()
                ? buildDatapointAssignments(normalized, [])
                : buildDatapointAssignments(normalized, this.config.datapointAssignments);
            await this.persistDatapointAssignmentsIfChanged(this.config.datapointAssignments);
            await this.applyServerConfigStatus(
                normalized,
                this.config.serverConfigLastRequest || normalized.receivedAt || '',
            );
        } catch (error) {
            this.serverConfig = null;
            await this.setStateAsync('info.configValid', false, true);
            await this.resetDashboardStates();
            await this.setError(`Stored server configuration is invalid: ${error.message}`);
        }
    }

    async persistServerConfig(
        serverConfig,
        requestedAt = new Date().toISOString(),
        adapterToken = this.config.adapterToken,
    ) {
        const adapterObjectId = `system.adapter.${this.namespace}`;
        const object = await this.getForeignObjectAsync(adapterObjectId);
        if (!object) {
            throw new Error(`Adapter object ${adapterObjectId} not found.`);
        }
        // eslint-disable-next-line jsdoc/check-tag-names
        const storedNative = /** @type {ioBroker.AdapterConfig} */ (object.native || {});
        const datapointAssignments = buildDatapointAssignments(
            serverConfig,
            isDemoAccountToken(adapterToken) ? [] : this.previousAssignmentsForToken(adapterToken, storedNative),
        );
        object.native = {
            ...(object.native || {}),
            serverConfig,
            serverConfigLastRequest: requestedAt,
            serverConfigTokenFingerprint: adapterTokenFingerprint(adapterToken),
            datapointAssignments,
        };
        await this.setForeignObjectAsync(adapterObjectId, object);
        this.config.serverConfig = serverConfig;
        this.config.serverConfigLastRequest = object.native.serverConfigLastRequest;
        this.config.serverConfigTokenFingerprint = object.native.serverConfigTokenFingerprint;
        this.config.datapointAssignments = datapointAssignments;
    }

    async applyRuntimeServerConfig(serverConfig, requestedAt = new Date().toISOString()) {
        this.serverConfig = serverConfig;
        this.config.serverConfig = serverConfig;
        this.config.serverConfigLastRequest = requestedAt || serverConfig.receivedAt || '';
        this.config.datapointAssignments = this.buildAssignmentsForToken(serverConfig, this.config.adapterToken);
        await this.persistDatapointAssignmentsIfChanged(this.config.datapointAssignments);
        this.config.serverConfigTokenFingerprint = adapterTokenFingerprint(this.config.adapterToken);
        await this.applyServerConfigStatus(serverConfig, this.config.serverConfigLastRequest);
        await this.publishRuntimeServerConfigStates();
        await this.validateDatapoints();
        await this.configureTelemetrySources();
    }

    buildAssignmentsForToken(serverConfig, adapterToken = this.config.adapterToken) {
        return buildDatapointAssignments(
            serverConfig,
            isDemoAccountToken(adapterToken) ? [] : this.previousAssignmentsForToken(adapterToken, this.config),
        );
    }

    previousAssignmentsForToken(adapterToken, nativeConfig = this.config) {
        return this.sameStoredToken(adapterToken, nativeConfig) && Array.isArray(nativeConfig?.datapointAssignments)
            ? nativeConfig.datapointAssignments
            : [];
    }

    sameStoredToken(adapterToken, nativeConfig = this.config) {
        const storedFingerprint = String(nativeConfig?.serverConfigTokenFingerprint || '');
        return storedFingerprint !== '' && storedFingerprint === adapterTokenFingerprint(adapterToken);
    }

    async persistDatapointAssignmentsIfChanged(datapointAssignments = []) {
        const adapterObjectId = `system.adapter.${this.namespace}`;
        const object = await this.getForeignObjectAsync(adapterObjectId);
        if (!object) {
            return;
        }
        const current = Array.isArray(object.native?.datapointAssignments) ? object.native.datapointAssignments : [];
        if (
            JSON.stringify(current) === JSON.stringify(Array.isArray(datapointAssignments) ? datapointAssignments : [])
        ) {
            return;
        }
        object.native = {
            ...(object.native || {}),
            datapointAssignments,
        };
        await this.setForeignObjectAsync(adapterObjectId, object);
    }

    async publishRuntimeServerConfigStates() {
        await this.setStateAsync('info.serverConfigJson', JSON.stringify(this.serverConfig || null), true);
        await this.setStateAsync(
            'info.datapointAssignmentsJson',
            JSON.stringify(Array.isArray(this.config.datapointAssignments) ? this.config.datapointAssignments : []),
            true,
        );
    }

    async clearRuntimeServerConfig() {
        this.serverConfig = null;
        this.config.serverConfig = null;
        this.config.datapointAssignments = [];
        await this.setStateAsync('info.configValid', false, true);
        await this.setStateAsync('info.serverConfigVersion', 0, true);
        await this.setStateAsync('info.serverConfigRevision', 0, true);
        await this.setStateAsync('info.detectedFeatures', '[]', true);
        await this.setStateAsync('info.serverConfigJson', 'null', true);
        await this.setStateAsync('info.datapointAssignmentsJson', '[]', true);
        await this.resetDashboardStates();
        await this.configureTelemetrySources();
    }

    async applyServerConfigStatus(serverConfig, requestedAt = '') {
        await this.setStateAsync('info.configValid', !!serverConfig.valid, true);
        await this.setStateAsync('info.serverConfigVersion', Number(serverConfig.version || 0), true);
        await this.setStateAsync('info.serverConfigRevision', Number(serverConfig.configRevision || 0), true);
        await this.setStateAsync(
            'info.detectedFeatures',
            JSON.stringify(serverConfig.detectedFeatureLabels || []),
            true,
        );
        await this.setStateAsync('info.serverConfigLastRequest', requestedAt || serverConfig.receivedAt || '', true);
        await this.setStateAsync(
            'info.serverConfigJson',
            JSON.stringify(serverConfig.valid ? serverConfig : null),
            true,
        );
        if (!serverConfig.valid) {
            await this.setError((serverConfig.errors || []).join(' '));
        } else {
            await this.setError('');
        }
    }

    shouldAutoRequestServerConfig(adapterToken) {
        if (!String(adapterToken || '').trim()) {
            return false;
        }
        if (!this.config.serverConfig) {
            return true;
        }
        return this.config.serverConfigTokenFingerprint !== adapterTokenFingerprint(adapterToken);
    }

    async validateDatapoints() {
        if (!this.serverConfig?.valid || !this.datapointManager) {
            return false;
        }
        if (this.demoAccountMode()) {
            await this.setError('');
            return true;
        }
        const result = await this.datapointManager.validate(this.serverConfig);
        if (!result.valid) {
            await this.setError(result.errors.join(' '));
            this.log.warn(`Datapoint configuration incomplete: ${result.errors.join(' ')}`);
            return false;
        }
        for (const warning of result.warnings) {
            this.log.debug(warning);
        }
        return true;
    }

    async configureTelemetrySources() {
        if (!this.telemetrySampler) {
            return;
        }
        if (!this.serverConfig?.valid || this.demoAccountMode()) {
            await this.telemetrySampler.close();
            return;
        }
        await this.telemetrySampler.configure(this.serverConfig);
    }

    onStateChange(id, state) {
        if (!id || !this.telemetrySampler) {
            return;
        }
        this.telemetrySampler.handleStateChange(id, state);
    }

    startTimers() {
        if (this.stopped) {
            return;
        }
        if (!this.runtimeWorkAllowed()) {
            return;
        }
        this.clearScheduledWork();
        this.scheduleTelemetrySend().catch(error => this.setError(error.message));
        this.scheduleServerPull().catch(error => this.setError(error.message));
    }

    async activateRuntimeWork() {
        if (!this.runtimeWorkAllowed()) {
            return;
        }
        await this.sendInitialBackendSync();
        this.startTimers();
    }

    runtimeWorkAllowed() {
        return (
            !this.stopped && validateAdapterConfig(this.config).valid && !!this.apiClient && !!this.serverConfig?.valid
        );
    }

    demoAccountMode() {
        return isDemoAccountToken(this.config?.adapterToken || '');
    }

    async scheduleTelemetrySend() {
        if (this.stopped) {
            return;
        }
        const offset = await this.pollOffsetSeconds();
        if (this.stopped) {
            return;
        }
        const delayMs = delayUntilSecond(offset);
        this.statePayloadTimer = this.setTimeout(async () => {
            this.statePayloadTimer = null;
            try {
                await this.sendTelemetryCycle();
            } catch (error) {
                await this.setError(error.message);
            } finally {
                this.scheduleTelemetrySend().catch(error => this.setError(error.message));
            }
        }, delayMs);
    }

    async scheduleServerPull() {
        if (this.stopped) {
            return;
        }
        const offset = await this.pollOffsetSeconds();
        if (this.stopped) {
            return;
        }
        const pullSecond = (offset + SERVER_PULL_DELAY_SECONDS) % TELEMETRY_CYCLE_SECONDS;
        const delayMs = delayUntilSecond(pullSecond);
        this.commandTimer = this.setTimeout(async () => {
            this.commandTimer = null;
            try {
                await this.pullServerUpdates();
            } catch (error) {
                await this.setError(error.message);
            } finally {
                this.scheduleServerPull().catch(error => this.setError(error.message));
            }
        }, delayMs);
    }

    async pollOffsetSeconds() {
        const state = await this.getStateAsync('telemetry.pollOffsetSeconds');
        const stored = Number(state?.val);
        if (Number.isInteger(stored) && stored >= 0 && stored <= MAX_POLL_OFFSET_SECONDS && state?.q !== 32) {
            return stored;
        }
        const generated = Math.floor(Math.random() * (MAX_POLL_OFFSET_SECONDS + 1));
        await this.setStateAsync('telemetry.pollOffsetSeconds', generated, true);
        return generated;
    }

    clearScheduledWork() {
        if (this.statePayloadTimer) {
            this.clearTimeout(this.statePayloadTimer);
            this.statePayloadTimer = null;
        }
        if (this.commandTimer) {
            this.clearTimeout(this.commandTimer);
            this.commandTimer = null;
        }
    }

    async sendInitialBackendSync() {
        if (!this.serverConfig?.valid || !this.apiClient) {
            return;
        }
        if (this.demoAccountMode()) {
            await this.setStateAsync('status.backendReachable', true, true);
            await this.setStateAsync('info.connection', true, true);
            return;
        }
        try {
            await this.pushAdapterMappings();
            await this.pushStatePayload();
            await this.sendTelemetryCycle();
        } catch (error) {
            const errorLogged = await this.setError(error.message);
            if (errorLogged && !isBackendRequestTimeout(error.message)) {
                this.log.warn(`Initial backend sync failed: ${error.message}`);
            }
        }
    }

    async pushAdapterMappings() {
        if (this.demoAccountMode()) {
            return;
        }
        const mappings = this.adapterMappingsPayload();
        if (mappings.assignments.length === 0 && mappings.plantSettings.length === 0) {
            return;
        }
        await this.apiClient.pushAdapterMappings(mappings);
    }

    adapterMappingsPayload() {
        const assignments = Array.isArray(this.config.datapointAssignments) ? this.config.datapointAssignments : [];
        return {
            plantId: this.serverConfig?.plantId || '',
            configRevision: Number(this.serverConfig?.configRevision || 0),
            timestamp: new Date().toISOString(),
            plantSettings: plantSettingsFromAssignments(assignments),
            assignments: assignments.map(assignment => adapterMappingFromAssignment(assignment)).filter(Boolean),
        };
    }

    async pushStatePayload() {
        const config = validateAdapterConfig(this.config);
        if (!this.serverConfig?.valid || !this.apiClient || !this.stateCollector) {
            return;
        }
        if (this.demoAccountMode()) {
            return;
        }
        const payload = await this.stateCollector.collect(this.serverConfig);
        const signature = JSON.stringify({
            values: payload.values,
            plants: payload.plants,
            plantSettings: payload.plantSettings,
        });
        if (config.sendOnlyChanged && signature === this.lastPayloadSignature) {
            debug(this, 'Payload unchanged, sending skipped');
            return;
        }
        if (payload.missing.length > 0) {
            const missingLabels =
                Array.isArray(payload.missingLabels) && payload.missingLabels.length > 0
                    ? payload.missingLabels
                    : payload.missing;
            await this.setError(`Missing values: ${missingLabels.join(', ')}`);
        }
        debug(this, 'Sending payload', payload);
        await this.apiClient.sendStatePayload(payload);
        this.resetBackendTimeoutWarnings();
        this.lastPayloadSignature = signature;
        await this.setStateAsync('info.lastSync', payload.timestamp, true);
        await this.setStateAsync(
            'status.lastPayload',
            JSON.stringify({
                timestamp: payload.timestamp,
                keys: Object.keys(payload.values),
                missing: payload.missing,
            }),
            true,
        );
        await this.setStateAsync('status.backendReachable', true, true);
        await this.setStateAsync('info.connection', true, true);
    }

    async sendTelemetryCycle() {
        if (!this.serverConfig?.valid || !this.telemetrySampler || !this.telemetryQueue) {
            return;
        }
        if (this.demoAccountMode()) {
            return;
        }
        const collected = await this.telemetrySampler.collect(this.serverConfig);
        if (collected.payloads.length > 0) {
            await this.telemetryQueue.enqueue(collected.payloads);
        }
        const result = await this.telemetryQueue.flush();
        this.resetBackendTimeoutWarnings();
        await this.setStateAsync(
            'status.lastTelemetryBatch',
            JSON.stringify({
                timestamp: collected.timestamp,
                generated: collected.payloads.length,
                sent: result.sent,
                remaining: result.remaining,
            }),
            true,
        );
        await this.setStateAsync('info.lastSync', collected.timestamp, true);
        await this.setStateAsync('status.backendReachable', true, true);
        await this.setStateAsync('info.connection', true, true);
    }

    async pullServerUpdates() {
        await this.pullControlCommands();
        try {
            await this.updateDashboardLiteFromBackend();
        } catch (error) {
            await this.setError(error.message);
        }
        await this.applyBatteryControlFromStoredDashboard();
        await this.setStateAsync('status.lastServerPull', new Date().toISOString(), true);
    }

    async updateDashboardLiteFromBackend() {
        if (!this.apiClient || !this.serverConfig?.valid) {
            return;
        }
        const decision = await this.apiClient.requestDashboardDecision(this.serverConfig?.plantId || '');
        this.resetBackendTimeoutWarnings();
        const dashboardLite = dashboardLiteFromDecision(decision);
        const updatedAt = new Date().toISOString();
        await this.writeDashboardLiteStates(dashboardLite, updatedAt);
    }

    async writeDashboardLiteStates(dashboardLite, updatedAt) {
        const cards = Array.isArray(dashboardLite.cards) ? dashboardLite.cards : [];
        const cardValue = (...labels) => {
            const card = cards.find(item => labels.includes(item.label));
            const number = Number(card?.value);
            return Number.isFinite(number) ? number : null;
        };
        const recommendation = cards.find(item => item.label === 'Recommendation');
        await this.setStateAsync('dashboard.lite', JSON.stringify(dashboardLite), true);
        await this.setStateAsync('dashboard.lastUpdate', updatedAt, true);
        await this.setStateAsync('dashboard.reason', dashboardLite.reason || '', true);
        await this.setStateAsync('dashboard.plan', JSON.stringify(dashboardLite.plan || []), true);
        await this.setStateAsync('dashboard.pattern', JSON.stringify(dashboardLite.pattern || {}), true);
        await setNumericState(this, 'dashboard.batteryCapacityKwh', cardValue('Battery capacity'));
        await setNumericState(
            this,
            'dashboard.expectedConsumptionNext24hKwh',
            cardValue('Consumption forecast', 'Consumption forecast next 24h'),
        );
        await setNumericState(this, 'dashboard.expectedPvNext24hKwh', cardValue('PV forecast', 'PV forecast next 24h'));
        await setNumericState(
            this,
            'dashboard.energyGapNext24hKwh',
            cardValue('Energy gap incl. reserve', 'Energy gap next 24h'),
        );
        await setNumericState(this, 'dashboard.horizonHours', nullableNumber(dashboardLite.horizonHours));
        await this.setStateAsync('dashboard.operatingMode', String(recommendation?.value || ''), true);
        await this.setStateAsync(
            'dashboard.batteryChargingActive',
            dashboardBatteryChargingActive(dashboardLite),
            true,
        );
        await this.applyBatteryControlFromDashboard(dashboardLite);
    }

    async resetDashboardStates() {
        await this.setStateAsync('dashboard.lite', '{}', true);
        await this.setStateAsync('dashboard.lastUpdate', '', true);
        await this.setStateAsync('dashboard.reason', '', true);
        await this.setStateAsync('dashboard.plan', '[]', true);
        await this.setStateAsync('dashboard.pattern', '{}', true);
        await this.setStateAsync('dashboard.batteryCapacityKwh', 0, true);
        await this.setStateAsync('dashboard.expectedConsumptionNext24hKwh', 0, true);
        await this.setStateAsync('dashboard.expectedPvNext24hKwh', 0, true);
        await this.setStateAsync('dashboard.energyGapNext24hKwh', 0, true);
        await this.setStateAsync('dashboard.horizonHours', 0, true);
        await this.setStateAsync('dashboard.operatingMode', '', true);
        await this.setStateAsync('dashboard.batteryChargingActive', false, true);
        await this.setStateAsync('status.batteryControlMode', '', true);
        await this.setStateAsync('status.batteryControlResult', '{}', true);
    }

    async applyBatteryControlFromStoredDashboard() {
        try {
            const state = await this.getStateAsync('dashboard.lite');
            const dashboardLite = state?.val ? JSON.parse(String(state.val)) : null;
            await this.applyBatteryControlFromDashboard(dashboardLite);
        } catch (error) {
            await this.setStateAsync(
                'status.batteryControlResult',
                JSON.stringify({
                    ok: false,
                    code: 'dashboard_parse_failed',
                    message: error.message,
                    timestamp: new Date().toISOString(),
                }),
                true,
            );
        }
    }

    async applyBatteryControlFromDashboard(dashboardLite) {
        if (this.demoAccountMode()) {
            return;
        }
        const assignment = batteryControlAssignment(this.config.datapointAssignments);
        if (!assignment) {
            return;
        }
        const stateId = String(assignment.stateId || '').trim();
        if (!stateId) {
            await this.setStateAsync(
                'status.batteryControlResult',
                JSON.stringify({
                    ok: false,
                    code: 'state_missing',
                    message: 'Battery control datapoint is not configured.',
                    timestamp: new Date().toISOString(),
                }),
                true,
            );
            return;
        }
        const mode = batteryControlModeFromDashboard(dashboardLite);
        if (mode === 'gridCharge' && assignment.gridChargingAllowed === false) {
            await this.setStateAsync('status.batteryControlMode', 'pv', true);
            await this.setStateAsync(
                'status.batteryControlResult',
                JSON.stringify({
                    ok: false,
                    code: 'grid_charging_disabled',
                    mode,
                    stateId,
                    message: 'Grid charging is disabled for this plant.',
                    timestamp: new Date().toISOString(),
                }),
                true,
            );
            return;
        }
        const rawValue = batteryControlRawValue(assignment, mode);
        if (rawValue === null) {
            await this.setStateAsync(
                'status.batteryControlResult',
                JSON.stringify({
                    ok: false,
                    code: 'value_missing',
                    mode,
                    message: `Battery control value for mode ${mode} is not configured.`,
                    timestamp: new Date().toISOString(),
                }),
                true,
            );
            return;
        }
        const object = await this.getForeignObjectAsync(stateId);
        if (!object || object.type !== 'state' || object.common?.write !== true) {
            await this.setStateAsync(
                'status.batteryControlResult',
                JSON.stringify({
                    ok: false,
                    code: 'state_not_writable',
                    mode,
                    stateId,
                    message: `State ${stateId} is not writable.`,
                    timestamp: new Date().toISOString(),
                }),
                true,
            );
            return;
        }
        let value;
        try {
            value = normalizeControlWriteValue(rawValue, object.common?.type);
        } catch (error) {
            await this.setStateAsync(
                'status.batteryControlResult',
                JSON.stringify({
                    ok: false,
                    code: 'invalid_value',
                    mode,
                    stateId,
                    message: error.message,
                    timestamp: new Date().toISOString(),
                }),
                true,
            );
            return;
        }
        const current = await this.getForeignStateAsync(stateId);
        const unchanged = current && current.val === value;
        if (!unchanged) {
            await this.setForeignStateAsync(stateId, {
                val: value,
                ack: false,
            });
        }
        await this.setStateAsync('status.batteryControlMode', mode, true);
        await this.setStateAsync(
            'status.batteryControlResult',
            JSON.stringify({
                ok: true,
                code: unchanged ? 'unchanged' : 'written',
                mode,
                stateId,
                value,
                timestamp: new Date().toISOString(),
            }),
            true,
        );
    }

    async pullControlCommands() {
        const config = validateAdapterConfig(this.config);
        if (!this.serverConfig?.valid || !this.apiClient || !this.controlHandler) {
            return;
        }
        const localConfigRevision = Number(this.serverConfig.configRevision || 0);
        const commands = await this.apiClient.requestControlCommands(localConfigRevision);
        this.resetBackendTimeoutWarnings();
        debug(this, 'Control commands received', sanitizeForLog(commands, config.adapterToken));
        if (this.shouldReloadServerConfig(commands, localConfigRevision)) {
            const result = await this.requestConfigFromBackend({ persist: false });
            if (result.ok) {
                const loadedConfigRevision = Number(result.configRevision || 0);
                await this.applyRuntimeServerConfig(result.serverConfig, result.serverConfigLastRequest);
                await this.pushAdapterMappings();
                if (Number.isFinite(loadedConfigRevision) && loadedConfigRevision !== localConfigRevision) {
                    this.log.debug(
                        `Server configuration automatically loaded: version ${result.version}, revision ${loadedConfigRevision}, features: ${result.detectedFeatures.join(', ') || '-'}`,
                    );
                }
            } else if (hasNoActiveInstallationsError(result.errors)) {
                await this.clearRuntimeServerConfig();
            }
        }
        if (this.serverConfig?.valid) {
            await this.controlHandler.handleCommands(this.serverConfig, commands);
        }
    }

    shouldReloadServerConfig(commands, localConfigRevision) {
        const serverConfigRevision = Number(commands?.configRevision || 0);
        return (
            commands?.configReloadRequired === true &&
            Number.isFinite(serverConfigRevision) &&
            serverConfigRevision !== Number(localConfigRevision || 0)
        );
    }

    async ensureInfoStates() {
        const groups = {
            info: 'Adapter information',
            status: 'Runtime status',
            telemetry: 'Telemetry',
            dashboard: 'Dashboard',
        };
        for (const [id, name] of Object.entries(groups)) {
            await this.setObjectNotExistsAsync(id, {
                type: 'channel',
                common: {
                    name,
                },
                native: {},
            });
        }

        // eslint-disable-next-line jsdoc/check-tag-names
        /** @type {Record<string, Partial<ioBroker.StateCommon>>} */
        const states = {
            'info.connection': {
                type: 'boolean',
                role: 'indicator.connected',
                name: 'Backend connection',
                def: false,
            },
            'info.lastSync': {
                type: 'string',
                role: 'date',
                name: 'Last payload sync',
                def: '',
            },
            'info.lastError': {
                type: 'string',
                role: 'text',
                name: 'Last error',
                def: '',
            },
            'info.configValid': {
                type: 'boolean',
                role: 'indicator',
                name: 'Server configuration valid',
                def: false,
            },
            'info.tokenValid': {
                type: 'boolean',
                role: 'indicator',
                name: 'Adapter token valid',
                def: false,
            },
            'info.detectedFeatures': {
                type: 'string',
                role: 'json',
                name: 'Detected server features',
                def: '[]',
            },
            'info.serverConfigVersion': {
                type: 'number',
                role: 'value',
                name: 'Server config version',
                def: 0,
            },
            'info.serverConfigRevision': {
                type: 'number',
                role: 'value',
                name: 'Server config revision',
                def: 0,
            },
            'info.serverConfigLastRequest': {
                type: 'string',
                role: 'date',
                name: 'Last server config request',
                def: '',
            },
            'info.serverConfigJson': {
                type: 'string',
                role: 'json',
                name: 'Current runtime server config',
                def: 'null',
            },
            'info.datapointAssignmentsJson': {
                type: 'string',
                role: 'json',
                name: 'Current runtime datapoint assignments',
                def: '[]',
            },
            'status.backendReachable': {
                type: 'boolean',
                role: 'indicator.reachable',
                name: 'Backend reachable',
                def: false,
            },
            'status.lastPayload': {
                type: 'string',
                role: 'json',
                name: 'Last payload summary',
                def: '{}',
            },
            'status.lastTelemetryBatch': {
                type: 'string',
                role: 'json',
                name: 'Last telemetry batch',
                def: '{}',
            },
            'status.lastServerPull': {
                type: 'string',
                role: 'date',
                name: 'Last server pull',
                def: '',
            },
            'status.lastCommand': {
                type: 'string',
                role: 'text',
                name: 'Last command target',
                def: '',
            },
            'status.lastCommandResult': {
                type: 'string',
                role: 'json',
                name: 'Last command result',
                def: '{}',
            },
            'status.batteryControlMode': {
                type: 'string',
                role: 'text',
                name: 'Current battery control mode',
                def: '',
            },
            'status.batteryControlResult': {
                type: 'string',
                role: 'json',
                name: 'Last battery control result',
                def: '{}',
            },
            'telemetry.pollOffsetSeconds': {
                type: 'number',
                role: 'value',
                name: 'Persistent telemetry polling offset',
                def: -1,
            },
            'telemetry.queueLength': {
                type: 'number',
                role: 'value',
                name: 'Pending telemetry queue length',
                def: 0,
            },
            'dashboard.lite': {
                type: 'string',
                role: 'json',
                name: 'Dashboard',
                def: '{}',
            },
            'dashboard.lastUpdate': {
                type: 'string',
                role: 'date',
                name: 'Dashboard last update',
                def: '',
            },
            'dashboard.reason': {
                type: 'string',
                role: 'text',
                name: 'Dashboard decision reason',
                def: '',
            },
            'dashboard.plan': {
                type: 'string',
                role: 'json',
                name: 'Dashboard horizon plan',
                def: '[]',
            },
            'dashboard.pattern': {
                type: 'string',
                role: 'json',
                name: 'Dashboard pattern detection',
                def: '{}',
            },
            'dashboard.batteryCapacityKwh': {
                type: 'number',
                role: 'value.battery',
                name: 'Battery capacity',
                unit: 'kWh',
                def: 0,
            },
            'dashboard.expectedConsumptionNext24hKwh': {
                type: 'number',
                role: 'value.energy',
                name: 'Consumption forecast dashboard horizon',
                unit: 'kWh',
                def: 0,
            },
            'dashboard.expectedPvNext24hKwh': {
                type: 'number',
                role: 'value.energy',
                name: 'PV forecast dashboard horizon',
                unit: 'kWh',
                def: 0,
            },
            'dashboard.energyGapNext24hKwh': {
                type: 'number',
                role: 'value.energy',
                name: 'Energy gap incl. reserve dashboard horizon',
                unit: 'kWh',
                def: 0,
            },
            'dashboard.horizonHours': {
                type: 'number',
                role: 'value',
                name: 'Dashboard horizon basis',
                unit: 'h',
                def: 0,
            },
            'dashboard.operatingMode': {
                type: 'string',
                role: 'text',
                name: 'Operating mode',
                def: '',
            },
            'dashboard.batteryChargingActive': {
                type: 'boolean',
                role: 'indicator',
                name: 'Battery charging active',
                def: false,
            },
        };
        for (const [id, common] of Object.entries(states)) {
            await this.setObjectNotExistsAsync(id, {
                type: 'state',
                // eslint-disable-next-line jsdoc/check-tag-names
                common: /** @type {ioBroker.StateCommon} */ ({
                    ...common,
                    read: true,
                    write: false,
                }),
                native: {},
            });
        }
        await this.extendObjectAsync('dashboard.lite', {
            common: {
                name: 'Dashboard',
            },
        });
    }

    async setError(message) {
        const text = String(message || '');
        if (isBackendRequestTimeout(text)) {
            this.consecutiveBackendTimeouts += 1;
        } else {
            this.resetBackendTimeoutWarnings();
        }
        const shouldLog = shouldLogBackendError(text, this.consecutiveBackendTimeouts);
        if (shouldLog) {
            this.log.warn(text);
        }
        if (isAuthenticationError(text)) {
            await this.setStateAsync('info.tokenValid', false, true);
            await this.setStateAsync('info.connection', false, true);
        }
        await this.setStateAsync('info.lastError', text, true);
        return shouldLog;
    }

    resetBackendTimeoutWarnings() {
        this.consecutiveBackendTimeouts = 0;
    }
}

function hasNoActiveInstallationsError(errors) {
    return (Array.isArray(errors) ? errors : [errors]).some(error =>
        /No active installations found/i.test(String(error || '')),
    );
}

if (require.main !== module) {
    module.exports = options => new AiEnergyManager(options);
} else {
    new AiEnergyManager();
}

function delayUntilSecond(targetSecond) {
    const now = new Date();
    const currentMs = now.getSeconds() * 1000 + now.getMilliseconds();
    const targetMs = Number(targetSecond || 0) * 1000;
    let delayMs = targetMs - currentMs;
    if (delayMs <= 0) {
        delayMs += TELEMETRY_CYCLE_SECONDS * 1000;
    }
    return delayMs;
}

function adapterMappingFromAssignment(assignment = {}) {
    const stateId = String(assignment.stateId || '').trim();
    const telemetryField = telemetryFieldForAssignment(assignment);
    if (!telemetryField || !stateId) {
        return null;
    }
    return {
        installationId: assignment.scope === 'plant' ? String(assignment.scopeId || '') : null,
        telemetryField,
        statePath: stateId,
        sourceUnit: String(assignment.sourceUnit || ''),
        powerType: normalizePowerType(assignment.powerType),
    };
}

function plantSettingsFromAssignments(assignments = []) {
    return (Array.isArray(assignments) ? assignments : [])
        .filter(
            assignment =>
                assignment &&
                String(assignment.key || '') === BATTERY_CONTROL_ASSIGNMENT_KEY &&
                String(assignment.scope || '') === 'plant' &&
                String(assignment.scopeId || '').trim(),
        )
        .map(assignment => ({
            installationId: String(assignment.scopeId),
            gridChargingAllowed: assignment.gridChargingAllowed !== false,
            grid_charging_allowed: assignment.gridChargingAllowed !== false,
        }));
}

function normalizePowerType(value) {
    const normalized = String(value || '')
        .trim()
        .toUpperCase();
    return normalized === 'AC' || normalized === 'DC' ? normalized : '';
}

function telemetryFieldForAssignment(assignment = {}) {
    const key = String(assignment.key || '');
    const scope = String(assignment.scope || '');
    if (scope === 'household') {
        return (
            {
                consumptionWh: 'consumption_wh',
                gridExportMeterWh: 'grid_export_meter_wh',
                wallboxWh: 'wallbox_wh',
                gridPower: 'grid_power_w',
            }[key] || ''
        );
    }
    return (
        {
            batterySoc: 'battery_soc_percent',
            batteryPower: 'battery_power_w',
            storageSystemBatteryPower: 'battery_power_w',
            pvPower: 'pv_power_w',
            storageSystemPvPower: 'pv_power_w',
        }[key] || ''
    );
}

function batteryControlAssignment(assignments = []) {
    return (Array.isArray(assignments) ? assignments : [])
        .filter(assignment => String(assignment?.key || '') === BATTERY_CONTROL_ASSIGNMENT_KEY)
        .sort((a, b) => Number(a.plantIndex || 0) - Number(b.plantIndex || 0))[0];
}

function batteryControlModeFromDashboard(dashboardLite) {
    const plan = Array.isArray(dashboardLite?.plan) ? dashboardLite.plan : [];
    const currentSlot = plan.find(slot => slotContainsDate(slot));
    if (!currentSlot) {
        return 'pv';
    }
    const action = String(currentSlot.action || '');
    const plannedPowerW = Number(currentSlot.plannedPowerW || 0);
    const plannedEnergyKwh = Number(currentSlot.plannedEnergyKwh || 0);
    if (action === 'grid_charge' && (plannedPowerW > 0 || plannedEnergyKwh > 0)) {
        return 'gridCharge';
    }
    if (action === 'hold' || action === 'hold_reserve') {
        return 'hold';
    }
    return 'pv';
}

function batteryControlRawValue(assignment, mode) {
    const values = assignment?.controlValues || {};
    if (!Object.hasOwn(values, mode)) {
        return null;
    }
    return String(values[mode] ?? '');
}

function normalizeControlWriteValue(value, type) {
    const text = String(value ?? '').trim();
    if (type === 'boolean') {
        if (/^(true|1|yes|ja|on)$/i.test(text)) {
            return true;
        }
        if (/^(false|0|no|nein|off)$/i.test(text)) {
            return false;
        }
        throw new Error(`Boolean battery control value is invalid: ${value}`);
    }
    if (type === 'number') {
        const number = Number(text);
        if (!Number.isFinite(number)) {
            throw new Error(`Numeric battery control value is invalid: ${value}`);
        }
        return number;
    }
    return value;
}

async function setNumericState(adapter, id, value) {
    if (Number.isFinite(value)) {
        await adapter.setStateAsync(id, value, true);
    }
}

function dashboardLiteFromDecision(response = {}) {
    const decision = response.decision && typeof response.decision === 'object' ? response.decision : {};
    const system = decision.system && typeof decision.system === 'object' ? decision.system : {};
    const inputSummary =
        decision.input_summary && typeof decision.input_summary === 'object' ? decision.input_summary : {};
    const loadProfile =
        inputSummary.consumption?.load_profile && typeof inputSummary.consumption.load_profile === 'object'
            ? inputSummary.consumption.load_profile
            : {};
    const slots = Array.isArray(decision.slots) ? decision.slots : [];
    const horizonHours = dashboardHorizonHours(
        decision.dashboard_horizon_hours ??
            inputSummary.decision?.dashboard_horizon_hours ??
            inputSummary.decision?.visible_horizon_hours,
    );
    const visibleSlots = visibleDashboardSlots(slots, horizonHours);
    const inputHorizonSlots = visibleDashboardSlots(
        Array.isArray(inputSummary.decision?.horizon_slots) ? inputSummary.decision.horizon_slots : [],
        horizonHours,
    );
    const visibleSummary = dashboardHorizonSummary(decision, inputSummary, inputHorizonSlots, horizonHours);
    const currentSlot = visibleSlots.find(slot => slotContainsDate(slot));
    const currentAction = currentSlot?.action || decision.system_action;
    const currentPlannedPowerW = Number(currentSlot?.planned_charge_power_w || 0);
    const currentPlannedEnergyWh = Number(currentSlot?.planned_energy_wh || 0);
    const gridChargingPlanned = visibleSlots.some(
        slot =>
            String(slot?.action || '') === 'grid_charge' &&
            Number(slot?.planned_energy_wh || slot?.planned_charge_power_w || 0) > 0,
    );
    const currentMode = decisionOperatingMode(currentAction, {
        plannedPowerW: currentPlannedPowerW,
        plannedEnergyWh: currentPlannedEnergyWh,
        gridChargingPlanned: String(currentAction || '') === 'grid_charge' && currentPlannedEnergyWh > 0,
    });

    return {
        source: response.source || '',
        decisionTime: decision.decision_time || '',
        validUntil: decision.valid_until || '',
        horizonHours,
        title: `Intelligent charging decision - ${horizonHours} h basis`,
        reason: cleanDecisionReason(decision.human_readable_reason || decision.human_reason || ''),
        reasonText: localizedTextValue(
            decision.human_readable_reason_i18n || decision.human_reason_i18n,
            decision.human_readable_reason || decision.human_reason || '',
        ),
        confidence: nullableNumber(decision.confidence_score),
        engineVersion: decision.engine_version || '',
        cards: [
            {
                label: 'Battery capacity',
                value: formatNumber(system.available_energy_kwh, 2),
                unit: 'kWh',
            },
            {
                label: 'Consumption forecast',
                value: formatNumber(visibleSummary.consumptionKwh, 2),
                unit: 'kWh',
            },
            {
                label: 'PV forecast',
                value: formatNumber(visibleSummary.pvKwh, 2),
                unit: 'kWh',
            },
            {
                label: 'Energy gap incl. reserve',
                value: formatNumber(visibleSummary.energyGapKwh, 2),
                unit: 'kWh',
            },
            {
                label: 'Recommendation',
                value: currentMode.label,
                unit: '',
            },
            {
                label: 'Grid charging planned',
                value: gridChargingPlanned ? 'Yes' : 'No',
                unit: '',
            },
            {
                label: 'Base load',
                value: formatNumber(positiveNullableNumber(loadProfile.base_load_w), 0),
                unit: 'W',
            },
        ],
        plan: visibleSlots.map(slot => {
            const plannedPowerW = Number(slot.planned_charge_power_w || 0);
            const plannedEnergyWh = Number(slot.planned_energy_wh || 0);
            const mode = decisionOperatingMode(slot.action, {
                plannedPowerW,
                plannedEnergyWh,
                gridChargingPlanned: String(slot.action || '') === 'grid_charge',
            });
            return {
                from: slot.slot_start || '',
                to: slot.slot_end || '',
                action: slot.action || '',
                actionLabel: mode.label,
                actionLabelText: localizedTextValue(
                    slot.operating_mode_label_i18n,
                    slot.operating_mode_label || mode.label,
                ),
                operatingMode: mode.id,
                operatingModeLabel: mode.label,
                operatingModeLabelText: localizedTextValue(
                    slot.operating_mode_label_i18n,
                    slot.operating_mode_label || mode.label,
                ),
                batteryCommand: mode.batteryCommand,
                batteryCommandText: localizedTextValue(
                    slot.battery_command_i18n,
                    slot.battery_command || mode.batteryCommand,
                ),
                gridBehavior: mode.gridBehavior,
                gridBehaviorText: localizedTextValue(slot.grid_behavior_i18n, slot.grid_behavior || mode.gridBehavior),
                technicalActionLabel: decisionActionLabel(slot.action),
                installationName: slot.installation_name || 'Household',
                plannedPowerW,
                plannedEnergyKwh: plannedEnergyWh / 1000,
                targetSoc: nullableNumber(slot.target_soc_percent),
                reason: cleanDecisionReason(slot.human_reason || mode.description),
                reasonText: localizedTextValue(slot.human_reason_i18n, slot.human_reason || mode.description),
            };
        }),
        pattern: {
            activeLabel: loadProfile.active_label || loadProfile.active_profile || '',
            reason: loadProfile.reason || '',
            activeEstimateKwh:
                nullableNumber(loadProfile.active_estimate_wh) === null
                    ? null
                    : Number(loadProfile.active_estimate_wh) / 1000,
            baseLoadW: positiveNullableNumber(loadProfile.base_load_w),
            todayProjectedKwh:
                nullableNumber(loadProfile.today_projected_wh) === null
                    ? null
                    : Number(loadProfile.today_projected_wh) / 1000,
            profiles: Array.isArray(loadProfile.profiles)
                ? loadProfile.profiles.map(profile => ({
                      label: profile.label || profile.profile || '-',
                      days: profile.days ?? '-',
                      averageKwh:
                          nullableNumber(profile.average_wh) === null ? null : Number(profile.average_wh) / 1000,
                      minKwh: nullableNumber(profile.min_wh) === null ? null : Number(profile.min_wh) / 1000,
                      maxKwh: nullableNumber(profile.max_wh) === null ? null : Number(profile.max_wh) / 1000,
                      confidence: nullableNumber(profile.confidence),
                  }))
                : [],
        },
    };
}

function dashboardHorizonHours(value = DEFAULT_DASHBOARD_HORIZON_HOURS) {
    const hours = Number(value);
    return Number.isFinite(hours) && hours > 0 ? hours : DEFAULT_DASHBOARD_HORIZON_HOURS;
}

function cleanDecisionReason(reason) {
    return String(reason || '')
        .replace(/\s*Weiterer Planungshorizont ist ausstehend, da [^.]+ verfügbar ist\./gu, '')
        .replace(/\s{2,}/gu, ' ')
        .trim();
}

function localizedTextValue(value, fallback = '') {
    const fallbackText = cleanDecisionReason(fallback);
    if (value && typeof value === 'object' && !Array.isArray(value)) {
        const de = cleanDecisionReason(value.de || fallbackText);
        const en = cleanDecisionReason(value.en || fallbackText || de);
        return {
            de: de || en,
            en: en || de,
        };
    }
    const text = cleanDecisionReason(value || fallbackText);
    return text
        ? {
              de: text,
              en: text,
          }
        : null;
}

function dashboardHorizonSummary(decision, inputSummary, inputHorizonSlots, horizonHours) {
    const system = inputSummary.system && typeof inputSummary.system === 'object' ? inputSummary.system : {};
    const decisionSystem = decision.system && typeof decision.system === 'object' ? decision.system : {};
    if (inputHorizonSlots.length > 0) {
        const relevantSlots = inputHorizonSlots.filter(slot => String(slot?.action || '') !== 'forecast_pending');
        const consumptionWh = relevantSlots.reduce((sum, slot) => sum + Number(slot?.expected_consumption_wh || 0), 0);
        const pvWh = relevantSlots.reduce((sum, slot) => sum + Number(slot?.expected_pv_wh || 0), 0);
        const usableEnergyWh = Number.isFinite(Number(system.usable_energy_wh))
            ? Number(system.usable_energy_wh)
            : Number(decisionSystem.available_energy_kwh || 0) * 1000;
        const reserveBufferWh = Number(system.strategy_reserve_buffer_wh || 0);
        return {
            consumptionKwh: Math.max(0, consumptionWh / 1000),
            pvKwh: Math.max(0, pvWh / 1000),
            energyGapKwh: Math.max(0, (consumptionWh + reserveBufferWh - usableEnergyWh - pvWh) / 1000),
        };
    }

    const factor = horizonHours / 24;
    const consumptionWh = Number(decisionSystem.expected_consumption_wh || 0) * factor;
    const pvWh = Number(decisionSystem.expected_pv_wh || 0) * factor;
    const usableEnergyWh = Number.isFinite(Number(system.usable_energy_wh))
        ? Number(system.usable_energy_wh)
        : Number(decisionSystem.available_energy_kwh || 0) * 1000;
    const reserveBufferWh = Number(system.strategy_reserve_buffer_wh || 0);
    return {
        consumptionKwh: Math.max(0, consumptionWh / 1000),
        pvKwh: Math.max(0, pvWh / 1000),
        energyGapKwh: Math.max(0, (consumptionWh + reserveBufferWh - usableEnergyWh - pvWh) / 1000),
    };
}

function visibleDashboardSlots(slots, horizonHours, now = new Date()) {
    if (!Array.isArray(slots) || slots.length === 0) {
        return [];
    }
    const windowStart = currentQuarterDate(now).getTime();
    const windowEnd = windowStart + horizonHours * 60 * 60 * 1000;
    return slots
        .filter(slot => {
            const start = Date.parse(slot?.slot_start || slot?.from || '');
            const end = Date.parse(slot?.slot_end || slot?.to || '');
            return Number.isFinite(start) && Number.isFinite(end) && start < windowEnd && end > windowStart;
        })
        .slice(0, horizonHours * 4);
}

function currentQuarterDate(now = new Date()) {
    const date = now instanceof Date ? new Date(now.getTime()) : new Date();
    date.setSeconds(0, 0);
    date.setMinutes(Math.floor(date.getMinutes() / 15) * 15);
    return date;
}

function formatNumber(value, decimals) {
    const number = nullableNumber(value);
    return number === null ? '-' : number.toFixed(decimals);
}

function nullableNumber(value) {
    const number = Number(value);
    return Number.isFinite(number) ? number : null;
}

function positiveNullableNumber(value) {
    const number = nullableNumber(value);
    return number !== null && number > 0 ? number : null;
}

function dashboardBatteryChargingActive(dashboardLite, now = new Date()) {
    const slots = Array.isArray(dashboardLite?.plan) ? dashboardLite.plan : [];
    const currentSlot = slots.find(slot => slotContainsDate(slot, now));
    return currentSlot ? slotChargesBattery(currentSlot) : false;
}

function slotContainsDate(slot, date) {
    const start = Date.parse(slot?.from || slot?.slot_start || '');
    const end = Date.parse(slot?.to || slot?.slot_end || '');
    const time = date === undefined ? Date.now() : date instanceof Date ? date.getTime() : Date.parse(date || '');
    return Number.isFinite(start) && Number.isFinite(end) && Number.isFinite(time) && time >= start && time < end;
}

function slotChargesBattery(slot) {
    const plannedPowerW = Number(slot?.plannedPowerW || 0);
    const plannedEnergyKwh = Number(slot?.plannedEnergyKwh || 0);
    const action = String(slot?.action || '');
    const batteryCommand = String(slot?.batteryCommand || '');
    return (
        plannedPowerW > 0 || plannedEnergyKwh > 0 || action === 'charge_from_pv' || batteryCommand === 'Charge battery'
    );
}

function decisionActionLabel(action) {
    switch (String(action || '')) {
        case 'grid_charge':
            return 'Grid charging';
        case 'wait_for_pv':
            return 'Use PV';
        case 'hold_reserve':
            return 'Hold battery';
        case 'insufficient_data':
            return 'Insufficient data';
        case 'forecast_pending':
            return 'Forecast pending';
        case 'no_charge':
            return 'Do not charge';
        case 'hold':
            return 'Hold';
        case 'discharge':
            return 'Discharge';
        case 'charge_from_pv':
            return 'Charge from PV';
        case 'none':
        case '':
            return 'No action';
        default:
            return String(action);
    }
}

function decisionOperatingMode(action, context = {}) {
    const normalizedAction = String(action || '');
    const plannedPowerW = nullableNumber(context.plannedPowerW) || 0;
    const plannedEnergyWh = nullableNumber(context.plannedEnergyWh) || 0;
    const charging = plannedPowerW > 0 || plannedEnergyWh > 0 || context.gridChargingPlanned === true;

    switch (normalizedAction) {
        case 'grid_charge':
            if (!charging) {
                return {
                    id: 'pv_battery_operation',
                    label: 'PV/battery operation',
                    batteryCommand: 'Use battery',
                    gridBehavior: 'No active grid charging',
                    description: 'No planned charging energy detected.',
                };
            }
            return {
                id: 'grid_operation',
                label: 'Grid operation',
                batteryCommand: 'Charge battery',
                gridBehavior: 'Household load from grid, battery is charging',
                description: 'Grid power is economical or necessary according to the calculation.',
            };
        case 'hold_reserve':
        case 'hold':
            return {
                id: 'grid_operation',
                label: 'Grid operation',
                batteryCommand: charging ? 'Charge battery' : 'Hold battery',
                gridBehavior: charging
                    ? 'Household load from grid, battery is charged briefly'
                    : 'Household load from grid/PV, battery is held',
                description: 'Battery reserve is preserved until PV yield or a charging window is reached.',
            };
        case 'wait_for_pv':
            return {
                id: 'pv_battery_operation',
                label: 'PV/battery operation',
                batteryCommand: 'Use battery',
                gridBehavior: 'PV and battery cover consumption, grid charging is not planned',
                description: 'Available battery energy and expected PV yield are sufficient.',
            };
        case 'charge_from_pv':
            return {
                id: 'pv_battery_operation',
                label: 'PV/battery operation',
                batteryCommand: 'Charge battery',
                gridBehavior: 'PV is preferred',
                description: 'PV yield is used to cover consumption and battery.',
            };
        case 'discharge':
            return {
                id: 'pv_battery_operation',
                label: 'PV/battery operation',
                batteryCommand: 'Use battery',
                gridBehavior: 'Avoid grid import',
                description: 'Battery may support household consumption.',
            };
        case 'no_charge':
        case 'none':
            return {
                id: 'pv_battery_operation',
                label: 'PV/battery operation',
                batteryCommand: 'Use battery',
                gridBehavior: 'No active grid charging',
                description: 'No grid charging need detected.',
            };
        case 'insufficient_data':
        case '':
            return insufficientDataMode();
        case 'forecast_pending':
            return {
                id: 'forecast_pending',
                label: 'Forecast pending',
                batteryCommand: 'No planning',
                gridBehavior: 'Required forecast data is still pending',
                description: 'The planning window continues once all required forecast data is available.',
            };
        default:
            return insufficientDataMode();
    }
}

function insufficientDataMode() {
    return {
        id: 'insufficient_data',
        label: 'Insufficient data',
        batteryCommand: 'No control',
        gridBehavior: 'No reliable decision',
        description: 'Telemetry, forecast or backend data are not sufficient for a decision.',
    };
}

function adapterTokenFingerprint(adapterToken) {
    const token = String(adapterToken || '').trim();
    if (!token) {
        return '';
    }
    return `sha256:${nodeCrypto.createHash('sha256').update(token).digest('hex')}`;
}
