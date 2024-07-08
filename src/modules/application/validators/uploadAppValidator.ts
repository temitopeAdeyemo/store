import { celebrate, Joi, Segments } from 'celebrate';

export default celebrate({
  [Segments.BODY]: Joi.object().keys({
    application_name: Joi.string().required(),
    // package_name: Joi.string().required(), //starts with com.
    icon: Joi.string().required(),
    // screenshots: Joi.string()
    // .required(),
    description: Joi.string().required(),
    // version: Joi.string().required(),
    device: Joi.string().required(),
    // file_extension: Joi.string().required(),
    // model_name: Joi.string().required(),
    program_file_name: Joi.string(),
    program_file_version: Joi.string(),
    application_file: Joi.string().required(),
  }),
});
