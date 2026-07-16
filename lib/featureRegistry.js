'use strict';

const DATAPOINTS = {
    batterySoc: {
        label: 'Battery SOC',
        description: 'Current battery state of charge in percent',
        role: 'value.battery',
        unit: '%',
        read: true,
        write: false,
        required: true,
    },
    batteryPower: {
        label: 'Battery charge/discharge power',
        description:
            'Current battery charge or discharge power. Select the sign convention used by the source datapoint.',
        role: 'value.power',
        unit: 'W',
        powerType: 'DC',
        read: true,
        write: false,
        required: true,
    },
    batteryMode: {
        label: 'Battery mode',
        description: 'Optional storage mode datapoint',
        role: 'level',
        read: true,
        write: true,
        required: false,
    },
    batteryControlMode: {
        label: 'Battery control mode',
        description:
            'Writable datapoint used by the local 6-hour plan to switch the battery between grid charging, PV operation and hold.',
        role: 'level',
        read: true,
        write: true,
        required: false,
        controlValues: {
            gridCharge: '1',
            pv: '0',
            hold: '2',
        },
    },
    batteryReserveSoc: {
        label: 'Battery minimum SOC / reserve',
        description: 'Optional writable reserve or minimum SOC datapoint',
        role: 'level.battery',
        unit: '%',
        read: true,
        write: true,
        required: false,
    },
    consumptionWh: {
        label: 'Consumption',
        description: 'Optional energy meter for grid import',
        role: 'value.energy',
        unit: 'Wh',
        powerType: 'AC',
        fixedPowerType: true,
        read: true,
        write: false,
        required: false,
    },
    gridExportMeterWh: {
        label: 'Feed-in',
        description: 'Optional energy meter for grid export',
        role: 'value.energy',
        unit: 'Wh',
        powerType: 'AC',
        fixedPowerType: true,
        read: true,
        write: false,
        required: false,
    },
    gridPower: {
        label: 'Grid meter value',
        description:
            'Current instantaneous grid meter value in watts. Use the current power at the grid connection point, typically positive for grid import and negative for grid export.',
        role: 'value.power',
        unit: 'W',
        powerType: 'AC',
        fixedPowerType: true,
        read: true,
        write: false,
        required: true,
    },
    gridTotalPower: {
        label: 'Grid total power',
        description: 'Optional total grid power datapoint',
        role: 'value.power',
        unit: 'W',
        powerType: 'AC',
        fixedPowerType: true,
        read: true,
        write: false,
        required: false,
    },
    wallboxWh: {
        label: 'Wallbox',
        description: 'Optional datapoint for charged EV energy',
        role: 'value.energy',
        unit: 'Wh',
        powerType: 'AC',
        fixedPowerType: true,
        read: true,
        write: false,
        required: false,
    },
    wallboxPower: {
        label: 'Wallbox power',
        description: 'Current wallbox charging power',
        role: 'value.power',
        unit: 'W',
        powerType: 'AC',
        fixedPowerType: true,
        read: true,
        write: false,
        required: true,
    },
    wallboxCarState: {
        label: 'Wallbox car state',
        description: 'State indicating whether a vehicle is connected or charging',
        role: 'value',
        read: true,
        write: false,
        required: true,
    },
    wallboxAmpere: {
        label: 'Wallbox current',
        description: 'Writable wallbox charging current',
        role: 'level.current',
        unit: 'A',
        powerType: 'AC',
        fixedPowerType: true,
        read: true,
        write: true,
        required: true,
    },
    allowCharging: {
        label: 'Charging permission',
        description: 'Optional datapoint for charging permission',
        role: 'switch',
        read: true,
        write: true,
        required: false,
    },
    wallboxUser: {
        label: 'Wallbox user / RFID',
        description: 'Optional user or RFID datapoint',
        role: 'value',
        read: true,
        write: false,
        required: false,
    },
    pvForecast: {
        label: 'PV forecast',
        description: 'Forecast value of the PV system from the selected datapoint',
        role: 'value.power',
        unit: 'W',
        powerType: 'DC',
        fixedPowerType: true,
        read: true,
        write: false,
        required: false,
    },
    pvPower: {
        label: 'Real PV power',
        description: 'Current real PV power',
        role: 'value.power',
        unit: 'W',
        powerType: 'AC',
        read: true,
        write: false,
        required: false,
    },
    pvDailyYield: {
        label: 'PV daily yield',
        description: 'Optional daily yield of the PV system',
        role: 'value.energy',
        unit: 'Wh',
        powerType: 'DC',
        fixedPowerType: true,
        read: true,
        write: false,
        required: false,
    },
    storageSystemSoc: {
        label: 'Storage SOC',
        description: 'Current storage state of charge',
        role: 'value.battery',
        unit: '%',
        read: true,
        write: false,
        required: false,
    },
    storageSystemBatteryPower: {
        label: 'Storage power',
        description: 'Current power direction of the storage system',
        role: 'value.power',
        unit: 'W',
        read: true,
        write: false,
        required: false,
    },
    storageSystemPvPower: {
        label: 'PV power',
        description: 'Current PV power from the storage system',
        role: 'value.power',
        unit: 'W',
        read: true,
        write: false,
        required: false,
    },
    storageSystemMode: {
        label: 'Storage operating mode',
        description: 'Optional writable operating mode',
        role: 'level',
        read: true,
        write: true,
        required: false,
    },
    energyMeterPower: {
        label: 'Meter consumption',
        description: 'Current consumption power from the energy meter',
        role: 'value.power',
        unit: 'W',
        powerType: 'AC',
        fixedPowerType: true,
        read: true,
        write: false,
        required: false,
    },
    energyMeterReading: {
        label: 'Meter reading',
        description: 'Meter reading or energy datapoint from the energy meter',
        role: 'value.energy',
        unit: 'Wh',
        read: true,
        write: false,
        required: false,
    },
};

