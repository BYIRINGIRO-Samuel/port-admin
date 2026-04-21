const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  shortDesc: { type: String, required: true },
  tech: { type: String, required: true },
  github: { type: String },
  demo: { type: String },
  imageUrl: { type: String, required: true },
  behindTheBuild: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', ProjectSchema);
