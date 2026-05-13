"use strict";

const QUEUE_STATE_ID = "telemetry.queue";
const DEFAULT_MAX_QUEUE_ITEMS = 50000;
const DEFAULT_MAX_BATCH_SIZE = 250;

class TelemetryQueue {
  constructor(adapter, apiClient, options = {}) {
    this.adapter = adapter;
    this.apiClient = apiClient;
    this.maxQueueItems = Number(
      options.maxQueueItems || DEFAULT_MAX_QUEUE_ITEMS,
    );
    this.maxBatchSize = Number(options.maxBatchSize || DEFAULT_MAX_BATCH_SIZE);
    this.items = [];
    this.flushInProgress = false;
  }

  async load() {
    try {
      await this.adapter.setObjectNotExistsAsync(QUEUE_STATE_ID, {
        type: "state",
        common: {
          name: "Pending telemetry queue",
          type: "string",
          role: "json",
          read: true,
          write: false,
          def: "[]",
        },
        native: {},
      });
      const state = await this.adapter.getStateAsync(QUEUE_STATE_ID);
      const parsed = state?.val ? JSON.parse(String(state.val)) : [];
      this.items = Array.isArray(parsed) ? parsed.filter(isPlainObject) : [];
      await this.updateQueueLength();
    } catch (error) {
      this.items = [];
      await this.adapter.setError(
        `Telemetry queue could not be loaded: ${error.message}`,
      );
    }
  }

  async enqueue(payloads) {
    const items = (Array.isArray(payloads) ? payloads : [payloads]).filter(
      isPlainObject,
    );
    if (items.length === 0) {
      return;
    }
    this.items.push(...items);
    if (this.items.length > this.maxQueueItems) {
      const overflow = this.items.length - this.maxQueueItems;
      this.items.splice(0, overflow);
      this.adapter.log.warn(
        `Telemetry queue is full, ${overflow} older entries were discarded.`,
      );
    }
    await this.persist();
  }

  async flush() {
    if (this.flushInProgress || this.items.length === 0) {
      return { sent: 0, remaining: this.items.length };
    }
    this.flushInProgress = true;
    const batch = this.items.slice(0, this.maxBatchSize);
    try {
      const response = await this.apiClient.sendTelemetryBatch(batch);
      this.items.splice(0, batch.length);
      await this.persist();
      return {
        sent: batch.length,
        remaining: this.items.length,
        response,
      };
    } finally {
      this.flushInProgress = false;
    }
  }

  async persist() {
    await this.adapter.setStateAsync(
      QUEUE_STATE_ID,
      JSON.stringify(this.items),
      true,
    );
    await this.updateQueueLength();
  }

  async updateQueueLength() {
    await this.adapter.setStateAsync(
      "telemetry.queueLength",
      this.items.length,
      true,
    );
  }
}

function isPlainObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

module.exports = {
  TelemetryQueue,
  QUEUE_STATE_ID,
  DEFAULT_MAX_BATCH_SIZE,
  DEFAULT_MAX_QUEUE_ITEMS,
};
