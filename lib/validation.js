"use strict";

const DEFAULT_BACKEND_URL = "https://smartenergy.mr-bond.de";
const DEMO_ACCOUNT_TOKEN_PREFIX = "DEMOACCOUNT-";

function normalizeBackendUrl(value) {
  const raw = String(value || DEFAULT_BACKEND_URL)
    .trim()
    .replace(/\/+$/, "");
  if (!raw) {
    return "";
  }
  let parsed;
  try {
    parsed = new URL(raw);
  } catch {
    throw new Error("Backend URL is invalid.");
  }
  if (!["https:", "http:"].includes(parsed.protocol)) {
    throw new Error("Backend URL must start with http:// or https://.");
  }
  return parsed.toString().replace(/\/+$/, "");
}

function assertToken(value) {
  const token = String(value || "").trim();
  if (token.length < 12) {
    throw new Error("Adapter token is missing or too short.");
  }
  return token;
}

function isDemoAccountToken(value) {
  return String(value || "").trim().startsWith(DEMO_ACCOUNT_TOKEN_PREFIX);
}

function normalizeInterval(value, min, max, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return fallback;
  }
  return Math.min(max, Math.max(min, Math.round(number)));
}

function maskSecret(value) {
  const text = String(value || "");
  if (text.length <= 8) {
    return text ? "********" : "";
  }
  return `${text.slice(0, 4)}${"*".repeat(Math.min(12, Math.max(4, text.length - 8)))}${text.slice(-4)}`;
}

function isPlainObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

function validateAdapterConfig(nativeConfig) {
  const errors = [];
  let backendUrl = "";
  let adapterToken = "";
  try {
    backendUrl = normalizeBackendUrl(nativeConfig.backendUrl);
  } catch (error) {
    errors.push(error.message);
  }
  try {
    adapterToken = assertToken(nativeConfig.adapterToken);
  } catch (error) {
    errors.push(error.message);
  }
  return {
    valid: errors.length === 0,
    errors,
    backendUrl,
    adapterToken,
    sendIntervalSeconds: normalizeInterval(
      nativeConfig.sendIntervalSeconds,
      10,
      3600,
      60,
    ),
    commandPollIntervalSeconds: normalizeInterval(
      nativeConfig.commandPollIntervalSeconds,
      10,
      3600,
      30,
    ),
    minWriteIntervalSeconds: normalizeInterval(
      nativeConfig.minWriteIntervalSeconds,
      0,
      3600,
      10,
    ),
    sendOnlyChanged: nativeConfig.sendOnlyChanged !== false,
  };
}

module.exports = {
  DEFAULT_BACKEND_URL,
  DEMO_ACCOUNT_TOKEN_PREFIX,
  normalizeBackendUrl,
  assertToken,
  isDemoAccountToken,
  normalizeInterval,
  maskSecret,
  isPlainObject,
  validateAdapterConfig,
};
