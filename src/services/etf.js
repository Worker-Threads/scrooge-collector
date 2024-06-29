/** @typedef {import('./types').EtfService} Service */

import { MockData } from '../providers/mock/mock.js';
import { TwelveData } from '../providers/twelve-data/twelveData.js';

export const EtfService = {
  /** @type {Service['getList']} */
  getList: async (limit) => MockData.getEtfList(limit),

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
