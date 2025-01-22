const Order = require('../models/Order');
const User = require('../models/User');

// Create Order
exports.createOrder = async (req, res) => {
  try {
    const { userId, products, totalAmount, shippingAddress } = req.body;

    // Log the request body to debug
    console.log('Received Order Data:', req.body);

    // Validate that the required fields are present
    if (!userId || !products || !totalAmount || !shippingAddress) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create the new order
    const order = await Order.createOrder({
      user: userId,
      products,
      totalAmount,
      shippingAddress
    });

    // Add the order reference to the user's orders list
    await User.findByIdAndUpdate(userId, { $push: { orders: order._id } });

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error('Error creating order:', error);  // Log error if any
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// Update Order
exports.updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const updateData = req.body;
    
    const updatedOrder = await Order.updateOrder(orderId, updateData);

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ message: 'Order updated successfully', updatedOrder });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
};

// View Order Details
exports.getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const order = await Order.getOrderById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order details' });
  }
};


exports.getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('Fetching orders for userId:', userId); // Log userId

    const orders = await Order.find({ user: userId }).sort({ placedAt: -1 });

    if (!orders.length) {
      return res.status(404).json({ error: 'No orders found for this user' });
    }

    res.json({ orders });
  } catch (error) {
    console.error('Error fetching user orders:', error); // Log error
    res.status(500).json({ error: 'Failed to fetch user orders' });
  }
};


