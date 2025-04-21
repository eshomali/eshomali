// server/config/db.js

const mysql = require('mysql2/promise');
const config = require('./config');

/**
 * Database configuration and connection pool setup
 */
const dbConfig = {
  development: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'eshomali_portfolio',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  },
  test: {
    host: process.env.TEST_DB_HOST || 'localhost',
    user: process.env.TEST_DB_USER || 'root',
    password: process.env.TEST_DB_PASSWORD || 'password',
    database: process.env.TEST_DB_NAME || 'eshomali_portfolio_test',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  },
  production: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0,
    ssl: {
      rejectUnauthorized: false
    }
  }
};

// Get environment
const env = process.env.NODE_ENV || 'development';

// Create connection pool
const pool = mysql.createPool(dbConfig[env]);

// Test database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    return false;
  }
};

module.exports = {
  pool,
  testConnection
};