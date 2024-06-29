import 'dotenv/config';

import { requireEnv } from './utils.js';

export const TwelveData = {
  baseUrl: process.env.TWELVE_DATA_BASE_URL || 'https://api.twelvedata.com',
  apiKey: requireEnv('TWELVE_DATA_API_KEY'),
  limit: {
    rps: parseInt(process.env.TWELVE_DATA_RPS_LIMIT || '8'),
    daily: parseInt(process.env.TWELVE_DATA_DAILY_LIMIT || '800'),
  },
};

export const Cmc = {
  baseUrl: process.env.CMC_BASE_URL || 'https://pro-api.coinmarketcap.com/v1',
  apiKey: requireEnv('CMC_API_KEY'),
  limit: {
    rps: parseInt(process.env.CMC_RPS_LIMIT || '30'),
    daily: parseInt(process.env.CMC_DAILY_LIMIT || '330'),
  },
};
