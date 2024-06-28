export interface Ticker {
  symbol: string;
  name: string;
  marketCap: number;
}

export interface OHLC {
  open: number;
  high: number;
  low: number;
  close: number;
  timestamp: number;
}
