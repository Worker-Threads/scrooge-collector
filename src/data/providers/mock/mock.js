/** @typedef {import('./types').MockData} Service */

import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const mockData = {
  /** @type {Service['getEtfList']} */
  getEtfList: async (limit) => {
    const filePath = path.join(__dirname, './data/etf-list.json');
    const data = await fsp.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(data);

    return jsonData.data.slice(0, limit);
  },

  /** @type {Service['getStockList']} */
  getStockList: async (limit) => {
    const filePath = path.join(__dirname, './data/stock-list.json');
    const data = await fsp.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(data);

    return jsonData.data.slice(0, limit);
  },
};
