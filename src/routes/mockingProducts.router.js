import express from 'express';
import MockingProductsController from '../controllers/mockingProducts.controller.js';

const mockingProductsRouter = express.Router();

const controller = new MockingProductsController();

mockingProductsRouter.get('/', controller.getProducts);

export {mockingProductsRouter};