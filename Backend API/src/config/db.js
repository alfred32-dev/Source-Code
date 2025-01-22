const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables from .env file

// Construct MongoDB connection string using environment variables
const uri = `mongodb://localhost:27017/OnlineShoppingSystem`; // Local MongoDB

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error(`Database connection failed: ${error.message}`);
    process.exit(1);  // Exit the process if the connection fails
  }
};

// Export both the connection function and mongoose
module.exports = { connectDB, mongoose };
