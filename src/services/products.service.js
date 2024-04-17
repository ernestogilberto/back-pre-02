import {ProductsManager} from '../managers/productsManager.js'

const manager = new ProductsManager();

class ProductsService {

    async getProducts(req) {
        try {
            let {limit, query, sort, page} = req;
            return await manager.getProducts({limit, query, sort, page});
        } catch {
            throw new Error('Error getting products');
        }
    }

    async getProductById(id) {
        try {
            return await manager.getProductById(id);
        } catch {
            throw new Error('Error getting product');
        }
    }

    async addProduct(product) {
        try {
            return await manager.addProduct(product);
        } catch {
            throw new Error('Error adding product');
        }
    }

    async updateById(id, product) {
        try {
            return await manager.updateById(id, product);
        } catch {
            throw new Error('Error updating product');
        }
    }

    async deleteById(id) {
        try {
            return await manager.deleteById(id);
        } catch {
            throw new Error('Error deleting product');
        }
    }
}

export default ProductsService;

