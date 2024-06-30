import type { Pool } from 'pg';
import type { AbstractRepo } from '../types.d.ts';
import type { Ticker, Bar } from '../../../entities/stock.d.ts';

export class StockRepo extends AbstractRepo<Ticker, Bar> {}

export function init(pg: Pool): StockRepo;
