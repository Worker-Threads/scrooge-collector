import { TwelveData as config } from '../../../config/providers.js';

/** @type {import('./types.d.ts').TwelveData['getLastBar']} */
export const getLastBar = async (currency) => {
  /** @type {Record<string, string>} */
  const queryParams = {
    interval: '1day',
    eod: 'true',
    // TODO: USD / USD - invalid param.
    symbol: `${currency}/USD`,
    apikey: config.apiKey,
  };

  const url = new URL(`${config.baseUrl}/quote`);
  for (const key in queryParams) url.searchParams.append(key, queryParams[key]);

  const response = await fetch(url);
  const data = await response.json();
  const { open, high, low, close, datetime } = data;

  return {
    currency,
    open,
    high,
    low,
    close,
    timestamp: new Date(datetime).getTime(),
  };
};

/** @type {import('./types').TwelveData['getHistoricalBars']} */
export const getHistoricalBars = async (currency, from, to) => {
  const formattedFrom = new Date(from).toISOString().split('T')[0];
  const formattedTo = new Date(to).toISOString().split('T')[0];

  /** @type {Record<string, string>} */
  const queryParams = {
    interval: '1day',
    symbol: `${currency}/USD`,
    start_date: formattedFrom,
    end_date: formattedTo,
    apikey: config.apiKey,
  };

  const url = new URL(`${config.baseUrl}/time_series`);
  for (const key in queryParams) url.searchParams.append(key, queryParams[key]);

  const response = await fetch(url);
  /** @type {{ meta: any, values: any[] }} */
  const data = await response.json();

  return data.values.map((v) => ({
    currency,
    open: v.open,
    high: v.high,
    low: v.low,
    close: v.close,
    timestamp: new Date(v.datetime).getTime(),
  }));
};
