import type * as CommonTypes from './common.d.ts';

export interface Ticker extends CommonTypes.Ticker {
  marketCap: number;
  logo?: string;
}

export interface Bar extends CommonTypes.OHLC {
  ticker: string;
}
