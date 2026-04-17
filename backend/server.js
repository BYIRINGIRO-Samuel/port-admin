const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const projectRoutes = require('./routes/projectRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files static

// Routes
app.use('/api/projects', projectRoutes);

// Base route for health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Operational', message: 'Admin Backend is running' });
});

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio-admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Admin Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('Database connection error:', err);
});
