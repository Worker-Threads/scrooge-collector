/** @type {import('./types.d.ts').Top100ByCap['getTopTickersByMarketCap']} */
export const getTopTickersByMarketCap = async (limit) => {
  const module = await import('./top-100.json', { with: { type: 'json' } });

  return module.default.data.splice(0, limit);
};
