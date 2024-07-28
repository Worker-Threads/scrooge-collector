import { init as initRepo } from '../data/repositories/fiat/main.js';
import { cmc } from '../data/providers/cmc/cmc.js';
import { twelveData } from '../data/providers/twelve-data/twelveData.js';

/** @type {import('./types').Init['fiat']} */
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

    loadLastBar: async (ticker) => {
      const { symbol } = ticker;
      const pair = `${symbol}/USD`;
      const lastBar = await twelveData.getLastBar(pair);

      if (lastBar) await fiatRepo.saveBar({ ...lastBar, ticker: symbol });
    },

    loadHistory: async (ticker, from, to) => {
      const { symbol } = ticker;
      const pair = `${symbol}/USD`;
      const history = await twelveData.getHistory(pair, 'fiat', from, to);

      await Promise.all(
        history.map((h) => fiatRepo.saveBar({ ...h, ticker: symbol })),
      );
    },

    // All currencies are already loaded.
    symbolSearch: async (symbol) => [],
  };
};
