/** Global imports */
import { Request, Response } from 'express';
import { RedisClientType } from 'redis';

/** Local imports */
import { successResponse, serverErrorResponse } from '../utils/response.utils';
import { CustomerDataType, PaginationType } from '../utils/types.utils';
import { pool } from '../config/db.config';
import { Redis } from '../config/redis.config';
import CustomerPGQuery from '../helpers/customer.query.helpers';

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
    const cached: boolean = false;

    const paginate: NonNullable<PaginationType> = {
      totalItem: 0,
      totalPages: 1,
      currentPage: 1,
      previousPage: 1,
      nextPage: 1,
      data: [],
    };

    let allCustomerQuery: string = CustomerPGQuery.allCustomersQuery();
    const { rowCount }: { rowCount: number } = await pool.query(
      allCustomerQuery
    );
    let page: number = req.query.page ? Number(req.query.page) : 1;
    let count = rowCount;
    if (count <= 0) count += 1;
    const limit: number = req.query.limit ? Number(req.query.limit) : rowCount;
    let offset: number = (page - 1) * limit;
    if (offset > count) {
      page = 1;
      offset = 0;
    }
    const totalPages = Math.ceil(count / limit);

    allCustomerQuery = allCustomerQuery + `OFFSET ${offset} LIMIT ${limit}`;
    const { rows }: { rows: Array<CustomerDataType> } = await pool.query(
      allCustomerQuery
    );

    paginate.totalItem = rowCount;
    paginate.totalPages = totalPages;
    paginate.currentPage = page;
    paginate.previousPage = page - 1 === 0 ? page : page - 1;
    paginate.nextPage = page + 1 > totalPages ? page : page + 1;
    paginate.data = rows;

    return successResponse(res, 'Customers', cached, paginate);
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
    let cached = false;
    const id: number = Number(req.params.id);

    const client: RedisClientType = await Redis();
    const clientKey: string = `/api/v1/customers/${id}`;
    const getRCData: string | null = client
      ? await client.get(clientKey)
      : null;

    let result: Array<CustomerDataType> = [];
    if (!getRCData) {
      const customerQuery: string = CustomerPGQuery.customersByIDQuery(id);
      const { rows }: { rows: Array<CustomerDataType> } = await pool.query(
        customerQuery
      );
      if (rows && Array.isArray(rows) && rows.length > 0) {
        await client.set(clientKey, JSON.stringify(rows), { EX: 60 * 10 });
        result = rows;
      }
    } else {
      cached = true;
      result = JSON.parse(getRCData);
    }

    return successResponse(res, 'Customers', cached, result);
  } catch (error) {
    return serverErrorResponse(res);
  }
};
