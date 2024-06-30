/** @typedef {import('./types').EtfService} Service */

import { mockData } from '../data/providers/mock/mock.js';
import { twelveData } from '../data/providers/twelve-data/twelveData.js';

export const etfService = {
  /** @type {Service['getList']} */
  getList: async (limit) => mockData.getEtfList(limit),

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
