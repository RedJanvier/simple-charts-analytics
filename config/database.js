const { Pool, Client } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// pool.on('connect', (err, client) => {
//     if (err) throw err;

// });

module.exports = pool;