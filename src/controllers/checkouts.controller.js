import CheckoutsRepository from '../repositories/checkouts.repository.js';

const repository = new CheckoutsRepository();

class CheckoutsController {

    async getCheckoutsByUser(req, res) {
        try {
            const checkouts = await repository.getCheckoutsByUser(req.query);
            res.json(checkouts);
        } catch {
            res.status(500).json({error: 'Error getting checkouts'})
        }
    }

    async getCheckoutById(req, res) {
        try {
            const checkout = await repository.getCheckoutById(req.params.cid);
            res.json(checkout);
        } catch {
            res.status(500).json({error: 'Error getting checkout'})
        }
    }

    async addCheckout(req, res) {
        try {
            const addCheckoutResult = await repository.addCheckout(req.body);
            res.json(addCheckoutResult);
        } catch {
            res.status(500).json({error: 'Error adding checkout'})
        }
    }


    async deleteById(req, res) {
        try {
            const deleteCheckoutResult = await repository.deleteById(req.params.cid);
            res.json(deleteCheckoutResult);
        } catch {
            res.status(500).json({error: 'Error deleting checkout'})
        }
    }
}

export default CheckoutsController;
