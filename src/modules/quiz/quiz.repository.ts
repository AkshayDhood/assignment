import { EntityManager } from 'typeorm';
import { Alias, appDataSource } from '../../common/database';
import { OptionsEntity, QuestionsEntity, QuizEntity } from '../../common/entities';
import { CreateNewQuizRequest, Options, Questions } from './validators';

const quizRepository = appDataSource.getRepository(QuizEntity);

export const getQuizByIdRepo = async (quizId: number): Promise<QuizEntity | null> => {
  return quizRepository
    .createQueryBuilder(Alias.quiz)
    .innerJoinAndSelect(`${Alias.quiz}.questions`, Alias.questions)
    .innerJoinAndSelect(`${Alias.questions}.options`, Alias.options)
    .andWhereInIds(quizId)
    .getOne();
};

export const createQuizRepo = async (
  manager: EntityManager,
  quiz: CreateNewQuizRequest,
): Promise<QuizEntity> => {
  return manager.save(manager.create(QuizEntity, { title: quiz.title }));
};

export const createQuestionRepo = async (
  manager: EntityManager,
  { id: quizId }: QuizEntity,
  question: Questions,
): Promise<QuestionsEntity> => {
  return manager.save(manager.create(QuestionsEntity, { quizId, text: question.text }));
};

export const createOptionRepo = async (
  manager: EntityManager,
  { id: questionId }: QuestionsEntity,
  option: Options,
): Promise<OptionsEntity> => {
  return manager.save(manager.create(OptionsEntity, { questionId, option: option.option }));
};

export const updateCorrectOptionInQuestion = async (
  manager: EntityManager,
  question: QuestionsEntity,
  { id: optionId }: OptionsEntity,
): Promise<void> => {
  question.correctOptionId = optionId;
  await manager.save(question);
};
