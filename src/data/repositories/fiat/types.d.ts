import type { Pool } from 'pg';
import type { AbstractRepo } from '../types.d.ts';
import type { Currency, Bar } from '../../../entities/fiat.d.ts';

export class FiatRepo extends AbstractRepo<Currency, Bar> {}

export function init(pg: Pool): FiatRepo;
