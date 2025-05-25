import { ResultsEntity } from '../../common/entities';
import { NotFound } from '../../common/errors';
import { getResultByUserIdRepo } from './results.repository';

export const getResultByUserIdService = async (
  userId: number,
  quizId: number,
): Promise<ResultsEntity> => {
  const result = await getResultByUserIdRepo(userId, quizId);

  if (!result) throw NotFound('Quiz for the user not found!');

  return result;
};
