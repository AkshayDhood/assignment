import { NextFunction, Request, Response } from 'express';
import { sendResponse } from '../../common/utils';
import { createNewUserService } from './user.service';
import { CreateNewUserRequest } from './validators';

export const createNewUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await createNewUserService(req.body as CreateNewUserRequest);

    sendResponse({ res, status: 201, data });
  } catch (error) {
    next(error);
  }
};
