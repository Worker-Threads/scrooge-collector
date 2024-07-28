import type * as CommonTypes from './common.d.ts';

export interface Currency extends CommonTypes.Ticker {
  sign: string;
}

export interface Bar extends CommonTypes.OHLC {
  ticker: string;
}
