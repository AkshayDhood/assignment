import { UsersEntity } from '../../common/entities';
import { createNewUserRepo } from './user.repository';
import { CreateNewUserRequest } from './validators';

export const createNewUserService = (payload: CreateNewUserRequest): Promise<UsersEntity> => {
  return createNewUserRepo(payload);
};
