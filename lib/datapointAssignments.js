'use strict';

const HOUSEHOLD_SCOPE = 'household';
const PLANT_SCOPE = 'plant';

const HOUSEHOLD_FEATURES = new Set(['gridMeter', 'wallbox', 'energyMeter']);
const PLANT_FEATURES = new Set(['battery', 'pvForecast', 'storageSystem']);
const BATTERY_CONTROL_DEFINITION = {
    key: 'batteryControlMode',
    label: 'Battery control mode',
    description:
        'Writable datapoint used by the local 6-hour plan to switch the battery between grid charging, PV operation and hold.',
    feature: 'battery',
    read: true,
    write: true,
    required: false,
    controlValues: {
        gridCharge: '1',
        pv: '0',
        hold: '2',
    },
};
const GRID_CHARGING_ALLOWED_KEYS = [
    'gridChargingAllowed',
    'grid_charging_allowed',
    'allowGridCharging',
    'allow_grid_charging',
    'gridChargingEnabled',
    'grid_charging_enabled',
    'allowGridCharge',
    'allow_grid_charge',
    'gridChargeAllowed',
    'grid_charge_allowed',
    'batteryGridChargingAllowed',
    'battery_grid_charging_allowed',
    'allowBatteryGridCharging',
    'allow_battery_grid_charging',
    'netzladenErlaubt',
    'netzladen',
];

function buildDatapointAssignments(serverConfig, existingAssignments = []) {
    if (!serverConfig?.valid) {
        return [];
    }
    const previous = previousAssignmentData(existingAssignments);
    const assignments = [];
    const datapoints = Array.isArray(serverConfig.datapoints) ? serverConfig.datapoints : [];

    for (const definition of datapoints.filter(item => HOUSEHOLD_FEATURES.has(item.feature))) {
        assignments.push(
            toAssignment({
                definition,
                scope: HOUSEHOLD_SCOPE,
                scopeId: HOUSEHOLD_SCOPE,
                scopeName: 'Household',
                previous,
            }),
        );
    }

    const plantDefinitions = datapoints.filter(item => PLANT_FEATURES.has(item.feature));
    const plants = extractPlants(serverConfig.raw || serverConfig);
    for (const [index, plant] of plants.entries()) {
        const definitions = ensureBatteryControlDefinition(plant, definitionsForPlant(plant, plantDefinitions));
        for (const definition of definitions) {
            assignments.push(
                toAssignment({
                    definition,
                    scope: PLANT_SCOPE,
                    scopeId: plant.id,
                    scopeName: plant.name || `Plant ${index + 1}`,
                    plantIndex: index,
                    previous,
                }),
            );
        }
    }

    return assignments;
}

function definitionsForPlant(plant, fallbackDefinitions) {
    if (Array.isArray(plant.datapoints) && plant.datapoints.length > 0) {
        const byKey = new Map(fallbackDefinitions.map(item => [item.key, item]));
        return plant.datapoints
            .map(item => {
                if (typeof item === 'string') {
                    return (
                        byKey.get(item) || {
                            key: item,
                            label: item,
                            required: true,
                            read: true,
                            write: false,
                        }
                    );
                }
                if (item && typeof item === 'object') {
                    return { ...(byKey.get(item.key) || {}), ...item };
                }
                return null;
            })
            .filter(Boolean);
    }
    if (plant.features && typeof plant.features === 'object') {
        const enabled = new Set(
            Object.entries(plant.features)
                .filter(([, enabled]) => !!enabled)
                .map(([key]) => key),
        );
        return fallbackDefinitions.filter(item => !item.feature || enabled.has(item.feature));
    }
    return fallbackDefinitions;
}

function ensureBatteryControlDefinition(plant, definitions) {
    if (!plantHasBattery(plant, definitions) || definitions.some(item => item.key === BATTERY_CONTROL_DEFINITION.key)) {
        return definitions.map(item =>
            item.key === BATTERY_CONTROL_DEFINITION.key ? withBatteryControlMetadata(item, plant) : item,
        );
    }
    return [...definitions, withBatteryControlMetadata(BATTERY_CONTROL_DEFINITION, plant)];
}

function withBatteryControlMetadata(definition, plant) {
    return {
        ...definition,
        gridChargingAllowed: gridChargingAllowedFrom(plant),
    };
}

function plantHasBattery(plant, definitions) {
    if (plant?.features && typeof plant.features === 'object') {
        return (
            (plant.features.battery !== false && plant.features.battery != null) ||
            (plant.features.storageSystem !== false && plant.features.storageSystem != null)
        );
    }
    return definitions.some(item => ['battery', 'storageSystem'].includes(String(item.feature || '')));
}

