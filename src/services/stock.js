/** @typedef {import('./types').StockService} Service */

import { mockData } from '../providers/mock/mock.js';
import { twelveData } from '../providers/twelve-data/twelveData.js';

export const stockService = {
  /** @type {Service['getList']} */
  getList: async (limit) => mockData.getStockList(limit),

  /** @type {Service['getLastBar']} */
  getLastBar: async (ticker) => {
    const lastBar = await twelveData.getLastBar(ticker);

    return { ...lastBar, ticker };
  },

  /** @type {Service['getHistory']} */
  getHistory: async (ticker, from, to) => {
    const history = await twelveData.getHistory(ticker, from, to);

    return history.map((h) => ({ ...h, ticker }));
  },
};
