import { NextFunction, Request, Response } from 'express';
import { sendResponse } from '../../common/utils';
import { CreateNewQuizRequest } from './validators';
import { createNewQuizService, getQuizByIdService } from './quiz.service';

export const getQuizByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getQuizByIdService(parseInt(req.params?.quizId));

    sendResponse({ res, data });
  } catch (error) {
    next(error);
  }
};

export const createNewQuizController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await createNewQuizService(req.body as CreateNewQuizRequest);

    sendResponse({ res, status: 201, data });
  } catch (error) {
    next(error);
  }
};
