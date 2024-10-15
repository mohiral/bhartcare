import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true }, // Add image field
    price: { type: Number, required: true }, // Add price field
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
