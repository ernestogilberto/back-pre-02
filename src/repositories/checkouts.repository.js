import {CheckoutModel} from '../models/checkout.model.js';

class CheckoutsRepository {

    async getCheckoutsByUser(req) {
        try {
            return await CheckoutModel.find({user: req.userId});
        } catch (error) {
            throw new Error(`Error getting checkouts: ${error.message}`);
        }
    }

    async getCheckoutById(id) {
        try {
            return await CheckoutModel.findById(id);
        } catch (error) {
            throw new Error(`Error getting checkout: ${error.message}`);
        }
    }

    async addCheckout(checkout) {
        try {
            const newCheckout = new CheckoutModel(checkout);
            await newCheckout.save();
            return `Checkout added successfully with id ${newCheckout._id}`
        } catch (error) {
            throw new Error(`Error adding checkout: ${error.message}`);
        }
    }

    async deleteById(id) {
        try {
            await CheckoutModel.findByIdAndDelete(id);
            return `Checkout deleted successfully with id ${id}`;
        } catch (error) {
            throw new Error(`Error deleting checkout: ${error.message}`);
        }
    }

}

export default CheckoutsRepository;