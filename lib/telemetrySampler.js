"use strict";

const TELEMETRY_VERSION = "adapter-telemetry-2026-05-09";
const DEFAULT_SEND_INTERVAL_MS = 60000;
const DEFAULT_MAX_PLAUSIBLE_METER_POWER_W = 20000;
const DEFAULT_MAX_PLAUSIBLE_GRID_POWER_W = 20000;
const DEFAULT_INVERTER_EFFICIENCY = 0.95;
const MAX_POWER_TRACKER_STALE_MS = 5 * DEFAULT_SEND_INTERVAL_MS;
const BATTERY_POWER_KEYS = ["batteryPower", "storageSystemBatteryPower"];
const PV_POWER_KEYS = ["pvPower", "pvForecast", "storageSystemPvPower"];

class TelemetrySampler {
  constructor(adapter, datapointManager, options = {}) {
    this.adapter = adapter;
    this.datapointManager = datapointManager;
    this.sendIntervalMs = Number(
      options.sendIntervalMs || DEFAULT_SEND_INTERVAL_MS,
    );
    this.maxPlausibleMeterPowerW = Number(
      options.maxPlausibleMeterPowerW || DEFAULT_MAX_PLAUSIBLE_METER_POWER_W,
    );
    this.maxPlausibleGridPowerW = Number(
      options.maxPlausibleGridPowerW || DEFAULT_MAX_PLAUSIBLE_GRID_POWER_W,
    );
    this.inverterEfficiency = Number(
      options.inverterEfficiency || DEFAULT_INVERTER_EFFICIENCY,
    );
    this.buffers = {};
    this.pvBuffers = {};
    this.householdPowerBuffer = emptyGridBuffer();
    this.lastMeterValues = {};
    this.plausibleMeterValues = new Set();
    this.missingLogged = new Set();
    this.powerTrackers = new Map();
    this.stateTrackerKeys = new Map();
    this.now =
      typeof options.now === "function" ? options.now : () => Date.now();
  }

  async configure(serverConfig) {
    const definitions = this.powerTrackerDefinitions(serverConfig);
    const desiredKeys = new Set(
      definitions.map((definition) => definition.key),
    );

    for (const [key, tracker] of Array.from(this.powerTrackers.entries())) {
      if (!desiredKeys.has(key)) {
        this.removeTracker(key, tracker);
      }
    }

    for (const definition of definitions) {
      const existing = this.powerTrackers.get(definition.key);
      if (existing) {
        Object.assign(existing, definition);
        continue;
      }
      const tracker = {
        ...definition,
        lastValueW: null,
        lastTimestampMs: null,
      };
      this.powerTrackers.set(definition.key, tracker);
      const shouldSubscribe = this.addStateTracker(
        definition.stateId,
        definition.key,
      );
      if (shouldSubscribe) {
        await this.subscribeState(definition.stateId);
      }
      await this.seedTracker(tracker);
    }
  }

  async close() {
    const stateIds = Array.from(this.stateTrackerKeys.keys());
    this.powerTrackers.clear();
    this.stateTrackerKeys.clear();
    await Promise.all(
      stateIds.map((stateId) => this.unsubscribeState(stateId)),
    );
  }

  handleStateChange(stateId, state) {
    const trackerKeys = this.stateTrackerKeys.get(stateId);
    if (!trackerKeys || trackerKeys.size === 0) {
      return;
    }
    const value = stateValueToNumber(state);
    if (value === null) {
      return;
    }
    const timestampMs = stateTimestampMs(state, this.now());
    for (const trackerKey of trackerKeys) {
      const tracker = this.powerTrackers.get(trackerKey);
      if (tracker) {
        this.updatePowerTracker(tracker, value, timestampMs);
      }
    }
  }

