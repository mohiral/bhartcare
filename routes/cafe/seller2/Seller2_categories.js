import express from 'express';
import Category from '../../../models/cafe/seller2/Seller2_Category.js';

const router = express.Router();

// Get all categories for Seller2
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new category for Seller2
router.post('/', async (req, res) => {
  const { name, type } = req.body; // Include type field
  const category = new Category({ name, type, products: [] });

  try {
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
