// server.js
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

// Import routes for seller1
import categoryRoutes from './routes/cafe/seller1/Seller1_categories.js';
import productRoutes from './routes/cafe/seller1/Seller1_products.js';

// Import routes for seller2
import seller2CategoryRoutes from './routes/cafe/seller2/Seller2_categories.js';
import seller2ProductRoutes from './routes/cafe/seller2/Seller2_products.js';

// Import user and cart routes
import userRoutes from './user/routes/userRoutes.js';
import cartRoutes from './user/routes/cartRoutes.js';

// Import order routes
import orderRoutes from './user/routes/orderRoutes.js'; // Import the new order routes

const app = express();
const PORT = 5002;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://harishkumawatkumawat669:7FiBpE7v7lNyDp6G@cluster0.ogeix.mongodb.net/seller', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes for seller1
app.use('/seller1_categories', categoryRoutes);
app.use('/seller1_products', productRoutes);

// Routes for seller2
app.use('/seller2_categories', seller2CategoryRoutes);
app.use('/seller2_products', seller2ProductRoutes);

// User and cart routes
app.use('/cart', cartRoutes);
app.use('/users', userRoutes);

// Order routes
app.use('/orders', orderRoutes); // Add order routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
