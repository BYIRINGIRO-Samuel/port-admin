const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  text: { type: String, required: true },
  rating: { type: Number, required: true, default: 5 },
  verified: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);
