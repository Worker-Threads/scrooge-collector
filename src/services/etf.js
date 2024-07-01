/** @typedef {import('./types').Init['etf']} init */

import { init as initRepo } from '../data/repositories/etf/main.js';
import { mockData } from '../data/providers/mock/mock.js';
import { twelveData } from '../data/providers/twelve-data/twelveData.js';

/** @type {init} */
export const init = (pg) => {
  const etfRepo = initRepo(pg);

  return {
    getList: async (limit) => etfRepo.getTickers(limit),

    loadList: async (limit) => {
      const tickersList = await mockData.getEtfList(limit);
      await Promise.all(tickersList.map((t) => etfRepo.saveTicker(t)));
    },

    loadLastBar: async (ticker) => {
      const { symbol } = ticker;
      const lastBar = await twelveData.getLastBar(symbol);

      if (lastBar) await etfRepo.saveBar({ ...lastBar, ticker: symbol });
    },

    loadHistory: async (ticker, from, to) => {
      const { symbol } = ticker;
      const history = await twelveData.getHistory(symbol, from, to);

      await Promise.all(
        history.map((h) => etfRepo.saveBar({ ...h, ticker: symbol })),
      );
    },
  };
};
