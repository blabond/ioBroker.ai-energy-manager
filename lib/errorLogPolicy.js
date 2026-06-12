'use strict';

const BACKEND_TIMEOUT_MESSAGE = 'Backend request timed out.';
const BACKEND_TIMEOUT_WARNING_THRESHOLD = 3;

function isBackendRequestTimeout(message) {
    return String(message || '') === BACKEND_TIMEOUT_MESSAGE;
}

function shouldLogBackendError(message, consecutiveTimeouts) {
    const text = String(message || '');
    if (!text) {
        return false;
    }
    if (!isBackendRequestTimeout(text)) {
        return true;
    }
    return Number(consecutiveTimeouts || 0) >= BACKEND_TIMEOUT_WARNING_THRESHOLD;
}

module.exports = {
    BACKEND_TIMEOUT_MESSAGE,
    BACKEND_TIMEOUT_WARNING_THRESHOLD,
    isBackendRequestTimeout,
    shouldLogBackendError,
};
