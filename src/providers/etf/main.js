import * as topByCap from './top100cap/top100.js';
import * as twelveData from './twelveData/twelveData.js';

/** @type {import('./types').EtfProvider['getTopTickers']} */
export const getTopTickers = async (limit) =>
  topByCap.getTopTickersByMarketCap(limit);

/** @type {import('./types').EtfProvider['getLastBar']} */
export const getLastBar = async (ticker) => twelveData.getLastBar(ticker);

/** @type {import('./types').EtfProvider['getHistoricalBars']} */
export const getHistoricalBars = async (ticker, from, to) =>
  twelveData.getHistoricalBars(ticker, from, to);
