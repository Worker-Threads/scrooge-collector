import { Bar } from '../../../entities/etf.d.ts';

export interface TwelveData {
  getLastBar: (ticker: string) => Promise<Bar>;
  getHistoricalBars: (
    ticker: string,
    from: number,
    to: number,
  ) => Promise<Bar[]>;
}
