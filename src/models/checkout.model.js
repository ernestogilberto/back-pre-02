import mongoose from 'mongoose';

const checkoutSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
        ],
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    total: {
        type: Number,
        required: true
    }
})

checkoutSchema.pre('findOne', function(next) {
    this.populate('products.product');
    next();
  });

export const CheckoutModel = mongoose.model('checkout', checkoutSchema)