function toAssignment({ definition, scope, scopeId, scopeName, plantIndex = -1, previous }) {
    const mappingKey = scope === HOUSEHOLD_SCOPE ? definition.key : `${scopeId}.${definition.key}`;
    const previousData = previous[mappingKey] || previous[definition.key] || {};
    return {
        scope,
        scopeId,
        scopeName,
        plantIndex,
        key: definition.key,
        mappingKey,
        label: definition.label || definition.key,
        description: normalizeDescription(definition.description),
        feature: definition.feature || '',
        featureLabel: definition.featureLabel || '',
        unit: definition.unit || '',
        fixedPowerType: Boolean(fixedPowerTypeForDefinition(definition)),
        required: definition.required === true,
        read: definition.read !== false,
        write: definition.write === true,
        gridChargingAllowed: Object.hasOwn(previousData, 'gridChargingAllowed')
            ? normalizeBoolean(previousData.gridChargingAllowed)
            : gridChargingAllowedFrom(definition),
        sourceUnit: definition.sourceUnit || previousData.sourceUnit || defaultSourceUnit(definition.unit),
        powerType: powerTypeForDefinition(definition, previousData.powerType),
        controlValues: controlValuesForDefinition(definition, previousData),
        stateId: Object.hasOwn(previousData, 'stateId')
            ? previousData.stateId
            : String(definition.stateId || '').trim(),
    };
}

function previousAssignmentData(existingAssignments = []) {
    const previous = {};
    if (Array.isArray(existingAssignments)) {
        for (const assignment of existingAssignments) {
            if (!assignment || typeof assignment !== 'object') {
                continue;
            }
            const stateId = String(assignment.stateId || '').trim();
            const mappingKey = String(assignment.mappingKey || assignment.key || '').trim();
            if (!mappingKey) {
                continue;
            }
            const data = {
                stateId,
                hasExplicitStateId: true,
                sourceUnit: normalizeSourceUnit(assignment.sourceUnit || assignment.valueUnit || assignment.inputUnit),
                powerType: normalizePowerType(
                    assignment.powerType || assignment.currentType || assignment.acDc || assignment.powerKind,
                ),
                controlValues: normalizeControlValues(assignment.controlValues),
            };
            if (Object.hasOwn(assignment, 'gridChargingAllowed')) {
                data.gridChargingAllowed = normalizeBoolean(assignment.gridChargingAllowed);
            }
            previous[mappingKey] = data;
        }
    }
    return previous;
}

function defaultSourceUnit(unit) {
    if (unit === 'Wh') {
        return 'Wh';
    }
    if (unit === 'W') {
        return 'W';
    }
    return '';
}

function normalizeSourceUnit(unit) {
    const value = String(unit || '')
        .trim()
        .toLowerCase();
    const normalized = {
        wh: 'Wh',
        kwh: 'kWh',
        w: 'W',
        kw: 'kW',
    };
    return normalized[value] || '';
}

function normalizePowerType(value) {
    const normalized = String(value || '')
        .trim()
        .toUpperCase();
    return normalized === 'AC' || normalized === 'DC' ? normalized : '';
}

function powerTypeForDefinition(definition, previousPowerType = '') {
    const fixedPowerType = fixedPowerTypeForDefinition(definition);
    if (fixedPowerType) {
        return fixedPowerType;
    }
    if (definition.unit !== 'W') {
        return '';
    }
    return (
        normalizePowerType(previousPowerType) ||
        normalizePowerType(definition.powerType) ||
        defaultEditablePowerType(definition)
    );
}

function defaultEditablePowerType(definition = {}) {
    const defaults = {
        batteryPower: 'DC',
        storageSystemBatteryPower: 'DC',
        storageSystemPvPower: 'DC',
    };
    return defaults[String(definition.key || '')] || 'AC';
}

function fixedPowerTypeForDefinition(definition = {}) {
    const key = String(definition.key || '');
    const fixedByKey = {
        consumptionWh: 'AC',
        gridExportMeterWh: 'AC',
        gridPower: 'AC',
        gridTotalPower: 'AC',
        pvDailyYield: 'DC',
        pvForecast: 'DC',
        energyMeterPower: 'AC',
        wallboxAmpere: 'AC',
        wallboxPower: 'AC',
        wallboxWh: 'AC',
    };
    return fixedByKey[key] || '';
}

function controlValuesForDefinition(definition = {}, previousData = {}) {
    const defaults = normalizeControlValues(definition.controlValues);
    const previous = normalizeControlValues(previousData.controlValues);
    const hasDefaults = Object.keys(defaults).length > 0;
    const hasPrevious = Object.keys(previous).length > 0;
    if (!hasDefaults && !hasPrevious) {
        return undefined;
    }
    return {
        ...defaults,
        ...previous,
    };
}

