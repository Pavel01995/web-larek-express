import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import product from '../models/product';
import BadRequestError from '../errors/BadRequestError';

export enum PaymentType {
  Online = 'online',
  Card = 'card',
}

export interface IOrder {
  payment: PaymentType;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { total, items } = req.body;

    const products = await product.find({ _id: { $in: items } });

    if (products.length !== items.length) {
      next(new BadRequestError('Некоторые товары не найдены'));
      return;
    }

    let calculatedTotal = 0;
    for (let i = 0; i < products.length; i += 1) {
      const item = products[i];
      if (item.price === null) {
        next(new BadRequestError(`Цена товара ${item.title} не указана`));
        return;
      }
      calculatedTotal += item.price;
    }

    if (calculatedTotal !== total) {
      next(new BadRequestError('Сумма заказа не совпадает с суммой товаров'));
      return;
    }

    res.status(200).send({
      id: faker.string.uuid(),
      total,
    });
  } catch (err) {
    next(err);
  }
};
