import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    return res.status(400).send({
      message: 'Переданы некорректные данны или неверный ID',
    });
  }

  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  return res.status(statusCode).send({ message });
};

export default errorHandler;
