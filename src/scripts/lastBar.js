/**
 * @typedef {import('../services/types').AbstractService} Service
 * @typedef {import('./types').Scripts} Scripts
 * @typedef {import('./types').Timeframe} Timeframe
 */

import pg from 'pg';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { config } from '../config.js';
import { init as cryptoInit } from '../services/crypto.js';
import { init as etfInit } from '../services/etf.js';
import { init as stockInit } from '../services/stock.js';
import { init as fiatInit } from '../services/fiat.js';
import { getRoundedInterval } from '../utils/interval.js';

const pool = new pg.Pool(config.pg);

/** @type {Record<string, Service>} */
const servicesMap = {
  crypto: cryptoInit(pool),
  etf: etfInit(pool),
  stock: stockInit(pool),
  fiat: fiatInit(pool),
};

/** @type {Record<Timeframe, number>} */
const timeframeToMs = {
  m1: 60 * 1000,
  m5: 5 * 60 * 1000,
  m15: 15 * 60 * 1000,
  m30: 30 * 60 * 1000,
  h1: 60 * 60 * 1000,
  h4: 4 * 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000,
};

/** @type {Scripts['loadLastBar']} */
const loadLastBar = async ({ services }) => {
  for (const key of services) {
    const service = servicesMap[key];
    if (!service) throw Error(`Service "${key}" is not valid.`);
    console.log(`Start running "Last Bar Load" on ${key} service...`);
    const start = Date.now();
    const list = await service.getList();
    for (const item of list) {
      console.log(`Processing: ${item.symbol}(${item.name})...`);
      await service.loadLastBar(item);
    }
    const end = Date.now();
    console.log(
      `Finish running "Last Bar Load" on ${key} service. Duration: ${(end - start) / 1000}s.`,
    );
  }
};

/** @type {Scripts['initLoadLastBar']} */
const initLoadLastBar = async ({ services, timeframe }) => {
  await loadLastBar({ services });
  for await (const _ of getRoundedInterval(timeframeToMs[timeframe])) {
    await loadLastBar({ services });
  }
};

// E.g: node src/scripts/lastBar.js --services etf crypto
/** @type {{ services: string[]; from: number; to: number }} */
// @ts-ignore
const argv = yargs(hideBin(process.argv))
  .option('services', {
    type: 'string',
    description: 'Space separated array of services to process: etf crypto...',
    array: true,
    choices: ['crypto', 'etf', 'stock', 'fiat'],
    default: Object.keys(servicesMap),
  })
  .help()
  .alias('help', 'h').argv;

await initLoadLastBar({ services: argv.services, timeframe: 'd' });

await pool.end();
