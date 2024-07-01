export interface History {
  load: (from: number, to?: number) => Promise<void>;
}
