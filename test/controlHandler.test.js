"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const ControlHandler = require("../lib/controlHandler");

test("rejects grid charge command when local grid charging permission is disabled", async () => {
  const adapter = fakeAdapter();
  const handler = new ControlHandler(
    adapter,
    fakeDatapointManager({
      gridChargingAllowed: false,
      controlValues: { gridCharge: "1", pv: "0", hold: "2" },
    }),
    null,
  );

  const result = await handler.handleCommand(
    {},
    {
      commandId: "cmd-1",
      target: "plant_a.batteryControlMode",
      value: "1",
    },
  );

  assert.equal(result.ok, false);
  assert.equal(result.code, "grid_charging_disabled");
  assert.equal(adapter.writes.length, 0);
});

test("rejects explicit grid charge action when local grid charging permission is disabled", async () => {
  const adapter = fakeAdapter();
  const handler = new ControlHandler(
    adapter,
    fakeDatapointManager({
      gridChargingAllowed: false,
      controlValues: { gridCharge: "charge", pv: "pv", hold: "hold" },
    }),
    null,
  );

  const result = await handler.handleCommand(
    {},
    {
      action: "grid_charge",
      commandId: "cmd-2",
      target: "batteryControlMode",
      value: "charge",
    },
  );

  assert.equal(result.ok, false);
  assert.equal(result.code, "grid_charging_disabled");
  assert.equal(adapter.writes.length, 0);
});

test("accepts grid charge command when local grid charging permission is enabled", async () => {
  const adapter = fakeAdapter();
  const handler = new ControlHandler(
    adapter,
    fakeDatapointManager({
      gridChargingAllowed: true,
      controlValues: { gridCharge: "1", pv: "0", hold: "2" },
    }),
    null,
  );

  const result = await handler.handleCommand(
    {},
    {
      commandId: "cmd-3",
      target: "plant_a.batteryControlMode",
      value: "1",
    },
  );

  assert.equal(result.ok, true);
  assert.equal(result.code, "written");
  assert.deepEqual(adapter.writes, [
    ["battery.0.mode", { val: "1", ack: false }],
  ]);
});

test("accepts grid charge command by default when local permission is unset", async () => {
  const adapter = fakeAdapter();
  const handler = new ControlHandler(
    adapter,
    fakeDatapointManager({
      controlValues: { gridCharge: "1", pv: "0", hold: "2" },
    }),
    null,
  );

  const result = await handler.handleCommand(
    {},
    {
      commandId: "cmd-4",
      target: "plant_a.batteryControlMode",
      value: "1",
    },
  );

  assert.equal(result.ok, true);
  assert.equal(result.code, "written");
  assert.deepEqual(adapter.writes, [
    ["battery.0.mode", { val: "1", ack: false }],
  ]);
});

function fakeDatapointManager(definitionPatch = {}) {
  const definition = {
    key: "batteryControlMode",
    mappingKey: "plant_a.batteryControlMode",
    scope: "plant",
    scopeId: "plant_a",
    scopeName: "Plant A",
    write: true,
    ...definitionPatch,
  };
  return {
    stateIdFor() {
      return "battery.0.mode";
    },
    writableDefinitionForTarget(_serverConfig, target) {
      return target === "batteryControlMode" ||
        target === "plant_a.batteryControlMode"
        ? definition
        : null;
    },
  };
}

function fakeAdapter() {
  return {
    writes: [],
    async getForeignObjectAsync() {
      return { type: "state", common: { type: "string", write: true } };
    },
    async getForeignStateAsync() {
      return { val: "0" };
    },
    async setForeignStateAsync(stateId, state) {
      this.writes.push([stateId, state]);
    },
    async setStateAsync() {},
  };
}
