const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL || '';
const poolConfig = {
  connectionString,
  ssl: { rejectUnauthorized: false },
  max: parseInt(process.env.PG_MAX_CLIENTS || '6', 10),
  idleTimeoutMillis: parseInt(process.env.PG_IDLE_MS || '30000', 10),
  connectionTimeoutMillis: parseInt(process.env.PG_CONN_TIMEOUT_MS || '2000', 10),
};

// Reuse pool across lambda invocations (Vercel serverless)
if (!global.__pgPool) {
  global.__pgPool = new Pool(poolConfig);
}

module.exports = global.__pgPool;
