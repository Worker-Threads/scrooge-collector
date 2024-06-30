import { insertCurrency, insertBar } from './sql.js';

/** @type {import('./types').init} */
export const init = (pool) => ({
  saveTicker: async (currency) => {
    const { query, params } = insertCurrency(currency);
    await pool.query(query, params);
  },

  saveBar: async (bar) => {
    const { query, params } = insertBar(bar);
    await pool.query(query, params);
  },
});
