export interface History {
  load: (options: {
    services: string[];
    from: number;
    to: number;
  }) => Promise<void>;
}
