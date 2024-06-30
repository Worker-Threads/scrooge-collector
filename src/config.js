import 'dotenv/config';
import { requireEnv } from './utils/env.js';

export const config = {
  pg: {
    host: requireEnv('PG_HOST'),
    port: parseInt(requireEnv('PG_PORT')),
    user: requireEnv('PG_USER'),
    database: requireEnv('PG_DATABASE'),
    password: requireEnv('PG_PASSWORD'),
  },

  twelveData: {
    baseUrl: process.env.TWELVE_DATA_BASE_URL || 'https://api.twelvedata.com',
    apiKey: requireEnv('TWELVE_DATA_API_KEY'),
    limit: {
      rps: parseInt(process.env.TWELVE_DATA_RPS_LIMIT || '8'),
      daily: parseInt(process.env.TWELVE_DATA_DAILY_LIMIT || '800'),
    },
  },

  cmc: {
    baseUrl: process.env.CMC_BASE_URL || 'https://pro-api.coinmarketcap.com/v1',
    apiKey: requireEnv('CMC_API_KEY'),
    limit: {
      rps: parseInt(process.env.CMC_RPS_LIMIT || '30'),
      daily: parseInt(process.env.CMC_DAILY_LIMIT || '330'),
    },
  },
};
