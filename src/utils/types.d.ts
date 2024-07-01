interface LimiterConfig {
  key: string;
  rate: number;
  time: number;
}

export interface Utils {
  requireEnv: (env: string) => string;
  requestLimiter: (config: LimiterConfig) => Promise<void>;
  requestMultiLimiter: (configs: LimiterConfig[]) => Promise<void[]>;
}
