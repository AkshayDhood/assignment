import Joi from 'joi';

export interface GetQuizByIdRequest {
  quizId: number;
}

export const getQuizByIdRequestSchema = Joi.object<GetQuizByIdRequest>({
  quizId: Joi.number().integer().required(),
});
