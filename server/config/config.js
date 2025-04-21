// server/config/config.js
require('dotenv').config();
/**
 * Server configuration settings for different environments
 */
const config = {
  // Development environment settings
  development: {
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET || 'dev-jwt-secret',
    corsOrigin: 'http://localhost:3000',
    mailService: {
      host: process.env.MAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.MAIL_PORT) || 587,
      auth: {
        user: process.env.MAIL_USER || 'your.email@gmail.com',
        pass: process.env.MAIL_PASS || 'your-app-password'
      },
      from: process.env.MAIL_FROM || 'your.email@gmail.com'
    }
  },
  
  // Test environment settings
  test: {
    port: process.env.PORT || 5001,
    jwtSecret: process.env.JWT_SECRET || 'test-jwt-secret',
    corsOrigin: 'http://localhost:3000',
    mailService: {
      host: process.env.MAIL_HOST || 'smtp.mailtrap.io',
      port: process.env.MAIL_PORT || 2525,
      auth: {
        user: process.env.MAIL_USER || 'your_mailtrap_user',
        pass: process.env.MAIL_PASS || 'your_mailtrap_password'
      },
      from: process.env.MAIL_FROM || 'admin@eshomali.com'
    }
  },
  
  // Production environment settings
  production: {
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET,
    corsOrigin: 'https://eshomali.com',
    mailService: {
      host: process.env.MAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.MAIL_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER || 'your.email@gmail.com',
        pass: process.env.MAIL_PASS || 'your-app-password'
      },
      from: process.env.MAIL_FROM || 'your.email@gmail.com'
    }
  }
};

const env = process.env.NODE_ENV || 'development';
console.log(`Using email configuration for ${env} environment:`, {
  host: config[env].mailService.host,
  port: config[env].mailService.port,
  user: config[env].mailService.auth.user,
  from: config[env].mailService.from
});

// Export the configuration for the current environment
module.exports = config[env];