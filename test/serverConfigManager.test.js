'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { normalizeServerConfig } = require('../lib/serverConfigManager');
const { buildDatapointAssignments } = require('../lib/datapointAssignments');
const DatapointManager = require('../lib/datapointManager');
const StateCollector = require('../lib/stateCollector');

test('normalizes a valid server config', () => {
    const result = normalizeServerConfig({
        success: true,
        version: 1,
        plantId: 'plant_abc123',
        configRevision: 7,
        features: {
            battery: true,
            gridMeter: true,
            unsupportedDevice: true,
        },
        requiredDatapoints: {
            batterySoc: {
                required: true,
                label: 'Battery SOC',
                read: true,
                write: false,
            },
        },
    });

    assert.equal(result.valid, true);
    assert.deepEqual(result.enabledFeatures, ['battery', 'gridMeter']);
    assert.deepEqual(result.unsupportedFeatures, ['unsupportedDevice']);
    assert.equal(result.requiredDatapoints.batterySoc.required, true);
    assert.equal(result.requiredDatapoints.gridPower.required, true);
    assert.equal(result.requiredDatapoints.gridPower.label, 'Grid meter value');
    assert.match(result.requiredDatapoints.gridPower.description, /instantaneous grid meter value/);
});

test('rejects invalid config versions', () => {
    const result = normalizeServerConfig({ success: true, version: 0 });
    assert.equal(result.valid, false);
    assert.match(result.errors[0], /version/i);
});

test('builds household first and plant assignments from server config', () => {
    const config = normalizeServerConfig({
        success: true,
        version: 1,
        plantId: 'plant_a',
        plantIds: ['plant_a', 'plant_b'],
        configRevision: 7,
        features: {
            battery: true,
            gridMeter: true,
            pvForecast: true,
        },
        requiredDatapoints: {
            consumptionWh: {
                required: false,
                label: 'Consumption',
                feature: 'gridMeter',
                read: true,
                write: false,
                stateId: 'meter.0.import',
            },
            gridExportMeterWh: {
                required: false,
                label: 'Feed-in',
                feature: 'gridMeter',
                read: true,
                write: false,
                stateId: 'meter.0.export',
            },
            gridPower: {
                required: true,
                label: 'Netzleistung',
                feature: 'gridMeter',
                read: true,
                write: false,
                stateId: 'smartmeter.0.serverPower',
            },
            wallboxWh: {
                required: false,
                label: 'Wallbox',
                feature: 'wallbox',
                read: true,
                write: false,
                stateId: 'wallbox.0.energy',
            },
            batterySoc: {
                required: true,
                label: 'SOC',
                read: true,
                write: false,
                stateId: 'battery.0.serverSoc',
            },
            pvPower: { required: false, label: 'PV', read: true, write: false },
        },
    });

    const assignments = buildDatapointAssignments(config, [
        { mappingKey: 'plant_a.batterySoc', stateId: 'battery.0.soc' },
    ]);

    assert.equal(assignments[0].scopeName, 'Household');
    assert.deepEqual(
        assignments.filter(item => item.scopeName === 'Household').map(item => item.key),
        ['gridPower', 'consumptionWh', 'gridExportMeterWh', 'wallboxWh'],
    );
    assert(
        assignments.some(
            item =>
                item.scopeName === 'Household' &&
                item.key === 'gridPower' &&
                item.stateId === 'smartmeter.0.serverPower' &&
                item.powerType === 'AC' &&
                item.fixedPowerType === true,
        ),
    );
    assert(
        assignments.some(
            item => item.scopeName === 'Household' && item.key === 'consumptionWh' && item.stateId === 'meter.0.import',
        ),
    );
    assert(
        assignments.some(
            item =>
                item.scopeName === 'Plant 1' &&
                item.mappingKey === 'plant_a.batterySoc' &&
                item.stateId === 'battery.0.soc',
        ),
    );
    assert(
        assignments.some(
            item =>
                item.scopeName === 'Plant 2' &&
                item.mappingKey === 'plant_b.batterySoc' &&
                item.stateId === 'battery.0.serverSoc',
        ),
    );
    assert(
        assignments.some(
            item =>
                item.scopeName === 'Plant 2' &&
                item.mappingKey === 'plant_b.pvPower' &&
                item.powerType === 'AC' &&
                item.fixedPowerType === false,
        ),
    );
    assert(
        assignments.some(
            item =>
                item.scopeName === 'Plant 1' &&
                item.mappingKey === 'plant_a.batteryControlMode' &&
                item.write === true &&
                item.controlValues['gridCharge'] === '1' &&
                item.controlValues['pv'] === '0' &&
                item.controlValues['hold'] === '2',
        ),
    );
});

