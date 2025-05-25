import createError from 'http-errors';

export const BadRequest = (message = 'Bad Request', errors: Record<string, unknown> = {}) =>
  createError(400, message, errors);

export const NotFound = (message = 'Not Found') => createError(404, message);

export const InternalServerError = (error: unknown) => {
  console.log('Internal server error => ', error);
  return createError(500, 'Internal Server Error');
};
