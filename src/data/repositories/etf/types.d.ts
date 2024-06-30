import type { Pool } from 'pg';
import type { AbstractRepo } from '../types.d.ts';
import type { Ticker, Bar } from '../../../entities/etf.d.ts';

export class EtfRepo extends AbstractRepo<Ticker, Bar> {}

export function init(pg: Pool): EtfRepo;
