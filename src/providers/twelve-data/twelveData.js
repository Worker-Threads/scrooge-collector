/** @typedef {import('./types').TwelveData} Service */

import { twelveData as config } from '../../config/providers.js';

export const twelveData = {
  /** @type {Service['getLastBar']} */
  getLastBar: async (symbol) => {
    /** @type {Record<string, string>} */
    const queryParams = {
      interval: '1day',
      eod: 'true',
      symbol,
      apikey: config.apiKey,
    };

    const url = new URL(`${config.baseUrl}/quote`);
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
    console.log({ symbol });
    const formattedFrom = new Date(from).toISOString().split('T')[0];
    const formattedTo = new Date(to).toISOString().split('T')[0];

    /** @type {Record<string, string>} */
    const queryParams = {
      interval: '1day',
      symbol,
      start_date: formattedFrom,
      end_date: formattedTo,
      apikey: config.apiKey,
    };

    const url = new URL(`${config.baseUrl}/time_series`);
    for (const key in queryParams)
      url.searchParams.append(key, queryParams[key]);

    const response = await fetch(url);
    /** @type {{ meta: any, values: any[] }} */
    const data = await response.json();

    console.log({ data });

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
