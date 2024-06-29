import * as commonTypes from './common.d.ts';

export interface Currency extends commonTypes.Ticker {
  sign: string;
}

export interface Bar extends commonTypes.OHLC {
  currency: string;
}
