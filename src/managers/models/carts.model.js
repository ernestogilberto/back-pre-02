import mongoose from 'mongoose';


const cartsSchema = new mongoose.Schema({
    products: [{products: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true }, quantity: { type: Number, default: 1, required: true } }],
})

cartsSchema.pre('findOne', function (next) {
    this.populate('products');
    next();
});

export const CartsModel = mongoose.model('carts', cartsSchema)