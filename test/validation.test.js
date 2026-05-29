'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const {
    isAuthenticationError,
    isDemoAccountToken,
    maskSecret,
    normalizeBackendUrl,
    normalizeBackendToken,
    validateAdapterConfig,
} = require('../lib/validation');

test('masks tokens for logs', () => {
    assert.equal(maskSecret('abc123456789xyz'), 'abc1*******9xyz');
});

test('normalizes backend URL', () => {
    assert.equal(normalizeBackendUrl('https://example.invalid///'), 'https://example.invalid');
});

test('uses the project URL as default backend URL', () => {
    assert.equal(normalizeBackendUrl(''), 'https://smartenergy.mr-bond.de');
});

test('validates base config', () => {
    const result = validateAdapterConfig({
        backendUrl: 'https://example.invalid',
        adapterToken: '123456789012345',
        sendIntervalSeconds: 1,
        commandPollIntervalSeconds: 999999,
    });
    assert.equal(result.valid, true);
    assert.equal(result.sendIntervalSeconds, 10);
    assert.equal(result.commandPollIntervalSeconds, 3600);
});

test('detects demo account tokens', () => {
    assert.equal(isDemoAccountToken('DEMOACCOUNT-abc123456789'), true);
    assert.equal(isDemoAccountToken('demoaccount-abc123456789'), true);
    assert.equal(isDemoAccountToken('DEMOACC-abc123456789'), true);
    assert.equal(isDemoAccountToken(' demoacc-abc123456789 '), true);
    assert.equal(isDemoAccountToken(' em-abc123456789 '), false);
});

test('normalizes demo account tokens for backend requests', () => {
    assert.equal(normalizeBackendToken('DEMOACCOUNT-abc123456789'), 'DEMOACCOUNT');
    assert.equal(normalizeBackendToken(' demoacc-abc123456789 '), 'DEMOACCOUNT');
    assert.equal(normalizeBackendToken('em-abc123456789'), 'em-abc123456789');
});

test('detects authentication errors', () => {
    assert.equal(isAuthenticationError('Authentication failed'), true);
    assert.equal(isAuthenticationError('Backend responded with HTTP 401'), true);
    assert.equal(isAuthenticationError('unauthorized request'), true);
    assert.equal(isAuthenticationError('Missing values: gridPower'), false);
});
