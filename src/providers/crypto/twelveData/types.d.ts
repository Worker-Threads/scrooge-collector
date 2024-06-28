import { Bar } from '../../../entities/crypto.d.ts';

export interface TwelveData {
  getLastBar: (ticker: string) => Promise<Bar>;
  getHistoricalBars: (
    ticker: string,
    from: number,
    to: number,
  ) => Promise<Bar[]>;
}
