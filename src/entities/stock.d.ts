import * as commonTypes from './common.d.ts';

export interface Ticker extends commonTypes.Ticker {}

export interface Bar extends commonTypes.OHLC {
  ticker: string;
}
