const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Create a new review
router.post('/', reviewController.createReview);

// Update a review
router.put('/:reviewId', reviewController.updateReview);

// View review details
router.get('/:reviewId', reviewController.getReviewDetails);

module.exports = router;
