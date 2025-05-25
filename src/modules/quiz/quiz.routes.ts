import { Router } from 'express';
import { createNewQuizController, getQuizByIdController } from './quiz.controller';
import { validateBody, validateParams } from '../../common/validations';
import { createNewQuizRequestSchema, getQuizByIdRequestSchema } from './validators';

const router = Router();

/**
 * @openapi
 * /quiz/{quizId}:
 *   get:
 *     tags:
 *       - Quiz
 *     summary: Get quiz by id
 *     parameters:
 *       - in: path
 *         name: quizId
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the quiz
 *     responses:
 *       200:
 *         description: Got quiz by id
 *       400:
 *         description: Quiz not found
 */
router.get('/:quizId', validateParams(getQuizByIdRequestSchema), getQuizByIdController);

/**
 * @openapi
 * /quiz:
 *   post:
 *     tags:
 *       - Quiz
 *     summary: Create New Quiz
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - questions
 *             properties:
 *               title:
 *                 type: string
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - text
 *                     - options
 *                   properties:
 *                     text:
 *                       type: string
 *                     options:
 *                       type: array
 *                       minItems: 4
 *                       maxItems: 4
 *                       items:
 *                         type: object
 *                         required:
 *                           - option
 *                         properties:
 *                           option:
 *                             type: string
 *                           correctOption:
 *                             type: boolean
 *     responses:
 *       201:
 *         description: Created New Quiz
 */
router.post('/', validateBody(createNewQuizRequestSchema), createNewQuizController);

export default router;
