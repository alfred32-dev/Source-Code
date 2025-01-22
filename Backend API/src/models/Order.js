const mongoose = require('mongoose');

// Order Schema
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referencing the User model
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, required: true },  // Referencing the product
      name: { type: String, required: true },  // Embedding product name
      price: { type: Number, required: true },  // Embedding product price
      quantity: { type: Number, required: true }  // Quantity of the product
    }
  ],
  totalAmount: { type: Number, required: true }, // Total cost of the order
  shippingAddress: { type: String, required: true }, // Shipping address for the order
  status: { type: String, enum: ['pending', 'shipped', 'delivered', 'cancelled'], default: 'pending' }, // Order status
  placedAt: { type: Date, default: Date.now },  // Timestamp when the order was placed
});

// Static method to create an order
orderSchema.statics.createOrder = async function (orderData) {
  const order = new this(orderData);
  return await order.save();
};

// Static method to update an order
orderSchema.statics.updateOrder = async function (orderId, updateData) {
  return await this.findByIdAndUpdate(orderId, updateData, { new: true });
};

// Static method to view order details
orderSchema.statics.getOrderById = async function (orderId) {
  return await this.findById(orderId).populate('user', 'username email'); // Populating user details
};

// Create Order model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
