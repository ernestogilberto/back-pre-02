import express from 'express';
import {ProductsManager} from '../managers/productsManager.js'

const manager = new ProductsManager();

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let {limit, query, sort, page} = req.query;
        const products = await manager.getProducts({limit, query, sort, page});

        res.status(200).send({products});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
})

router.get('/:pid', async (req, res) => {
    try {
        let id = parseInt(req.params.pid);
        const {payload: product, error} = await manager.getProductById(id);
        if (error) {
            res.status(400).send(error);
        } else {
            res.status(200).send(product);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
})

router.post('/', async (req, res) => {
    try {
        const product = req.body;
        const {payload: addProductResult, error} = await manager.addProduct(product);
        if (error) {
            res.status(400).send(error);
        } else {
            res.status(201).send(addProductResult);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
})

router.put('/:pid', async (req, res) => {
    try {
        let id = parseInt(req.params.pid);
        const product = req.body;
        const {payload: updatedProduct, error} = await manager.updateById(id, product);
        if (error) {
            res.status(400).send(error);
        } else {
            res.status(200).send(updatedProduct);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
})

router.delete('/:pid', async (req, res) => {
    try {
        // let id = parseInt(req.params.pid);
        let id = req.params.pid;
        const {payload: deletedProduct, error} = await manager.deleteById(id);
        if (error) {
            res.status(400).send(error);
        }
        res.status(200).send(deletedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
})

export {router}