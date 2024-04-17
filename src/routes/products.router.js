import express from 'express';
import ProductsController from '../controllers/products.controller.js';

const router = express.Router();
const controller = new ProductsController();

router.get('/', controller.getProducts);
router.get('/:pid', controller.getProductById);
router.post('/', controller.addProduct);
router.put('/:pid', controller.updateById);
router.delete('/:pid', controller.deleteById);

export {router}