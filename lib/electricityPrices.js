'use strict';

function electricityPriceSnapshot(data = {}, now = new Date()) {
    const nowMs = now instanceof Date ? now.getTime() : Date.now();
    const priceKey = data.includes_total_price ? 'total_price_ct_per_kwh' : 'price_ct_per_kwh';
    const rows = (Array.isArray(data.rows) ? data.rows : [])
        .map(row => ({
            start: Date.parse(row?.time || ''),
            end: Date.parse(row?.end_time || ''),
            price: numericValue(row?.[priceKey]),
        }))
        .filter(row => Number.isFinite(row.start) && Number.isFinite(row.end) && row.price !== null)
        .sort((a, b) => a.start - b.start);
    const current = rows.find(row => row.start <= nowMs && row.end > nowMs);
    if (!current) {
        return { last: null, current: null, next: null, status: 0 };
    }
    const last = rows.filter(row => row.end <= current.start).at(-1);
    const next = rows.find(row => row.start >= current.end);

    return {
        last: last?.price ?? null,
        current: current.price,
        next: next?.price ?? null,
        status: electricityPriceStatus(current, rows, data.stats_7d, nowMs),
    };
}

function electricityPriceStatus(current, rows, stats, nowMs) {
    const max7d = numericValue(stats?.total_max_price_ct_per_kwh);
    if (max7d !== null && current.price >= max7d * 1.5) {
        return 3;
    }

    const past = rows.filter(row => row.start < nowMs).map(row => row.price);
    const future = rows.filter(row => row.start >= nowMs);
    if (future.length === 0) {
        return 0;
    }
    const futurePrices = future.map(row => row.price);
    const futureAverage = average(futurePrices);
    const reference = average([average(past), futureAverage].filter(value => value !== null));
    const cheapest = Math.min(...futurePrices);
    const nearMinimum = current.price <= cheapest + Math.max(0.75, Math.abs(cheapest) * 0.08);
    if (current.start >= nowMs - 60 * 60 * 1000 && nearMinimum) {
        return 1;
    }

    const minimumGap = Math.max(1, Math.abs(current.price) * 0.18);
    const betterSoon = future.some(
        row =>
            row.start > current.start &&
            row.start <= current.start + 4 * 60 * 60 * 1000 &&
            row.price <= current.price - minimumGap,
    );
    const bridge =
        !betterSoon &&
        ((reference !== null && current.price <= reference * 0.78) ||
            current.price <= futureAverage * 0.9 ||
            current.price <= cheapest + 2);
    return current.start >= nowMs - 60 * 60 * 1000 && bridge ? 2 : 0;
}

function numericValue(value) {
    if (value === null || value === undefined || value === '') {
        return null;
    }
    const number = Number(value);
    return Number.isFinite(number) ? number : null;
}

function average(values) {
    return values.length > 0 ? values.reduce((sum, value) => sum + value, 0) / values.length : null;
}

module.exports = { electricityPriceSnapshot };
