import {ProductsRepository} from '../repositories/products.repository.js';

const repository = new ProductsRepository();

class ProductsService {

    async getProducts(req) {
        let {limit, query, sort, page} = req;
        limit = limit ? parseInt(limit) : 10;
        page = page ? parseInt(page) : 1;
        query ? query = JSON.parse(query) : query = {};
        sort ? sort = JSON.parse(sort) : sort = {};

        try {
            const products = await repository.getProducts({limit, query, sort, page});
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

        } catch {
            throw new Error('Error getting products');
        }
    }

    async getProductById(id) {
        if(!id) throw new Error('Product id is required');
        try {
            const product = await repository.getProductById(id);
            return {payload: product};
        } catch {
            throw new Error('Error getting product');
        }
    }

    async addProduct(product) {
        if(!product) throw new Error('Product is required');
        if(product.id) delete product.id;

        try {
            const id = await repository.addProduct(product);
            return {payload: `Product added successfully with id ${id}`};
        } catch {
            throw new Error('Error adding product');
        }
    }

    async updateById(id, product) {
        if(!id) throw new Error('Product id is required');
        try {
            await repository.updateById(id, product);
            return {payload: `Product updated successfully with id ${id}`};
        } catch {
            throw new Error('Error updating product');
        }
    }

    async deleteById(id) {
        try {
            await repository.deleteById(id);
            return {payload: `Product deleted successfully with id ${id}`};
        } catch {
            throw new Error('Error deleting product');
        }
    }
}

export default ProductsService;

