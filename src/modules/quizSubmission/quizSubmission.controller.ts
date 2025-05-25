import { NextFunction, Request, Response } from 'express';
import { sendResponse } from '../../common/utils';
import { SubmitAnswerToQuestionRequest } from './validators';
import { submitAnswerToQuestionService } from './quizSubmission.service';

export const submitAnswerToQuestionController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await submitAnswerToQuestionService(req.body as SubmitAnswerToQuestionRequest);

    sendResponse({ res, data });
  } catch (error) {
    next(error);
  }
};
