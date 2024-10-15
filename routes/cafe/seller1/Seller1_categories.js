// In routes/cafe/seller1/Seller1_categories.js
import express from 'express';
import Category from '../../../models/cafe/seller1/Seller1_Category.js';

const router = express.Router();

// Get all categories with products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new category
router.post('/', async (req, res) => {
  const { name, type } = req.body;
  const newCategory = new Category({
    name,
    type,
    products: [], // Initialize with an empty array of products
  });

  try {
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add a new product like
router.post('/product/:productId/like', async (req, res) => {
  const { productId } = req.params;
  try {
    const category = await Category.findOne({ 'products._id': productId });
    if (category) {
      const product = category.products.id(productId);
      product.likeCount += 1;
      await category.save();
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a comment to a product
router.post('/product/:productId/comment', async (req, res) => {
  const { productId } = req.params;
  const { text } = req.body;

  try {
    const category = await Category.findOne({ 'products._id': productId });
    if (category) {
      const product = category.products.id(productId);
      product.comments.push({ text });
      await category.save();
      res.status(201).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
