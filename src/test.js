import {
  getTopTickers,
  getLastBar,
  getHistoricalBars,
} from './providers/crypto/main.js';

const tickers = await getTopTickers();
console.log({ tickers });

const lastBar = await getLastBar('BTC');
console.log({ lastBar });

const bars = await getHistoricalBars(
  'BTC',
  new Date('2024-01-01').getTime(),
  new Date('2024-02-01').getTime(),
);
console.log({ bars });
