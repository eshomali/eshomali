// server/server.js

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const emailService = require('./utils/emailService');

// Import configuration
const config = require('./config/config');
const { testConnection } = require('./config/db');

// Import routes
const portfolioRoutes = require('./routes/portfolioRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Initialize express app
const app = express();

// Test database connection
testConnection();

// Set up middlewares
app.use(helmet()); // Security headers
app.use(compression()); // Compress responses
app.use(cors({
  origin: config.corsOrigin,
  optionsSuccessStatus: 200
}));
app.use(express.json()); // JSON body parser
app.use(express.urlencoded({ extended: true })); // URL-encoded body parser

// Request logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Rate limiting for API routes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { 
    error: 'Too many requests, please try again later.' 
  }
});

// Apply rate limiting to API routes
app.use('/api/', apiLimiter);

// API routes
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/contact', contactRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React build directory
  app.use(express.static(path.join(__dirname, '../dist')));
  
  // For any route not handled by the API, serve the React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    error: {
      message,
      ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    }
  });
});

// Route not found handler
app.use((req, res) => {
  res.status(404).json({ error: { message: 'Route not found' } });
});

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Check SMTP connection on server start
  emailService.verifyConnection()
    .then(success => {
      if (success) {
        console.log('✅ SMTP connection verified and working');
      } else {
        console.error('❌ SMTP connection failed - check your email settings');
      }
    })
    .catch(error => {
      console.error('❌ SMTP verification error:', error);
    });

module.exports = app; // For testing