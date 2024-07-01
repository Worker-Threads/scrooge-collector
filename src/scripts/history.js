/**
 * @typedef {import('../services/types').AbstractService} Service
 * @typedef {import('./types').History} History
 */

import pg from 'pg';
import { config } from '../config.js';
import { init as cryptoInit } from '../services/crypto.js';
import { init as etfInit } from '../services/etf.js';
import { init as stockInit } from '../services/stock.js';
import { init as fiatInit } from '../services/fiat.js';
import { setTimeout } from 'timers/promises';

const pool = new pg.Pool(config.pg);

/** @type {Record<string, Service>} */
const services = {
  crypto: cryptoInit(pool),
  etf: etfInit(pool),
  stock: stockInit(pool),
  fiat: fiatInit(pool),
};

/** @type {History['load']} */
const loadHistory = async (from, to = Date.now()) => {
  for (const [key, service] of Object.entries(services)) {
    console.log(`Start running history load on ${key} service...`);
    const start = Date.now();
    const list = await service.getList();
    for (const item of list) {
      console.log(`Processing: ${item.symbol}(${item.name})...`);
      await service.loadHistory(item, from, to);
      await setTimeout(10_000);
    }
    const end = Date.now();
    console.log(
      `Finish running  history load on ${key} service. Duration: ${(end - start) / 1000}s.`,
    );
  }
};

await loadHistory(new Date('2021').getTime());
