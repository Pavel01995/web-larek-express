import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { errors } from 'celebrate';
import orderRouter from './routes/order';
import productRouter from './routes/product';
import NotFoundError from './errors/NotFoundError';
import errorHandler from './middlewares/errorHandler';
import { requestLogger, errorLogger } from './middlewares/logger';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(requestLogger);
app.use('/product', productRouter);
app.use('/order', orderRouter);
app.use((_req, _res, next) => {
  next(new NotFoundError('Маршут не найден'));
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/weblarek');
  

    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
};
start();
