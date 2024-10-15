import express from 'express';
import Cart from '../models/cart.js'; // Make sure this path is correct

const router = express.Router();

// Route to save cart item
router.post('/', async (req, res) => {
    try {
        const { userId, productId, quantity, image, price } = req.body;

        // Ensure all required fields are present
        if (!userId || !productId || !quantity || !image || !price) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newCartItem = new Cart({ userId, productId, quantity, image, price }); // Add image and price
        await newCartItem.save();
        res.status(201).json({ message: 'Product added to cart' });
    } catch (error) {
        console.error('Error adding item to cart:', error); // Log the error for debugging
        res.status(500).json({ error: 'Failed to add item to cart' });
    }
});

// Route to get cart items by user ID
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const cartItems = await Cart.find({ userId });

        if (cartItems.length > 0) {
            return res.json(cartItems);
        } else {
            return res.status(404).json({ error: 'Cart not found for this user' });
        }
    } catch (error) {
        console.error('Error retrieving cart items:', error); // Log the error for debugging
        res.status(500).json({ error: 'Failed to retrieve cart items' });
    }
});

// Route to delete a cart item by user ID and item ID
router.delete('/:userId/:itemId', async (req, res) => {
    try {
        const { userId, itemId } = req.params;
        const deletedItem = await Cart.findOneAndDelete({ userId, _id: itemId });

        if (deletedItem) {
            return res.status(200).json({ message: 'Item removed from cart' });
        } else {
            return res.status(404).json({ error: 'Item not found' });
        }
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ error: 'Failed to remove item from cart' });
    }
});


// Use "export default" instead of "module.exports"
export default router;