  async collect(serverConfig) {
    const timestamp = new Date().toISOString();
    await this.configure(serverConfig);
    this.flushPowerTrackers(this.now());
    const household = await this.collectHousehold();
    const batteryTotals = this.collectBatteryTotals(serverConfig);
    const pvTotals = this.collectPvTotals(serverConfig);
    const payloads = [];

    for (const plant of plantsFromConfig(serverConfig)) {
      const battery = batteryTotals.byPlant[plant.id] || null;
      const pv = pvTotals.byPlant[plant.id] || null;
      const gridChargingAllowed = this.gridChargingAllowedForPlant(plant.id);
      const payload = {
        installation_id: plant.id,
        script_version: TELEMETRY_VERSION,
        timestamp,
        quality_status: "iobroker-adapter",
        grid_charging_allowed: gridChargingAllowed,
        gridChargingAllowed,
      };

      assignIfNumber(payload, "consumption_wh", household.consumptionWh);
      assignIfNumber(
        payload,
        "grid_export_meter_wh",
        household.gridExportMeterWh,
      );
      assignIfNumber(payload, "grid_import_wh", household.gridImportWh);
      assignIfNumber(payload, "grid_export_wh", household.gridExportWh);
      assignIfNumber(
        payload,
        "grid_power_import_wh",
        household.gridPowerImportWh,
      );
      assignIfNumber(
        payload,
        "grid_power_export_wh",
        household.gridPowerExportWh,
      );
      assignIfNumber(payload, "grid_power_samples", household.gridPowerSamples);
      assignIfNumber(payload, "wallbox_wh", household.wallboxWh);
      assignIfNumber(
        payload,
        "battery_soc_percent",
        await this.readPlantNumber(plant.id, [
          "batterySoc",
          "storageSystemSoc",
        ]),
      );
      assignIfNumber(
        payload,
        "battery_power_w",
        await this.readPlantPowerW(plant.id, BATTERY_POWER_KEYS),
      );
      assignIfNumber(
        payload,
        "pv_power_w",
        await this.readPlantPvPowerW(plant),
      );

      if (battery && battery.samples > 0) {
        assignIfNumber(payload, "battery_output_wh_total", battery.outputWh);
        assignIfNumber(
          payload,
          "battery_household_energy_wh_total",
          battery.householdWh,
        );
        assignIfNumber(payload, "battery_input_wh_total", battery.inputWh);
        assignIfNumber(
          payload,
          "battery_grid_charge_wh_total",
          battery.gridChargeWh,
        );
        assignIfNumber(
          payload,
          "battery_surplus_charge_wh_total",
          battery.surplusChargeWh,
        );
      }

      if (pv && pv.samples > 0) {
        assignIfNumber(payload, "pv_household_energy_wh_total", pv.householdWh);
      }

      this.applyHouseholdEnergyBalance(payload, {
        batteryHouseholdWh: batteryTotals.householdWh,
        pvHouseholdWh: pvTotals.householdWh,
      });
      if (hasTelemetryValues(payload)) {
        payloads.push(payload);
      }
    }

    return {
      timestamp,
      payloads,
      missing: Array.from(this.missingLogged),
    };
  }

  async collectHousehold() {
    const consumption = await this.energyCounterToIntervalWh(
      "consumptionWh",
      "household",
    );
    const gridExport = await this.energyCounterToIntervalWh(
      "gridExportMeterWh",
      "household",
    );
    const wallbox = await this.energyCounterToIntervalWh(
      "wallboxWh",
      "household",
    );
    const gridPower = this.collectGridPowerTotals();

    return {
      consumptionWh: consumption.wh,
      gridExportMeterWh: gridExport.wh,
      wallboxWh: wallbox.wh,
      gridImportWh:
        consumption.wh !== null
          ? consumption.wh
          : !consumption.usable && gridPower.samples > 0
            ? gridPower.importWh
            : null,
      gridExportWh:
        gridExport.wh !== null
          ? gridExport.wh
          : !gridExport.usable && gridPower.samples > 0
            ? gridPower.exportWh
            : null,
      gridPowerImportWh: gridPower.samples > 0 ? gridPower.importWh : null,
      gridPowerExportWh: gridPower.samples > 0 ? gridPower.exportWh : null,
      gridPowerSamples: gridPower.samples > 0 ? gridPower.samples : null,
    };
  }

