// routes/orderRoutes.js
import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Create a new order
router.post('/', async (req, res) => {
  try {
    const { userId, productId, name, address, mobile, location, items } = req.body;

    // Validate request data
    if (!userId || !productId || !name || !address || !mobile || !location || !items) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create new order
    const newOrder = new Order({
      userId,
      productId,
      name,
      address,
      mobile,
      location,
      items,
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Get all orders for a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch orders for the user
    const orders = await Order.find({ userId });

    if (orders.length > 0) {
      return res.json(orders);
    } else {
      return res.status(404).json({ error: 'Order not found for this user' });
    }
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).json({ error: 'Failed to retrieve orders', message: error.message });
  }
});

export default router;
