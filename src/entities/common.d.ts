export type AssetType = 'crypto' | 'etf' | 'stock' | 'fiat';

export interface Ticker {
  symbol: string;
  name: string;
}

export interface OHLC {
  open: number;
  high: number;
  low: number;
  close: number;
  timestamp: number;
}
