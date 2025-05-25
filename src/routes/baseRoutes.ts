import { Router } from 'express';
import { NotFound } from '../common/errors';
import quizRoutes from '../modules/quiz/quiz.routes';
import usersRoutes from '../modules/user/user.routes';
import resultsRoutes from '../modules/results/results.routes';
import quizSubmissionRoutes from '../modules/quizSubmission/quizSubmission.routes';

const router = Router();

router.use('/quiz', quizRoutes);
router.use('/quiz-submission', quizSubmissionRoutes);
router.use('/results', resultsRoutes);
router.use('/users', usersRoutes);

router.use('*', (_, __, next) => next(NotFound('Route not found')));

export default router;
