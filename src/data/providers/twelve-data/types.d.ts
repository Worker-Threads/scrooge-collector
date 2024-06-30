import type { OHLC } from '../../../entities/common.d.ts';

export interface TwelveData {
  getLastBar: (symbol: string) => Promise<OHLC & { identifier: string }>;
  getHistory: (
    symbol: string,
    from: number,
    to: number,
  ) => Promise<(OHLC & { identifier: string })[]>;
}
