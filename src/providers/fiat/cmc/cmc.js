import { Cmc as config } from '../../../config/providers.js';

/** @type {import('./types').Cmc['getTopCurrencies']} */
export const getTopCurrencies = async (limit) => {
  /** @type {Record<string, any>} */
  const queryParams = { limit };

  const url = new URL(`${config.baseUrl}/fiat/map`);
  for (const key in queryParams) url.searchParams.append(key, queryParams[key]);

  const response = await fetch(url, {
    headers: { 'X-CMC_PRO_API_KEY': config.apiKey },
  });

  /** @type {{ status: any, data: any[] }} */
  const data = await response.json();

  return data.data.map((c) => ({
    symbol: c.symbol,
    sign: c.sign,
    name: c.name,
    marketCap: 0,
  }));
};
