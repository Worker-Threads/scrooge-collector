import { insertTicker, insertBar } from './sql.js';

/** @type {import('./types').init} */
export const init = (pool) => ({
  saveTicker: async (ticker) => {
    const { query, params } = insertTicker(ticker);
    await pool.query(query, params);
  },

  saveBar: async (bar) => {
    const { query, params } = insertBar(bar);
    await pool.query(query, params);
  },
});
