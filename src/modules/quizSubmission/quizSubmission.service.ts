import { appDataSource } from '../../common/database';
import { AnswersEntity } from '../../common/entities';
import { NotFound } from '../../common/errors';
import {
  createNewResultRepo,
  createOrUpdateAnswerInResult,
  getOptionByIdRepo,
  getQuestionByIdRepo,
  getQuizByIdRepo,
  getResultsForSpecificQuizOfUserRepo,
  getUserByIdRepo,
  updateResultRepo,
} from './quizSubmission.repository';
import { SubmitAnswerToQuestionRequest } from './validators';

export const submitAnswerToQuestionService = async ({
  userId,
  questionId,
  quizId,
  optionId,
}: SubmitAnswerToQuestionRequest): Promise<{ message: string; correctAnswer?: string }> => {
  return appDataSource.transaction(async manager => {
    const [user, quiz, question, option] = await Promise.all([
      getUserByIdRepo(manager, userId),
      getQuizByIdRepo(manager, quizId),
      getQuestionByIdRepo(manager, questionId),
      getOptionByIdRepo(manager, optionId),
    ]);

    if (!user) throw NotFound('User not found!');
    if (!quiz) throw NotFound('Quiz not found!');
    if (!question) throw NotFound('Question not found!');
    if (!option) throw NotFound('Option not found!');

    let result = await getResultsForSpecificQuizOfUserRepo(manager, userId, quizId, questionId);

    if (!result) {
      result = await createNewResultRepo(manager, userId, quizId);
    }

    const isAnswerCorrect = question.correctOptionId === optionId;

    const existingQuestionInQuiz = result.answers?.[0];

    if (existingQuestionInQuiz) {
      if (existingQuestionInQuiz.selectedOptionId !== optionId) {
        if (existingQuestionInQuiz.selectedOptionId !== question.correctOptionId) {
          if (isAnswerCorrect) result.score += 1;
        } else {
          if (!isAnswerCorrect) result.score -= 1;
        }

        existingQuestionInQuiz.isCorrect = isAnswerCorrect;
        existingQuestionInQuiz.selectedOptionId = optionId;
        await createOrUpdateAnswerInResult(manager, existingQuestionInQuiz);
      }
    } else {
      if (isAnswerCorrect) result.score += 1;

      await createOrUpdateAnswerInResult(manager, {
        questionId,
        resultId: result.id,
        selectedOptionId: optionId,
        isCorrect: isAnswerCorrect,
      } as AnswersEntity);
    }

    await updateResultRepo(manager, result);

    return {
      message: `Your answer is ${isAnswerCorrect ? 'correct' : 'incorrect'}`,
      correctAnswer: !isAnswerCorrect ? question.correctOption!.option : undefined,
    };
  });
};
