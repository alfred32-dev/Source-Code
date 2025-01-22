const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// User registration
router.post('/register', authController.register);

// User login
router.post('/login', authController.login);

// Forgot password
router.post('/forgot-password', authController.forgotPassword);

// Reset password
router.post('/reset-password', authController.resetPassword);

module.exports = router;
