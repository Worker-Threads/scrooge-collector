import { selectTickers, insertTicker, insertBar } from './sql.js';

/** @type {import('./types').init} */
export const init = (pool) => ({
  getTickers: async (limit) => {
    const { query, params } = selectTickers(limit);
    const { rows } = await pool.query(query, params);

    return rows.map((r) => {
      const { marketCap, ...rest } = r;

      return { ...rest, marketCap: parseFloat(marketCap) };
    });
  },

  saveTicker: async (ticker) => {
    const { query, params } = insertTicker(ticker);
    await pool.query(query, params);
  },

  saveBar: async (bar) => {
    const { query, params } = insertBar(bar);
    await pool.query(query, params);
  },
});
