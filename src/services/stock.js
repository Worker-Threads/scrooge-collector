/** @typedef {import('./types').StockService} Service */

import { MockData } from '../providers/mock/mock.js';
import { TwelveData } from '../providers/twelve-data/twelveData.js';

export const StockService = {
  /** @type {Service['getList']} */
  getList: async (limit) => MockData.getStockList(limit),

  /** @type {Service['getLastBar']} */
  getLastBar: async (ticker) => {
    const lastBar = await TwelveData.getLastBar(ticker);

    return { ...lastBar, ticker };
  },

  /** @type {Service['getHistory']} */
  getHistory: async (ticker, from, to) => {
    const history = await TwelveData.getHistory(ticker, from, to);

    return history.map((h) => ({ ...h, ticker }));
  },
};
