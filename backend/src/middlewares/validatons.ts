import { celebrate, Joi, Segments } from 'celebrate';
import { PaymentType } from '../controllers/order';

export const validateProductBody = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().min(2).max(30).required(),
    category: Joi.string().required(),
    image: Joi.object()
      .keys({
        fileName: Joi.string().required(),
        originalName: Joi.string().required(),
      })
      .required(),
    description: Joi.string().allow('').optional(),
    price: Joi.number().allow(null).optional(),
  }),
});

export const validateOrderBody = celebrate({
  [Segments.BODY]: Joi.object().keys({
    payment: Joi.string().valid(...Object.values(PaymentType)).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    total: Joi.number().required(),
    items: Joi.array().items(Joi.string()).min(1).required(),
  }),
});
