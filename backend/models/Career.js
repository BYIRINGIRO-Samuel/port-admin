const mongoose = require('mongoose');

const CareerSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  period: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Career', CareerSchema);
