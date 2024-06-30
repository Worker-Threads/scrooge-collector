/** @typedef {import('./types').Cmc} Service */

import { config } from '../../../config.js';

export const cmc = {
  /** @type {Service['getTickersList']} */
  getTickersList: async (limit) => {
    /** @type {Record<string, any>} */
    const queryParams = {
      convert: 'USD',
      limit,
    };

    const url = new URL(`${config.cmc.baseUrl}/cryptocurrency/listings/latest`);
    for (const key in queryParams)
      url.searchParams.append(key, queryParams[key]);

    const response = await fetch(url, {
      headers: { 'X-CMC_PRO_API_KEY': config.cmc.apiKey },
    });

    /** @type {{ status: any, data: any[] }} */
    const data = await response.json();

    return data.data.map((t) => ({
      symbol: t.symbol,
      name: t.name,
      marketCap: t.quote.USD.market_cap,
    }));
  },

  /** @type {Service['getFiatCurrenciesList']} */
  getFiatCurrenciesList: async (limit) => {
    /** @type {Record<string, any>} */
    const queryParams = { limit };

    const url = new URL(`${config.cmc.baseUrl}/fiat/map`);
    for (const key in queryParams)
      url.searchParams.append(key, queryParams[key]);

    const response = await fetch(url, {
      headers: { 'X-CMC_PRO_API_KEY': config.cmc.apiKey },
    });

    /** @type {{ status: any, data: any[] }} */
    const data = await response.json();

    return data.data.map((c) => ({
      symbol: c.symbol,
      sign: c.sign,
      name: c.name,
      marketCap: 0,
    }));
  },
};
