const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Get user profile by ID
router.get('/:userId', profileController.getUserProfile);

// Update user profile by ID
router.put('/:userId', profileController.updateUserProfile);

// Route to update user preferences
router.post('/preferences', profileController.updateUserPreferences);

// Route to get recommended products
router.get('/recommended/:userId', profileController.getRecommendedProducts);

module.exports = router;
