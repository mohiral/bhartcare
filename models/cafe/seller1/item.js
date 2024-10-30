// models/Item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  categories: [{ type: String, required: true }],
  prices: [{ type: Number, required: true }],
  image: { type: String, required: true }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
