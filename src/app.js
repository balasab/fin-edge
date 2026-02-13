const express = require('express');
const cors = require('cors');

const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger); // Custom logger

// Routes
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', timestamp: new Date() });
});

app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);
app.use('/summary', analyticsRoutes);

// Global Error Handler
app.use(errorHandler);

module.exports = app;
