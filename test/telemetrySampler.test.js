'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { TelemetrySampler } = require('../lib/telemetrySampler');

test('integrates battery power from subscribed state changes', async () => {
    let now = 0;
    const states = new Map([['battery.0.power', { val: 100, ts: 0 }]]);
    const adapter = fakeAdapter({
        states,
        datapointAssignments: [
            powerAssignment({
                scopeId: 'plant_a',
                mappingKey: 'plant_a.batteryPower',
                key: 'batteryPower',
                stateId: 'battery.0.power',
            }),
        ],
    });
    const sampler = new TelemetrySampler(adapter, null, {
        now: () => now,
        sendIntervalMs: 60000,
    });
    const serverConfig = validServerConfig();

    await sampler.configure(serverConfig);
    now = 30000;
    sampler.handleStateChange('battery.0.power', { val: -50, ts: now, ack: true });
    now = 60000;
    const collected = await sampler.collect(serverConfig);

    assert.deepEqual(adapter.subscribed, ['battery.0.power']);
    assert.equal(collected.payloads.length, 1);
    const payload = collected.payloads[0];
    assert.equal(payload.battery_power_w, -50);
    assertApproximately(payload.battery_output_wh_total, 0.833333);
    assertApproximately(payload.battery_household_energy_wh_total, 0.791667);
    assertApproximately(payload.battery_input_wh_total, 0.416667);
});

test('ignores unacknowledged subscribed state changes', async () => {
    let now = 0;
    const states = new Map([['battery.0.power', { val: 100, ts: 0 }]]);
    const adapter = fakeAdapter({
        states,
        datapointAssignments: [
            powerAssignment({
                scopeId: 'plant_a',
                mappingKey: 'plant_a.batteryPower',
                key: 'batteryPower',
                stateId: 'battery.0.power',
            }),
        ],
    });
    const sampler = new TelemetrySampler(adapter, null, {
        now: () => now,
        sendIntervalMs: 60000,
    });
    const serverConfig = validServerConfig();

    await sampler.configure(serverConfig);
    now = 30000;
    sampler.handleStateChange('battery.0.power', { val: -50, ts: now, ack: false });
    now = 60000;
    const collected = await sampler.collect(serverConfig);

    assert.equal(collected.payloads.length, 1);
    assert.equal(collected.payloads[0].battery_power_w, 100);
    assertApproximately(collected.payloads[0].battery_output_wh_total, 1.666667);
});

test('includes local grid charging permission in telemetry payload', async () => {
    let now = 0;
    const states = new Map([['battery.0.power', { val: 100, ts: 0 }]]);
    const adapter = fakeAdapter({
        states,
        datapointAssignments: [
            powerAssignment({
                scopeId: 'plant_a',
                mappingKey: 'plant_a.batteryPower',
                key: 'batteryPower',
                stateId: 'battery.0.power',
            }),
            {
                scope: 'plant',
                scopeId: 'plant_a',
                mappingKey: 'plant_a.batteryControlMode',
                key: 'batteryControlMode',
                read: false,
                required: false,
                stateId: '',
                gridChargingAllowed: true,
            },
        ],
    });
    const sampler = new TelemetrySampler(adapter, null, {
        now: () => now,
        sendIntervalMs: 60000,
    });
    const serverConfig = validServerConfig();

    await sampler.configure(serverConfig);
    now = 60000;
    const collected = await sampler.collect(serverConfig);

    assert.equal(collected.payloads.length, 1);
    assert.equal(collected.payloads[0].gridChargingAllowed, true);
    assert.equal(collected.payloads[0].grid_charging_allowed, true);
});

test('classifies battery charging as grid charging only with concurrent grid import', async () => {
    let now = 0;
    const states = new Map([
        ['battery.0.power', { val: -1200, ts: 0 }],
        ['smartmeter.0.power', { val: 800, ts: 0 }],
    ]);
    const adapter = fakeAdapter({
        states,
        datapointAssignments: [
            powerAssignment({
                scopeId: 'plant_a',
                mappingKey: 'plant_a.batteryPower',
                key: 'batteryPower',
                stateId: 'battery.0.power',
            }),
            powerAssignment({
                scope: 'household',
                scopeId: 'household',
                mappingKey: 'gridPower',
                key: 'gridPower',
                stateId: 'smartmeter.0.power',
            }),
        ],
    });
    const sampler = new TelemetrySampler(adapter, null, {
        now: () => now,
        sendIntervalMs: 60000,
    });
    const serverConfig = validServerConfig();

    await sampler.configure(serverConfig);
    now = 60000;
    const collected = await sampler.collect(serverConfig);

    assert.equal(collected.payloads.length, 1);
    const payload = collected.payloads[0];
    assertApproximately(payload.battery_input_wh_total, 20);
    assertApproximately(payload.battery_grid_charge_wh_total, 20);
    assertApproximately(payload.battery_surplus_charge_wh_total, 0);
});

