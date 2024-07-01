import { selectCurrencies, insertCurrency, insertBar } from './sql.js';

/** @type {import('./types').init} */
export const init = (pool) => ({
  getTickers: async (limit) => {
    const { query, params } = selectCurrencies(limit);
    const { rows } = await pool.query(query, params);

    return rows;
  },

  saveTicker: async (currency) => {
    const { query, params } = insertCurrency(currency);
    await pool.query(query, params);
  },

  saveBar: async (bar) => {
    const { query, params } = insertBar(bar);
    await pool.query(query, params);
  },
});
