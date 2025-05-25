import { appDataSource } from '../../common/database';
import { ResultsEntity } from '../../common/entities';

const resultRepo = appDataSource.getRepository(ResultsEntity);

export const getResultByUserIdRepo = (
  userId: number,
  quizId: number,
): Promise<ResultsEntity | null> => {
  return resultRepo.findOne({
    relations: ['answers', 'answers.question', 'answers.selectedOption'],
    where: { userId, quizId },
  });
};
