import mongoose from 'mongoose';


const cartsSchema = new mongoose.Schema({
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
})

cartsSchema.pre('findOne', function(next) {
    this.populate('products.product');
    next();
  });

export const CartsModel = mongoose.model('carts', cartsSchema)