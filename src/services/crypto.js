/** @typedef {import('./types').Init['crypto']} init */

import { init as initRepo } from '../data/repositories/crypto/main.js';
import { cmc } from '../data/providers/cmc/cmc.js';
import { twelveData } from '../data/providers/twelve-data/twelveData.js';

/** @type {init} */
export const init = (pg) => {
  const cryptoRepo = initRepo(pg);

  return {
    getList: async (limit) => cryptoRepo.getTickers(limit),

    loadList: async (limit) => {
      const tickersList = await cmc.getTickersList(limit);
      await Promise.all(tickersList.map((t) => cryptoRepo.saveTicker(t)));
    },

    loadLastBar: async (ticker) => {
      const { symbol } = ticker;

      const pair = `${symbol}/USD`;
      const lastBar = await twelveData.getLastBar(pair);

      if (lastBar) await cryptoRepo.saveBar({ ...lastBar, ticker: symbol });
    },

    loadHistory: async (ticker, from, to) => {
      const { symbol } = ticker;

      const pair = `${symbol}/USD`;
      const history = await twelveData.getHistory(pair, from, to);

      await Promise.all(
        history.map((h) => cryptoRepo.saveBar({ ...h, ticker: symbol })),
      );
    },
  };
};
