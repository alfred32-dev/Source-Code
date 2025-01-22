require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db'); // Import the database connection function

// Connect to the database
connectDB(); // Call the function to connect to MongoDB

const authRoutes = require('./routes/authRoutes'); // Import the auth routes
const productRoutes = require('./routes/productRoutes'); // Import the product routes
const categoryRoutes = require('./routes/categoryRoutes'); // Import the category routes
const orderRoutes = require('./routes/orderRoutes'); // Import order routes
const reviewRoutes = require('./routes/reviewRoutes'); // Import review routes
const profileRoutes = require('./routes/profileRoutes'); // Import user profile routes
const searchRoutes = require('./routes/searchRoutes');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:4200', // Allow your frontend to access the API
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// Versioned authentication-related routes (using /api/v1/auth as base URL)
app.use('/api/v1/auth', authRoutes);

// Product routes
app.use('/api/v1/products', productRoutes); // Adjusted to include the base path

// Category routes
app.use('/api/v1/categories', categoryRoutes); // New category routes

// Order routes
app.use('/api/v1/orders', orderRoutes); // New order routes

// Review routes
app.use('/api/v1/reviews', reviewRoutes); // New review routes

// User profile routes
app.use('/api/v1/profile', profileRoutes); // User profile and update routes
//Search Routes
app.use('/api/search', searchRoutes);  // Add this line to include search routes


// Only start the server if not in a test environment
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000; // Port configuration
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
