import { config } from 'dotenv';
import { Pool, Client } from 'pg';

config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// pool.on('connect', (err, client) => {
//     if (err) throw err;

// });

export default pool;
