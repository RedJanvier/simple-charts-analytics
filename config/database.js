import { config } from 'dotenv';
import { Pool } from 'pg';

config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export default pool;
