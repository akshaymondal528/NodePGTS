/** Global imports */
import { Response } from 'express';

/** Local imports */
import { StatusCodeType, PaginationType } from './types.utils';

export const STATUSCODE: StatusCodeType = {
  OK: 200,
  BADREQUEST: 400,
  UNAUTH: 401,
  NOTFOUND: 404,
  SERVERERROR: 500,
};

/**
 * @function successResponse
 * @description function to return API success response
 */
export const successResponse = (
  res: Response,
  message: string,
  cached: boolean = false,
  result: Array<unknown> | NonNullable<PaginationType> = []
): object => {
  return res
    .status(STATUSCODE.OK)
    .json({ success: true, message, cached, data: result });
};

/**
 * @function clientErrorResponse
 * @description function to return API client error response
 */
export const clientErrorResponse = (
  res: Response,
  message: string,
  statusCode: number = STATUSCODE.BADREQUEST
): object => {
  return res.status(statusCode).json({ success: false, message });
};

/**
 * @function unAuthResponse
 * @description function to return unauth response
 */
export const unAuthResponse = (res: Response): object => {
  return res
    .status(STATUSCODE.UNAUTH)
    .json({ success: false, message: 'Invalid Token!' });
};

/**
 * @function serverErrorResponse
 * @description function to return API server error response
 */
export const serverErrorResponse = (res: Response): object => {
  return res
    .status(STATUSCODE.SERVERERROR)
    .json({ success: false, message: 'Try again later!' });
};
