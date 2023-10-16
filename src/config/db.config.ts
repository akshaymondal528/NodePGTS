/** Global imports */
import { Pool } from 'pg';

/** Local imports */
import { ENV } from './env.config';

export const pool: Pool = new Pool({
  user: ENV.DB_USER,
  database: ENV.DB_NAME,
  password: ENV.DB_PASSWORD,
  host: ENV.DB_HOST,
  port: ENV.DB_PORT,
  max: ENV.DB_MAX,
  idleTimeoutMillis: ENV.DB_IDLE_TIME,
  connectionTimeoutMillis: ENV.DB_TIME_OUT,
});
