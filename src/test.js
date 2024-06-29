import { setTimeout } from 'node:timers/promises';
import { createInterface } from 'node:readline';
import { CryptoService } from './services/crypto.js';
import { StockService } from './services/stock.js';
import { EtfService } from './services/etf.js';
import { FiatService } from './services/fiat.js';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

/** @type {Record<string, import('./services/types.js').AbstractService>} */
const services = {
  crypto: CryptoService,
  stock: StockService,
  etf: EtfService,
  fiat: FiatService,
};

rl.question(
  'Select service (crypto, stock, etf, fiat): ',
  async (selectedProvider) => {
    if (services[selectedProvider]) {
      const provider = services[selectedProvider];

      /** @type {null | string} */
      let identifier = null;

      const operations = [
        // get top tickers by market cap
        async () => {
          const tickers = await provider.getList(3);
          console.log({ tickers });
          identifier = tickers[1].symbol;
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
          const bars = await provider.getHistory(
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
