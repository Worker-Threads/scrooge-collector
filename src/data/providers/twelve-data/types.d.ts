import type { AssetType, OHLC, Ticker } from '../../../entities/common.d.ts';

export interface TwelveData {
  getLastBar: (
    symbol: string,
  ) => Promise<(OHLC & { identifier: string }) | null>;
  getHistory: (
    symbol: string,
    from: number,
    to: number,
  ) => Promise<(OHLC & { identifier: string })[]>;
  symbolSearch: (symbol: string) => Promise<(Ticker & { type: AssetType })[]>;
  tickerInfo: (symbol: string) => Promise<Ticker | null>;
}
