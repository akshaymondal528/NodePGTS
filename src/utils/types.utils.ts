/** ENV types interface */
export interface EnvType {
  NODE_ENV: string;
  PORT: number;
  DB_USER: string;
  DB_NAME: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_MAX: number;
  DB_IDLE_TIME: number;
  DB_TIME_OUT: number;
  REDIS_URI: string;
}

/** Status code types interface */
export interface StatusCodeType {
  OK: number;
  BADREQUEST: number;
  UNAUTH: number;
  NOTFOUND: number;
  SERVERERROR: number;
}

/** Status code types interface */
export interface CustomerDataType {
  customer_id: number;
  store_id: number;
  first_name: string;
  last_name: string;
  email: string;
  address_id: number;
  activebool: boolean;
  create_date: string;
  last_update: string;
  active: number;
}
