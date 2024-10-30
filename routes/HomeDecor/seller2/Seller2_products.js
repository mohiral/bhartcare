import express from 'express';
import Category from '../../../models/Kirana/seller2/Seller2_Category.js';

const router = express.Router();

// Get products by category
router.get('/:categoryName', async (req, res) => {
  const { categoryName } = req.params;

  try {
    const category = await Category.findOne({ name: categoryName });
    if (category) {
      res.json(category.products);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new product to a category
router.post('/', async (req, res) => {
  const { category, productData } = req.body;

  try {
    const categoryDoc = await Category.findOne({ name: category });
    if (categoryDoc) {
      // Push the new product, including the offer field
      categoryDoc.products.push(productData);
      await categoryDoc.save();
      res.status(201).json(categoryDoc);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a product from a category
router.delete('/:categoryName/:productId', async (req, res) => {
  const { categoryName, productId } = req.params;

  try {
    const category = await Category.findOne({ name: categoryName });
    if (category) {
      category.products.id(productId).remove();
      await category.save();
      res.json({ message: 'Product deleted' });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
