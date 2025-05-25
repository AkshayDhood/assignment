import { EntityManager } from 'typeorm';
import {
  AnswersEntity,
  OptionsEntity,
  QuestionsEntity,
  QuizEntity,
  ResultsEntity,
  UsersEntity,
} from '../../common/entities';
import { Alias } from '../../common/database';

export const getUserByIdRepo = async (
  manager: EntityManager,
  userId: number,
): Promise<UsersEntity | null> => {
  return manager.findOne(UsersEntity, { where: { id: userId } });
};

export const getQuizByIdRepo = async (
  manager: EntityManager,
  quizId: number,
): Promise<QuizEntity | null> => {
  return manager.findOne(QuizEntity, { where: { id: quizId } });
};

export const getQuestionByIdRepo = async (
  manager: EntityManager,
  questionId: number,
): Promise<QuestionsEntity | null> => {
  return manager.findOne(QuestionsEntity, {
    relations: ['correctOption'],
    where: { id: questionId },
  });
};

export const getOptionByIdRepo = async (
  manager: EntityManager,
  optionId: number,
): Promise<OptionsEntity | null> => {
  return manager.findOne(OptionsEntity, { where: { id: optionId } });
};

export const getResultsForSpecificQuizOfUserRepo = async (
  manager: EntityManager,
  userId: number,
  quizId: number,
  questionId: number,
): Promise<ResultsEntity | null> => {
  return manager
    .createQueryBuilder(ResultsEntity, Alias.results)
    .leftJoinAndSelect(
      `${Alias.results}.answers`,
      Alias.answers,
      `${Alias.answers}.questionId = :questionId`,
      { questionId },
    )
    .andWhere(
      [`${Alias.results}.userId = :userId`, `${Alias.results}.quizId = :quizId`].join(' AND '),
      { userId, quizId },
    )
    .getOne();
};

export const createNewResultRepo = (
  manager: EntityManager,
  userId: number,
  quizId: number,
): Promise<ResultsEntity> => {
  return manager.save(manager.create(ResultsEntity, { userId, quizId }));
};

export const createOrUpdateAnswerInResult = async (
  manager: EntityManager,
  answer: AnswersEntity,
): Promise<void> => {
  if (!answer.id) answer = manager.create(AnswersEntity, answer);

  await manager.save(answer);
};

export const updateResultRepo = async (
  manager: EntityManager,
  result: ResultsEntity,
): Promise<void> => {
  await manager.save(result);
};
