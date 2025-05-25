import { Response } from 'express';
import { instanceToPlain } from 'class-transformer';

interface SendResponseFunctionParams {
  res: Response;
  data?: any;
  message?: string;
  status?: number;
}

export const sendResponse = ({
  res,
  data,
  status = 200,
  message = 'Success',
}: SendResponseFunctionParams) => {
  if (data && (typeof data === 'object' || Array.isArray(data))) {
    data = instanceToPlain(data);
  }

  res.status(status).json({
    data,
    message,
  });
};
