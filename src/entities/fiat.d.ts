import * as commonTypes from './common.d.ts';

export interface Currency extends commonTypes.Ticker {}

export interface Bar extends commonTypes.OHLC {
  currency: string;
}
