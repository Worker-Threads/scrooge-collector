/**
 * @typedef {import('../../../entities/fiat').Currency} Currency
 * @typedef {import('../../../entities/fiat').Bar} Bar
 */

/**
 * @param {number=} limit
 * @returns {{ query: string, params: any[] }}
 */
export const selectCurrencies = (limit) => {
  let query = 'SELECT * FROM fiat.currency';
  const params = [];

  if (limit) {
    query += 'ORDER BY "symbol" LIMIT $1;';
    params.push(limit);
  }

  return { query, params };
};

/**
 * @param {Currency} currency
 * @returns {{ query: string, params: any[] }}
 */
export const insertCurrency = (currency) => {
  const { symbol, sign, name } = currency;
  const query = `
    INSERT INTO fiat.currency
    ("symbol", "sign", "name")
    VALUES ($1, $2, $3)
    ON CONFLICT ("symbol")
    DO UPDATE SET
      "sign" = EXCLUDED."sign",
      "name" = EXCLUDED."name";`;

  const params = [symbol, sign, name];

  return { query, params };
};

/**
 * @param {Bar} bar
 * @returns {{ query: string, params: any[] }}
 */
export const insertBar = (bar) => {
  const { currency, open, high, low, close, timestamp } = bar;
  const query = `
    INSERT INTO fiat.bar_d
    ("currency", "open", "high", "low", "close", "timestamp")
    VALUES ($1, $2, $3, $4, $5, $6)
    ON CONFLICT ("currency", "timestamp")
    DO UPDATE SET
      "open" = EXCLUDED."open",
      "high" = EXCLUDED."high",
      "low" = EXCLUDED."low",
      "close" = EXCLUDED."close";`;

  const params = [currency, open, high, low, close, new Date(timestamp)];

  return { query, params };
};
