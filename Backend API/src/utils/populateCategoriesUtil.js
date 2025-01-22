// src/utils/populateCategoriesUtil.js (or your appropriate file)

const Product = require('../models/Product');
const Category = require('../models/Category');

const populateCategoriesUtil = async () => {
  try {
    // Fetch all unique categories from products
    const products = await Product.find();
    const categories = new Set(); // Use a Set to store unique categories

    products.forEach(product => {
      if (product.category && product.category.name) {
        categories.add(product.category.name); // Add unique category names
      }
    });

    // Convert Set to Array and map to category objects
    const categoryData = Array.from(categories).map(categoryName => ({
      name: categoryName,
      description: '' // Add description if needed
    }));

    // Insert unique categories into the categories collection
    for (const category of categoryData) {
      await Category.findOneAndUpdate(
        { name: category.name }, // Find by name
        { $setOnInsert: { description: category.description } }, // Set description only if it does not exist
        { upsert: true } // Create new if it doesn't exist
      );
    }

    console.log('Categories populated successfully.');
  } catch (error) {
    console.error('Error populating categories:', error);
  }
};

// Export the function
module.exports = { populateCategoriesUtil }; // Ensure this is exporting an object containing the function
