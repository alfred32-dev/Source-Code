// models/Search.js
const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  searchQuery: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Search = mongoose.model('Search', searchSchema);

module.exports = Search;
