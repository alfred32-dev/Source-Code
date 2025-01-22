const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  fullName: { type: String },
  address: { type: String },
  country: { type: String },
  age: { type: String },
  gender: { type: String },
  phoneNumber: { type: String },
  preferences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }], // Array of category IDs

  createdAt: { type: Date, default: Date.now }
});

// Static method to find user by email
userSchema.statics.findByEmail = async function (email) {
  return await this.findOne({ email });
};

// Static method to update password
userSchema.methods.updatePassword = async function (newPasswordHash) {
  this.passwordHash = newPasswordHash;
  return await this.save();
};

// Static function to list all users
userSchema.statics.listAll = async function () {
  return await this.find();
};



const User = mongoose.model('User', userSchema);
module.exports = User;
