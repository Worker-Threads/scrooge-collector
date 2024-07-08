/**
 * @typedef {import('./types').Init['etf']} init
 * @typedef {import('../entities/common').Ticker} Ticker
 */

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

    loadTicker: async (symbol) => {
      const ticker = await twelveData.tickerInfo(symbol);

      if (ticker) {
        await etfRepo.saveTicker({ ...ticker, marketCap: 0 });
        const bars = await twelveData.getHistory(symbol);

        await Promise.all(
          bars.map((bar) => etfRepo.saveBar({ ...bar, ticker: symbol })),
        );
      }

      return { loaded: !!ticker };
    },

    loadLastBar: async (ticker) => {
      const { symbol } = ticker;
      const lastBar = await twelveData.getLastBar(symbol);

      if (lastBar) await etfRepo.saveBar({ ...lastBar, ticker: symbol });
    },

    loadHistory: async (ticker, from, to) => {
      const { symbol } = ticker;
      const bars = await twelveData.getHistory(symbol, from, to);

      await Promise.all(
        bars.map((bar) => etfRepo.saveBar({ ...bar, ticker: symbol })),
      );
    },

    symbolSearch: async (symbol) => {
      const tickers = await twelveData.symbolSearch(symbol);
      const etfTickers = tickers.filter((t) => t.type === 'etf');

      /** @type {Record<string, Ticker>} */
      const uniqueTickersMap = {};

      etfTickers.forEach(({ symbol, name }) => {
        const key = `${symbol}-${name}`;

        if (!uniqueTickersMap[key]) uniqueTickersMap[key] = { symbol, name };
      });

      return tickers.filter((t) => t.type === 'etf');
    },
  };
};
