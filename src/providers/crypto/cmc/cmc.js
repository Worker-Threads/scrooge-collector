import { Cmc as config } from '../../../config/providers.js';

/** @type {import('./types').Cmc['getTopTickersByMarketCap']} */
export const getTopTickersByMarketCap = async (limit) => {
  /** @type {Record<string, any>} */
  const queryParams = {
    convert: 'USD',
    limit,
  };

  const url = new URL(`${config.baseUrl}/cryptocurrency/listings/latest`);
  for (const key in queryParams) url.searchParams.append(key, queryParams[key]);

  const response = await fetch(url, {
    headers: { 'X-CMC_PRO_API_KEY': config.apiKey },
  });

  /** @type {{ status: any, data: any[] }} */
  const data = await response.json();

  return data.data.map((t) => ({
    symbol: t.symbol,
    name: t.name,
    marketCap: t.quote.USD.market_cap,
  }));
};
