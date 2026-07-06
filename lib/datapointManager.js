'use strict';

const { assignmentDefinitions } = require('./datapointAssignments');

class DatapointManager {
    constructor(adapter) {
        this.adapter = adapter;
    }

    configuredAssignments() {
        return Array.isArray(this.adapter.config.datapointAssignments) ? this.adapter.config.datapointAssignments : [];
    }

    configuredDatapoints() {
        const assignments = this.configuredAssignments();
        return Object.fromEntries(
            assignments.map(item => [item.mappingKey || item.key, String(item.stateId || '').trim()]),
        );
    }

    definitions(serverConfig) {
        return assignmentDefinitions(serverConfig, this.configuredAssignments());
    }

    stateIdFor(key) {
        return String(this.configuredDatapoints()[key] || '').trim();
    }

    async validate(serverConfig) {
        const errors = [];
        const warnings = [];
        const datapoints = this.definitions(serverConfig);
        for (const definition of datapoints) {
            const stateId = this.stateIdFor(definition.mappingKey || definition.key);
            if (!stateId) {
                if (definition.required) {
                    errors.push(`${definition.label || definition.key}: datapoint missing.`);
                }
                continue;
            }
            const object = await this.adapter.getForeignObjectAsync(stateId);
            if (!object || object.type !== 'state') {
                errors.push(`${definition.label || definition.key}: state ${stateId} does not exist.`);
                continue;
            }
            const common = object.common || {};
            if (definition.read && common.read === false) {
                const readable = await this.stateHasReadableValue(stateId);
                if (!readable && definition.required) {
                    errors.push(`${definition.label || definition.key}: state ${stateId} is not readable.`);
                } else if (!readable) {
                    warnings.push(
                        `${definition.label || definition.key}: State ${stateId} is marked as not readable and will be skipped until it returns values.`,
                    );
                }
            }
            if (definition.write && common.write !== true) {
                errors.push(`${definition.label || definition.key}: state ${stateId} is not writable.`);
            }
            if (!definition.write && common.write === true) {
                warnings.push(
                    `${definition.label || definition.key}: state ${stateId} is writable but will only be read.`,
                );
            }
        }
        return {
            valid: errors.length === 0,
            errors,
            warnings,
        };
    }

    async stateHasReadableValue(stateId) {
        try {
            const state = await this.adapter.getForeignStateAsync(stateId);
            return state && state.val !== null && state.val !== undefined;
        } catch {
            return false;
        }
    }

    writableStateForTarget(serverConfig, target) {
        const definition = this.writableDefinitionForTarget(serverConfig, target);
        if (!definition) {
            return null;
        }
        return this.stateIdFor(definition.mappingKey || target) || null;
    }

    writableDefinitionForTarget(serverConfig, target) {
        const definition = this.definitions(serverConfig).find(
            item => item.key === target || item.mappingKey === target,
        );
        if (!definition || definition.write !== true) {
            return null;
        }
        return definition;
    }
}

module.exports = DatapointManager;
