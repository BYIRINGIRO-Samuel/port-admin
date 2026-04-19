const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true }, // lucide-react icon name
  size: { type: String, enum: ['sm', 'md', 'lg'], default: 'md' },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Service', ServiceSchema);
