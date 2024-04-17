import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productsSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 1 },
    thumbnail: { type: String, required: false },
    code: { type: String, required: true, unique: true },
    stock: { type: Number, required: true, min: 0},
    status: { type: Boolean, required: true, default: true },
    category: { type: String, required: true, index: true },
    country: { type: String, required: true, index: true },
    volume: { type: Number, required: true },
    alcohol: { type: Number, required: true },
    brand: { type: String, required: true, index: true },
    style: { type: String, required: true, index: true },
})

productsSchema.plugin(mongoosePaginate);

export const ProductModel = mongoose.model('products', productsSchema);