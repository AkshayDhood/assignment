import { Router } from 'express';
import { submitAnswerToQuestionController } from './quizSubmission.controller';
import { validateBody } from '../../common/validations';
import { submitAnswerToQuestionRequestSchema } from './validators';

const router = Router();

/**
 * @openapi
 * /quiz-submission/submit:
 *   post:
 *     tags:
 *       - Quiz Submission
 *     summary: Submit answer to quiz question
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - quizId
 *               - questionId
 *               - optionId
 *             properties:
 *               userId:
 *                 type: number
 *               quizId:
 *                 type: number
 *               questionId:
 *                 type: number
 *               optionId:
 *                 type: number
 *     responses:
 *       200:
 *         description: Submitted answer to quiz question
 */
router.post(
  '/submit',
  validateBody(submitAnswerToQuestionRequestSchema),
  submitAnswerToQuestionController,
);

export default router;
