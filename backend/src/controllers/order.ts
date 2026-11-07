import { Request, Response, NextFunction } from 'express';
import product from '../models/product';
import { faker } from '@faker-js/faker';

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
      return res.status(400).send({ message: 'Один или несколько товаров не найдены' });
    }

    let calculatedTotal = 0;
    for (const item of products) {
      if (item.price === null) {
        return res.status(400).send({ message: `Товар "${item.title}" не продается` });
      }
      calculatedTotal += item.price;
    }

    if (calculatedTotal !== total) {
      return res.status(400).send({ message: 'Сумма заказа не совпадает с суммой товаров' });
    }

    return res.status(200).send({
      id: faker.string.uuid(),
      total,
    });
  } catch (err) {
    next(err);
  }
};