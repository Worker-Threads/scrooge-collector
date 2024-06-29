/** @typedef {import('./types').FiatService} Service */

import { Cmc } from '../providers/cmc/cmc.js';
import { TwelveData } from '../providers/twelve-data/twelveData.js';

export const FiatService = {
  /** @type {Service['getList']} */
  getList: async (limit) => Cmc.getFiatCurrenciesList(limit),

  /** @type {Service['getLastBar']} */
  getLastBar: async (currency) => {
    const pair = `${currency}/USD`;
    const lastBar = await TwelveData.getLastBar(pair);

    return { ...lastBar, currency };
  },

  /** @type {Service['getHistory']} */
  getHistory: async (currency, from, to) => {
    const pair = `${currency}/USD`;
    const history = await TwelveData.getHistory(pair, from, to);

    return history.map((h) => ({ ...h, currency }));
  },
};
