const express = require('express');
const cors = require('cors');
const path = require('path');

// Import routes
const authRoutes = require('./routes/authRoutes');
const reportRoutes = require('./routes/reportRoutes');
const marketRoutes = require('./routes/marketRoutes');
const gamificationRoutes = require('./routes/gamificationRoutes');
const trainingRoutes = require('./routes/TrainingRoutes'); 

const app = express();

// 🔹 Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔹 Serve static files (uploads/images)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// 🔹  base route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// 🔹 Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/market', marketRoutes);
app.use('/api/gamification', gamificationRoutes);

app.use('/api/training', trainingRoutes); 

module.exports = app;

