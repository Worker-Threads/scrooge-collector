import pg from 'pg';
import { config } from './config.js';
import { init } from './services/crypto.js';

const pool = new pg.Pool(config.pg);
const service = init(pool);

const list = await service.getList(10);

console.log(list);

await pool.end();
