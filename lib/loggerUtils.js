'use strict';

const { maskSecret } = require('./validation');

function sanitizeForLog(value, token) {
    if (value === null || value === undefined) {
        return value;
    }
    const tokenValue = String(token || '');
    if (typeof value === 'string') {
        return tokenValue ? value.split(tokenValue).join(maskSecret(tokenValue)) : value;
    }
    if (Array.isArray(value)) {
        return value.map(item => sanitizeForLog(item, token));
    }
    if (typeof value === 'object') {
        const output = {};
        for (const [key, item] of Object.entries(value)) {
            if (/token|secret|password/i.test(key)) {
                output[key] = maskSecret(String(item || ''));
            } else {
                output[key] = sanitizeForLog(item, token);
            }
        }
        return output;
    }
    return value;
}

function debug(adapter, message, data) {
    if (data === undefined) {
        adapter.log.debug(message);
        return;
    }
    adapter.log.debug(`${message}: ${JSON.stringify(data)}`);
}

module.exports = {
    sanitizeForLog,
    debug,
};
