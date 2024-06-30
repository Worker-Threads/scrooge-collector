import type { Pool } from 'pg';
import type { AbstractRepo } from '../types.d.ts';
import type { Ticker, Bar } from '../../../entities/crypto.d.ts';

export class CryptoRepo extends AbstractRepo<Ticker, Bar> {}

export function init(pg: Pool): CryptoRepo;
