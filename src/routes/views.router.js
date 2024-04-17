import express from 'express';
import {MessagesManager} from '../managers/messagesManager.js';
import ViewsController from '../controllers/views.controller.js';
import ProductsController from '../controllers/products.controller.js';

const controller = new ViewsController();
const productController = new ProductsController();
const messagesManager = new MessagesManager();

const router = express.Router();

router.get('/', controller.getProducts);
router.get('/:pid', controller.getProductById);

router.get('/realTimeProducts', async (req, res) => {
    try {
        let {limit, query, sort, page} = req.query;
        let user = req.session.user;
        const products = await productController.getProducts({limit, query, sort, page});
        res.status(200).render('realTimeProducts', {products: products, user});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
})

router.post('/realTimeProducts', async (req, res) => {
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

router.delete('/realTimeProducts/:pid', async (req, res) => {
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

router.get('/chat', async(req, res) => {

    const {payload} = await messagesManager.getAll();
    const messages = await JSON.parse(JSON.stringify(payload));
    res.render('chat', {messages})
})

export {router}