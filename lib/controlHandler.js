'use strict';

class ControlHandler {
    constructor(adapter, datapointManager, apiClient, options = {}) {
        this.adapter = adapter;
        this.datapointManager = datapointManager;
        this.apiClient = apiClient;
        this.minWriteIntervalMs = Number(options.minWriteIntervalSeconds || 0) * 1000;
        this.lastWriteAt = new Map();
    }

    async handleCommands(serverConfig, commands) {
        const list = Array.isArray(commands) ? commands : commands?.commands || [];
        for (const command of list) {
            const result = await this.handleCommand(serverConfig, command);
            if (command?.commandId) {
                await this.apiClient.acknowledgeCommand(command.commandId, result);
            }
        }
    }

    async handleCommand(serverConfig, command) {
        const commandId = String(command?.commandId || '');
        const target = String(command?.target || '');
        const definition = this.datapointManager.writableDefinitionForTarget?.(serverConfig, target) || null;
        const stateId = definition ? this.datapointManager.stateIdFor(definition.mappingKey || target) || null : null;
        if (!commandId || !target) {
            return this.result(false, 'invalid_command', 'Command ID or target is missing.');
        }
        if (!stateId) {
            return this.result(
                false,
                'target_not_allowed',
                `Target ${target} is not configured as a writable datapoint.`,
            );
        }
        if (isBlockedGridChargeCommand(definition, command)) {
            return this.result(
                false,
                'grid_charging_disabled',
                `Grid charging is disabled for ${definition.scopeName || definition.scopeId || target}.`,
            );
        }
        const object = await this.adapter.getForeignObjectAsync(stateId);
        if (!object || object.type !== 'state' || object.common?.write !== true) {
            return this.result(false, 'state_not_writable', `State ${stateId} is not writable.`);
        }
        let value;
        try {
            value = normalizeTargetValue(command.value, object.common?.type);
        } catch (error) {
            return this.result(false, 'invalid_value', error.message);
        }
        const current = await this.adapter.getForeignStateAsync(stateId);
        if (current && current.val === value) {
            return this.result(true, 'unchanged', 'Target value is already set.');
        }
        const now = Date.now();
        const lastWriteAt = this.lastWriteAt.get(stateId) || 0;
        if (this.minWriteIntervalMs > 0 && now - lastWriteAt < this.minWriteIntervalMs) {
            return this.result(
                false,
                'rate_limited',
                'Minimum interval between write commands has not been reached yet.',
            );
        }
        await this.adapter.setForeignStateAsync(stateId, {
            val: value,
            ack: false,
        });
        this.lastWriteAt.set(stateId, now);
        await this.adapter.setStateAsync('status.lastCommand', target, true);
        await this.adapter.setStateAsync(
            'status.lastCommandResult',
            JSON.stringify({ commandId, target, ok: true }),
            true,
        );
        return this.result(true, 'written', 'Target value written.');
    }

    result(ok, code, message) {
        return {
            ok,
            code,
            message,
            timestamp: new Date().toISOString(),
        };
    }
}

function isBlockedGridChargeCommand(definition = {}, command = {}) {
    if (String(definition.key || '') !== 'batteryControlMode') {
        return false;
    }
    if (definition.gridChargingAllowed !== false) {
        return false;
    }
    return commandRequestsGridCharge(definition, command);
}

function commandRequestsGridCharge(definition = {}, command = {}) {
    const actionCandidates = [
        command.mode,
        command.action,
        command.command,
        command.controlMode,
        command.batteryControlMode,
    ].map(value => normalizeCommandText(value));
    if (actionCandidates.some(value => ['gridcharge', 'grid_charge', 'netzladen'].includes(value))) {
        return true;
    }

    const value = normalizeCommandText(command.value);
    if (['gridcharge', 'grid_charge', 'netzladen'].includes(value)) {
        return true;
    }
    const gridChargeValue = normalizeCommandText(definition.controlValues?.gridCharge);
    return gridChargeValue !== '' && value === gridChargeValue;
}

function normalizeCommandText(value) {
    return String(value ?? '')
        .trim()
        .toLowerCase();
}

function normalizeTargetValue(value, type) {
    if (type === 'boolean') {
        if (value === true || value === 'true' || value === 1 || value === '1') {
            return true;
        }
        if (value === false || value === 'false' || value === 0 || value === '0') {
            return false;
        }
        throw new Error('Boolean target value is invalid.');
    }
    if (type === 'number') {
        const number = Number(value);
        if (!Number.isFinite(number)) {
            throw new Error('Numeric target value is invalid.');
        }
        return number;
    }
    return value;
}

module.exports = ControlHandler;
