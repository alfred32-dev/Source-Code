const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Route to list all categories 
router.get('/', categoryController.listAllCategories);

module.exports = router;
