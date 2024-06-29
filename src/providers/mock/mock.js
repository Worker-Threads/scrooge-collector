/** @typedef {import('./types').MockData} Service */

export const MockData = {
  /** @type {Service['getEtfList']} */
  getEtfList: async (limit) => {
    const data = await import('./data/etf-list.json', {
      with: { type: 'json' },
    });

    return data.default.data.slice(0, limit);
  },

  /** @type {Service['getStockList']} */
  getStockList: async (limit) => {
    const data = await import('./data/stock-list.json', {
      with: { type: 'json' },
    });

    return data.default.data.slice(0, limit);
  },
};
