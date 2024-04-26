import express from 'express';
import MessagesController from '../controllers/messages.controller.js';
import ViewsController from '../controllers/views.controller.js';
import ProductsController from '../controllers/products.controller.js';

const messagesController = new MessagesController();
const controller = new ViewsController();
const productController = new ProductsController();

const viewsRouter = express.Router();

viewsRouter.get('/chat', messagesController.getAll);

viewsRouter.get('/realTimeProducts', controller.getRealTimeProducts);

viewsRouter.get('/', controller.getProducts);
viewsRouter.get('/:pid', controller.getProductById);

viewsRouter.post('/realTimeProducts', async (req, res) => {
    try {
        const product = req.body;
        await productController.addProduct(product);
        const {payload, error} = await productController.getProducts();
        let products = await JSON.parse(JSON.stringify(payload));
        if (error) {
            res.status(400).send(error);
        } else {
            res.status(201).render( 'realTImeProducts' , {products: products});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
})

viewsRouter.delete('/realTimeProducts/:pid', async (req, res) => {
    try {
        let id = req.params.pid;
        const {payload: deletedProduct, error} = await productController.deleteById(id);
        if (error) {
            res.status(400).send(error);
        }
        res.status(200).send(deletedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
})

export {viewsRouter};