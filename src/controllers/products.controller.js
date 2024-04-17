import ProductsService from '../services/products.service.js';

const service = new ProductsService();

class ProductsController {

    async getProducts(req, res) {
        try {
            const products = await service.getProducts(req.query);
            res.json(products);
        } catch {
            res.status(500).json({error: 'Error getting products'})
        }
    }

    async getProductById(req, res) {
        try {
            const product = await service.getProductById(req.params.pid);
            res.json(product);
        } catch {
            res.status(500).json({error: 'Error getting product'})
        }
    }

    async addProduct(req, res) {
        try {
            const addProductResult = await service.addProduct(req.body);
            res.json(addProductResult);
        } catch {
            res.status(500).json({error: 'Error adding product'})
        }
    }

    async updateById(req, res) {
        try {
            const updateProductResult = await service.updateById(req.params.pid, req.body);
            res.json(updateProductResult);
        } catch {
            res.status(500).json({error: 'Error updating product'})
        }
    }

    async deleteById(req, res) {
        try {
            const deleteProductResult = await service.deleteById(req.params.pid);
            res.json(deleteProductResult);
        } catch {
            res.status(500).json({error: 'Error deleting product'})
        }
    }
}

export default ProductsController;