test('does not infer battery grid charging from interval grid import alone', async () => {
    let now = 0;
    const states = new Map([
        ['battery.0.power', { val: -1200, ts: 0 }],
        ['meter.import.kwh', { val: 10, ts: 0 }],
    ]);
    const adapter = fakeAdapter({
        states,
        datapointAssignments: [
            powerAssignment({
                scopeId: 'plant_a',
                mappingKey: 'plant_a.batteryPower',
                key: 'batteryPower',
                stateId: 'battery.0.power',
            }),
            energyAssignment({
                scope: 'household',
                scopeId: 'household',
                mappingKey: 'consumptionWh',
                key: 'consumptionWh',
                stateId: 'meter.import.kwh',
                sourceUnit: 'kWh',
            }),
        ],
    });
    const sampler = new TelemetrySampler(adapter, null, {
        now: () => now,
        sendIntervalMs: 60000,
    });
    const serverConfig = validServerConfig();

    await sampler.configure(serverConfig);
    await sampler.collect(serverConfig);
    states.set('meter.import.kwh', { val: 10.01, ts: 60000 });
    now = 60000;
    const collected = await sampler.collect(serverConfig);

    assert.equal(collected.payloads.length, 1);
    const payload = collected.payloads[0];
    assertApproximately(payload.grid_import_wh, 10);
    assertApproximately(payload.battery_input_wh_total, 20);
    assert.equal(payload.battery_grid_charge_wh_total, undefined);
    assert.equal(payload.battery_surplus_charge_wh_total, undefined);
    assertApproximately(payload.consumption_wh, 10010);
});

test('converts lowercase kwh energy meter units to Wh deltas', async () => {
    let now = 0;
    const states = new Map([['meter.import.kwh', { val: 10, ts: 0 }]]);
    const adapter = fakeAdapter({
        states,
        datapointAssignments: [
            energyAssignment({
                scope: 'household',
                scopeId: 'household',
                mappingKey: 'consumptionWh',
                key: 'consumptionWh',
                stateId: 'meter.import.kwh',
                sourceUnit: 'kwh',
            }),
        ],
    });
    const sampler = new TelemetrySampler(adapter, null, {
        now: () => now,
        sendIntervalMs: 60000,
    });
    const serverConfig = validServerConfig();

    await sampler.collect(serverConfig);
    states.set('meter.import.kwh', { val: 10.001, ts: 60000 });
    now = 60000;
    const collected = await sampler.collect(serverConfig);

    assert.equal(collected.payloads.length, 1);
    assertApproximately(collected.payloads[0].grid_import_wh, 1);
    assertApproximately(collected.payloads[0].consumption_wh, 10001);
});

test('converts lowercase kw power units to watts before integration', async () => {
    let now = 0;
    const states = new Map([['smartmeter.0.power', { val: 0.6, ts: 0 }]]);
    const adapter = fakeAdapter({
        states,
        datapointAssignments: [
            powerAssignment({
                scope: 'household',
                scopeId: 'household',
                mappingKey: 'gridPower',
                key: 'gridPower',
                stateId: 'smartmeter.0.power',
                sourceUnit: 'kw',
            }),
        ],
    });
    const sampler = new TelemetrySampler(adapter, null, {
        now: () => now,
        sendIntervalMs: 60000,
    });
    const serverConfig = validServerConfig();

    await sampler.configure(serverConfig);
    now = 60000;
    const collected = await sampler.collect(serverConfig);

    assert.equal(collected.payloads.length, 1);
    assertApproximately(collected.payloads[0].grid_import_wh, 10);
});

