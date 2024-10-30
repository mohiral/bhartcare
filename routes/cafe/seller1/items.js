// routes/items.js
const express = require('express');
const router = express.Router();
// const Item = require('../models/Item');

const Item = require('../../../models/cafe/seller1/item.js');
// import Item from '../../../models/cafe/seller1/item.js';

// GET all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new item
router.post('/', async (req, res) => {
  const item = new Item({
    title: req.body.title,
    categories: req.body.categories,
    prices: req.body.prices,
    image: req.body.image
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE an item by ID
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    await item.remove();
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
