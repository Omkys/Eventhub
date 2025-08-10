const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('../backend/routes/auth');
const eventRoutes = require('../backend/routes/events');
const userRoutes = require('../backend/routes/users');
const analyticsRoutes = require('../backend/routes/analytics');

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/eventhub';

if (mongoose.connection.readyState === 0) {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB error:', err.message));
}

// Routes
app.use('/auth', authRoutes);
app.use('/events', eventRoutes);
app.use('/users', userRoutes);
app.use('/analytics', analyticsRoutes);

// Health check
app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
  res.json({ 
    status: 'OK', 
    message: 'EventHub API is running',
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'EventHub API Server',
    version: '1.0.0',
    endpoints: ['/auth', '/events', '/users', '/analytics']
  });
});

module.exports = app;