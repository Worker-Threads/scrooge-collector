import type { OHLC, Ticker } from '../entities/common.d.ts';
import type * as CryptoT from '../entities/crypto.d.ts';
import type * as EtfT from '../entities/etf.d.ts';
import type * as StockT from '../entities/stock.d.ts';
import type * as FiatT from '../entities/fiat.d.ts';

export interface AbstractService {
  getList(limit: number): Promise<Ticker[]>;
  getHistory(identifier: string, from: number, to: number): Promise<OHLC[]>;
  getLastBar(identifier: string): Promise<OHLC>;
}

export class CryptoService implements AbstractService {
  getList: (limit: number) => Promise<CryptoT.Ticker[]>;
  getLastBar: (ticker: string) => Promise<CryptoT.Bar>;
  getHistory: (
    ticker: string,
    from: number,
    to: number,
  ) => Promise<CryptoT.Bar[]>;
}

export class EtfService implements AbstractService {
  getList: (limit: number) => Promise<Ticker[]>;
  getLastBar: (ticker: string) => Promise<EtfT.Bar>;
  getHistory: (ticker: string, from: number, to: number) => Promise<EtfT.Bar[]>;
}

export class StockService implements AbstractService {
  getList: (limit: number) => Promise<Ticker[]>;
  getLastBar: (ticker: string) => Promise<StockT.Bar>;
  getHistory: (
    ticker: string,
    from: number,
    to: number,
  ) => Promise<StockT.Bar[]>;
}

export class FiatService implements AbstractService {
  getList: (limit: number) => Promise<FiatT.Currency[]>;
  getLastBar: (ticker: string) => Promise<FiatT.Bar>;
  getHistory: (
    ticker: string,
    from: number,
    to: number,
  ) => Promise<FiatT.Bar[]>;
}
