import { celebrate, Joi, Segments } from 'celebrate';

export default celebrate({
  [Segments.BODY]: Joi.object().keys({
    phone_number: Joi.string(),
    email: Joi.string(),
  }),
});
