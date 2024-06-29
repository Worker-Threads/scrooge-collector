import { Ticker, Bar } from '../../entities/stock.d.ts';

export interface StockProvider {
  getTopTickers: (limit: number) => Promise<Ticker[]>;
  getLastBar: (ticker: string) => Promise<Bar>;
  getHistoricalBars: (
    ticker: string,
    from: number,
    to: number,
  ) => Promise<Bar[]>;
}
