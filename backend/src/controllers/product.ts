import {Request, Response} from 'express';
import product  from '../models/product';


export const  getProduct=async (_req: Request, res: Response) => {
try{
const products =await product.find({});
res.send({items: products, total: products.length});
}catch(err){
  res.status(500).send({message: 'Ошибка сервера при получении товаров'});
}
}


export const createProduct=async (req: Request, res: Response) => {
try{
const newProduct = await product.create(req.body);
res.status(201).send(newProduct);
}catch(err){
  res.status(500).send({message:'Ошибка сервера при создании товара'});
}
};