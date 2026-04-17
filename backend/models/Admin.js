const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  passcode: { type: String, required: true }
});

module.exports = mongoose.model('Admin', AdminSchema);
