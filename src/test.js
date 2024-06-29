import { setTimeout } from 'node:timers/promises';
import { createInterface } from 'node:readline';
import * as CryptoProvider from './providers/crypto/main.js';
import * as StockProvider from './providers/stock/main.js';
import * as EtfProvider from './providers/etf/main.js';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

/** @type {Record<string, any>} */
const providers = {
  crypto: CryptoProvider,
  stock: StockProvider,
  etf: EtfProvider,
};

rl.question(
  'Select provider (crypto, stock, etf): ',
  async (selectedProvider) => {
    if (providers[selectedProvider]) {
      const provider = providers[selectedProvider];

      /** @type {null | string} */
      let identifier = null;

      const operations = [
        // get top tickers by market cap
        async () => {
          const tickers = await provider.getTopTickers(3);
          console.log({ tickers });
          identifier = tickers[0].symbol;
        },
        // get ticker last closed day bar
        async () => {
          if (!identifier) return;
          const lastBar = await provider.getLastBar(identifier);
          console.log({ lastBar });
        },
        // get ticker ohlc history
        async () => {
          if (!identifier) return;

          const three_days = 3 * 24 * 60 * 60 * 1000;
          const startDate = new Date(Date.now() - three_days).getTime();
          const endDate = Date.now();
          const bars = await provider.getHistoricalBars(
            identifier,
            startDate,
            endDate,
          );
          console.log({ bars });
        },
      ];

      for (const operation of operations) {
        await operation();
        await setTimeout(2000);
      }

      rl.close();
    } else {
      console.log('Invalid provider selection.');
      rl.close();
    }
  },
);
