const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const connectDB = async () => {
    const uri = `mongodb://localhost:27017/OnlineShoppingSystem`;
    try {
        await mongoose.connect(uri);
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.error(`Database connection failed: ${error.message}`);
        process.exit(1);
    }
};

const populateDatabase = require('../utils/populateDatabase'); // Adjust the path as needed

const run = async () => {
    await connectDB();  // Connect to the database
    await populateDatabase();  // Populate after connecting
};

run();
