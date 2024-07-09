/** @typedef {import('./types').Cmc} Service */

import { config } from '../../../config.js';
import { requestMultiLimiter } from '../../../utils/limiter.js';

export const cmc = {
  /** @type {Service['getTickersList']} */
  getTickersList: async (limit) => {
    try {
      const { cmc } = config;
      await requestMultiLimiter(cmc.limits);

      /** @type {Record<string, any>} */
      const queryParams = {
        convert: 'USD',
        limit,
      };

      const url = new URL(`${cmc.baseUrl}/cryptocurrency/listings/latest`);
      for (const key in queryParams)
        url.searchParams.append(key, queryParams[key]);

      const response = await fetch(url, {
        headers: { 'X-CMC_PRO_API_KEY': cmc.apiKey },
      });

      /** @type {{ status: { error_code: number, error_message: string }, data: any[] }} */
      const data = await response.json();
      if (data.status.error_code !== 0) throw Error(data.status.error_message);

      return data.data.map((t) => ({
        symbol: t.symbol,
        name: t.name,
        marketCap: t.quote.USD.market_cap,
      }));
    } catch (error) {
      console.log({ timestamp: Date.now(), prams: { limit }, error });
      return [];
    }
  },

  /** @type {Service['getFiatCurrenciesList']} */
  getFiatCurrenciesList: async (limit) => {
    try {
      const { cmc } = config;
      await requestMultiLimiter(cmc.limits);

      /** @type {Record<string, any>} */
      const queryParams = { limit };

      const url = new URL(`${cmc.baseUrl}/fiat/map`);
      for (const key in queryParams)
        url.searchParams.append(key, queryParams[key]);

      const response = await fetch(url, {
        headers: { 'X-CMC_PRO_API_KEY': cmc.apiKey },
      });

      /** @type {{ status: { error_code: number, error_message: string }, data: any[] }} */
      const data = await response.json();
      if (data.status.error_code !== 0) throw Error(data.status.error_message);

      return data.data.map((c) => ({
        symbol: c.symbol,
        sign: c.sign,
        name: c.name,
        marketCap: 0,
      }));
    } catch (error) {
      console.log({ timestamp: Date.now(), prams: { limit }, error });
      return [];
    }
  },

  /** @type {Service['getTickerLogo']} */
  getTickerLogo: async (symbol) => {
    try {
      const { cmc } = config;
      await requestMultiLimiter(cmc.limits);

      const url = new URL(`${cmc.baseUrl}/cryptocurrency/info`);
      url.searchParams.append('symbol', symbol);

      const response = await fetch(url, {
        headers: { 'X-CMC_PRO_API_KEY': cmc.apiKey },
      });

      /** @type {{ status: { error_code: number, error_message: string }, data: any }} */
      const data = await response.json();
      if (data.status.error_code !== 0) throw Error(data.status.error_message);

      return data.data[symbol].logo;
    } catch (error) {
      console.log({ timestamp: Date.now(), params: { symbol }, error });
      return undefined;
    }
  },
};
