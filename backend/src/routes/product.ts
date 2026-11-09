import { Router } from 'express';
import { getProduct, createProduct } from '../controllers/product';
import { validateProductBody } from '../middlewares/validatons';

const productRouter = Router();

productRouter.get('/', getProduct);
productRouter.post('/', validateProductBody, createProduct);

export default productRouter;
