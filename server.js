// server.js
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

// Import routes for seller1
import categoryRoutes from './routes/cafe/seller1/Seller1_categories.js';
import productRoutes from './routes/cafe/seller1/Seller1_products.js';
import itemsRoute from './routes/cafe/seller1/items.js';

// const itemsRoute = require('./routes/items');
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

import bookRoutes from './routes/Services_Center/seller1/Services_Center_Seller1_bookkRoutes.js'

// Import Services seller1 routses
import Fitness_Seller1_Service_categories from './routes/Fitness/seller1/Fitness_Seller1_Service_categories.js';
import Fitnessr_Seller1_Services from './routes/Fitness/seller1/Fitness_Seller1_Services.js';

// Import Services seller1 routses
import Fitness_seller1CategoryRoutes from './routes/Fitness/seller1/Fitness_Seller1_categories.js';
import Fitness_seller1ProductRoutes from './routes/Fitness/seller1/Fitness_Seller1_products.js';




// Import Hendicraft seller1 routes
import Hendicraftseller1CategoryRoutes from './routes/Hendicraft/seller1/Hendicraft_Seller1_categories.js';
import Hendicraftseller1ProductRoutes from './routes/Hendicraft/seller1/Hendicraft_Seller1_products.js';

// Import Kirana seller1 routes
import BookStoreseller1CategoryRoutes from './routes/BookStore/seller1/BookStore_Seller1_categories.js';
import BookStoreseller1ProductRoutes from './routes/BookStore/seller1/BookStore_Seller1_products.js';

// Import Garment seller1 routes
import Garmentseller1CategoryRoutes from './routes/Garment/seller1/Garment_Seller1_categories.js';
import Garmentseller1ProductRoutes from './routes/Garment/seller1/Garment_Seller1_products.js';

// Import Garment seller1 routes
import Hotalseller1CategoryRoutes from './routes/Hotal/seller1/Hotal_Seller1_categories.js';
import Hotalseller1ProductRoutes from './routes/Hotal/seller1/Hotal_Seller1_products.js';

// Import Garment seller1 routes
import HomeDecorseller1CategoryRoutes from './routes/HomeDecor/seller1/HomeDecor_Seller1_categories.js';
import HomeDecorseller1ProductRoutes from './routes/HomeDecor/seller1/HomeDecor_Seller1_products.js';

// Import Doctor seller1 routes
import Doctor_seller1CategoryRoutes from './routes/Doctor/seller1/Doctor_Seller1_categories.js';
import Doctor_seller1ProductRoutes from './routes/Doctor/seller1/Doctor_Seller1_products.js';

// Import Services seller1 routses
import Doctor_Seller1_Service_categories from './routes/Doctor/seller1/Doctor_Seller1_Service_categories.js';
import Doctor_Seller1_Services from './routes/Doctor/seller1/Doctor_Seller1_Services.js';

// import bookRoutes from './routes/Doctor/seller1/Doctor_Seller1_bookkRoutes.js'


// Import user and cart routes
import userRoutes from './user/routes/userRoutes.js';
import cartRoutes from './user/routes/cartRoutes.js';

// Import order routes
import orderRoutes from './user/routes/orderRoutes.js';

import roomRoutes from './routes/Hotal/seller1/Hotal_Seller1_roomRoutes.js';



const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(
  process.env.MONGO_URI || 'mongodb+srv://harishkumawatkumawat669:7FiBpE7v7lNyDp6G@cluster0.ogeix.mongodb.net/seller',
  {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  }
);

// Routes for seller1
app.use('/seller1_categories', categoryRoutes);
app.use('/seller1_products', productRoutes);
app.use('/items', itemsRoute);

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

// Routes for Doctor seller1

app.use('/Doctor_seller1_categories', Doctor_seller1CategoryRoutes);
app.use('/Doctor_seller1_products', Doctor_seller1ProductRoutes);

// Routes for Services seller1

app.use('/Doctor_Seller1_Service_categories', Doctor_Seller1_Service_categories);
app.use('/Doctor_Seller1_Services', Doctor_Seller1_Services);


// Routes for Fitness Services seller1

app.use('/Fitness_seller1_categories', Fitness_seller1CategoryRoutes);
app.use('/Fitness_seller1_products', Fitness_seller1ProductRoutes);

// Routes for Fitness Services seller1

app.use('/Fitness_Seller1_Service_categories', Fitness_Seller1_Service_categories);
app.use('/Fitness_Seller1_Services', Fitnessr_Seller1_Services);


// Routes for Hendicraft seller1
app.use('/Hendicraftseller1_categories', Hendicraftseller1CategoryRoutes);
app.use('/Hendicraftseller1_products', Hendicraftseller1ProductRoutes);

// Routes for BookStore seller1
app.use('/BookStoreseller1_categories', BookStoreseller1CategoryRoutes);
app.use('/BookStoreseller1_products', BookStoreseller1ProductRoutes);

// Routes for BookStore seller1
app.use('/Garmentseller1_categories', Garmentseller1CategoryRoutes);
app.use('/Garmentseller1_products', Garmentseller1ProductRoutes);

// Routes for Hotal seller1
app.use('/Hotalseller1_categories', Hotalseller1CategoryRoutes);
app.use('/Hotalseller1_products', Hotalseller1ProductRoutes);

// Routes for Hotal seller1
app.use('/HomeDecorseller1_categories', HomeDecorseller1CategoryRoutes);
app.use('/HomeDecorseller1_products', HomeDecorseller1ProductRoutes);

// app.use('/Hendicraft_seller1CategoryRoutes', Hendicraft_seller1CategoryRoutes);
// app.use('/Hendicraft_seller1ProductRoutes', Hendicraft_seller1ProductRoutes);

// User and cart routes
app.use('/cart', cartRoutes);
app.use('/users', userRoutes);

// Order routes
app.use('/orders', orderRoutes);

app.use('/api', roomRoutes);


app.use('/books', bookRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
