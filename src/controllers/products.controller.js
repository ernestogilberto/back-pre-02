import ProductsRepository from '../repositories/products.repository.js';

const repository = new ProductsRepository();

class ProductsController {

    async getProducts(req, res) {
        try {
            const products = await repository.getProducts(req.query);
            res.status(200).send(products)
        } catch {
            res.status(500).json({error: 'Error getting products'})
        }
    }

    async getProductById(req, res) {
        try {
            const product = await repository.getProductById(req.params.pid);
            res.status(200).send(product)
        } catch {
            res.status(500).json({error: 'Error getting product'})
        }
    }

    async addProduct(req, res) {
        try {
            const addProductResult = await repository.addProduct(req.body);
            res.status(201).send(addProductResult);
        } catch {
            res.status(500).json({error: 'Error adding product'})
        }
    }

    async updateById(req, res) {
        try {
            const updateProductResult = await repository.updateById(req.params.pid, req.body);
            res.status(200).send(updateProductResult);
        } catch {
            res.status(500).json({error: 'Error updating product'})
        }
    }

    async deleteById(req, res) {
        try {
            const deleteProductResult = await repository.deleteById(req.params.pid);
            res.status(200).send(deleteProductResult);
        } catch {
            res.status(500).json({error: 'Error deleting product'})
        }
    }
}

export default ProductsController;