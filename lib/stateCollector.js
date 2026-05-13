"use strict";

class StateCollector {
  constructor(adapter, datapointManager) {
    this.adapter = adapter;
    this.datapointManager = datapointManager;
  }

  async collect(serverConfig) {
    const values = {};
    const plants = {};
    const missing = [];
    const missingLabels = [];
    const definitions = this.datapointManager.definitions(serverConfig);
    for (const definition of definitions) {
      if (!definition.read) {
        continue;
      }
      const stateId = this.datapointManager.stateIdFor(
        definition.mappingKey || definition.key,
      );
      if (!stateId) {
        if (definition.required) {
          addMissing(missing, missingLabels, definition);
        }
        continue;
      }
      const state = await this.adapter.getForeignStateAsync(stateId);
      if (!state || state.val === null || state.val === undefined) {
        if (definition.required) {
          addMissing(missing, missingLabels, definition);
        }
        continue;
      }
      const value = normalizeAndConvertValue(state.val, definition);
      if (definition.scope === "plant" && definition.scopeId) {
        plants[definition.scopeId] = plants[definition.scopeId] || {};
        plants[definition.scopeId][definition.key] = value;
      } else {
        values[definition.key] = value;
      }
    }
    return {
      plantId: serverConfig?.plantId || "",
      plantIds: Object.keys(plants),
      configRevision: Number(serverConfig?.configRevision || 0),
      timestamp: new Date().toISOString(),
      values,
      plants,
      missing,
      missingLabels,
    };
  }
}

function addMissing(missing, missingLabels, definition) {
  missing.push(definition.mappingKey || definition.key);
  missingLabels.push(readableMissingLabel(definition));
}

function readableMissingLabel(definition = {}) {
  const key = String(definition.key || definition.mappingKey || "").trim();
  if (definition.scope === "plant") {
    const scopeName = String(definition.scopeName || "").trim();
    return scopeName ? `${scopeName}: ${key}` : key;
  }
  return key;
}

function normalizeAndConvertValue(value, definition = {}) {
  const normalized = normalizeValue(value);
  if (typeof normalized !== "number") {
    return normalized;
  }
  return convertUnit(normalized, definition.sourceUnit, definition.unit);
}

function normalizeValue(value) {
  if (typeof value === "number" || typeof value === "boolean") {
    return value;
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed === "true") {
      return true;
    }
    if (trimmed === "false") {
      return false;
    }
    const number = Number(trimmed.replace(",", "."));
    return Number.isFinite(number) && trimmed !== "" ? number : trimmed;
  }
  return value;
}

function convertUnit(value, sourceUnit, targetUnit) {
  if (sourceUnit === "kWh" && targetUnit === "Wh") {
    return value * 1000;
  }
  if (sourceUnit === "Wh" && targetUnit === "kWh") {
    return value / 1000;
  }
  if (sourceUnit === "kW" && targetUnit === "W") {
    return value * 1000;
  }
  if (sourceUnit === "W" && targetUnit === "kW") {
    return value / 1000;
  }
  return value;
}

module.exports = StateCollector;
