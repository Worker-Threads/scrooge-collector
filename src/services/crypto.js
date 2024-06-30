/** @typedef {import('./types').CryptoService} Service */

import { cmc } from '../data/providers/cmc/cmc.js';
import { twelveData } from '../data/providers/twelve-data/twelveData.js';

export const cryptoService = {
  /** @type {Service['getList']} */
  getList: async (limit) => cmc.getTickersList(limit),

  /** @type {Service['getLastBar']} */
  getLastBar: async (ticker) => {
    const pair = `${ticker}/USD`;
    const lastBar = await twelveData.getLastBar(pair);

    return { ...lastBar, ticker };
  },

  /** @type {Service['getHistory']} */
  getHistory: async (ticker, from, to) => {
    const pair = `${ticker}/USD`;
    const history = await twelveData.getHistory(pair, from, to);

    return history.map((h) => ({ ...h, ticker }));
  },
};
