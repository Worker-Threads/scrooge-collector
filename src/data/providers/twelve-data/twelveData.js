/** @typedef {import('./types').TwelveData} Service */

import { config } from '../../../config.js';
import { requestMultiLimiter } from '../../../utils/limiter.js';

export const twelveData = {
  /** @type {Service['getLastBar']} */
  getLastBar: async (symbol) => {
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
  getHistory: async (symbol, from, to) => {
    try {
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
      /** @type {{ meta: any, values: any[], status: 'ok' | 'error', message?: string }} */
      const data = await response.json();
      if (data.status === 'error') throw Error(data.message);

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
};
