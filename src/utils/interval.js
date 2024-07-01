/** @typedef {import('./types').Utils} Utils */

import { setTimeout } from 'timers/promises';

/** @type {Utils['getRoundedInterval']} */
export async function* getRoundedInterval(interval, offset) {
  let elapsed = Math.floor(Date.now() / interval);

  while (true) {
    const next = (elapsed + 1) * interval + (offset ?? 0);
    const delay = next - Date.now();
    if (delay > 0) await setTimeout(delay);
    yield next;
    elapsed += 1;
  }
}
