import {ProductModel} from '../models/products.model.js';

class ProductsRepository {

    async getProducts({limit, query , sort , page}) {
        try {
            return await ProductModel.paginate(query, {limit, sort, page});
        } catch (error) {
            throw new Error(`Error getting products: ${error.message}`);
        }
    }

    async getProductById(id) {
        try {
            return await ProductModel.findById(id);
        } catch (error) {
            throw new Error(`Error getting product: ${error.message}`);
        }
    }

    async addProduct(product) {
        try {
            const newProduct = new ProductModel(product);
            await newProduct.save();
            return newProduct._id;
        } catch (error) {
            throw new Error(`Error adding product: ${error.message}`);
        }
    }

    async updateById(id, product) {
        try {
            await ProductModel.findByIdAndUpdate(id, product);
            return `Product updated successfully with id ${id}`;
        } catch (error) {
            throw new Error(`Error updating product: ${error.message}`);
        }
    }

    async deleteById(id) {
        try {
            await ProductModel.findByIdAndDelete(id);
            return `Product deleted successfully with id ${id}`;
        } catch (error) {
            throw new Error(`Error deleting product: ${error.message}`);
        }
    }
}

export {ProductsRepository};