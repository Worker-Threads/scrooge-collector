/** @typedef {import('./types').Utils} Utils */

import { setTimeout } from 'timers/promises';

/** @type {Record<string, { used: number, expiresIn: number }>} */
const registry = {};

/** @type {Utils['requestLimiter']} */
export const requestLimiter = async ({ key, rate, time }) => {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const expired = !registry[key] || registry[key].expiresIn <= Date.now();
    if (expired) registry[key] = { used: 0, expiresIn: Date.now() + time };

    const limit = registry[key];
    limit.used += 1;

    if (limit.used < rate) break;

    console.log(
      `Awaiting ${(limit.expiresIn - Date.now()) / 1000}s for "${key}" request limit reset...`,
    );
    await setTimeout(time);
  }
};

/** @type {Utils['requestMultiLimiter']} */
export const requestMultiLimiter = (configs) =>
  Promise.all(configs.map((c) => requestLimiter(c)));
