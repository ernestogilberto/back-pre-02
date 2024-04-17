import {CartsModel} from '../models/carts.model.js';

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
            return await CartsModel.findById(id);
        } catch (error) {
            throw new Error(`Error getting cart: ${error.message}`);
        }
    }

    async createCart() {
        try {
            const newCart = new CartsModel();
            await newCart.save();
            return {payload: newCart._id};
        } catch (error) {
            throw new Error(`Error creating cart: ${error.message}`);
        }
    }

    async addProductToCart(id, productId, quantity) {
        if(!id) throw new Error('Cart id is required');
        if(!productId) throw new Error('Product id is required');
        try {
            await CartsModel.findByIdAndUpdate(id, {$push: {products: {product: productId, quantity}}});
            return {payload: `Product added to cart successfully`};
        } catch (error) {
            throw new Error(`Error adding product to cart: ${error.message}`);
        }
    }

    async deleteProductFromCart(id, productId) {
        if(!id) throw new Error('Cart id is required');
        if(!productId) throw new Error('Product id is required');
        try {
            await CartsModel.findByIdAndUpdate(id, {$pull: {products: {product: productId}}});
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

    async updateProductQuantity(id, productId, quantity) {
        if(!id) throw new Error('Cart id is required');
        if(!productId) throw new Error('Product id is required');
        try {
            const cart = await CartsModel.findById(id);
            const productIndex = cart.products.findIndex(product => product.product._id.toString() === productId);
            if (productIndex === -1) {
                throw new Error(`Product with id ${productId} not found in cart`);
            }
            cart.products[productIndex].quantity = quantity;
            await cart.save();
            return {payload: `Quantity updated successfully`};
        }
        catch (error) {
            throw new Error(`Error updating quantity: ${error.message}`);
        }
    }
}

export {CartsManager};