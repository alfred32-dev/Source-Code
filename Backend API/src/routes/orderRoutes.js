const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Create a new order
router.post('/', orderController.createOrder);

// Update an order
router.put('/:orderId', orderController.updateOrder);

// View order details
router.get('/order/:orderId', orderController.getOrderDetails);

// List all orders for a specific user
router.get('/user/:userId', orderController.getUserOrders); // Changed this route

module.exports = router;
