const { Pool, Client } = require('pg');

const pool = new Pool({ connectionString: 'postgres://RedJanvier:Jannyda1@localhost:5432/elite' });

// pool.on('connect', (err, client) => {
//     if (err) throw err;

// });

module.exports = pool;