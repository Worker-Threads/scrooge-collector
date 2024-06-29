import type * as CommonTypes from './common.d.ts';

export interface Ticker extends CommonTypes.Ticker {
  marketCap: number;
}

export interface Bar extends CommonTypes.OHLC {
  ticker: string;
}
