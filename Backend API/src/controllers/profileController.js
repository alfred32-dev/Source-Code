const User = require('../models/User');
const Product = require('../models/Product'); 


// Get user profile by ID
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;  // Fetch user ID from request parameters

    const user = await User.findById(userId);  // Find user by ID

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send the user profile data
    res.json({
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      address: user.address,
      country: user.country,
      phoneNumber: user.phoneNumber,
      preferences: user.preferences,
      createdAt: user.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
};

// Update user profile by ID
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;  // Fetch user ID from request parameters
    const updateData = req.body;  // Data to update

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};


// Update user preferences
exports.updateUserPreferences = async (req, res) => {
  const { userId, preferences } = req.body; // Preferences should be an array of category IDs

  try {
    const user = await User.findByIdAndUpdate(userId, { preferences }, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating preferences', error });
  }
};

// Get recommended products based on user preferences
exports.getRecommendedProducts = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('preferences'); // Populate the preferences
    if (!user || user.preferences.length === 0) {
      return res.status(400).json({ message: 'Please set your preferences.' });
    }

    const recommendedProducts = [];
    for (const category of user.preferences) {
      const products = await Product.listByCategoryPaginated(category._id, 1, 3); // Use category._id to fetch products
      recommendedProducts.push(...products.products);
    }

    // Randomize the recommended products if needed
    const shuffledProducts = recommendedProducts.sort(() => 0.5 - Math.random());
    res.status(200).json(shuffledProducts);
  } catch (error) {
    console.error('Error fetching recommended products:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error fetching recommended products', error });
  }
};
