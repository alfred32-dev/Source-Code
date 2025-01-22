const mongoose = require('mongoose');

// Product Schema with embedded category information (denormalized)
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stockQuantity: { type: Number, required: true },
  category: {
    id: { type: mongoose.Schema.Types.ObjectId, required: true },  // Category ID
    name: { type: String, required: true },  // Category name
    description: { type: String }  // Optional category description
  },  // Embedded category data
  rating: { type: Number, min: 0, max: 5 },
  popularityScore: { type: Number, default: 0 },
  tags: { type: [String] },  // Array of tags
  brand: { type: String },
  sku: { type: String },
  weight: { type: Number },
  warrantyInformation: { type: String },
  shippingInformation: { type: String },
  availabilityStatus: { type: String },
  returnPolicy: { type: String },
  minimumOrderQuantity: { type: Number, default: 1 },
  images: { type: [String] },  // Array of image URLs
  thumbnail: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Static method to find products by tags with pagination
productSchema.statics.findByTags = async function (tags, page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  const products = await this.find({ tags: { $in: tags } }) // Find products with any of the provided tags
    .skip(skip)
    .limit(limit)
    .exec();

  const total = await this.countDocuments({ tags: { $in: tags } }); // Get total number of matching products
  const totalPages = Math.ceil(total / limit);

  return {
    products,
    currentPage: page,
    totalPages,
    totalProducts: total
  };
};

// Static method to search products by name with pagination
productSchema.statics.search = async function (query, page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  const products = await this.find({ name: { $regex: query, $options: 'i' } }) // Case-insensitive search
    .skip(skip)
    .limit(limit)
    .exec();

  const total = await this.countDocuments({ name: { $regex: query, $options: 'i' } });
  const totalPages = Math.ceil(total / limit);

  return {
    products,
    currentPage: page,
    totalPages,
    totalProducts: total
  };
};

// Static method to list products by category with pagination using category ID
productSchema.statics.listByCategoryPaginated = async function (categoryId, page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  const products = await this.find({ 'category.id': categoryId }) // Query by category ID
    .skip(skip)
    .limit(limit)
    .exec();

  const total = await this.countDocuments({ 'category.id': categoryId }); // Correct count
  const totalPages = Math.ceil(total / limit);

  return {
    products,
    currentPage: page,
    totalPages,
    totalProducts: total
  };
};


// Static method to list products with pagination
productSchema.statics.listPaginated = async function (page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  const products = await this.find()
    .skip(skip)
    .limit(limit)
    .exec();
  
  const total = await this.countDocuments(); // Get total number of products
  const totalPages = Math.ceil(total / limit); // Calculate total pages
  
  return {
    products,
    currentPage: page,
    totalPages,
    totalProducts: total
  };
};

// Static method to list popular products with pagination
productSchema.statics.listByPopularityPaginated = async function (page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  const products = await this.find({ popularityScore: { $gt: 0 } }) // Only include products with popularityScore > 0
    .sort({ popularityScore: -1 }) // Sort by popularityScore in descending order
    .skip(skip)
    .limit(limit)
    .exec();
  
  const total = await this.countDocuments({ popularityScore: { $gt: 0 } });
  const totalPages = Math.ceil(total / limit);
  
  return {
    products,
    currentPage: page,
    totalPages,
    totalProducts: total
  };
};

// Static method to find a product by its ID
productSchema.statics.findById = async function (productId) {
  return await this.find({ _id: productId }).exec();
};

// Static method to update stock quantity
productSchema.statics.updateStockQuantity = async function (productId, quantity) {
  return await this.findByIdAndUpdate(productId, { $inc: { stockQuantity: -quantity } }).exec();
};

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