test('fixed power types override previous user selections', () => {
    const config = normalizeServerConfig({
        success: true,
        version: 1,
        features: {
            gridMeter: true,
        },
        requiredDatapoints: {
            gridPower: {
                required: true,
                label: 'Netzleistung',
                feature: 'gridMeter',
                read: true,
                write: false,
                stateId: 'smartmeter.0.power',
            },
        },
    });

    const assignments = buildDatapointAssignments(config, [
        {
            mappingKey: 'gridPower',
            stateId: 'smartmeter.0.power',
            powerType: 'DC',
        },
    ]);

    const gridPower = assignments.find(item => item.key === 'gridPower');
    assert.equal(gridPower.powerType, 'AC');
    assert.equal(gridPower.fixedPowerType, true);
});

test('preserves selected source units when rebuilding assignments', () => {
    const config = normalizeServerConfig({
        success: true,
        version: 1,
        features: {
            gridMeter: true,
        },
        requiredDatapoints: {
            consumptionWh: {
                required: false,
                label: 'Consumption',
                feature: 'gridMeter',
                read: true,
                write: false,
                stateId: 'meter.0.import',
            },
            gridExportMeterWh: {
                required: false,
                label: 'Feed-in',
                feature: 'gridMeter',
                read: true,
                write: false,
                stateId: 'meter.0.export',
            },
        },
    });

    const assignments = buildDatapointAssignments(config, [
        {
            mappingKey: 'consumptionWh',
            stateId: 'meter.0.import.local',
            sourceUnit: 'kWh',
        },
    ]);

    const consumption = assignments.find(item => item.key === 'consumptionWh');
    const exportMeter = assignments.find(item => item.key === 'gridExportMeterWh');
    assert.equal(consumption.stateId, 'meter.0.import.local');
    assert.equal(consumption.sourceUnit, 'kWh');
    assert.equal(exportMeter.sourceUnit, 'Wh');
});

test('preserves intentionally cleared state paths when rebuilding assignments', () => {
    const config = normalizeServerConfig({
        success: true,
        version: 1,
        features: {
            gridMeter: true,
        },
        requiredDatapoints: {
            gridPower: {
                required: true,
                label: 'Netzleistung',
                feature: 'gridMeter',
                read: true,
                write: false,
                stateId: 'smartmeter.0.serverPower',
            },
        },
    });

    const assignments = buildDatapointAssignments(config, [
        {
            mappingKey: 'gridPower',
            stateId: '',
        },
    ]);

    const gridPower = assignments.find(item => item.key === 'gridPower');
    assert.equal(gridPower.stateId, '');
});

test('preserves battery control state and values when rebuilding assignments', () => {
    const config = normalizeServerConfig({
        success: true,
        version: 1,
        plantIds: ['plant_a'],
        features: {
            battery: true,
        },
    });
    const assignments = buildDatapointAssignments(config, [
        {
            mappingKey: 'plant_a.batteryControlMode',
            key: 'batteryControlMode',
            stateId: 'battery.0.mode',
            controlValues: {
                gridCharge: 'true',
                pv: 'false',
                hold: 'false',
            },
            gridChargingAllowed: true,
        },
    ]);
    const control = assignments.find(item => item.mappingKey === 'plant_a.batteryControlMode');
    assert.equal(control.stateId, 'battery.0.mode');
    assert.deepEqual(control.controlValues, {
        gridCharge: 'true',
        pv: 'false',
        hold: 'false',
    });
    assert.equal(control.gridChargingAllowed, true);
});

