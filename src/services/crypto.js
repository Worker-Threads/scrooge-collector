/** @typedef {import('./types').CryptoService} Service */

import { Cmc } from '../providers/cmc/cmc.js';
import { TwelveData } from '../providers/twelve-data/twelveData.js';

export const CryptoService = {
  /** @type {Service['getList']} */
  getList: async (limit) => Cmc.getTickersList(limit),

  /** @type {Service['getLastBar']} */
  getLastBar: async (ticker) => {
    const pair = `${ticker}/USD`;
    const lastBar = await TwelveData.getLastBar(pair);

    return { ...lastBar, ticker };
  },

  /** @type {Service['getHistory']} */
  getHistory: async (ticker, from, to) => {
    const pair = `${ticker}/USD`;
    const history = await TwelveData.getHistory(pair, from, to);

    return history.map((h) => ({ ...h, ticker }));
  },
};
