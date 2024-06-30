import { setTimeout } from 'node:timers/promises';
import { createInterface } from 'node:readline';
import { cryptoService } from './services/crypto.js';
import { stockService } from './services/stock.js';
import { etfService } from './services/etf.js';
import { fiatService } from './services/fiat.js';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

/** @type {Record<string, import('./services/types.js').AbstractService>} */
const services = {
  crypto: cryptoService,
  stock: stockService,
  etf: etfService,
  fiat: fiatService,
};

rl.question(
  'Select service (crypto, stock, etf, fiat): ',
  async (selectedProvider) => {
    if (services[selectedProvider]) {
      const provider = services[selectedProvider];

      /** @type {any} */
      const testData = { identifier: null };

      const operations = [
        {
          name: `List of ${selectedProvider}`,
          action: async () => {
            const tickers = await provider.getList(3);
            testData.identifier = tickers[1].symbol;

            return tickers;
          },
        },
        {
          name: 'Last closed day bar',
          action: async () => {
            if (!testData.identifier) return;
            return provider.getLastBar(testData.identifier);
          },
        },
        {
          name: 'OHLC history',
          action: async () => {
            if (!testData.identifier) return;

            const three_days = 3 * 24 * 60 * 60 * 1000;
            const startDate = new Date(Date.now() - three_days).getTime();
            const endDate = Date.now();
            return provider.getHistory(testData.identifier, startDate, endDate);
          },
        },
      ];

      for (const operation of operations) {
        const { name, action } = operation;
        console.log(`Executing operation: "${name}"...`);
        await setTimeout(2000);
        const result = await action();
        console.log({ result });
        await setTimeout(1000);
      }

      rl.close();
    } else {
      console.log('Invalid provider selection.');
      rl.close();
    }
  },
);