const FEATURES = {
    battery: {
        label: 'Battery storage',
        datapoints: ['batterySoc', 'batteryPower'],
    },
    gridMeter: {
        label: 'Grid meter',
        datapoints: ['gridPower'],
    },
    wallbox: {
        label: 'Wallbox',
        datapoints: ['wallboxPower', 'wallboxCarState', 'wallboxAmpere', 'allowCharging', 'wallboxUser'],
    },
    pvForecast: {
        label: 'PV forecast',
        datapoints: ['pvPower'],
    },
    storageSystem: {
        label: 'Storage system',
        datapoints: [],
    },
    energyMeter: {
        label: 'Energy meter',
        datapoints: ['energyMeterPower', 'energyMeterReading'],
    },
};

const LOCAL_PRESENTATION_OVERRIDES = new Set(Object.keys(DATAPOINTS));

function featureLabels(featureKeys) {
    return featureKeys.map(key => FEATURES[key]?.label || key);
}

function datapointDefinition(key) {
    return DATAPOINTS[key] ? { ...DATAPOINTS[key] } : null;
}

function datapointsForFeatures(featureKeys, serverRequiredDatapoints = {}) {
    const keys = new Set();
    const featureByDatapoint = {};
    for (const featureKey of featureKeys) {
        for (const key of FEATURES[featureKey]?.datapoints || []) {
            keys.add(key);
            if (!featureByDatapoint[key]) {
                featureByDatapoint[key] = featureKey;
            }
        }
    }
    for (const key of Object.keys(serverRequiredDatapoints || {})) {
        keys.add(key);
    }
    return [...keys].map(key => {
        const serverDefinition = serverRequiredDatapoints?.[key] || {};
        const localDefinition = DATAPOINTS[key] || {};
        const preferLocalPresentation = LOCAL_PRESENTATION_OVERRIDES.has(key);
        return {
            key,
            ...localDefinition,
            ...serverDefinition,
            label: preferLocalPresentation
                ? localDefinition.label || serverDefinition.label || key
                : serverDefinition.label || localDefinition.label || key,
            description: preferLocalPresentation
                ? localDefinition.description || serverDefinition.description || ''
                : serverDefinition.description || localDefinition.description || '',
            feature: serverDefinition.feature || featureByDatapoint[key] || '',
            featureLabel:
                serverDefinition.featureLabel ||
                FEATURES[serverDefinition.feature || featureByDatapoint[key]]?.label ||
                '',
            read: serverDefinition.read !== undefined ? !!serverDefinition.read : localDefinition.read !== false,
            write: serverDefinition.write !== undefined ? !!serverDefinition.write : localDefinition.write === true,
            required:
                serverDefinition.required !== undefined
                    ? !!serverDefinition.required
                    : localDefinition.required === true,
        };
    });
}

module.exports = {
    FEATURES,
    DATAPOINTS,
    featureLabels,
    datapointDefinition,
    datapointsForFeatures,
};
