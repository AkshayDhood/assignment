import Joi from 'joi';

export interface SubmitAnswerToQuestionRequest {
  userId: number;
  quizId: number;
  questionId: number;
  optionId: number;
}

export const submitAnswerToQuestionRequestSchema = Joi.object<SubmitAnswerToQuestionRequest>({
  userId: Joi.number().integer().required(),
  quizId: Joi.number().integer().required(),
  questionId: Joi.number().integer().required(),
  optionId: Joi.number().integer().required(),
});
