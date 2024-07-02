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

/** @type {Scripts['loadHistory']} */
const loadHistory = async ({ services, from, to }) => {
  for (const key of services) {
    const service = servicesMap[key];
    if (!service) throw Error(`Service "${key}" is not valid.`);
    console.log(`Start running "History Load" on ${key} service:`);
    const start = Date.now();
    const list = await service.getList();
    for (const item of list) {
      console.log(`-- Processing: ${item.symbol}(${item.name})`);
      await service.loadHistory(item, from, to);
    }
    const end = Date.now();
    console.log(
      `Finish running "History Load" on ${key} service. Duration: ${(end - start) / 1000}s.\n`,
    );
  }
};

// E.g: node src/scripts/history.js --from 2023-05-05 --to 2024-06-06 --services etf fiat
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
  .option('from', {
    type: 'string',
    description: 'Start date in YYYY-MM-DD format',
    demandOption: true,
  })
  .option('to', {
    type: 'string',
    description: 'End date in YYYY-MM-DD format',
    default: new Date(),
  })
  .help()
  .alias('help', 'h').argv;

await loadHistory({
  services: argv.services,
  from: new Date(argv.from).getTime(),
  to: new Date(argv.to).getTime(),
});

await pool.end();
