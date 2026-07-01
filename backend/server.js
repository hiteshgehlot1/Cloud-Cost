require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const calculateRoutes = require('./routes/calculate');
const planRoutes = require('./routes/plans');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/calculate', calculateRoutes);
app.use('/api/plans', planRoutes);

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cloudspend';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
