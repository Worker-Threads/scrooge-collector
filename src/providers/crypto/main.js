import * as cmc from './cmc/cmc.js';
import * as twelveData from './twelveData/twelveData.js';

/** @type {import('./types').CryptoProvider['getTopTickers']} */
export const getTopTickers = async (limit) =>
  cmc.getTopTickersByMarketCap(limit);

/** @type {import('./types').CryptoProvider['getLastBar']} */
export const getLastBar = async (ticker) => twelveData.getLastBar(ticker);

/** @type {import('./types').CryptoProvider['getHistoricalBars']} */
export const getHistoricalBars = async (ticker, from, to) =>
  twelveData.getHistoricalBars(ticker, from, to);
