import {ProductModel} from './models/products.model.js';

class ProductsManager {

    async getProducts({limit, query , sort , page}) {
        limit = limit ? parseInt(limit) : 10;
        page = page ? parseInt(page) : 1;
        query ? query = JSON.parse(query) : query = {};
        sort ? sort = JSON.parse(sort) : sort = {};

        try {
            const products = await ProductModel.paginate(query, {limit, sort, page});
            // const result = products.docs.map(product => product.toObject());
            const prevLink = products.hasPrevPage ? `/?limit=${limit}&page=${products.prevPage}&query=${JSON.stringify(query)}&sort=${JSON.stringify(sort)}` : null;
            const nextLink = products.hasNextPage ? `/?limit=${limit}&page=${products.nextPage}&query=${JSON.stringify(query)}&sort=${JSON.stringify(sort)}` : null;
            return {
                payload: products.docs.map(product => product.toObject()),
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink,
                nextLink,
                total: products.totalDocs,
                limit
            };
        } catch (error) {
            throw new Error(`Error getting products: ${error.message}`);
        }
    }

    async getProductById(id) {
        if(!id) throw new Error('Product id is required');
        try {
            const product = await ProductModel.findById(id);
            return {payload: product};
        } catch (error) {
            throw new Error(`Error getting product: ${error.message}`);
        }
    }


    async addProduct(product) {

        if(!product) throw new Error('Product is required');
        if(product.id) delete product.id;

        try {
            const newProduct = new ProductModel(product);
            await newProduct.save();
            return {payload: `Product added successfully with id ${newProduct._id}`};
        } catch (error) {
            throw new Error(`Error adding product: ${error.message}`);
        }
    }


    async updateById(id, product) {
        if(!id) throw new Error('Product id is required');
        if(!product) throw new Error('Product is required');
        try {
            await ProductModel.findByIdAndUpdate(id, product);
            return {payload: `Product updated successfully with id ${id}`};
        } catch (error) {
            throw new Error(`Error updating product: ${error.message}`);
        }
    }


    async deleteById(id) {
        if(!id) throw new Error('Product id is required');
        try {
            await ProductModel.findByIdAndDelete(id);
            return {payload: `Product deleted successfully with id ${id}`};
        } catch (error) {
            throw new Error(`Error deleting product: ${error.message}`);
        }
    }
}

export {ProductsManager};