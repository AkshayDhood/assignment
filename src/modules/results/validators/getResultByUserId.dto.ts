import Joi from 'joi';

export interface GetResultByUserIdRequest {
  userId: number;
  quizId: number;
}

export const getResultByUserIdRequestSchema = Joi.object<GetResultByUserIdRequest>({
  userId: Joi.number().integer().required(),
  quizId: Joi.number().integer().required(),
});