  collectBatteryTotals(serverConfig) {
    const byPlant = {};
    let householdWh = 0;
    for (const plant of plantsFromConfig(serverConfig)) {
      if (!isBatteryCapablePlant(plant)) {
        this.buffers[plant.id] = emptyBuffer();
        continue;
      }
      const buffer = this.ensureBuffer(plant.id);
      householdWh += numberOrZero(buffer.householdWh);
      byPlant[plant.id] = {
        outputWh: buffer.outputWh,
        householdWh: buffer.householdWh,
        inputWh: buffer.inputWh,
        gridChargeWh: buffer.gridChargeWh,
        surplusChargeWh: buffer.surplusChargeWh,
        samples: buffer.samples,
      };
      this.buffers[plant.id] = emptyBuffer();
    }
    return { byPlant, householdWh };
  }

  collectPvTotals(serverConfig) {
    const byPlant = {};
    let householdWh = 0;
    for (const plant of plantsFromConfig(serverConfig)) {
      const buffer = this.ensurePvBuffer(plant.id);
      householdWh += numberOrZero(buffer.householdWh);
      byPlant[plant.id] = {
        householdWh: buffer.householdWh,
        samples: buffer.samples,
      };
      this.pvBuffers[plant.id] = emptyPvBuffer();
    }
    return { byPlant, householdWh };
  }

  collectGridPowerTotals() {
    const totals = {
      importWh: this.householdPowerBuffer.importWh,
      exportWh: this.householdPowerBuffer.exportWh,
      samples: this.householdPowerBuffer.samples,
    };
    this.householdPowerBuffer = emptyGridBuffer();
    return totals;
  }

  applyHouseholdEnergyBalance(payload, totals = {}) {
    const gridImportWh = numberOrZero(payload.grid_import_wh);
    const gridExportWh = numberOrZero(payload.grid_export_wh);
    const batteryHouseholdWh = numberOrZero(totals.batteryHouseholdWh);
    const pvHouseholdWh = numberOrZero(totals.pvHouseholdWh);
    const inverterHouseholdWh = batteryHouseholdWh + pvHouseholdWh;
    if (
      payload.grid_import_wh !== undefined ||
      payload.battery_household_energy_wh_total !== undefined ||
      payload.pv_household_energy_wh_total !== undefined
    ) {
      payload.estimated_household_consumption_wh = Math.max(
        0,
        gridImportWh + Math.max(0, inverterHouseholdWh - gridExportWh),
      );
    }
  }

  async readPlantPowerW(plantId, keys = BATTERY_POWER_KEYS) {
    const tracked = this.latestTrackedPower("battery", plantId);
    return tracked === null ? this.readPlantPower(plantId, keys) : tracked;
  }

  async readPlantPvPowerW(plant) {
    const tracked = this.latestTrackedPower("pv", plant.id);
    if (tracked !== null) {
      return tracked;
    }
    const direct = await this.readPlantPower(plant.id, PV_POWER_KEYS);
    if (direct !== null) {
      return direct;
    }
    if (
      Number(plant.battery_capacity_kwh || plant.batteryCapacityKwh || 0) <= 0
    ) {
      return this.readPlantPowerW(plant.id);
    }
    return null;
  }

  latestTrackedPower(kind, scopeId) {
    const tracker = Array.from(this.powerTrackers.values()).find(
      (item) => item.kind === kind && item.scopeId === scopeId,
    );
    return Number.isFinite(tracker?.lastValueW) ? tracker.lastValueW : null;
  }

  async readPlantPower(plantId, keys) {
    for (const key of keys) {
      const assignment = this.assignmentFor(plantId, key);
      const value = await this.readNumber(assignment?.stateId);
      if (value !== null) {
        return convertPower(value, assignment?.sourceUnit);
      }
    }
    return null;
  }

  async readPlantNumber(plantId, keys) {
    for (const key of keys) {
      const assignment = this.assignmentFor(plantId, key);
      const value = await this.readNumber(assignment?.stateId);
      if (value !== null) {
        return value;
      }
    }
    return null;
  }

