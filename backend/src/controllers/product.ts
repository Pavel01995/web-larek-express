import { Request, Response, NextFunction } from 'express'; //
import product from '../models/product';
import BadRequestError from '../errors/BadRequestError';
import ConflictError from '../errors/ConflictError';

export const getProduct = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await product.find({});
    res.send({ items: products, total: products.length });
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newProduct = await product.create(req.body);
    res.status(201).send(newProduct);
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Ошибка валидации данных при создании товара'));
      return;
    }

    if (err.message && err.message.includes('E11000')) {
      next(new ConflictError('Товар с таким названием уже существует'));
      return;
    }

    next(err);
  }
};
