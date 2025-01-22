const mongoose = require('mongoose');

// Review Schema
const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to the product
  reviewText: { type: String, required: true },  // The review text
  rating: { type: Number, min: 1, max: 5, required: true },  // Rating between 1 and 5
  createdAt: { type: Date, default: Date.now }  // Timestamp
});

// Create Review model
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