  async readHouseholdPowerW(key) {
    const tracked = this.latestTrackedPower("grid", "household");
    if (tracked !== null) {
      return tracked;
    }
    const assignment = this.assignmentFor("household", key);
    const value = await this.readNumber(assignment?.stateId);
    return value === null ? null : convertPower(value, assignment?.sourceUnit);
  }

  async energyCounterToIntervalWh(key, scopeId) {
    const assignment = this.assignmentFor(scopeId, key);
    const value = await this.readNumber(assignment?.stateId);
    if (value === null) {
      return {
        wh: null,
        readable: Boolean(String(assignment?.stateId || "").trim()),
        usable: false,
      };
    }
    const factor = energyFactorToWh(assignment.sourceUnit, assignment.stateId);
    const wh = this.positiveMeterDeltaWh(
      assignment.stateId,
      value,
      factor.factor,
      {
        allowRawDeltaFallback: factor.inferred,
      },
    );
    return {
      wh,
      readable: true,
      usable: wh !== null || this.plausibleMeterValues.has(assignment.stateId),
    };
  }

  positiveMeterDeltaWh(stateId, value, factorToWh, options = {}) {
    const previous = this.lastMeterValues[stateId];
    this.lastMeterValues[stateId] = value;
    if (previous === undefined || previous === null || value < previous) {
      return null;
    }
    const rawDelta = value - previous;
    const convertedDelta = rawDelta * factorToWh;
    const maxDeltaWh = Math.max(
      1,
      this.maxPlausibleMeterPowerW * (this.sendIntervalMs / 3600000),
    );
    if (
      options.allowRawDeltaFallback &&
      convertedDelta > maxDeltaWh &&
      rawDelta <= maxDeltaWh
    ) {
      this.plausibleMeterValues.add(stateId);
      return rawDelta;
    }
    if (convertedDelta > maxDeltaWh) {
      return null;
    }
    this.plausibleMeterValues.add(stateId);
    return convertedDelta;
  }

  async readNumber(stateId) {
    if (!stateId) {
      return null;
    }
    try {
      const state = await this.adapter.getForeignStateAsync(stateId);
      if (
        !state ||
        state.val === null ||
        state.val === undefined ||
        state.val === ""
      ) {
        return null;
      }
      const value = Number(String(state.val).replace(",", "."));
      if (Number.isFinite(value)) {
        this.missingLogged.delete(stateId);
        return value;
      }
    } catch {
      // Missing state is logged once below.
    }
    if (!this.missingLogged.has(stateId)) {
      this.missingLogged.add(stateId);
      this.adapter.log.info(
        `Datapoint is not readable, telemetry value skipped: ${stateId}`,
      );
    }
    return null;
  }

  assignmentFor(scopeId, key) {
    const assignments = Array.isArray(this.adapter.config.datapointAssignments)
      ? this.adapter.config.datapointAssignments
      : [];
    return assignments.find(
      (item) =>
        item &&
        item.key === key &&
        (item.scopeId === scopeId ||
          (scopeId === "household" && item.scope === "household")),
    );
  }

  gridChargingAllowedForPlant(plantId) {
    const assignment = this.assignmentFor(plantId, "batteryControlMode");
    return assignment?.gridChargingAllowed !== false;
  }

  ensureBuffer(plantId) {
    if (!this.buffers[plantId]) {
      this.buffers[plantId] = emptyBuffer();
    }
    return this.buffers[plantId];
  }

  ensurePvBuffer(plantId) {
    if (!this.pvBuffers[plantId]) {
      this.pvBuffers[plantId] = emptyPvBuffer();
    }
    return this.pvBuffers[plantId];
  }

