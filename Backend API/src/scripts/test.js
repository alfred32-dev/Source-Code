const mongoose = require('mongoose');
require('dotenv').config();

const uri = `mongodb://localhost:27017/${process.env.MONGO_DB}`;

const testConnection = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB successfully');
    mongoose.connection.close(); // Close connection after testing
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

testConnection();
