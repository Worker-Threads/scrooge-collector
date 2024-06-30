/** @typedef {import('./types').TwelveData} Service */

import { config } from '../../../config.js';

export const twelveData = {
  /** @type {Service['getLastBar']} */
  getLastBar: async (symbol) => {
    /** @type {Record<string, string>} */
    const queryParams = {
      interval: '1day',
      eod: 'true',
      symbol,
      apikey: config.twelveData.apiKey,
    };

    const url = new URL(`${config.twelveData.baseUrl}/quote`);
    for (const key in queryParams)
      url.searchParams.append(key, queryParams[key]);

    const response = await fetch(url);
    const data = await response.json();
    const { open, high, low, close, datetime } = data;

    return {
      identifier: symbol,
      open,
      high,
      low,
      close,
      timestamp: new Date(datetime).getTime(),
    };
  },

  /** @type {Service['getHistory']} */
  getHistory: async (symbol, from, to) => {
    const formattedFrom = new Date(from).toISOString().split('T')[0];
    const formattedTo = new Date(to).toISOString().split('T')[0];

    /** @type {Record<string, string>} */
    const queryParams = {
      interval: '1day',
      symbol,
      start_date: formattedFrom,
      end_date: formattedTo,
      apikey: config.twelveData.apiKey,
    };

    const url = new URL(`${config.twelveData.baseUrl}/time_series`);
    for (const key in queryParams)
      url.searchParams.append(key, queryParams[key]);

    const response = await fetch(url);
    /** @type {{ meta: any, values: any[] }} */
    const data = await response.json();

    return data.values.map((v) => ({
      identifier: symbol,
      open: v.open,
      high: v.high,
      low: v.low,
      close: v.close,
      timestamp: new Date(v.datetime).getTime(),
    }));
  },
};
