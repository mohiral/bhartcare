import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  specifications: { type: [String], required: true },
  img: { type: String, required: true },
  offer: { type: String, required: false }, // Offer field
  likeCount: { type: Number, default: 0 }, // Like count
  comments: [{ text: String, date: { type: Date, default: Date.now } }], // Comments array
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Garment', 'Tech', 'Kirana', 'Dinesh'], required: true },
  products: [productSchema], // Embedded products schema
});

const Category = mongoose.model('HomeDecorSeller1_Data', categorySchema);

export default Category;
