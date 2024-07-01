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
        key: 'twelveData_rpm',
        time: 1000 * 60,
        rate: parseInt(process.env.TWELVE_DATA_REQUESTS_PER_MINUTE || '8'),
      },
      {
        key: 'twelveData_rpd',
        time: 1000 * 60 * 60 * 24,
        rate: parseInt(process.env.TWELVE_DATA_REQUESTS_PER_DAY || '800'),
      },
    ],
  },

  cmc: {
    baseUrl: process.env.CMC_BASE_URL || 'https://pro-api.coinmarketcap.com/v1',
    apiKey: requireEnv('CMC_API_KEY'),
    limits: [
      {
        key: 'cmc_rpm',
        time: 1000 * 60,
        rate: parseInt(process.env.CMC_REQUESTS_PER_MINUTE || '30'),
      },
      {
        key: 'cmc_rpd',
        time: 1000 * 60 * 60 * 24,
        rate: parseInt(process.env.CMC_REQUESTS_PER_DAY || '330'),
      },
    ],
  },
};
