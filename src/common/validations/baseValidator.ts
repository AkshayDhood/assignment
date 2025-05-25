import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { BadRequest } from '../errors';

const validationError = (error: Joi.ValidationError) =>
  BadRequest('Validation failed', { errors: error.details.map(({ message }) => message) });

export const validateBody = (schema: Joi.ObjectSchema) => {
  return (req: Request, _: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) return next(validationError(error));

    req.body = value;
    next();
  };
};

export const validateParams = (schema: Joi.ObjectSchema) => {
  return (req: Request, _: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.params, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) return next(validationError(error));

    req.params = value;
    next();
  };
};
