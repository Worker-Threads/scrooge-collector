/** @typedef {import('./types').FiatService} Service */

import { cmc } from '../providers/cmc/cmc.js';
import { twelveData } from '../providers/twelve-data/twelveData.js';

export const fiatService = {
  /** @type {Service['getList']} */
  getList: async (limit) => cmc.getFiatCurrenciesList(limit),

  /** @type {Service['getLastBar']} */
  getLastBar: async (currency) => {
    const pair = `${currency}/USD`;
    const lastBar = await twelveData.getLastBar(pair);

    return { ...lastBar, currency };
  },

  /** @type {Service['getHistory']} */
  getHistory: async (currency, from, to) => {
    const pair = `${currency}/USD`;
    const history = await twelveData.getHistory(pair, from, to);

    return history.map((h) => ({ ...h, currency }));
  },
};
