import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 1 },
    thumbnail: { type: String, required: false },
    code: { type: String, required: true, unique: true },
    stock: { type: Number, required: true, min: 0},
    status: { type: Boolean, required: true, default: true },
})

export const ProductModel = mongoose.model('products', productsSchema);