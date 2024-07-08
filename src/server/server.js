/** @typedef {import('../services/types').AbstractService} Service */

import { createServer } from 'node:http';
import pg from 'pg';
import { config } from '../config.js';
import { init as cryptoInit } from '../services/crypto.js';
import { init as etfInit } from '../services/etf.js';
import { init as stockInit } from '../services/stock.js';
import { init as fiatInit } from '../services/fiat.js';

export const DEFAULT_HEADERS = {
  'X-XSS-Protection': '1; mode=block',
  'X-Content-Type-Options': 'nosniff',
  'Strict-Transport-Security': 'max-age=31536000; includeSubdomains; preload',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json; charset=UTF-8',
};

const pool = new pg.Pool(config.pg);

/** @type {Record<string, Service>} */
const services = {
  crypto: cryptoInit(pool),
  etf: etfInit(pool),
  stock: stockInit(pool),
  fiat: fiatInit(pool),
};

createServer(async (request, response) => {
  try {
    const { url, method } = request;
    if (!url) throw Error('Not found.');
    const [domain, action, id] = url.substring(1).split('/');

    if (
      !['crypto', 'etf', 'fiat', 'stock'].includes(domain) ||
      !['symbolSearch', 'loadTicker'].includes(action)
    ) {
      throw Error('Not found.');
    }

    // @ts-ignore
    const handler = services[domain][action];

    if (method === 'OPTIONS') {
      response.writeHead(204, DEFAULT_HEADERS);
      return response.end();
    }
    if (method !== 'GET') throw Error('Not found.');
    const result = await handler(id);
    response.writeHead(200, DEFAULT_HEADERS);
    response.end(JSON.stringify(result));
  } catch (err) {
    console.log(err);
    response.writeHead(500, DEFAULT_HEADERS);
    // @ts-ignore
    return response.end(err.message || 'Internal Server Error');
  }
}).listen(8081, () => {
  console.log('Listening on 8081');
});
