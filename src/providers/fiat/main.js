import * as cmc from './cmc/cmc.js';
import * as twelveData from './twelveData/twelveData.js';

/** @type {import('./types').FiatProvider['getTopTickers']} */
export const getTopTickers = async (limit) => cmc.getTopCurrencies(limit);

/** @type {import('./types').FiatProvider['getLastBar']} */
export const getLastBar = async (ticker) => twelveData.getLastBar(ticker);

/** @type {import('./types').FiatProvider['getHistoricalBars']} */
export const getHistoricalBars = async (ticker, from, to) =>
  twelveData.getHistoricalBars(ticker, from, to);
