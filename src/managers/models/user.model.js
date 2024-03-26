import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'user' },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts',
        required: true
    },
})

userSchema.pre('findOne', function(next) {
    this.populate('cart');
    next();
  });

export const UserModel = mongoose.model('users', userSchema);