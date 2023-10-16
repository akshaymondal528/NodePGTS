/** Global imports */
import dotenv from 'dotenv';

/** Local imports */
import { EnvType } from '../utils/types.utils';

dotenv.config();

export const ENV: EnvType = {
  /** Node environment */
  NODE_ENV: process.env.NODE_ENV,
  /** Port */
  PORT: Number(process.env.PORT),
  /** DB configuration */
  DB_USER: process.env.DB_USER,
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: Number(process.env.DB_PORT),
  DB_MAX: Number(process.env.DB_MAX),
  DB_IDLE_TIME: Number(process.env.DB_IDLE_TIME),
  DB_TIME_OUT: Number(process.env.DB_TIME_OUT),
  /** Redis URI */
  REDIS_URI: process.env.REDIS_URI,
};
