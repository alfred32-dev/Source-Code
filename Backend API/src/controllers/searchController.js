// controllers/searchController.js
const Search = require('../models/Search');
const logger = require('../utils/logger');
const { handleServerError } = require('../utils/errorHandler');

const searchController = {
  // Log user search query
  logSearch: async (req, res) => {
    const { searchQuery } = req.body;
    const userId = req.user._id;  // Assuming `req.user` contains authenticated user info

    try {
      const newSearch = new Search({
        userId,
        searchQuery
      });

      await newSearch.save();
      logger.info(`Search query logged: User ${userId} searched for "${searchQuery}"`);
      res.status(201).json({ message: 'Search logged successfully.' });
    } catch (error) {
      logger.error('Error logging search:', error);
      return handleServerError(res, 'Error logging search.', error);
    }
  },

  // Get all searches for a user
  getUserSearches: async (req, res) => {
    const userId = req.user._id;

    try {
      const searches = await Search.find({ userId }).sort({ createdAt: -1 });

      if (!searches.length) {
        return res.status(404).json({ message: 'No search history found.' });
      }

      res.status(200).json({
        message: 'Search history retrieved successfully.',
        searches
      });
    } catch (error) {
      logger.error('Error fetching search history:', error);
      return handleServerError(res, 'Error fetching search history.', error);
    }
  }
};

module.exports = searchController;
