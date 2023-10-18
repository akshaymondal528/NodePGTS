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

/** Pagination types interface */
export interface PaginationType {
  totalItem: number;
  totalPages: number;
  currentPage: number;
  previousPage: number;
  nextPage: number;
  data: Array<unknown>;
}

/** Status code types interface */
export interface CustomerDataType {
  customer_id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  postal_code: string;
  country: string;
}
