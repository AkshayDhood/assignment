import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';

// Error Handler
export const errorHandler = (
  err: HttpError | Error,
  _: Request,
  res: Response,
  __: NextFunction,
) => {
  let response: { statusCode: number; message: string; errors?: string[] };
  let statusCode: number;

  if (err instanceof HttpError) {
    statusCode = err.statusCode;
    response = { statusCode, message: err.message, errors: err.errors };
  } else {
    console.log({ err });
    statusCode = 500;
    response = { statusCode, message: 'Internal Server Error' };
  }

  res.status(statusCode).json(response);
};
