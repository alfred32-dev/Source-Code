const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route to list all products with pagination
router.get('/', productController.listAllProducts);

// Route to list popular products with pagination
router.get('/popular', productController.listPopularProducts);

// Route to list products by category with pagination
router.get('/category/:categoryId', productController.listProductsByCategory);

// Route to search products
router.get('/search', productController.searchProduct);

// Route to get product by ID
router.get('/:productId', productController.getProductById);

// Route to update stock after purchase
router.post('/update-stock', productController.updateStock);

//Route to get a list of tags
router.post('/tags', productController.listProductsByTags);


module.exports = router;
