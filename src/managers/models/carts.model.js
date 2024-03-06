import mongoose from 'mongoose';


const cartsSchema = new mongoose.Schema({
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }],
})

cartsSchema.pre('findOne', function (next) {
    this.populate('products');
    next();
});

export const CartsModel = mongoose.model('carts', cartsSchema)