  powerTrackerDefinitions(serverConfig) {
    if (!serverConfig?.valid) {
      return [];
    }
    const definitions = [];
    const gridAssignment = this.assignmentFor("household", "gridPower");
    if (isReadablePowerAssignment(gridAssignment)) {
      definitions.push(this.powerTrackerDefinition("grid", gridAssignment));
    }
    for (const plant of plantsFromConfig(serverConfig)) {
      const batteryAssignment = firstReadablePowerAssignment(
        BATTERY_POWER_KEYS.map((key) => this.assignmentFor(plant.id, key)),
      );
      if (batteryAssignment && isBatteryCapablePlant(plant)) {
        definitions.push(
          this.powerTrackerDefinition("battery", batteryAssignment),
        );
      }
      const pvAssignment = firstReadablePowerAssignment(
        PV_POWER_KEYS.map((key) => this.assignmentFor(plant.id, key)),
      );
      if (pvAssignment) {
        definitions.push(this.powerTrackerDefinition("pv", pvAssignment));
      }
    }
    return definitions;
  }

  powerTrackerDefinition(kind, assignment) {
    const stateId = String(assignment.stateId || "").trim();
    const scopeId =
      assignment.scope === "household"
        ? "household"
        : String(assignment.scopeId);
    return {
      key: `${kind}:${scopeId}:${assignment.key}:${stateId}`,
      kind,
      scopeId,
      assignmentKey: assignment.key,
      stateId,
      sourceUnit: assignment.sourceUnit,
      powerType: assignment.powerType,
    };
  }

  addStateTracker(stateId, trackerKey) {
    const isNewState = !this.stateTrackerKeys.has(stateId);
    if (!this.stateTrackerKeys.has(stateId)) {
      this.stateTrackerKeys.set(stateId, new Set());
    }
    this.stateTrackerKeys.get(stateId).add(trackerKey);
    return isNewState;
  }

  removeTracker(key, tracker) {
    this.powerTrackers.delete(key);
    const keys = this.stateTrackerKeys.get(tracker.stateId);
    if (!keys) {
      return;
    }
    keys.delete(key);
    if (keys.size === 0) {
      this.stateTrackerKeys.delete(tracker.stateId);
      this.unsubscribeState(tracker.stateId).catch((error) =>
        this.adapter.log.debug(
          `Datapoint unsubscribe failed: ${tracker.stateId}: ${error.message}`,
        ),
      );
    }
  }

  async subscribeState(stateId) {
    if (typeof this.adapter.subscribeForeignStatesAsync === "function") {
      await this.adapter.subscribeForeignStatesAsync(stateId);
      return;
    }
    if (typeof this.adapter.subscribeForeignStates === "function") {
      this.adapter.subscribeForeignStates(stateId);
    }
  }

  async unsubscribeState(stateId) {
    if (typeof this.adapter.unsubscribeForeignStatesAsync === "function") {
      await this.adapter.unsubscribeForeignStatesAsync(stateId);
      return;
    }
    if (typeof this.adapter.unsubscribeForeignStates === "function") {
      this.adapter.unsubscribeForeignStates(stateId);
    }
  }

  async seedTracker(tracker) {
    const value = await this.readNumber(tracker.stateId);
    if (value === null) {
      return;
    }
    tracker.lastValueW = convertPower(value, tracker.sourceUnit);
    tracker.lastTimestampMs = this.now();
  }

  flushPowerTrackers(nowMs) {
    for (const tracker of this.powerTrackers.values()) {
      this.integratePowerTracker(tracker, nowMs);
    }
  }

  updatePowerTracker(tracker, value, timestampMs) {
    const valueW = convertPower(value, tracker.sourceUnit);
    if (!this.isPlausiblePowerW(tracker, valueW)) {
      this.integratePowerTracker(tracker, timestampMs);
      tracker.lastValueW = null;
      tracker.lastTimestampMs = timestampMs;
      return;
    }
    this.integratePowerTracker(tracker, timestampMs);
    tracker.lastValueW = valueW;
    tracker.lastTimestampMs = Math.max(
      timestampMs,
      tracker.lastTimestampMs || timestampMs,
    );
  }

