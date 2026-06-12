'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { BACKEND_TIMEOUT_MESSAGE, isBackendRequestTimeout, shouldLogBackendError } = require('../lib/errorLogPolicy');

test('suppresses backend timeout warnings until three consecutive timeouts', () => {
    assert.equal(isBackendRequestTimeout(BACKEND_TIMEOUT_MESSAGE), true);
    assert.equal(shouldLogBackendError(BACKEND_TIMEOUT_MESSAGE, 1), false);
    assert.equal(shouldLogBackendError(BACKEND_TIMEOUT_MESSAGE, 2), false);
    assert.equal(shouldLogBackendError(BACKEND_TIMEOUT_MESSAGE, 3), true);
    assert.equal(shouldLogBackendError(BACKEND_TIMEOUT_MESSAGE, 4), true);
});

test('logs non-timeout errors immediately but ignores empty messages', () => {
    assert.equal(isBackendRequestTimeout('Missing values: gridPower'), false);
    assert.equal(shouldLogBackendError('Missing values: gridPower', 0), true);
    assert.equal(shouldLogBackendError('', 0), false);
});
