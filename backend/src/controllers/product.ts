import {Request, Response} from 'express';
import product  from '../models/product';


export const  getProduct=async (req: Request, res: Response) => {
try{
const items =await product.find({});
return res.status(200).send({items, total: items.length});
}catch(error){
  res.status(500).send({message: 'Ошибка сервера при получении товаров'});
}
}


export const createProduct=async (req: Request, res: Response) => {
try{
const newProduct = await product.create(req.body);
res.status(201).send(newProduct);
}catch(error){
  res.status(500).send({message:'Ошибка сервера при создании товара'});
}
};