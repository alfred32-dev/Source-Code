const axios = require('axios');
const Product = require('../models/Product'); // Import the Product model
const Category = require('../models/Category'); // Import the Category model

// Function to populate categories and products
async function populateDatabase() {
    try {
        const totalProducts = 194; // Total products to populate

        for (let i = 1; i <= totalProducts; i++) {
            try {
                const randomPopularityScore = Math.floor(Math.random() * 100) + 1; // Generates a score between 1 and 100

                // Fetch product details from DummyJSON API
                const { data: product } = await axios.get(`https://dummyjson.com/products/${i}`);

                // Prepare category information
                const categoryName = product.category || 'Unknown Category';
                const categoryDescription = `Description for ${categoryName}`; // Provide a description

                // Check if the category exists
                let category = await Category.findOne({ name: categoryName });

                if (!category) {
                    // Create a new category if it doesn't exist
                    category = new Category({
                        name: categoryName,
                        description: categoryDescription
                    });
                    await category.save();
                    console.log(`Inserted category: ${categoryName}`);
                }

                // Prepare product values with default handling
                const productValues = {
                    name: product.title || 'No Title',  // Default title if missing
                    description: product.description || 'No Description',  // Default description if missing
                    price: product.price || 0,  // Default price if missing
                    stockQuantity: product.stock || 0,  // Default stock if missing
                    category: {
                        id: category._id,  // Use the existing category ID
                        name: category.name,  // Use the existing category name
                        description: category.description  // Use the existing category description
                    },
                    rating: product.rating || 0,  // Default rating if missing
                    popularityScore: randomPopularityScore || 0, // Default popularity score if missing
                    tags: product.tags || [],  // Use an empty array if tags are missing
                    brand: product.brand || null, // Default brand if missing
                    sku: product.sku || null, // Default SKU if missing
                    weight: product.weight || null, // Default weight if missing
                    warrantyInformation: product.warrantyInformation || null, // Default warranty information if missing
                    shippingInformation: product.shippingInformation || null, // Default shipping information if missing
                    availabilityStatus: product.availabilityStatus || 'Unknown', // Default availability status if missing
                    returnPolicy: product.returnPolicy || 'No Return Policy', // Default return policy if missing
                    minimumOrderQuantity: product.minimumOrderQuantity || 1, // Default minimum order quantity
                    images: product.images || [], // Store images as an array
                    thumbnail: product.thumbnail || null // Default thumbnail if missing
                };

                // Insert product into the database
                const newProduct = new Product(productValues);
                
                await newProduct.save();
                console.log(`Inserted product: ${product.title}`);
            } catch (fetchError) {
                console.error(`Error fetching or inserting product with ID ${i}:`, fetchError.message);
            }

            // Optional: Add a delay to prevent hitting the rate limit
            await new Promise(resolve => setTimeout(resolve, 100)); // Delay for 100ms
        }

        console.log('All products populated successfully.');
    } catch (error) {
        console.error('Error populating database:', error);
    }
}

module.exports = populateDatabase;
