'use strict';

const { FEATURES, datapointsForFeatures, featureLabels } = require('./featureRegistry');
const { isPlainObject } = require('./validation');

function normalizeServerConfig(serverConfig) {
    if (!isPlainObject(serverConfig)) {
        return invalid('Server configuration is not an object.');
    }
    if (serverConfig.success === false) {
        return invalid(serverConfig.message || 'Backend rejected the configuration.');
    }
    const version = Number(serverConfig.version || 0);
    if (!Number.isInteger(version) || version < 1) {
        return invalid('Server configuration has no valid version.');
    }
    const features = isPlainObject(serverConfig.features) ? serverConfig.features : {};
    const enabledFeatures = [];
    const unsupportedFeatures = [];
    for (const [key, enabled] of Object.entries(features)) {
        if (!enabled) {
            continue;
        }
        if (FEATURES[key]) {
            enabledFeatures.push(key);
        } else {
            unsupportedFeatures.push(key);
        }
    }
    const requiredDatapoints = isPlainObject(serverConfig.requiredDatapoints) ? serverConfig.requiredDatapoints : {};
    const datapoints = datapointsForFeatures(enabledFeatures, requiredDatapoints);
    const missingRequiredDefinitions = datapoints.filter(item => item.required && !item.label).map(item => item.key);
    if (missingRequiredDefinitions.length > 0) {
        return invalid(`Incomplete datapoint definitions: ${missingRequiredDefinitions.join(', ')}`);
    }
    const now = new Date().toISOString();
    return {
        valid: true,
        version,
        plantId: String(serverConfig.plantId || ''),
        configRevision: Number(serverConfig.configRevision || 0),
        updatedAt: String(serverConfig.updatedAt || ''),
        receivedAt: now,
        features: Object.fromEntries(enabledFeatures.map(key => [key, true])),
        enabledFeatures,
        detectedFeatureLabels: featureLabels(enabledFeatures),
        unsupportedFeatures,
        datapoints,
        requiredDatapoints: Object.fromEntries(datapoints.map(item => [item.key, item])),
        controlModes: isPlainObject(serverConfig.controlModes) ? serverConfig.controlModes : {},
        raw: serverConfig,
        errors: [],
    };
}

function invalid(message) {
    return {
        valid: false,
        version: 0,
        plantId: '',
        configRevision: 0,
        updatedAt: '',
        receivedAt: new Date().toISOString(),
        features: {},
        enabledFeatures: [],
        detectedFeatureLabels: [],
        unsupportedFeatures: [],
        datapoints: [],
        requiredDatapoints: {},
        controlModes: {},
        raw: null,
        errors: [message],
    };
}

async function requestAndNormalize(apiClient) {
    const response = await apiClient.requestServerConfig();
    return normalizeServerConfig(response);
}

module.exports = {
    normalizeServerConfig,
    requestAndNormalize,
};
