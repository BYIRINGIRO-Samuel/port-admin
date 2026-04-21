const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const projectRoutes = require('./routes/projectRoutes');
const authRoutes = require('./routes/authRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const messageRoutes = require('./routes/messageRoutes');
const statsRoutes = require('./routes/statsRoutes');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for the live connection
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
  }
});

// Main server initialization - Narratives enabled
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files static

// Make io accessible to our routes
app.set('socketio', io);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/stats', statsRoutes);

// Socket.io Connection Logic
io.on('connection', (socket) => {
  console.log('Real-time connection established:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('User disconnected from live feed');
  });
});

// Base route for health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Operational', message: 'Admin Backend is running' });
});

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio-admin')
.then(() => {
  console.log('Connected to MongoDB');
  server.listen(PORT, () => {
    console.log(`Admin Real-time Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('Database connection error:', err);
});
