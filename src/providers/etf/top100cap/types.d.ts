import { Ticker } from '../../../entities/stock.d.ts';

export interface Top100ByCap {
  getTopTickersByMarketCap: (limit: number) => Promise<Ticker[]>;
}
