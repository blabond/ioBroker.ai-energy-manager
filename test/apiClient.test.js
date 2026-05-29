'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const ApiClient = require('../lib/apiClient');

test('uses backend reads but skips telemetry writes for demo account tokens', async () => {
    const originalFetch = globalThis.fetch;
    const requests = [];
    globalThis.fetch = async (url, options = {}) => {
        requests.push({
            url: String(url),
            method: options.method,
            authorization: headerValue(options.headers, 'Authorization'),
            body: options.body ? JSON.parse(String(options.body)) : null,
        });
        return new Response(JSON.stringify({ success: true, valid: true, commands: [] }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        });
    };

    try {
        const client = new ApiClient({
            backendUrl: 'https://example.invalid',
            token: 'DEMOACCOUNT-abc123456789',
        });

        await client.validateToken();
        await client.requestServerConfig();
        await client.requestDashboardDecision('demo-installation');
        await client.requestControlCommands(7);

        const stateResult = await client.sendStatePayload({ values: { gridPower: 120 } });
        const telemetryResult = await client.sendTelemetryBatch([{ grid_power_w: 120 }]);

        assert.equal(stateResult.status, 'demo_skipped');
        assert.equal(telemetryResult.status, 'demo_skipped');
        assert.deepEqual(
            requests.map(request => request.authorization),
            ['Bearer DEMOACCOUNT', 'Bearer DEMOACCOUNT', 'Bearer DEMOACCOUNT', 'Bearer DEMOACCOUNT'],
        );
        assert.deepEqual(
            requests.map(request => request.url.replace('https://example.invalid', '')),
            [
                '/api/iobroker/token/validate',
                '/api/iobroker/config/request',
                '/api/v1/decision?strategy=balanced&installation_id=demo-installation',
                '/api/iobroker/commands/pull?config_revision=7',
            ],
        );
    } finally {
        globalThis.fetch = originalFetch;
    }
});

function headerValue(headers, name) {
    if (!headers) {
        return '';
    }
    return new Headers(headers).get(name) || '';
}
