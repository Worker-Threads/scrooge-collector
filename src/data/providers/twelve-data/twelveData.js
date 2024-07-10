/**
 * @typedef {import('./types').TwelveData} Service
 * @typedef {import('../../../entities/common').AssetType} AssetType
 */

import { config } from '../../../config.js';
import { requestMultiLimiter } from '../../../utils/limiter.js';
import { getUTCDateRounded, getDatesInRange } from './time.js';

/** @type {Record<string, AssetType>} */
const instrumentTypeToAssetType = {
  'Digital Currency': 'crypto',
  ETF: 'etf',
  'Common Stock': 'stock',
  'Physical Currency': 'fiat',
};

/*** @param {number} timestamp */
const getUSDBar = (timestamp) => ({
  identifier: 'USD/USD',
  open: 1,
  high: 1,
  low: 1,
  close: 1,
  timestamp,
});

/**
 * @param {number} from
 * @param {number} to
 */
const getUSDHistory = (from, to) => {
  const range = getDatesInRange(from, to);
  return range.map((ts) => getUSDBar(ts));
};

export const twelveData = {
  /** @type {Service['getLastBar']} */
  getLastBar: async (symbol) => {
    if (symbol === 'USD/USD') return getUSDBar(getUTCDateRounded());
    try {
      const { twelveData } = config;
      await requestMultiLimiter(twelveData.limits);

      /** @type {Record<string, string>} */
      const queryParams = {
        interval: '1day',
        eod: 'true',
        symbol,
        apikey: twelveData.apiKey,
      };

      const url = new URL(`${twelveData.baseUrl}/quote`);
      for (const key in queryParams)
        url.searchParams.append(key, queryParams[key]);

      const response = await fetch(url);
      const data = await response.json();
      if (data.status === 'error') throw Error(data.message);

      const { open, high, low, close, datetime } = data;

      return {
        identifier: symbol,
        open,
        high,
        low,
        close,
        timestamp: new Date(datetime).getTime(),
      };
    } catch (error) {
      console.log({ timestamp: Date.now(), prams: { symbol }, error });
      return null;
    }
  },

  /** @type {Service['getHistory']} */
  getHistory: async (
    symbol,
    type,
    from = config.twelveData.defaultFrom,
    to = config.twelveData.defaultTo,
  ) => {
    try {
      if (symbol === 'USD/USD') return getUSDHistory(from, to);
      const { twelveData } = config;
      await requestMultiLimiter(twelveData.limits);

      const formattedFrom = new Date(from).toISOString().split('T')[0];
      const formattedTo = new Date(to).toISOString().split('T')[0];

      /** @type {Record<string, string>} */
      const queryParams = {
        interval: '1day',
        symbol,
        start_date: formattedFrom,
        end_date: formattedTo,
        apikey: twelveData.apiKey,
      };

      const url = new URL(`${twelveData.baseUrl}/time_series`);
      for (const key in queryParams)
        url.searchParams.append(key, queryParams[key]);

      const response = await fetch(url);
      /** @type {{ meta: { type: string }, values: any[], status: 'ok' | 'error', message?: string }} */
      const data = await response.json();
      if (data.status === 'error') throw Error(data.message);

      const convertedType = instrumentTypeToAssetType[data.meta.type];

      if (convertedType !== type)
        throw Error(
          `Asset type mismatch: requested: "${type}", returned: "${convertedType}"`,
        );

      return data.values.map((v) => ({
        identifier: symbol,
        open: v.open,
        high: v.high,
        low: v.low,
        close: v.close,
        timestamp: new Date(v.datetime).getTime(),
      }));
    } catch (error) {
      console.log({
        timestamp: Date.now(),
        prams: { symbol, from, to },
        error,
      });
      return [];
    }
  },

  /** @type {Service['symbolSearch']} */
  symbolSearch: async (symbol) => {
    try {
      const { twelveData } = config;
      // await requestMultiLimiter(twelveData.limits);

      /** @type {Record<string, any>} */
      const queryParams = { symbol, outputsize: 120 };

      const url = new URL(`${twelveData.baseUrl}/symbol_search`);
      for (const key in queryParams)
        url.searchParams.append(key, queryParams[key]);

      const response = await fetch(url);

      /** @type {{
       * meta: any,
       * data: { symbol: string, instrument_name: string, instrument_type: string }[],
       * status: 'ok' | 'error',
       * message?: string
       * }} */
      const data = await response.json();
      if (data.status === 'error') throw Error(data.message);

      const tickers = data.data
        .map((t) => ({
          symbol: t.symbol,
          name: t.instrument_name,
          type: instrumentTypeToAssetType[t.instrument_type],
        }))
        .filter((t) => !!t.type);

      return tickers;
    } catch (error) {
      console.log({ timestamp: Date.now(), prams: { symbol }, error });
      return [];
    }
  },

  /** @type {Service['tickerInfo']} */
  tickerInfo: async (symbol) => {
    try {
      const { twelveData } = config;
      // await requestMultiLimiter(twelveData.limits);

      /** @type {Record<string, any>} */
      const queryParams = { symbol, apikey: twelveData.apiKey };

      const url = new URL(`${twelveData.baseUrl}/quote`);
      for (const key in queryParams)
        url.searchParams.append(key, queryParams[key]);

      const response = await fetch(url);

      /** @type {{ status?: 'ok' | 'error', message?: string, symbol: string, name: string }} */
      const data = await response.json();
      if (data.status === 'error') throw Error(data.message);

      return { symbol: data.symbol, name: data.name };
    } catch (error) {
      console.log({ timestamp: Date.now(), prams: { symbol }, error });
      return null;
    }
  },
};
