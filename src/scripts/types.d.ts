type Timeframe = 'm1' | 'm5' | 'm15' | 'm30' | 'h1' | 'h4' | 'd';

export interface Scripts {
  loadHistory: (options: {
    services: string[];
    from: number;
    to: number;
  }) => Promise<void>;
  loadLastBar: (options: { services: string[] }) => Promise<void>;
  initLoadLastBar: (options: {
    services: string[];
    timeframe: Timeframe;
  }) => Promise<void>;
  loadTickers: (options: {
    services: string[];
    limit: number;
  }) => Promise<void>;
}