  integratePowerTracker(tracker, nowMs) {
    if (
      !Number.isFinite(tracker.lastValueW) ||
      !Number.isFinite(tracker.lastTimestampMs)
    ) {
      tracker.lastTimestampMs = nowMs;
      return;
    }
    const targetTimestampMs = Math.max(nowMs, tracker.lastTimestampMs);
    const elapsedMs = Math.min(
      Math.max(0, targetTimestampMs - tracker.lastTimestampMs),
      MAX_POWER_TRACKER_STALE_MS,
    );
    tracker.lastTimestampMs = targetTimestampMs;
    if (elapsedMs === 0 || tracker.lastValueW === 0) {
      return;
    }
    if (!this.isPlausiblePowerW(tracker, tracker.lastValueW)) {
      return;
    }
    const wh = Math.abs(tracker.lastValueW) * (elapsedMs / 3600000);
    if (tracker.kind === "grid") {
      this.householdPowerBuffer.samples += 1;
      if (tracker.lastValueW > 0) {
        this.householdPowerBuffer.importWh += wh;
      } else if (tracker.lastValueW < 0) {
        this.householdPowerBuffer.exportWh += wh;
      }
      return;
    }
    if (tracker.kind === "battery") {
      const buffer = this.ensureBuffer(tracker.scopeId);
      buffer.samples += 1;
      if (tracker.lastValueW > 0) {
        buffer.outputWh += wh;
        buffer.householdWh += this.householdContributionWh(tracker, wh);
      } else if (tracker.lastValueW < 0) {
        buffer.inputWh += wh;
        const gridPowerW = this.currentGridPowerForClassification(nowMs);
        if (gridPowerW > 0) {
          buffer.gridChargeWh = numberOrZero(buffer.gridChargeWh) + wh;
          buffer.surplusChargeWh = numberOrZero(buffer.surplusChargeWh);
        } else if (gridPowerW !== null && gridPowerW <= 0) {
          buffer.surplusChargeWh = numberOrZero(buffer.surplusChargeWh) + wh;
          buffer.gridChargeWh = numberOrZero(buffer.gridChargeWh);
        }
      }
      return;
    }
    if (tracker.kind === "pv") {
      if (tracker.lastValueW <= 0) {
        return;
      }
      const buffer = this.ensurePvBuffer(tracker.scopeId);
      buffer.samples += 1;
      buffer.householdWh += this.householdContributionWh(tracker, wh);
    }
  }

  householdContributionWh(tracker, wh) {
    return normalizePowerType(tracker.powerType) === "AC"
      ? wh
      : wh * this.inverterEfficiency;
  }

  currentGridPowerForClassification(nowMs) {
    const tracker = Array.from(this.powerTrackers.values()).find(
      (item) => item.kind === "grid" && item.scopeId === "household",
    );
    if (
      !tracker ||
      !Number.isFinite(tracker.lastValueW) ||
      !Number.isFinite(tracker.lastTimestampMs)
    ) {
      return null;
    }
    if (nowMs - tracker.lastTimestampMs > MAX_POWER_TRACKER_STALE_MS) {
      return null;
    }
    if (!this.isPlausiblePowerW(tracker, tracker.lastValueW)) {
      return null;
    }
    return tracker.lastValueW;
  }

  isPlausiblePowerW(tracker, valueW) {
    if (!Number.isFinite(valueW)) {
      return false;
    }
    const limit =
      tracker.kind === "grid"
        ? this.maxPlausibleGridPowerW
        : this.maxPlausibleMeterPowerW;
    return !Number.isFinite(limit) || limit <= 0 || Math.abs(valueW) <= limit;
  }
}

function plantsFromConfig(serverConfig) {
  const raw = serverConfig?.raw || serverConfig || {};
  const candidates = [
    raw.plants,
    raw.plantConfigs,
    raw.plantConfig,
    raw.installations,
    raw.systems,
    raw.anlagen,
    raw.plantIds,
  ];
  const source = candidates.find(Array.isArray);
  if (!source) {
    const id = String(raw.plantId || serverConfig?.plantId || "").trim();
    return id ? [{ id, name: "Plant 1" }] : [];
  }
  return source.map(normalizePlant).filter((plant) => plant.id);
}

