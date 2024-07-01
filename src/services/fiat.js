/** @typedef {import('./types').Init['fiat']} init */

import { init as initRepo } from '../data/repositories/fiat/main.js';
import { cmc } from '../data/providers/cmc/cmc.js';
import { twelveData } from '../data/providers/twelve-data/twelveData.js';

/** @type {init} */
export const init = (pg) => {
  const fiatRepo = initRepo(pg);

  return {
    getList: async (limit) => fiatRepo.getTickers(limit),

    loadList: async (limit) => {
      const currencyList = await cmc.getFiatCurrenciesList(limit);
      await Promise.all(currencyList.map((t) => fiatRepo.saveTicker(t)));
    },

    loadLastBar: async (currency) => {
      const pair = `${currency}/USD`;
      const lastBar = await twelveData.getLastBar(pair);

      await fiatRepo.saveBar({ ...lastBar, currency });
    },

    loadHistory: async (currency, from, to) => {
      const pair = `${currency}/USD`;
      const history = await twelveData.getHistory(pair, from, to);

      await Promise.all(
        history.map((h) => fiatRepo.saveBar({ ...h, currency })),
      );
    },
  };
};
