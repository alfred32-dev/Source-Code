const mongoose = require('mongoose'); // Import mongoose
const { populateCategoriesUtil } = require('../utils/populateCategoriesUtil'); // Adjust the path as necessary

const connectDB = async () => {
    const uri = 'mongodb://localhost:27017/OnlineShoppingSystem';
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.error(`Database connection failed: ${error.message}`);
        process.exit(1);
    }
};

// Main function to connect to the database and populate categories
const main = async () => {
    await connectDB(); // Connect to the database
    try {
        await populateCategoriesUtil(); // Populate categories after connecting
        console.log('Categories populated successfully.');
    } catch (err) {
        console.error('Error populating categories:', err);
        process.exit(1); // Exit with error if there was a problem
    } finally {
        mongoose.connection.close(); // Close the connection when done
        process.exit(0); // Exit the process
    }
};

// Call the main function
main();
