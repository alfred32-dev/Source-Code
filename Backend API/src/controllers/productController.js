const Product = require('../models/Product');

// Controller to list all products with pagination
exports.listAllProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const products = await Product.listPaginated(page, limit);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};
// Controller to list products by tags with pagination
exports.listProductsByTags = async (req, res) => {
  const tags = req.body.tags; // Expecting an array of tags in the request body
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  if (!Array.isArray(tags) || tags.length === 0) {
    return res.status(400).json({ message: 'Tags must be a non-empty array.' });
  }

  try {
    const products = await Product.findByTags(tags, page, limit);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products by tags', error });
  }
};
// Controller to list popular products with pagination
exports.listPopularProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const products = await Product.listByPopularityPaginated(page, limit);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching popular products', error });
  }
};
// Controller to find a product by ID
exports.getProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product by ID', error });
  }
};
// Update stock after an order
exports.updateStock = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const updatedProduct = await Product.updateStock(productId, quantity);

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Stock updated successfully', updatedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update stock' });
  }
};
// Controller to list products by category with pagination
exports.listProductsByCategory = async (req, res) => {
    const { categoryId } = req.params; // Use categoryId
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const products = await Product.listByCategoryPaginated(categoryId, page, limit);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products by category', error });
    }
};
// Controller to search products by name
exports.searchProduct = async (req, res) => {
    const { query } = req.query; // Get the search query
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const products = await Product.search(query, page, limit); // Implement this in the model
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error searching products', error });
    }
};

