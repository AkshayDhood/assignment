import { appDataSource } from '../../common/database';
import { OptionsEntity, QuizEntity } from '../../common/entities';
import { NotFound } from '../../common/errors';
import {
  createOptionRepo,
  createQuestionRepo,
  createQuizRepo,
  getQuizByIdRepo,
  updateCorrectOptionInQuestion,
} from './quiz.repository';
import { CreateNewQuizRequest } from './validators';

export const getQuizByIdService = async (quizId: number): Promise<QuizEntity> => {
  const quiz = await getQuizByIdRepo(quizId);

  if (!quiz) {
    throw NotFound('Quiz not found.');
  }

  return quiz;
};

export const createNewQuizService = async (payload: CreateNewQuizRequest): Promise<QuizEntity> => {
  const quizId = await appDataSource.transaction(async manager => {
    const insertedQuiz = await createQuizRepo(manager, payload);

    for (let question of payload.questions) {
      const insertedQuestion = await createQuestionRepo(manager, insertedQuiz, question);

      let correctOption: OptionsEntity | undefined;
      for (let option of question.options) {
        const insertedOption = await createOptionRepo(manager, insertedQuestion, option);

        if (option.correctOption) {
          correctOption = insertedOption;
        }
      }

      if (correctOption) {
        await updateCorrectOptionInQuestion(manager, insertedQuestion, correctOption);
      }
    }

    return insertedQuiz.id;
  });

  const quiz = await getQuizByIdRepo(quizId);

  return quiz!;
};
