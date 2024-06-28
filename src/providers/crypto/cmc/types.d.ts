import { Ticker } from '../../../entities/crypto.d.ts';

export interface Cmc {
  getTopTickersByMarketCap: (limit: number) => Promise<Ticker[]>;
}