function normalizePlant(item, index) {
  if (typeof item === "string") {
    return { id: item, name: `Plant ${index + 1}` };
  }
  if (!item || typeof item !== "object") {
    return { id: "", name: "" };
  }
  return {
    ...item,
    id: String(
      item.id || item.plantId || item.uuid || item._id || item.key || "",
    ).trim(),
    name: String(item.name || item.label || `Plant ${index + 1}`),
  };
}

function isBatteryCapablePlant(plant) {
  if (
    plant &&
    Object.prototype.hasOwnProperty.call(plant, "battery_capacity_kwh")
  ) {
    return Number(plant.battery_capacity_kwh || 0) > 0;
  }
  if (
    plant &&
    Object.prototype.hasOwnProperty.call(plant, "batteryCapacityKwh")
  ) {
    return Number(plant.batteryCapacityKwh || 0) > 0;
  }
  if (
    plant &&
    plant.features &&
    Object.prototype.hasOwnProperty.call(plant.features, "battery")
  ) {
    return plant.features.battery !== false;
  }
  return true;
}

function emptyBuffer() {
  return {
    outputWh: 0,
    householdWh: 0,
    inputWh: 0,
    gridChargeWh: null,
    surplusChargeWh: null,
    samples: 0,
  };
}

function emptyPvBuffer() {
  return {
    householdWh: 0,
    samples: 0,
  };
}

function emptyGridBuffer() {
  return { importWh: 0, exportWh: 0, samples: 0 };
}

function isReadablePowerAssignment(assignment) {
  return (
    assignment &&
    assignment.read !== false &&
    assignment.unit === "W" &&
    String(assignment.stateId || "").trim()
  );
}

function firstReadablePowerAssignment(assignments) {
  return assignments.find(isReadablePowerAssignment) || null;
}

function assignIfNumber(target, key, value) {
  if (Number.isFinite(value)) {
    target[key] = value;
  }
}

function hasTelemetryValues(payload) {
  return [
    "consumption_wh",
    "grid_export_meter_wh",
    "grid_import_wh",
    "grid_export_wh",
    "wallbox_wh",
    "battery_soc_percent",
    "battery_power_w",
    "pv_power_w",
    "battery_output_wh_total",
    "battery_household_energy_wh_total",
    "battery_input_wh_total",
    "pv_household_energy_wh_total",
  ].some((key) => Number.isFinite(payload[key]));
}

function numberOrZero(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function convertPower(value, unit) {
  return normalizeUnit(unit) === "kW" ? value * 1000 : value;
}

function stateValueToNumber(state) {
  if (
    !state ||
    state.val === null ||
    state.val === undefined ||
    state.val === ""
  ) {
    return null;
  }
  const value = Number(String(state.val).replace(",", "."));
  return Number.isFinite(value) ? value : null;
}

function stateTimestampMs(state, fallbackMs) {
  const timestamp = Number(state?.ts || state?.lc);
  return Number.isFinite(timestamp) && timestamp > 0 ? timestamp : fallbackMs;
}

function energyFactorToWh(unit, stateId) {
  const normalizedUnit = normalizeUnit(unit);
  if (normalizedUnit === "kWh") {
    return { factor: 1000, inferred: false };
  }
  if (normalizedUnit === "Wh") {
    return { factor: 1, inferred: false };
  }
  const inferredKwh = String(stateId || "")
    .toLowerCase()
    .includes("kwh");
  return { factor: inferredKwh ? 1000 : 1, inferred: true };
}

function normalizeUnit(unit) {
  const value = String(unit || "")
    .trim()
    .toLowerCase();
  if (value === "kwh") {
    return "kWh";
  }
  if (value === "wh") {
    return "Wh";
  }
  if (value === "kw") {
    return "kW";
  }
  if (value === "w") {
    return "W";
  }
  return String(unit || "").trim();
}

function normalizePowerType(value) {
  const normalized = String(value || "")
    .trim()
    .toUpperCase();
  return normalized === "AC" || normalized === "DC" ? normalized : "";
}

module.exports = {
  TelemetrySampler,
  TELEMETRY_VERSION,
  plantsFromConfig,
};
