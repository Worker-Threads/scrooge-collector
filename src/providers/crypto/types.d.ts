import { Ticker, Bar } from '../../entities/crypto.d.ts';

export interface CryptoProvider {
  getTopTickers: (limit: number) => Promise<Ticker[]>;
  getLastBar: (ticker: string) => Promise<Bar>;
  getHistoricalBars: (
    ticker: string,
    from: number,
    to: number,
  ) => Promise<Bar[]>;
}
