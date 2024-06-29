import type { Ticker as TickerE } from '../../entities/etf.d.ts';
import type { Ticker as TickerS } from '../../entities/stock.d.ts';

export interface MockData {
  getEtfList: (limit: number) => Promise<TickerE[]>;
  getStockList: (limit: number) => Promise<TickerS[]>;
}
