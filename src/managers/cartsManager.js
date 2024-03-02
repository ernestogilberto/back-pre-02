import {CartsModel} from './models/carts.model.js';

class CartsManager {
    async getCarts() {
        try {
            const carts = await CartsModel.find();
            return {payload: carts};
        } catch (error) {
            throw new Error(`Error getting carts: ${error.message}`);
        }
    }
    async getCartById(id) {
        if(!id) throw new Error('Cart id is required');
        try {
            const cart = await CartsModel.findById(id);
            return {payload: cart};
        } catch (error) {
            throw new Error(`Error getting cart: ${error.message}`);
        }
    }

    async createCart() {
        try {
            const newCart = new CartsModel();
            await newCart.save();
            return {payload: `Cart created successfully with id ${newCart._id}`};
        } catch (error) {
            throw new Error(`Error creating cart: ${error.message}`);
        }
    }

    async addProductToCart(id, productId) {
        if(!id) throw new Error('Cart id is required');
        if(!productId) throw new Error('Product id is required');
        try {
            await CartsModel.findByIdAndUpdate(id, {$push: {products: productId}});
            return {payload: `Product added to cart successfully`};
        } catch (error) {
            throw new Error(`Error adding product to cart: ${error.message}`);
        }
    }

    async deleteProductFromCart(id, productId) {
        if(!id) throw new Error('Cart id is required');
        if(!productId) throw new Error('Product id is required');
        try {
            await CartsModel.findByIdAndUpdate(id, {$pull: {products: productId}});
            return {payload: `Product deleted from cart successfully`};
        } catch (error) {
            throw new Error(`Error deleting product from cart: ${error.message}`);
        }
    }

    async deleteCart(id) {
        if(!id) throw new Error('Cart id is required');
        try {
            await CartsModel.findByIdAndDelete(id);
            return {payload: `Cart deleted successfully with id ${id}`};
        } catch (error) {
            throw new Error(`Error deleting cart: ${error.message}`);
        }
    }

    async deleteAllCarts() {
        try {
            await CartsModel.deleteMany();
            return {payload: `All carts deleted successfully`};
        } catch (error) {
            throw new Error(`Error deleting all carts: ${error.message}`);
        }
    }
}

export {CartsManager};