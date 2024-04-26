import express from 'express';
import ProductsController from '../controllers/products.controller.js';

const productsRouter = express.Router();
const controller = new ProductsController();

productsRouter.get('/', controller.getProducts);
productsRouter.get('/:pid', controller.getProductById);
productsRouter.post('/', controller.addProduct);
productsRouter.put('/:pid', controller.updateById);
productsRouter.delete('/:pid', controller.deleteById);

export {productsRouter};