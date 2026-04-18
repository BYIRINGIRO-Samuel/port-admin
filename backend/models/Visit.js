const mongoose = require('mongoose');

const VisitSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  ip: {
    type: String,
    default: 'unknown'
  }
});

module.exports = mongoose.model('Visit', VisitSchema);
