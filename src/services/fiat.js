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

    // All currencies are already loaded.
    loadTicker: async () => ({ loaded: false }),

    loadLastBar: async (currency) => {
      const { symbol } = currency;
      const pair = `${symbol}/USD`;
      const lastBar = await twelveData.getLastBar(pair);

      if (lastBar) await fiatRepo.saveBar({ ...lastBar, currency: symbol });
    },

    loadHistory: async (currency, from, to) => {
      const { symbol } = currency;
      const pair = `${symbol}/USD`;
      const history = await twelveData.getHistory(pair, from, to);

      await Promise.all(
        history.map((h) => fiatRepo.saveBar({ ...h, currency: symbol })),
      );
    },

    // All currencies are already loaded.
    symbolSearch: async (symbol) => [],
  };
};
