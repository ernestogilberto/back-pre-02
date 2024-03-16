import express from 'express';
import {CartsManager} from '../managers/cartsManager.js'

const manager = new CartsManager();

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const {payload: carts} = await manager.getCarts();
        if (!carts) {
            res.status(404).send({ error: 'Carts not found' });
        }
        res.status(200).send(carts);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
})

router.get('/:cid', async (req, res) => {
    try {
        const id = req.params.cid;
        let  cart = await manager.getCartById(id);
        if (!cart) {
            res.status(404).send({ error: 'Cart not found' });
        } else {
            cart = await JSON.parse(JSON.stringify(cart))
            res.status(200).render('cart', {cart});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
})

router.post('/', async (req, res) => {
    try {
        const {payload: newCart} = await manager.createCart();
        res.status(201).send(newCart);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
})

router.post('/:cid/product/:pid/quantity/:quantity', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = req.params.quantity;
        const {payload: newProduct} = await manager.addProductToCart(cartId, productId, quantity);
        if (!newProduct) {
            res.status(404).send({ error: 'Cart or product not found' });
        } else {
            res.status(201).send(newProduct);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
})

router.delete('/:cid', async (req, res) => {
    try {
        const id = req.params.cid;
        const {payload: deletedCart} = await manager.deleteCart(id);
        if (!deletedCart) {
            res.status(404).send({ error: 'Cart not found' });
        } else {
            res.status(200).send(deletedCart);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
})

router.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const {payload: deletedProduct} = await manager.deleteProductFromCart(cartId, productId);
        if (!deletedProduct) {
            res.status(404).send({ error: 'Cart or product not found' });
        } else {
            res.status(200).send(deletedProduct);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
})

router.put('/:cid/product/:pid/quantity/:quantity', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = req.params.quantity;
        const {payload: updatedProduct} = await manager.updateProductQuantity(cartId, productId, quantity);
        if (!updatedProduct) {
            res.status(404).send({ error: 'Cart or product not found' });
        } else {
            res.status(200).send(updatedProduct);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
})

export {router}