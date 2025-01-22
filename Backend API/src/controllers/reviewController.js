const Review = require('../models/Review');
const User = require('../models/User');

// Create Review
exports.createReview = async (req, res) => {
  try {
    const { userId, productId, reviewText, rating } = req.body;

    // Create a new review
    const review = new Review({
      user: userId,
      product: productId,
      reviewText,
      rating
    });

    const savedReview = await review.save();

    // Update the user's review list with the new review
    await User.findByIdAndUpdate(userId, { $push: { reviews: savedReview._id } });

    res.status(201).json({ message: 'Review created successfully', review: savedReview });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create review' });
  }
};

// Update Review
exports.updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const updateData = req.body;

    const updatedReview = await Review.findByIdAndUpdate(reviewId, updateData, { new: true });

    if (!updatedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json({ message: 'Review updated successfully', updatedReview });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update review' });
  }
};

// Get Review Details
exports.getReviewDetails = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId).populate('user', 'username email').populate('product', 'name');

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json({ review });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch review details' });
  }
};
