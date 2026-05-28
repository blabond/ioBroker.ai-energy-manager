'use strict';

const { maskSecret, normalizeBackendUrl, assertToken, isDemoAccountToken } = require('./validation');

class ApiClient {
    constructor(options) {
        this.backendUrl = normalizeBackendUrl(options.backendUrl);
        this.token = assertToken(options.token);
        this.timeoutMs = Number(options.timeoutMs || 15000);
        this.logger = options.logger || console;
        this.timerHost = options.timerHost || null;
        this.demoAccount = isDemoAccountToken(this.token);
    }

    async validateToken() {
        return this.request('POST', '/api/iobroker/token/validate', {});
    }

    async requestServerConfig() {
        return this.request('POST', '/api/iobroker/config/request', {});
    }

    async pushAdapterMappings(payload) {
        if (this.demoAccount) {
            return { success: true, status: 'demo_skipped', configured: 0 };
        }
        return this.request('POST', '/api/iobroker/config/push', payload);
    }

    async requestDashboardDecision(installationId = '') {
        const query = new URLSearchParams({ strategy: 'balanced' });
        if (installationId) {
            query.set('installation_id', installationId);
        }
        return this.request('GET', `/api/v1/decision?${query.toString()}`);
    }

    async sendStatePayload(payload) {
        if (this.demoAccount) {
            return { success: true, status: 'demo_skipped' };
        }
        return this.request('POST', '/api/iobroker/states/push', payload);
    }

    async sendTelemetryBatch(items) {
        if (this.demoAccount) {
            const telemetry = Array.isArray(items) ? items : [];
            return {
                status: 'demo_skipped',
                stored_count: 0,
                skipped_count: telemetry.length,
                items: [],
            };
        }
        const telemetry = Array.isArray(items) ? items : [];
        return this.request('POST', '/api/v1/telemetry', { telemetry });
    }

    async requestControlCommands(configRevision = 0) {
        const query = new URLSearchParams();
        const revision = Number(configRevision || 0);
        if (Number.isFinite(revision) && revision > 0) {
            query.set('config_revision', String(Math.trunc(revision)));
        }
        const suffix = query.toString() ? `?${query.toString()}` : '';
        return this.request('GET', `/api/iobroker/commands/pull${suffix}`);
    }

    async acknowledgeCommand(commandId, result) {
        return this.request('POST', '/api/iobroker/commands/ack', {
            commandId,
            result,
        });
    }

    async request(method, path, body) {
        const controller = new AbortController();
        const timeout = this.setRequestTimeout(() => controller.abort());
        const url = `${this.backendUrl}${path}`;
        const headers = {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'User-Agent': 'iobroker.ai-energy-manager/0.1.0',
        };
        try {
            const response = await fetch(url, {
                method,
                headers,
                body: method === 'GET' ? undefined : JSON.stringify(body || {}),
                signal: controller.signal,
            });
            const text = await response.text();
            const data = text ? safeJson(text) : {};
            if (!response.ok) {
                const message = data.message || data.error || `Backend responded with HTTP ${response.status}`;
                throw new Error(maskToken(message, this.token));
            }
            return data;
        } catch (error) {
            const message = error.name === 'AbortError' ? 'Backend request timed out.' : error.message;
            throw new Error(maskToken(message, this.token));
        } finally {
            this.clearRequestTimeout(timeout);
        }
    }

    async publicRequest(url) {
        const controller = new AbortController();
        const timeout = this.setRequestTimeout(() => controller.abort());
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'User-Agent': 'iobroker.ai-energy-manager/0.1.0',
                },
                signal: controller.signal,
            });
            const text = await response.text();
            const data = text ? safeJson(text) : {};
            if (!response.ok) {
                throw new Error(`Backend responded with HTTP ${response.status}`);
            }
            return data;
        } catch (error) {
            const message = error.name === 'AbortError' ? 'Backend request timed out.' : error.message;
            throw new Error(message);
        } finally {
            this.clearRequestTimeout(timeout);
        }
    }

    setRequestTimeout(callback) {
        if (this.timerHost?.setTimeout) {
            return this.timerHost.setTimeout(callback, this.timeoutMs);
        }
        return setTimeout(callback, this.timeoutMs);
    }

    clearRequestTimeout(timeout) {
        if (this.timerHost?.clearTimeout) {
            this.timerHost.clearTimeout(timeout);
            return;
        }
        clearTimeout(timeout);
    }
}

function safeJson(text) {
    try {
        return JSON.parse(text);
    } catch {
        throw new Error('Backend response is not valid JSON.');
    }
}

function maskToken(message, token) {
    return String(message || '')
        .split(String(token || ''))
        .join(maskSecret(token));
}

module.exports = ApiClient;
