import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Garment', 'Tech'], required: true }, // Category type
  products: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      description: { type: String, required: true },
      specifications: { type: [String], required: true },
      img: { type: String, required: true },
    },
  ],
});

// Store in 'seller2_categories' collection
const Category = mongoose.model('Seller2_Data', categorySchema);

export default Category;
