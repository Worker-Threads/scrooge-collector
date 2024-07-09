/**
 * @typedef {import('./types').Init['crypto']} init
 * @typedef {import('../entities/common').Ticker} Ticker
 */

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

    loadTicker: async (symbol) => {
      const pair = `${symbol}/USD`;
      const ticker = await twelveData.tickerInfo(pair);
      const bars = await twelveData.getHistory(pair, 'crypto');
      if (!ticker || !bars.length) return { loaded: false };

      const logo = await cmc.getTickerLogo(symbol);
      await cryptoRepo.saveTicker({
        logo,
        symbol: ticker.symbol.split('/USD')[0],
        name: ticker.name.split(' US Dollar')[0],
        marketCap: 0,
      });

      await Promise.all(
        bars.map((bar) => cryptoRepo.saveBar({ ...bar, ticker: symbol })),
      );

      return { loaded: true };
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
      const bars = await twelveData.getHistory(pair, 'crypto', from, to);

      await Promise.all(
        bars.map((bar) => cryptoRepo.saveBar({ ...bar, ticker: symbol })),
      );
    },

    symbolSearch: async (symbol) => {
      const tickers = await twelveData.symbolSearch(symbol);
      const cryptoTickers = tickers.filter(
        (t) => t.type === 'crypto' && t.symbol.endsWith('/USD'),
      );

      /** @type {Record<string, Ticker>} */
      const uniqueTickersMap = {};

      cryptoTickers.forEach((t) => {
        const symbol = t.symbol.split('/USD')[0];
        const name = t.name.split(' US Dollar')[0];
        const key = `${symbol}-${name}`;

        if (!uniqueTickersMap[key]) uniqueTickersMap[key] = { symbol, name };
      });

      return Object.values(uniqueTickersMap);
    },
  };
};
