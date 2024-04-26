import express from 'express';
import CheckoutsController from '../controllers/checkouts.controller.js';

const checkoutsRouter = express.Router();
const controller = new CheckoutsController();

checkoutsRouter.get('/', controller.getCheckoutsByUser);
checkoutsRouter.get('/:cid', controller.getCheckoutById);
checkoutsRouter.post('/', controller.addCheckout);

export {checkoutsRouter};