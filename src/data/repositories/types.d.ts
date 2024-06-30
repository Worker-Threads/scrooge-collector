import type { OHLC, Ticker } from '../../entities/common.d.ts';

export class AbstractRepo<T extends Ticker, B extends OHLC> {
  saveTicker: (ticker: T) => Promise<void>;
  saveBar: (bar: B) => Promise<void>;
}
