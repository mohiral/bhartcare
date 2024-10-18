import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Create a new order
router.post('/', async (req, res) => {
  try {
    const { userId, productId, name, address, mobile, location, items } = req.body;

    // Create a new order instance
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
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all orders for a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });

    if (orders.length > 0) {
      return res.json(orders);
    } else {
      return res.status(404).json({ error: 'Order not found for this user' });
    }
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).json({ error: 'Failed to retrieve orders' });
  }
});

export default router;
