import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { createOrder, PaymentType } from '../controllers/order';

const orderRouter = Router();

orderRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      payment: Joi.string().valid(...Object.values(PaymentType)).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      address: Joi.string().required(),
      total: Joi.number().required(),
      items: Joi.array().items(Joi.string()).min(1).required(),
    }),
  }),
  createOrder
);

export default orderRouter;