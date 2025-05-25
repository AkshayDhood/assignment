import { appDataSource } from '../../common/database';
import { UsersEntity } from '../../common/entities';
import { CreateNewUserRequest } from './validators';

const userRepo = appDataSource.getRepository(UsersEntity);

export const createNewUserRepo = (payload: CreateNewUserRequest): Promise<UsersEntity> => {
  return userRepo.save(userRepo.create(payload));
};
