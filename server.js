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

// Import Kirana seller1 routes
import Kiranaseller1CategoryRoutes from './routes/Kirana/seller1/Kirana_Seller1_categories.js';
import Kiranaseller1ProductRoutes from './routes/Kirana/seller1/Kirana_Seller1_products.js';

// Import Services seller1 routses
import Services_Center_seller1CategoryRoutes from './routes/Services_Center/seller1/Services_Center_Seller1_categories.js';
import Services_Center_seller1ProductRoutes from './routes/Services_Center/seller1/Services_Center_Seller1_products.js';

// Import Services seller1 routses
import Services_Center_Seller1_Service_categories from './routes/Services_Center/seller1/Services_Center_Seller1_Service_categories.js';
import Services_Center_Seller1_Services from './routes/Services_Center/seller1/Services_Center_Seller1_Services.js';

// Import user and cart routes
import userRoutes from './user/routes/userRoutes.js';
import cartRoutes from './user/routes/cartRoutes.js';

// Import order routes
import orderRoutes from './user/routes/orderRoutes.js';



const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(
  process.env.MONGO_URI || 'mongodb+srv://harishkumawatkumawat669:7FiBpE7v7lNyDp6G@cluster0.ogeix.mongodb.net/seller',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Routes for seller1
app.use('/seller1_categories', categoryRoutes);
app.use('/seller1_products', productRoutes);

// Routes for seller2
app.use('/seller2_categories', seller2CategoryRoutes);
app.use('/seller2_products', seller2ProductRoutes);

// Routes for Kirana seller1
app.use('/Kiranaseller1_categories', Kiranaseller1CategoryRoutes);
app.use('/Kiranaseller1_products', Kiranaseller1ProductRoutes);

// Routes for Services seller1

app.use('/Services_Center_seller1_categories', Services_Center_seller1CategoryRoutes);
app.use('/Services_Center_seller1_products', Services_Center_seller1ProductRoutes);

// Routes for Services seller1

app.use('/Services_Center_Seller1_Service_categories', Services_Center_Seller1_Service_categories);
app.use('/Services_Center_Seller1_Services', Services_Center_Seller1_Services);

// User and cart routes
app.use('/cart', cartRoutes);
app.use('/users', userRoutes);

// Order routes
app.use('/orders', orderRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
