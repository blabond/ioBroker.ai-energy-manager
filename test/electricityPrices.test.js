'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { electricityPriceSnapshot } = require('../lib/electricityPrices');

test('selects adjacent tariff slots and maps the current web price classification', () => {
    const now = new Date('2026-07-28T10:20:00Z');
    const data = {
        includes_total_price: true,
        stats_7d: { total_max_price_ct_per_kwh: 40 },
        rows: [
            row('10:00', '10:15', 20),
            row('10:15', '10:30', 10),
            row('10:30', '10:45', 11),
            row('10:45', '11:00', 14),
        ],
    };

    assert.deepEqual(electricityPriceSnapshot(data, now), {
        last: 20,
        current: 10,
        next: 11,
        status: 1,
    });
    data.rows[1].total_price_ct_per_kwh = 61;
    assert.equal(electricityPriceSnapshot(data, now).status, 3);
    data.rows[1].total_price_ct_per_kwh = 12.5;
    assert.equal(electricityPriceSnapshot(data, now).status, 2);
    data.rows[1].total_price_ct_per_kwh = 30;
    assert.equal(electricityPriceSnapshot(data, now).status, 0);
});

function row(start, end, price) {
    return {
        time: `2026-07-28T${start}:00Z`,
        end_time: `2026-07-28T${end}:00Z`,
        total_price_ct_per_kwh: price,
    };
}
