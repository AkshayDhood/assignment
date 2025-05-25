import Joi from 'joi';

export interface CreateNewUserRequest {
  name: string;
}

export const createNewUserRequestSchema = Joi.object<CreateNewUserRequest>({
  name: Joi.string().required(),
});