test('maps plant grid charging permission to battery control assignment', () => {
    const config = normalizeServerConfig({
        success: true,
        version: 1,
        features: {
            battery: true,
        },
        plants: [
            {
                id: 'plant_allowed',
                features: { battery: true },
                allowGridCharging: true,
            },
            {
                id: 'plant_denied',
                features: { battery: true },
                grid_charging_allowed: false,
            },
        ],
    });

    const assignments = buildDatapointAssignments(config, []);
    const allowed = assignments.find(item => item.mappingKey === 'plant_allowed.batteryControlMode');
    const denied = assignments.find(item => item.mappingKey === 'plant_denied.batteryControlMode');

    assert.equal(allowed.gridChargingAllowed, true);
    assert.equal(denied.gridChargingAllowed, false);
});

test('defaults battery grid charging permission to allowed', () => {
    const config = normalizeServerConfig({
        success: true,
        version: 1,
        features: {
            battery: true,
        },
        plants: [
            {
                id: 'plant_default',
                features: { battery: true },
            },
        ],
    });

    const assignments = buildDatapointAssignments(config, []);
    const control = assignments.find(item => item.mappingKey === 'plant_default.batteryControlMode');

    assert.equal(control.gridChargingAllowed, true);
});

test('preserves power type and removes unit examples from descriptions', () => {
    const config = normalizeServerConfig({
        success: true,
        version: 1,
        plantId: 'plant_a',
        features: {
            pvForecast: true,
        },
        requiredDatapoints: {
            pvPower: {
                required: true,
                label: 'PV power',
                description: 'Output power in watts, e.g. W is 3000.',
                read: true,
                write: false,
            },
        },
    });

    const assignments = buildDatapointAssignments(config, [
        {
            mappingKey: 'plant_a.pvPower',
            stateId: 'pv.0.power',
            powerType: 'dc',
        },
    ]);

    const pvPower = assignments.find(item => item.key === 'pvPower');
    assert.equal(pvPower.powerType, 'DC');
    assert.equal(pvPower.description, 'Current real PV power');
});

test('converts kWh source values to Wh payload values', async () => {
    const adapter = {
        config: {
            datapointAssignments: [
                {
                    scope: 'household',
                    scopeId: 'household',
                    mappingKey: 'consumptionWh',
                    key: 'consumptionWh',
                    label: 'Consumption',
                    unit: 'Wh',
                    sourceUnit: 'kWh',
                    read: true,
                    required: true,
                    stateId: 'meter.0.import',
                },
            ],
        },
        async getForeignStateAsync() {
            return { val: 7.79 };
        },
    };
    const collector = new StateCollector(adapter, new DatapointManager(adapter));

    const payload = await collector.collect({ valid: true, configRevision: 1 });

    assert.equal(payload.values.consumptionWh, 7790);
});

test('includes local grid charging permission in state payload', async () => {
    const adapter = {
        config: {
            datapointAssignments: [
                {
                    scope: 'plant',
                    scopeId: 'plant_a',
                    scopeName: 'Plant A',
                    mappingKey: 'plant_a.batteryControlMode',
                    key: 'batteryControlMode',
                    label: 'Battery control mode',
                    unit: '',
                    read: false,
                    required: false,
                    stateId: '',
                    gridChargingAllowed: true,
                },
            ],
        },
        async getForeignStateAsync() {
            return null;
        },
    };
    const collector = new StateCollector(adapter, new DatapointManager(adapter));

    const payload = await collector.collect({ valid: true, configRevision: 1 });

    assert.deepEqual(payload.plantSettings, [
        {
            installationId: 'plant_a',
            gridChargingAllowed: true,
            grid_charging_allowed: true,
        },
    ]);
    assert.equal(payload.plants.plant_a.gridChargingAllowed, true);
    assert.equal(payload.plants.plant_a.grid_charging_allowed, true);
});