test('uses subscribed grid power as import and export fallback', async () => {
    let now = 0;
    const states = new Map([['smartmeter.0.power', { val: 600, ts: 0 }]]);
    const adapter = fakeAdapter({
        states,
        datapointAssignments: [
            powerAssignment({
                scope: 'household',
                scopeId: 'household',
                mappingKey: 'gridPower',
                key: 'gridPower',
                stateId: 'smartmeter.0.power',
            }),
        ],
    });
    const sampler = new TelemetrySampler(adapter, null, {
        now: () => now,
        sendIntervalMs: 60000,
    });
    const serverConfig = validServerConfig();

    await sampler.configure(serverConfig);
    now = 30000;
    sampler.handleStateChange('smartmeter.0.power', { val: -300, ts: now, ack: true });
    now = 60000;
    const collected = await sampler.collect(serverConfig);

    assert.deepEqual(adapter.subscribed, ['smartmeter.0.power']);
    assert.equal(collected.payloads.length, 1);
    const payload = collected.payloads[0];
    assertApproximately(payload.grid_import_wh, 5);
    assertApproximately(payload.grid_export_wh, 2.5);
    assertApproximately(payload.grid_power_import_wh, 5);
    assertApproximately(payload.grid_power_export_wh, 2.5);
    assert.equal(payload.grid_power_samples, 2);
});

test('estimates household load from inverter output minus grid export', async () => {
    let now = 0;
    const states = new Map([
        ['smartmeter.0.power', { val: -40, ts: 0 }],
        ['pv.0.power', { val: 220, ts: 0 }],
    ]);
    const adapter = fakeAdapter({
        states,
        datapointAssignments: [
            powerAssignment({
                scope: 'household',
                scopeId: 'household',
                mappingKey: 'gridPower',
                key: 'gridPower',
                stateId: 'smartmeter.0.power',
            }),
            powerAssignment({
                scopeId: 'plant_a',
                mappingKey: 'plant_a.pvPower',
                key: 'pvPower',
                stateId: 'pv.0.power',
                powerType: 'AC',
            }),
        ],
    });
    const sampler = new TelemetrySampler(adapter, null, {
        now: () => now,
        sendIntervalMs: 60000,
    });
    const serverConfig = validServerConfig();

    await sampler.configure(serverConfig);
    now = 60000;
    const collected = await sampler.collect(serverConfig);

    assert.equal(collected.payloads.length, 1);
    const payload = collected.payloads[0];
    assertApproximately(payload.grid_export_wh, 0.666666);
    assertApproximately(payload.pv_household_energy_wh_total, 3.666666);
    assertApproximately(payload.estimated_household_consumption_wh, 3);
});

test('applies inverter efficiency to DC PV power before household balance', async () => {
    let now = 0;
    const states = new Map([
        ['smartmeter.0.power', { val: -40, ts: 0 }],
        ['pv.0.power', { val: 220, ts: 0 }],
    ]);
    const adapter = fakeAdapter({
        states,
        datapointAssignments: [
            powerAssignment({
                scope: 'household',
                scopeId: 'household',
                mappingKey: 'gridPower',
                key: 'gridPower',
                stateId: 'smartmeter.0.power',
            }),
            powerAssignment({
                scopeId: 'plant_a',
                mappingKey: 'plant_a.pvPower',
                key: 'pvPower',
                stateId: 'pv.0.power',
                powerType: 'DC',
            }),
        ],
    });
    const sampler = new TelemetrySampler(adapter, null, {
        now: () => now,
        sendIntervalMs: 60000,
        inverterEfficiency: 0.95,
    });
    const serverConfig = validServerConfig();

    await sampler.configure(serverConfig);
    now = 60000;
    const collected = await sampler.collect(serverConfig);

    assert.equal(collected.payloads.length, 1);
    const payload = collected.payloads[0];
    assertApproximately(payload.pv_household_energy_wh_total, 3.483333);
    assertApproximately(payload.estimated_household_consumption_wh, 2.816666);
});

test('uses grid power fallback until readable grid meters sent plausible telemetry', async () => {
    let now = 0;
    const states = new Map([
        ['meter.import.kwh', { val: 100, ts: 0 }],
        ['meter.export.kwh', { val: 50, ts: 0 }],
        ['smartmeter.0.power', { val: -600, ts: 0 }],
    ]);
    const adapter = fakeAdapter({
        states,
        datapointAssignments: [
            energyAssignment({
                scope: 'household',
                scopeId: 'household',
                mappingKey: 'consumptionWh',
                key: 'consumptionWh',
                stateId: 'meter.import.kwh',
                sourceUnit: 'kWh',
            }),
            energyAssignment({
                scope: 'household',
                scopeId: 'household',
                mappingKey: 'gridExportMeterWh',
                key: 'gridExportMeterWh',
                stateId: 'meter.export.kwh',
                sourceUnit: 'kWh',
            }),
            powerAssignment({
                scope: 'household',
                scopeId: 'household',
                mappingKey: 'gridPower',
                key: 'gridPower',
                stateId: 'smartmeter.0.power',
            }),
        ],
    });
    const sampler = new TelemetrySampler(adapter, null, {
        now: () => now,
        sendIntervalMs: 60000,
    });
    const serverConfig = validServerConfig();

    await sampler.configure(serverConfig);
    now = 60000;
    let collected = await sampler.collect(serverConfig);

    assert.equal(collected.payloads.length, 1);
    assertApproximately(collected.payloads[0].consumption_wh, 100000);
    assertApproximately(collected.payloads[0].grid_export_meter_wh, 50000);
    assertApproximately(collected.payloads[0].grid_import_wh, 0);
    assertApproximately(collected.payloads[0].grid_export_wh, 10);

    states.set('meter.import.kwh', { val: 100.001, ts: 90000 });
    states.set('meter.export.kwh', { val: 50, ts: 90000 });
    now = 120000;
    collected = await sampler.collect(serverConfig);

    assert.equal(collected.payloads.length, 1);
    assertApproximately(collected.payloads[0].consumption_wh, 100001);
    assertApproximately(collected.payloads[0].grid_export_meter_wh, 50000);
    assertApproximately(collected.payloads[0].grid_import_wh, 1);
    assertApproximately(collected.payloads[0].grid_export_wh, 0);
    assertApproximately(collected.payloads[0].grid_power_export_wh, 10);
});

