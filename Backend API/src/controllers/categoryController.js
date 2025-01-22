const Category = require('../models/Category');

exports.listAllCategories = async (req, res) => {
    try {
        const categories = await Category.find(); // Fetch all categories without pagination
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
};

