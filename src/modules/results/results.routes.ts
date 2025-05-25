import { Router } from 'express';
import { getResultByUserIdController } from './results.controller';
import { validateParams } from '../../common/validations';
import { getResultByUserIdRequestSchema } from './validators';

const router = Router();

/**
 * @openapi
 * /results/{userId}/{quizId}:
 *   get:
 *     tags:
 *       - Results
 *     summary: Submit answer to quiz question
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the user
 *       - in: path
 *         name: quizId
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the quiz
 *     responses:
 *       200:
 *         description: Submitted answer to quiz question
 */
router.get(
  '/:userId/:quizId',
  validateParams(getResultByUserIdRequestSchema),
  getResultByUserIdController,
);

export default router;