function normalizeControlValues(values = {}) {
    if (!values || typeof values !== 'object') {
        return {};
    }
    const result = {};
    for (const key of ['gridCharge', 'pv', 'hold']) {
        if (Object.hasOwn(values, key)) {
            result[key] = String(values[key] ?? '');
        }
    }
    return result;
}

function normalizeDescription(description) {
    return String(description || '')
        .replace(/\s+in\s+(Watt|Watts|Kilowatt|Kilowatts|Ampere|Amperes|Wh|kWh|W|kW|A)\b/gi, '')
        .replace(
            /\s*\(?\s*(?:z\.?\s*B\.?|beispiel(?:weise)?|e\.?\s*g\.?|for example)\s*[^.?!]*(?:W|kW|Wh|kWh|A)[^.)?!]*\)?/gi,
            '',
        )
        .replace(/[,;:]+\s*[.?!]?$/g, '')
        .replace(/[.?!]+\s*$/g, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
}

function extractPlants(rawConfig = {}) {
    const candidates = [
        rawConfig.plants,
        rawConfig.plantConfigs,
        rawConfig.plantConfig,
        rawConfig.installations,
        rawConfig.systems,
        rawConfig.anlagen,
        rawConfig.plantIds,
    ];
    const source = candidates.find(Array.isArray);
    if (!source) {
        const id = String(rawConfig.plantId || '').trim();
        return id ? [{ id, name: nameFrom(rawConfig) || 'Plant 1' }] : [];
    }
    return source.map((item, index) => normalizePlant(item, index)).filter(item => item.id);
}

function normalizePlant(item, index) {
    if (typeof item === 'string') {
        return {
            id: item,
            name: `Plant ${index + 1}`,
            features: null,
            datapoints: null,
        };
    }
    if (!item || typeof item !== 'object') {
        return { id: '', name: '', features: null, datapoints: null };
    }
    const id = String(item.id || item.plantId || item.uuid || item._id || item.key || '').trim();
    return {
        id,
        name: nameFrom(item) || `Plant ${index + 1}`,
        features: item.features && typeof item.features === 'object' ? item.features : null,
        datapoints: Array.isArray(item.datapoints) ? item.datapoints : null,
        gridChargingAllowed: gridChargingAllowedFrom(item),
    };
}

function gridChargingAllowedFrom(item = {}) {
    const sources = [item, item.config, item.settings, item.capabilities, item.battery, item.storageSystem];
    for (const source of sources) {
        if (!source || typeof source !== 'object') {
            continue;
        }
        for (const key of GRID_CHARGING_ALLOWED_KEYS) {
            if (Object.hasOwn(source, key)) {
                return normalizeBoolean(source[key]);
            }
        }
    }
    return true;
}

function normalizeBoolean(value) {
    if (value === true || value === false) {
        return value;
    }
    if (typeof value === 'number') {
        return value === 1;
    }
    const normalized = String(value || '')
        .trim()
        .toLowerCase();
    if (['true', '1', 'yes', 'ja', 'y', 'j', 'on'].includes(normalized)) {
        return true;
    }
    return false;
}

function nameFrom(item) {
    return String(
        item.name || item.label || item.title || item.displayName || item.plantName || item.anlageName || '',
    ).trim();
}

function assignmentDefinitions(serverConfig, assignments = []) {
    if (Array.isArray(assignments) && assignments.length > 0) {
        return assignments.map(assignment => ({
            key: assignment.key,
            mappingKey: assignment.mappingKey || assignment.key,
            label: assignment.scopeName
                ? `${assignment.scopeName}: ${assignment.label || assignment.key}`
                : assignment.label || assignment.key,
            description: normalizeDescription(assignment.description),
            scope: assignment.scope || HOUSEHOLD_SCOPE,
            scopeId: assignment.scopeId || '',
            scopeName: assignment.scopeName || '',
            plantIndex: Number.isInteger(assignment.plantIndex) ? assignment.plantIndex : -1,
            feature: assignment.feature || '',
            featureLabel: assignment.featureLabel || '',
            unit: assignment.unit || '',
            sourceUnit: assignment.sourceUnit || defaultSourceUnit(assignment.unit),
            powerType: fixedPowerTypeForDefinition(assignment) || normalizePowerType(assignment.powerType),
            fixedPowerType: Boolean(fixedPowerTypeForDefinition(assignment)),
            controlValues: normalizeControlValues(assignment.controlValues),
            gridChargingAllowed: Object.hasOwn(assignment, 'gridChargingAllowed')
                ? normalizeBoolean(assignment.gridChargingAllowed)
                : true,
            required: assignment.required === true,
            read: assignment.read !== false,
            write: assignment.write === true,
        }));
    }
    return Array.isArray(serverConfig?.datapoints) ? serverConfig.datapoints : [];
}

module.exports = {
    buildDatapointAssignments,
    assignmentDefinitions,
    extractPlants,
};