test('rejects implausible explicit kWh meter deltas', async () => {
    let now = 0;
    const states = new Map([['meter.import.kwh', { val: 5925.311, ts: 0 }]]);
    const adapter = fakeAdapter({
        states,
        datapointAssignments: [
            energyAssignment({
                scope: 'household',
                scopeId: 'household',
                mappingKey: 'consumptionWh',
                key: 'consumptionWh',
                stateId: 'meter.import.kwh',
                sourceUnit: 'kWh',
            }),
        ],
    });
    const sampler = new TelemetrySampler(adapter, null, {
        now: () => now,
        sendIntervalMs: 60000,
    });
    const serverConfig = validServerConfig();

    await sampler.collect(serverConfig);
    states.set('meter.import.kwh', { val: 5929.616, ts: 60000 });
    now = 60000;
    const collected = await sampler.collect(serverConfig);

    assert.equal(collected.payloads.length, 1);
    assertApproximately(collected.payloads[0].consumption_wh, 5929616);
    assert.equal(collected.payloads[0].grid_import_wh, undefined);
});

test('rejects implausible grid power fallback values', async () => {
    let now = 0;
    const states = new Map([['smartmeter.0.power', { val: -38000, ts: 0 }]]);
    const adapter = fakeAdapter({
        states,
        datapointAssignments: [
            powerAssignment({
                scope: 'household',
                scopeId: 'household',
                mappingKey: 'gridPower',
                key: 'gridPower',
                stateId: 'smartmeter.0.power',
            }),
        ],
    });
    const sampler = new TelemetrySampler(adapter, null, {
        now: () => now,
        sendIntervalMs: 60000,
    });
    const serverConfig = validServerConfig();

    await sampler.configure(serverConfig);
    now = 60000;
    const collected = await sampler.collect(serverConfig);

    assert.equal(collected.payloads.length, 0);
});

function fakeAdapter({ states, datapointAssignments }) {
    return {
        config: { datapointAssignments },
        subscribed: [],
        unsubscribed: [],
        log: {
            debug() {},
            info() {},
        },
        async getForeignStateAsync(stateId) {
            return states.get(stateId) || null;
        },
        async subscribeForeignStatesAsync(stateId) {
            this.subscribed.push(stateId);
        },
        async unsubscribeForeignStatesAsync(stateId) {
            this.unsubscribed.push(stateId);
        },
    };
}

function validServerConfig() {
    return {
        valid: true,
        raw: {
            plants: [{ id: 'plant_a', name: 'Plant A' }],
        },
    };
}

function powerAssignment({ scope = 'plant', scopeId, mappingKey, key, stateId, sourceUnit = 'W', powerType = 'DC' }) {
    return {
        scope,
        scopeId,
        mappingKey,
        key,
        label: key,
        unit: 'W',
        sourceUnit,
        powerType,
        read: true,
        required: true,
        stateId,
    };
}

function energyAssignment({ scope = 'plant', scopeId, mappingKey, key, stateId, sourceUnit = 'Wh' }) {
    return {
        scope,
        scopeId,
        mappingKey,
        key,
        label: key,
        unit: 'Wh',
        sourceUnit,
        read: true,
        required: false,
        stateId,
    };
}

function assertApproximately(actual, expected) {
    assert.equal(typeof actual, 'number');
    assert(Math.abs(actual - expected) < 0.00001, `${actual} ~= ${expected}`);
}
