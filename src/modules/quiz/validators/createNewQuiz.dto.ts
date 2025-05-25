import Joi from 'joi';

export interface CreateNewQuizRequest {
  title: string;
  questions: Questions[];
}

export interface Questions {
  text: string;
  options: Options[];
}

export interface Options {
  option: string;
  correctOption?: boolean;
}

export const createNewQuizRequestSchema = Joi.object<CreateNewQuizRequest>({
  title: Joi.string().trim().min(1).required(),

  questions: Joi.array()
    .items(
      Joi.object({
        text: Joi.string().trim().min(1).required(),
        options: Joi.array()
          .items(
            Joi.object({
              option: Joi.string().trim().min(1).required(),
              correctOption: Joi.boolean().optional(),
            }),
          )
          .length(4)
          .required()
          .custom((options: Options[], helpers: Joi.CustomHelpers<Options>) => {
            const hasCorrect = options.some((opt: Options) => opt.correctOption === true);
            const optionsSet = new Set(options.map(({ option }: Options) => option));

            if (optionsSet.size !== 4) return helpers.error('duplicateOptions');
            if (!hasCorrect) return helpers.error('noOptionCorrect');

            return options;
          }, 'Custom options validator')
          .messages({
            duplicateOptions: 'Two or more same options found.',
            noOptionCorrect: 'At least 1 option must be marked as correct.',
          }),
      }),
    )
    .min(1)
    .required(),
});
