/** @typedef {import('./types').Init['stock']} init */

import { init as initRepo } from '../data/repositories/stock/main.js';
import { mockData } from '../data/providers/mock/mock.js';
import { twelveData } from '../data/providers/twelve-data/twelveData.js';

/** @type {init} */
export const init = (pg) => {
  const stockRepo = initRepo(pg);

  return {
    getList: async (limit) => stockRepo.getTickers(limit),

    loadList: async (limit) => {
      const tickersList = await mockData.getStockList(limit);
      await Promise.all(tickersList.map((t) => stockRepo.saveTicker(t)));
    },

    loadLastBar: async (ticker) => {
      const lastBar = await twelveData.getLastBar(ticker);

      await stockRepo.saveBar({ ...lastBar, ticker });
    },

    loadHistory: async (ticker, from, to) => {
      const history = await twelveData.getHistory(ticker, from, to);

      await Promise.all(
        history.map((h) => stockRepo.saveBar({ ...h, ticker })),
      );
    },
  };
};
