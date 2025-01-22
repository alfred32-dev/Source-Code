// routes/searchRoutes.js
const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const { authMiddleware } = require('../middlewares/authMiddleware');  // Assuming you have an auth middleware

// Log a new search
router.post('/log', searchController.logSearch);

// Get user's search history
router.get('/history', searchController.getUserSearches);

module.exports = router;
