import type { Pool } from 'pg';
import type { Ticker } from '../entities/common.d.ts';
import type * as CryptoT from '../entities/crypto.d.ts';
import type * as EtfT from '../entities/etf.d.ts';
import type * as StockT from '../entities/stock.d.ts';
import type * as FiatT from '../entities/fiat.d.ts';

export class AbstractService<T = Ticker> {
  getList(limit?: number): Promise<T[]>;
  loadList(limit: number): Promise<void>;
  loadLastBar(ticker: T): Promise<void>;
  loadHistory(ticker: T, from: number, to: number): Promise<void>;
}

export class CryptoService extends AbstractService<CryptoT.Ticker> {}

export class EtfService extends AbstractService<EtfT.Ticker> {}

export class StockService extends AbstractService<StockT.Ticker> {}

export class FiatService extends AbstractService<FiatT.Currency> {}

export interface Init {
  crypto: (pg: Pool) => CryptoService;
  etf: (pg: Pool) => EtfService;
  stock: (pg: Pool) => StockService;
  fiat: (pg: Pool) => FiatService;
}
