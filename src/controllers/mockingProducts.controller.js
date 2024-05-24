import mockingProductsRepository from '../repositories/mockingProducts.repository.js';

const repository = new mockingProductsRepository();

class mockingProductsController {

    async getProducts(req, res) {
        try {
            const products = await repository.getProducts();
            res.status(200).send(products)
        } catch {
            res.status(500).json({error: 'Error getting products'})
        }
    }
}

export default mockingProductsController