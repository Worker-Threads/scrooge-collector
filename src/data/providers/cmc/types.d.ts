import type { Ticker } from '../../../entities/crypto.d.ts';
import type { Currency } from '../../../entities/fiat.d.ts';

export interface Cmc {
  getTickersList: (limit: number) => Promise<Ticker[]>;
  getFiatCurrenciesList: (limit: number) => Promise<Currency[]>;
}
