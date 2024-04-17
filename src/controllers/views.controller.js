import ProductsService from '../services/products.service.js';

const service = new ProductsService();

class ViewsController {

    async getProducts(req, res) {
        try {
            let user = req.session.user;
            const products = await service.getProducts(req.query);
            res.status(200).render('home', {products, user});
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
}

export default ViewsController;