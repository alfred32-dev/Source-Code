const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');
const { sendResetPasswordEmail } = require('../utils/emailService');
const { jwtSecret } = require('../config/jwt');
const { handleServerError } = require('../utils/errorHandler');

// Auth Controller
const authController = {
  // User Registration
  register: async (req, res) => {
    const { username, email, password, fullName } = req.body;

    try {
      // Check if email already exists
      const existingUserByEmail = await User.findByEmail(email);
      if (existingUserByEmail) {
        logger.warn(`Registration failed: Email already in use - ${email}`);
        return res.status(400).json({ message: 'Email is already in use.' });
      }

      // Hash the password
      const passwordHash = await bcrypt.hash(password, 10);

      // Create a new user object
      const newUser = {
        username,
        email,
        passwordHash,
        fullName,
        // Optional fields can be left out or set to null
      };

      // Create a new user in the database
      await User.create(newUser);

      logger.info(`User registered successfully: ${username} (${email})`);
      return res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
      logger.error('Registration failed:', error);
      return handleServerError(res, 'Registration failed.', error);
    }
  },
//login
  login: async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findByEmail(email);
      if (!user) {
        logger.warn(`Login attempt failed for email: ${email}`);
        return res.status(400).json({ message: 'Invalid email or password.' });
      }
  
      // Check password match
      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        logger.warn(`Incorrect password for email: ${email}`);
        return res.status(400).json({ message: 'Invalid email or password.' });
      }
  
      // Generate JWT token with user ID and email
      const token = jwt.sign({ userId: user._id, email: user.email }, jwtSecret, { expiresIn: '1h' });
  
      logger.info(`User with ID: ${user._id} logged in successfully.`);
      return res.status(200).json({
        message: 'Login successful.',
        token,
        user: {
          id: user._id,          // Send back the MongoDB _id as userId
          email: user.email,
        }
      });
    } catch (error) {
      logger.error(`Login error: ${error.message}`);
      return handleServerError(res, 'Login failed.', error);
    }
  },
  
  // Forgot Password
  forgotPassword: async (req, res) => {
    const { email } = req.body;

    try {
      // Find user by email
      const user = await User.findByEmail(email);
      if (!user) {
        logger.warn(`Password reset attempt failed: No user found with email - ${email}`);
        return res.status(400).json({ message: 'No user found with this email.' });
      }

      // Generate password reset token
      const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });

      // Send reset password email
      await sendResetPasswordEmail(email, token);

      logger.info(`Password reset email sent to: ${email}`);
      return res.status(200).json({ message: 'Password reset email sent.' });
    } catch (error) {
      logger.error('Error sending password reset email:', error);
      return handleServerError(res, 'Error sending password reset email.', error);
    }
  },

  // Reset Password
  resetPassword: async (req, res) => {
    const { token, newPassword } = req.body;

    try {
      // Verify the reset token
      const decoded = jwt.verify(token, jwtSecret);
      const userId = decoded.userId;

      // Find user by ID
      const user = await User.findById(userId);
      if (!user) {
        logger.warn(`Password reset attempt failed: No user found with ID - ${userId}`);
        return res.status(404).json({ message: 'User not found.' });
      }

      // Hash the new password
      const newPasswordHash = await bcrypt.hash(newPassword, 10);

      // Update user's password
      await user.updatePassword(newPasswordHash);

      logger.info(`Password reset successfully for user ID: ${userId}`);
      return res.status(200).json({ message: 'Password reset successfully.' });
    } catch (error) {
      logger.error('Password reset failed:', error);
      return handleServerError(res, 'Password reset failed.', error);
    }
  },
};

module.exports = authController;
