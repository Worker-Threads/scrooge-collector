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
    limits: [
      {
        key: 'TwelveData: RPM',
        time: 1000 * 60,
        rate: parseInt(process.env.TWELVE_DATA_REQUESTS_PER_MINUTE || '8'),
      },
      {
        key: 'TwelveData: RPD',
        time: 1000 * 60 * 60 * 24,
        rate: parseInt(process.env.TWELVE_DATA_REQUESTS_PER_DAY || '800'),
      },
    ],
    defaultFrom: 0, // 1970-01-01
    defaultTo: Date.now(),
  },

  cmc: {
    baseUrl: process.env.CMC_BASE_URL || 'https://pro-api.coinmarketcap.com/v1',
    apiKey: requireEnv('CMC_API_KEY'),
    limits: [
      {
        key: 'CMC: RPM',
        time: 1000 * 60,
        rate: parseInt(process.env.CMC_REQUESTS_PER_MINUTE || '30'),
      },
      {
        key: 'CMC: RPD',
        time: 1000 * 60 * 60 * 24,
        rate: parseInt(process.env.CMC_REQUESTS_PER_DAY || '330'),
      },
    ],
  },
};
