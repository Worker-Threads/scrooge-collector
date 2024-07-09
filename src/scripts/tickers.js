/**
 * @typedef {import('../services/types').AbstractService} Service
 * @typedef {import('./types').Scripts} Scripts
 */

import pg from 'pg';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { config } from '../config.js';
import { init as cryptoInit } from '../services/crypto.js';
import { init as etfInit } from '../services/etf.js';
import { init as stockInit } from '../services/stock.js';
import { init as fiatInit } from '../services/fiat.js';

const pool = new pg.Pool(config.pg);

/** @type {Record<string, Service>} */
const servicesMap = {
  crypto: cryptoInit(pool),
  etf: etfInit(pool),
  stock: stockInit(pool),
  fiat: fiatInit(pool),
};

/** @type {Scripts['loadTickers']} */
const loadTickers = async ({ services, limit }) => {
  for (const key of services) {
    const service = servicesMap[key];
    if (!service) throw Error(`Service "${key}" is not valid.`);
    console.log(`Start running "Tickers Load" on ${key} service:`);
    const start = Date.now();
    await service.loadList(limit);
    const end = Date.now();
    console.log(
      `Finish running "Tickers Load" on ${key} service. Duration: ${(end - start) / 1000}s.\n`,
    );
  }
};

// E.g: node src/scripts/tickers.js --limit 10 --services etf fiat
/** @type {{ services: string[]; limit?: number }} */
// @ts-ignore
const argv = yargs(hideBin(process.argv))
  .option('services', {
    type: 'string',
    description: 'Space separated array of services to process: etf crypto...',
    array: true,
    choices: ['crypto', 'etf', 'stock', 'fiat'],
    default: Object.keys(servicesMap),
  })
  .option('limit', {
    type: 'number',
    description: 'Number of tickers to load for each service',
  })
  .help()
  .alias('help', 'h').argv;

await loadTickers({
  services: argv.services,
  limit: argv.limit ?? 10,
});

await pool.end();
