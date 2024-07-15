/**
 * @typedef {import('../../../entities/etf').Ticker} Ticker
 * @typedef {import('../../../entities/etf').Bar} Bar
 */

/**
 * @param {number} [limit]
 * @returns {{ query: string, params: any[] }}
 */
export const selectTickers = (limit) => {
  let query = 'SELECT * FROM etf.ticker';
  const params = [];

  if (limit) {
    query += 'ORDER BY "symbol" LIMIT $1;';
    params.push(limit);
  }

  return { query, params };
};

/**
 * @param {Ticker} ticker
 * @returns {{ query: string, params: any[] }}
 */
export const insertTicker = (ticker) => {
  const { symbol, name, marketCap } = ticker;
  const query = `
    INSERT INTO etf.ticker
    ("symbol", "name", "marketCap")
    VALUES ($1, $2, $3)
    ON CONFLICT ("symbol")
    DO UPDATE SET
      "name" = EXCLUDED."name",
      "marketCap" = EXCLUDED."marketCap";`;

  const params = [symbol, name, marketCap];

  return { query, params };
};

/**
 * @param {Bar} bar
 * @returns {{ query: string, params: any[] }}
 */
export const insertBar = (bar) => {
  const { ticker, open, high, low, close, timestamp } = bar;
  const query = `
    INSERT INTO etf.bar_d
    ("ticker", "open", "high", "low", "close", "timestamp")
    VALUES ($1, $2, $3, $4, $5, $6)
    ON CONFLICT ("ticker", "timestamp")
    DO UPDATE SET
      "open" = EXCLUDED."open",
      "high" = EXCLUDED."high",
      "low" = EXCLUDED."low",
      "close" = EXCLUDED."close";`;

  const params = [ticker, open, high, low, close, new Date(timestamp)];

  return { query, params };
};
