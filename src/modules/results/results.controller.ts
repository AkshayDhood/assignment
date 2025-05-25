import { NextFunction, Request, Response } from 'express';
import { sendResponse } from '../../common/utils';
import { getResultByUserIdService } from './results.service';

export const getResultByUserIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = parseInt(req.params?.userId);
    const quizId = parseInt(req.params?.quizId);

    const data = await getResultByUserIdService(userId, quizId);

    sendResponse({ res, data });
  } catch (error) {
    next(error);
  }
};