test('converts lowercase unit source values to canonical payload values', async () => {
    const adapter = {
        config: {
            datapointAssignments: [
                {
                    scope: 'household',
                    scopeId: 'household',
                    mappingKey: 'consumptionWh',
                    key: 'consumptionWh',
                    label: 'Consumption',
                    unit: 'Wh',
                    sourceUnit: 'kwh',
                    read: true,
                    required: true,
                    stateId: 'meter.0.import',
                },
            ],
        },
        async getForeignStateAsync() {
            return { val: 7.79 };
        },
    };
    const collector = new StateCollector(adapter, new DatapointManager(adapter));

    const payload = await collector.collect({ valid: true, configRevision: 1 });

    assert.equal(payload.values.consumptionWh, 7790);
});

test('uses readable labels for missing plant values', async () => {
    const adapter = {
        config: {
            datapointAssignments: [
                {
                    scope: 'household',
                    scopeId: 'household',
                    mappingKey: 'gridPower',
                    key: 'gridPower',
                    label: 'Grid meter value',
                    unit: 'W',
                    read: true,
                    required: true,
                    stateId: '',
                },
                {
                    scope: 'plant',
                    scopeId: '6da81ee3-2e91-4780-b853-5093fbb9b6f1',
                    scopeName: 'ok',
                    mappingKey: '6da81ee3-2e91-4780-b853-5093fbb9b6f1.batteryPower',
                    key: 'batteryPower',
                    label: 'CCU aktive Ausgangsleistung',
                    unit: 'W',
                    read: true,
                    required: true,
                    stateId: '',
                },
            ],
        },
        async getForeignStateAsync() {
            return null;
        },
    };
    const collector = new StateCollector(adapter, new DatapointManager(adapter));

    const payload = await collector.collect({ valid: true, configRevision: 1 });

    assert.deepEqual(payload.missing, ['gridPower', '6da81ee3-2e91-4780-b853-5093fbb9b6f1.batteryPower']);
    assert.deepEqual(payload.missingLabels, ['gridPower', 'ok: batteryPower']);
});

test('accepts states marked unreadable when state values are still available', async () => {
    const adapter = {
        config: {
            datapointAssignments: [
                {
                    scope: 'household',
                    scopeId: 'household',
                    mappingKey: 'consumptionWh',
                    key: 'consumptionWh',
                    label: 'Consumption',
                    unit: 'Wh',
                    read: true,
                    required: false,
                    stateId: 'powerfox.0.import',
                },
            ],
        },
        async getForeignObjectAsync() {
            return { type: 'state', common: { read: false, write: false } };
        },
        async getForeignStateAsync() {
            return { val: 123.45 };
        },
    };
    const manager = new DatapointManager(adapter);

    const result = await manager.validate({ valid: true, configRevision: 1 });

    assert.equal(result.valid, true);
    assert.deepEqual(result.errors, []);
});

test('warns instead of failing for optional configured states without readable values', async () => {
    const adapter = {
        config: {
            datapointAssignments: [
                {
                    scope: 'household',
                    scopeId: 'household',
                    mappingKey: 'gridExportMeterWh',
                    key: 'gridExportMeterWh',
                    label: 'Feed-in',
                    unit: 'Wh',
                    read: true,
                    required: false,
                    stateId: 'powerfox.0.export',
                },
            ],
        },
        async getForeignObjectAsync() {
            return { type: 'state', common: { read: false, write: false } };
        },
        async getForeignStateAsync() {
            return null;
        },
    };
    const manager = new DatapointManager(adapter);

    const result = await manager.validate({ valid: true, configRevision: 1 });

    assert.equal(result.valid, true);
    assert.deepEqual(result.errors, []);
    assert.equal(result.warnings.length, 1);
});
