import { Currency, Bar } from '../../entities/fiat.d.ts';

export interface FiatProvider {
  getTopTickers: (limit: number) => Promise<Currency[]>;
  getLastBar: (ticker: string) => Promise<Bar>;
  getHistoricalBars: (
    ticker: string,
    from: number,
    to: number,
  ) => Promise<Bar[]>;
}
