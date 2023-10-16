/** Global imports */
import { Request, Response } from 'express';
import { RedisClientType } from 'redis';
import { QueryResult } from 'pg';

/** Local imports */
import { successResponse, serverErrorResponse } from '../utils/response.utils';
import { CustomerDataType } from '../utils/types.utils';
import { pool } from '../config/db.config';
import { Redis } from '../config/redis.config';

/**
 * @function getAllCustomers
 * @description function to get all customers
 * @method get
 * @author Akshay
 */
export const getAllCustomers = async (
  req: Request,
  res: Response
): Promise<object> => {
  try {
    const client: RedisClientType = await Redis();
    const getRedisData: string | null = client
      ? await client.get('/api/v1/customers')
      : null;
    let cached: boolean = false;
    let result: Array<CustomerDataType> = [];
    if (!getRedisData) {
      const data: QueryResult = await pool.query(
        `SELECT * FROM customer ORDER BY customer_id ASC;`
      );
      if (data.rows && Array.isArray(data.rows) && data.rows.length > 0) {
        await client.set('/api/v1/customers', JSON.stringify(data.rows), {
          EX: 60 * 60, // 1 hour
        });
        result = data.rows;
      }
    } else {
      cached = true;
      result = JSON.parse(getRedisData);
    }
    return successResponse(res, 'Customers', cached, result);
  } catch (error) {
    return serverErrorResponse(res);
  }
};

/**
 * @function getCustomerById
 * @description function to customer by id
 * @method get
 * @author Akshay
 */
export const getCustomerById = async (
  req: Request,
  res: Response
): Promise<object> => {
  try {
    const client: RedisClientType = await Redis();
    const id: number = Number(req.params.id);
    const getRedisData: string | null = client
      ? await client.get(`/api/v1/customers/${id}`)
      : null;
    let cached: boolean = false;
    let result: Array<CustomerDataType> = [];
    if (!getRedisData) {
      const data: QueryResult = await pool.query(
        `SELECT * FROM customer WHERE customer_id = ${id}`
      );
      if (data.rows && Array.isArray(data.rows) && data.rows.length > 0) {
        await client.set(`/api/v1/customers/${id}`, JSON.stringify(data.rows), {
          EX: 60 * 60, // 1 hour
        });
        result = data.rows;
      }
    } else {
      cached = true;
      result = JSON.parse(getRedisData);
    }
    return successResponse(res, 'Customers', cached, result);
  } catch (error) {
    return serverErrorResponse(res);
  }
};
