import ViewsRepository from '../repositories/views.repository.js';

const repository = new ViewsRepository();

class ViewsController {

    async getProducts(req, res) {
        try {
            let user = req.session.user;
            const products = await repository.getProducts(req.query);
            res.status(200).render('home', {products, user});
        } catch {
            res.status(500).json({error: 'Error getting products'})
        }
    }

    async getProductById(req, res) {
        try {
            const product = await repository.getProductById(req.params.pid);
            res.json(product);
        } catch {
            res.status(500).json({error: 'Error getting product'})
        }
    }

    async getRealTimeProducts(req, res) {
        try {
            let user = req.session.user;
            const products = await repository.getRealTimeProducts(req.query);
            res.status(200).render('realTimeProducts', {products, user});
        } catch {
            res.status(500).json({error: 'Error getting real time products'})
        }
    }
}

export default ViewsController;