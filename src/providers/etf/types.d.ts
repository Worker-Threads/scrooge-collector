import { Ticker, Bar } from '../../entities/etf.d.ts';

export interface EtfProvider {
  getTopTickers: (limit: number) => Promise<Ticker[]>;
  getLastBar: (ticker: string) => Promise<Bar>;
  getHistoricalBars: (
    ticker: string,
    from: number,
    to: number,
  ) => Promise<Bar[]>;
}
