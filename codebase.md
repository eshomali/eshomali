# .github\workflows\deploy.yml

```yml
name: Deploy

on:
  push:
    branches:
      - main

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repo
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4

      - name: Install dependencies
        uses: bahmutov/npm-install@v1

      - name: Build project
        run: npm run build

      - name: Upload production-ready build files
        uses: actions/upload-artifact@v4
        with:
          name: production-files
          path: ./dist

  deploy:
    name: Deploy
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Download artifact
        uses: actions/download-artifact@v4
        with:
          name: production-files
          path: ./dist

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

# .gitignore

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

```

# .idea\.gitignore

```
# Default ignored files
/shelf/
/workspace.xml
# Editor-based HTTP Client requests
/httpRequests/
# Datasource local storage ignored files
/dataSources/
/dataSources.local.xml

```

# .idea\eshomali.github.io.iml

```iml
<?xml version="1.0" encoding="UTF-8"?>
<module type="WEB_MODULE" version="4">
  <component name="NewModuleRootManager">
    <content url="file://$MODULE_DIR$">
      <excludeFolder url="file://$MODULE_DIR$/.tmp" />
      <excludeFolder url="file://$MODULE_DIR$/temp" />
      <excludeFolder url="file://$MODULE_DIR$/tmp" />
    </content>
    <orderEntry type="inheritedJdk" />
    <orderEntry type="sourceFolder" forTests="false" />
  </component>
</module>
```

# .idea\inspectionProfiles\Project_Default.xml

```xml
<component name="InspectionProjectProfileManager">
  <profile version="1.0">
    <option name="myName" value="Project Default" />
    <inspection_tool class="Eslint" enabled="true" level="WARNING" enabled_by_default="true" />
  </profile>
</component>
```

# .idea\modules.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project version="4">
  <component name="ProjectModuleManager">
    <modules>
      <module fileurl="file://$PROJECT_DIR$/.idea/eshomali.github.io.iml" filepath="$PROJECT_DIR$/.idea/eshomali.github.io.iml" />
    </modules>
  </component>
</project>
```

# .idea\vcs.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project version="4">
  <component name="VcsDirectoryMappings">
    <mapping directory="" vcs="Git" />
  </component>
</project>
```

# .idea\workspace.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project version="4">
  <component name="PropertiesComponent">{}</component>
</project>
```

# db\schema.sql

```sql
-- db/schema.sql

-- Drop existing tables if they exist
DROP TABLE IF EXISTS contact_messages;
DROP TABLE IF EXISTS project_technologies;
DROP TABLE IF EXISTS technologies;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS testimonials;

-- Create categories table
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  slug VARCHAR(50) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create projects table
CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  long_description TEXT,
  image VARCHAR(255) NOT NULL,
  category_id INT NOT NULL,
  client VARCHAR(100) NOT NULL,
  year INT NOT NULL,
  completed_date DATE,
  demo_url VARCHAR(255),
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Create technologies table
CREATE TABLE technologies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create project_technologies junction table
CREATE TABLE project_technologies (
  project_id INT NOT NULL,
  technology_id INT NOT NULL,
  PRIMARY KEY (project_id, technology_id),
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (technology_id) REFERENCES technologies(id) ON DELETE CASCADE
);

-- Create testimonials table
CREATE TABLE testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  position VARCHAR(100) NOT NULL,
  company VARCHAR(100) NOT NULL,
  image VARCHAR(255) NOT NULL,
  quote TEXT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create contact_messages table
CREATE TABLE contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample categories
INSERT INTO categories (name, slug) VALUES
('Web Development', 'web-development'),
('Mobile App', 'mobile-app'),
('UI/UX Design', 'ui-ux-design'),
('E-commerce', 'e-commerce');

-- Insert sample technologies
INSERT INTO technologies (name) VALUES
('React'),
('Node.js'),
('Express'),
('MySQL'),
('MongoDB'),
('GraphQL'),
('React Native'),
('TypeScript'),
('Firebase'),
('Redux'),
('Tailwind CSS'),
('Figma');

-- Insert sample projects
INSERT INTO projects (title, slug, description, long_description, image, category_id, client, year, demo_url, featured) VALUES
(
  'E-Commerce Platform',
  'e-commerce-platform',
  'A full-featured e-commerce platform with real-time inventory management and payment processing.',
  'This comprehensive e-commerce solution includes user authentication, product catalog management, shopping cart functionality, secure checkout with multiple payment options, order tracking, and an admin dashboard for inventory and order management. Built with React for the frontend and Node.js/Express for the backend, with MySQL database.',
  '/images/portfolio/project-1.jpg',
  4,
  'RetailGrowth Inc.',
  2023,
  'https://retailgrowth-demo.com',
  TRUE
),
(
  'Health Monitoring App',
  'health-monitoring-app',
  'A cross-platform mobile app for health monitoring with real-time data visualization and personalized insights.',
  'This mobile application helps users track various health metrics including activity, nutrition, sleep, and vital signs. It features custom visualizations, trend analysis, and AI-powered health insights. Developed using React Native for cross-platform compatibility with a Node.js backend and MongoDB database.',
  '/images/portfolio/project-2.jpg',
  2,
  'HealthTech Solutions',
  2022,
  'https://healthtech-monitor.com',
  TRUE
),
(
  'Financial Dashboard',
  'financial-dashboard',
  'An interactive financial dashboard with real-time data visualization and predictive analytics.',
  'This dashboard provides financial professionals with comprehensive tools for data analysis and visualization. Features include interactive charts, customizable reports, and machine learning-powered forecasting. Built with React, D3.js for visualizations, and a Node.js/Express backend with GraphQL API.',
  '/images/portfolio/project-3.jpg',
  1,
  'InvestSmart Financial',
  2023,
  'https://investsmart-dash.com',
  FALSE
),
(
  'Restaurant Ordering System',
  'restaurant-ordering-system',
  'A complete digital ordering system for restaurants with real-time kitchen updates and customer interface.',
  'This system streamlines the ordering process for restaurants, featuring a customer-facing menu app, staff dashboard for order management, and kitchen display system. Includes table management, online ordering, and integration with payment processors. Built with React, Node.js, and Socket.io for real-time functionality.',
  '/images/portfolio/project-4.jpg',
  1,
  'Culinary Innovations',
  2022,
  'https://culinary-order-demo.com',
  FALSE
),
(
  'Travel Experience Platform',
  'travel-experience-platform',
  'A modern travel platform focusing on unique experiences with immersive content and booking capabilities.',
  'This platform connects travelers with unique local experiences, featuring immersive content, user reviews, and integrated booking. The design focuses on inspiring discovery while maintaining ease of use. Created with a mobile-first approach using React, with a Node.js/Express backend and MongoDB database.',
  '/images/portfolio/project-5.jpg',
  3,
  'Wanderlust Travels',
  2023,
  'https://wanderlust-experiences.com',
  TRUE
),
(
  'Productivity Suite',
  'productivity-suite',
  'A comprehensive productivity tool suite with task management, time tracking, and team collaboration features.',
  'This productivity ecosystem includes modules for task management, time tracking, document collaboration, and team communication. The suite features a consistent design language across all tools with robust cross-device synchronization. Developed using React for frontend with TypeScript, and Node.js/Express backend with MySQL database.',
  '/images/portfolio/project-6.jpg',
  1,
  'Efficiency Works',
  2022,
  'https://efficiency-suite.com',
  FALSE
);

-- Link projects with technologies
INSERT INTO project_technologies (project_id, technology_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 11), -- E-Commerce Platform
(2, 7), (2, 9), (2, 5), (2, 10), -- Health Monitoring App
(3, 1), (3, 2), (3, 6), (3, 8), -- Financial Dashboard
(4, 1), (3), (2), (4), (9), -- Restaurant Ordering System
(5, 1), (2), (5), (11), (12), -- Travel Experience Platform
(6, 1), (2), (3), (4), (8); -- Productivity Suite

-- Insert sample testimonials
INSERT INTO testimonials (name, position, company, image, quote, rating, featured) VALUES
(
  'Sarah Johnson',
  'CTO',
  'TechVision',
  '/images/testimonials/testimonial-1.jpg',
  'Working with Essa was a game-changer for our company. He delivered a complex web application that exceeded our expectations in terms of performance and user experience. His technical expertise and attention to detail are truly impressive.',
  5,
  TRUE
),
(
  'Michael Chen',
  'Founder',
  'StartupLaunch',
  '/images/testimonials/testimonial-2.jpg',
  'Essa helped us transform our startup idea into a polished digital product. His ability to understand our business needs and translate them into a functional application was remarkable. I highly recommend his services to any startup founder.',
  5,
  TRUE
),
(
  'Rebecca Torres',
  'Marketing Director',
  'GrowthBrand',
  '/images/testimonials/testimonial-3.jpg',
  'Our e-commerce platform needed a complete overhaul, and Essa delivered beyond our expectations. The new site is not only visually stunning but has significantly improved our conversion rates. His technical skills combined with business acumen make him an invaluable partner.',
  5,
  FALSE
),
(
  'David Williams',
  'Product Manager',
  'EnterpriseApp',
  '/images/testimonials/testimonial-4.jpg',
  'The work on our enterprise dashboard was exceptional. He created an intuitive interface that simplified complex data visualization for our users. His communication throughout the project was clear and professional, making the entire process smooth and efficient.',
  4,
  FALSE
);
```

# eslint.config.js

```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  // Frontend files (React)
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  // Backend files (Node.js)
  {
    files: ['server/**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.node,
        require: 'readonly',
        module: 'writable',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly'
      },
      parserOptions: {
        sourceType: 'commonjs',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
]
```

# favicon.svg

This is a file of the type: SVG Image

# index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Essa Shomali - Professional App Developer. Helping businesses transform their digital presence with modern, accessible, and high-performance web applications." />
    
    <!-- Preconnect to font providers -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://eshomali.com/">
    <meta property="og:title" content="Essa Shomali - Professional App Developer">
    <meta property="og:description" content="Helping businesses transform their digital presence with modern, accessible, and high-performance web applications.">
    <meta property="og:image" content="/images/og-image.jpg">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://eshomali.com/">
    <meta property="twitter:title" content="Essa Shomali - Professional App Developer">
    <meta property="twitter:description" content="Helping businesses transform their digital presence with modern, accessible, and high-performance web applications.">
    <meta property="twitter:image" content="/images/og-image.jpg">
    
    <!-- Theme Color -->
    <meta name="theme-color" content="#111827">
    
    <title>Essa Shomali - Professional App Developer</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

# package.json

```json
{
  "name": "eshomali.github.io",
  "private": true,
  "version": "1.0.0",
  "homepage": "https://eshomali.github.io/",
  "scripts": {
	"predeploy" : "npm run build",
	"deploy" : "gh-pages -d dist",
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "server": "node server/server.js",
    "server:dev": "nodemon server/server.js",
    "start": "node server/server.js",
    "db:setup": "mysql -u root -p < db/schema.sql",
    "dev:full": "concurrently \"npm run dev\" \"npm run server:dev\""
  },
  "dependencies": {
    "compression": "^1.7.4",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "express-rate-limit": "^7.1.5",
    "helmet": "^7.1.0",
    "mysql2": "^3.9.2",
    "nodemailer": "^6.9.10",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-helmet-async": "^2.0.5",
    "react-router-dom": "^6.30.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.22.0",
    "@fortawesome/fontawesome-free": "^6.7.2",
    "@types/react": "^19.0.10",
    "@types/react-dom": "^19.0.4",
    "@vitejs/plugin-react": "^4.3.4",
    "concurrently": "^8.2.2",
    "eslint": "^9.22.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "gh-pages": "^6.3.0",
    "globals": "^16.0.0",
    "morgan": "^1.10.0",
    "nodemon": "^3.1.0",
    "vite": "^6.3.1"
  }
}

```

# public\vite.svg

This is a file of the type: SVG Image

# README.md

```md
# Essa Shomali - Professional Portfolio Website

A professional portfolio website for showcasing app development projects and services. Built with React, Node.js/Express, and MySQL.

## 🚀 Features

- Modern, responsive design optimized for all devices
- Lighthouse performance score of 90+
- WCAG 2.1 accessibility compliant
- Interactive project portfolio with filtering
- Contact form with email notifications
- Client testimonials
- Services showcase
- Professional about section
- SEO optimized

## 🛠️ Technology Stack

### Frontend
- React 19
- React Router for navigation
- CSS with custom variables for theming
- Responsive design with media queries
- Animations and transitions
- SEO optimization with React Helmet

### Backend
- Node.js with Express
- MySQL database
- RESTful API architecture
- Nodemailer for email handling
- Express Rate Limit for API protection
- Helmet for security headers
- Compression for response optimization

## 📋 Requirements

- Node.js 18+
- MySQL 8.0+
- npm or yarn

## 🔧 Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/eshomali-website.git
   cd eshomali-website
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create a `.env` file in the root directory with the following variables:
   \`\`\`
   # Server
   PORT=5000
   NODE_ENV=development
   
   # Database
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=eshomali_portfolio
   
   # Email
   MAIL_HOST=your_smtp_host
   MAIL_PORT=your_smtp_port
   MAIL_USER=your_smtp_username
   MAIL_PASS=your_smtp_password
   MAIL_FROM=contact@eshomali.com
   \`\`\`

4. Set up the database:
   \`\`\`bash
   npm run db:setup
   \`\`\`
   (or manually run the SQL script in `db/schema.sql`)

## 🚀 Development

Run the frontend and backend in development mode:

\`\`\`bash
npm run dev:full
\`\`\`

Or run them separately:

\`\`\`bash
# Frontend only
npm run dev

# Backend only
npm run server:dev
\`\`\`

## 🏗️ Building for Production

1. Build the frontend:
   \`\`\`bash
   npm run build
   \`\`\`

2. Start the production server:
   \`\`\`bash
   npm start
   \`\`\`

## 📁 Project Structure

\`\`\`
eshomali-website/
├── public/             # Static assets
├── src/                # Frontend React code
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable React components
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── styles/         # Global styles and CSS variables
│   ├── utils/          # Utility functions and API
│   ├── App.jsx         # Main React component
│   └── main.jsx        # Entry point
├── server/             # Backend Node.js/Express code
│   ├── config/         # Server configuration
│   ├── controllers/    # Route controllers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── utils/          # Server utilities
│   └── server.js       # Server entry point
├── db/                 # Database scripts
└── package.json        # Project dependencies and scripts
\`\`\`

## 📱 Responsive Design

The website is fully responsive with the following breakpoints:

- Mobile: up to 576px
- Tablet: 577px to 768px
- Laptop: 769px to 992px
- Desktop: 993px to 1200px
- Large Desktop: 1201px and above

## ♿ Accessibility

This website adheres to WCAG 2.1 AA standards, featuring:

- Semantic HTML
- Proper heading hierarchy
- Adequate color contrast
- ARIA attributes where needed
- Keyboard navigation
- Screen reader compatibility
- Focus indicators

## 🔒 Security

- HTTP Security Headers via Helmet
- Rate limiting on sensitive endpoints
- Input validation
- XSS protection
- CSRF protection
- Secure email handling

## 📈 Performance Optimization

- Code splitting and lazy loading
- Image optimization
- CSS minification
- Gzip compression
- Response caching
- Efficient API queries

## 🔄 Continuous Integration/Deployment

Set up CI/CD pipeline with GitHub Actions:

1. Run tests
2. Build frontend
3. Deploy to hosting platform

## 🧪 Testing

- Unit tests for components
- API endpoint tests
- Accessibility tests
- Performance tests

## 📃 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

Essa Shomali - contact@eshomali.com

Project Link: [https://github.com/yourusername/eshomali-website](https://github.com/yourusername/eshomali-website)
```

# server\config\config.js

```js
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
```

# server\config\db.js

```js
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
```

# server\controllers\contactController.js

```js
// server/controllers/contactController.js

const Contact = require('../models/Contact');

/**
 * Submit a contact form
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
exports.submitContactForm = async (req, res, next) => {
  try {
    // Validate required fields
    const requiredFields = ['name', 'email', 'subject', 'message'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          success: false,
          error: `Please provide ${field}`
        });
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address'
      });
    }

    // Create the message
    const message = await Contact.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: {
        id: message.id,
        createdAt: message.created_at
      }
    });
  } catch (error) {
    console.error('Contact form submission error:', error);

    // Provide more specific error message
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({
        success: false,
        error: 'Could not connect to email server. Please try again later or contact support.'
      });
    }

    if (error.code === 'EAUTH') {
      return res.status(500).json({
        success: false,
        error: 'Email authentication failed. Please try again later or contact support.'
      });
    }

    res.status(500).json({
      success: false,
      error: 'An error occurred while sending your message. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Get all contact messages (protected route for admin)
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
exports.getMessages = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const result = await Contact.getAll(page, limit);
    
    res.status(200).json({
      success: true,
      data: result.messages,
      pagination: result.pagination
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a specific contact message by ID (protected route for admin)
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
exports.getMessageById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await Contact.getById(id);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        error: 'Message not found'
      });
    }
    
    // Automatically mark as read if status was new
    if (message.status === 'new') {
      await Contact.updateStatus(id, 'read');
      message.status = 'read';
    }
    
    res.status(200).json({
      success: true,
      data: message
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update the status of a contact message (protected route for admin)
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
exports.updateMessageStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({
        success: false,
        error: 'Please provide status'
      });
    }
    
    const success = await Contact.updateStatus(id, status);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        error: 'Message not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: `Message status updated to ${status}`
    });
  } catch (error) {
    next(error);
  }
};
```

# server\controllers\portfolioController.js

```js
// server/controllers/portfolioController.js

const Project = require('../models/Project');

/**
 * Get all projects with optional category filter
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
exports.getProjects = async (req, res, next) => {
  try {
    const { category } = req.query;
    const projects = await Project.getAll(category);
    
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a specific project by slug
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
exports.getProjectBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const project = await Project.getBySlug(slug);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get featured projects
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
exports.getFeaturedProjects = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 3;
    const projects = await Project.getFeatured(limit);
    
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all project categories
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Project.getCategories();
    
    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new project (protected route for admin)
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
exports.createProject = async (req, res, next) => {
  try {
    // Validate required fields
    const requiredFields = ['title', 'slug', 'description', 'image', 'categoryId', 'client', 'year'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          success: false,
          error: `Please provide ${field}`
        });
      }
    }
    
    // Create the project
    const project = await Project.create(req.body);
    
    res.status(201).json({
      success: true,
      data: project
    });
  } catch (error) {
    // Handle duplicate slug error
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        success: false,
        error: 'A project with this slug already exists'
      });
    }
    
    next(error);
  }
};
```

# server\models\Contact.js

```js
// server/models/Contact.js

const { pool } = require('../config/db');
const emailService = require('../utils/emailService');

class Contact {
  /**
   * Create a new contact message
   * @param {Object} messageData - Contact message data
   * @returns {Promise<Object>} - Created message object
   */
  static async create(messageData) {
    try {
      // Insert message into database
      const [result] = await pool.query(`
        INSERT INTO contact_messages 
        (name, email, subject, message)
        VALUES (?, ?, ?, ?)
      `, [
        messageData.name,
        messageData.email,
        messageData.subject,
        messageData.message
      ]);
      
      const messageId = result.insertId;
      
      // Send notification email
      await emailService.sendNotification({
        name: messageData.name,
        email: messageData.email,
        subject: messageData.subject,
        message: messageData.message
      });
      
      // Send confirmation email to the sender
      await emailService.sendConfirmation({
        name: messageData.name,
        email: messageData.email,
        subject: messageData.subject
      });
      
      // Get the created message
      const [messages] = await pool.query(`
        SELECT * FROM contact_messages WHERE id = ?
      `, [messageId]);
      
      return messages[0];
    } catch (error) {
      console.error('Error creating contact message:', error);
      throw error;
    }
  }
  
  /**
   * Get all contact messages with pagination
   * @param {number} page - Page number (starts from 1)
   * @param {number} limit - Number of messages per page
   * @returns {Promise<Object>} - Object with messages and pagination info
   */
  static async getAll(page = 1, limit = 10) {
    try {
      // Calculate offset
      const offset = (page - 1) * limit;
      
      // Get total count
      const [countResult] = await pool.query(`
        SELECT COUNT(*) as total FROM contact_messages
      `);
      
      const total = countResult[0].total;
      
      // Get messages for current page
      const [messages] = await pool.query(`
        SELECT * FROM contact_messages
        ORDER BY created_at DESC
        LIMIT ? OFFSET ?
      `, [limit, offset]);
      
      // Calculate pagination info
      const totalPages = Math.ceil(total / limit);
      const hasNext = page < totalPages;
      const hasPrev = page > 1;
      
      return {
        messages,
        pagination: {
          total,
          totalPages,
          currentPage: page,
          limit,
          hasNext,
          hasPrev
        }
      };
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      throw error;
    }
  }
  
  /**
   * Get a specific contact message by ID
   * @param {number} id - Message ID
   * @returns {Promise<Object|null>} - Message object or null if not found
   */
  static async getById(id) {
    try {
      const [messages] = await pool.query(`
        SELECT * FROM contact_messages WHERE id = ?
      `, [id]);
      
      return messages.length > 0 ? messages[0] : null;
    } catch (error) {
      console.error('Error fetching contact message:', error);
      throw error;
    }
  }
  
  /**
   * Update the status of a contact message
   * @param {number} id - Message ID
   * @param {string} status - New status ('new', 'read', 'replied', 'archived')
   * @returns {Promise<boolean>} - True if successful, false otherwise
   */
  static async updateStatus(id, status) {
    try {
      const validStatuses = ['new', 'read', 'replied', 'archived'];
      
      if (!validStatuses.includes(status)) {
        throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
      }
      
      const [result] = await pool.query(`
        UPDATE contact_messages
        SET status = ?
        WHERE id = ?
      `, [status, id]);
      
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error updating contact message status:', error);
      throw error;
    }
  }
}

module.exports = Contact;
```

# server\models\Project.js

```js
// server/models/Project.js

const { pool } = require('../config/db');

class Project {
  /**
   * Get all projects with optional category filter
   * @param {string|null} category - Category slug to filter by (optional)
   * @returns {Promise<Array>} - Array of project objects
   */
  static async getAll(category = null) {
    try {
      let query = `
        SELECT p.*, c.name as category, c.slug as category_slug
        FROM projects p
        JOIN categories c ON p.category_id = c.id
      `;
      
      const params = [];
      
      if (category) {
        query += ` WHERE c.slug = ?`;
        params.push(category);
      }
      
      query += ` ORDER BY p.featured DESC, p.created_at DESC`;
      
      const [projects] = await pool.query(query, params);
      
      // Get technologies for each project
      for (const project of projects) {
        const [technologies] = await pool.query(`
          SELECT t.name
          FROM technologies t
          JOIN project_technologies pt ON t.id = pt.technology_id
          WHERE pt.project_id = ?
        `, [project.id]);
        
        project.technologies = technologies.map(tech => tech.name);
      }
      
      return projects;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  }
  
  /**
   * Get a specific project by its slug
   * @param {string} slug - Project slug
   * @returns {Promise<Object|null>} - Project object or null if not found
   */
  static async getBySlug(slug) {
    try {
      const [projects] = await pool.query(`
        SELECT p.*, c.name as category, c.slug as category_slug
        FROM projects p
        JOIN categories c ON p.category_id = c.id
        WHERE p.slug = ?
      `, [slug]);
      
      if (projects.length === 0) {
        return null;
      }
      
      const project = projects[0];
      
      // Get technologies for the project
      const [technologies] = await pool.query(`
        SELECT t.name
        FROM technologies t
        JOIN project_technologies pt ON t.id = pt.technology_id
        WHERE pt.project_id = ?
      `, [project.id]);
      
      project.technologies = technologies.map(tech => tech.name);
      
      // Get related projects from the same category
      const [relatedProjects] = await pool.query(`
        SELECT id, title, slug, image
        FROM projects
        WHERE category_id = ? AND id != ?
        ORDER BY RAND()
        LIMIT 3
      `, [project.category_id, project.id]);
      
      project.relatedProjects = relatedProjects;
      
      return project;
    } catch (error) {
      console.error('Error fetching project by slug:', error);
      throw error;
    }
  }
  
  /**
   * Get featured projects
   * @param {number} limit - Maximum number of projects to return
   * @returns {Promise<Array>} - Array of featured project objects
   */
  static async getFeatured(limit = 3) {
    try {
      const [projects] = await pool.query(`
        SELECT p.*, c.name as category, c.slug as category_slug
        FROM projects p
        JOIN categories c ON p.category_id = c.id
        WHERE p.featured = TRUE
        ORDER BY p.created_at DESC
        LIMIT ?
      `, [limit]);
      
      // Get technologies for each project
      for (const project of projects) {
        const [technologies] = await pool.query(`
          SELECT t.name
          FROM technologies t
          JOIN project_technologies pt ON t.id = pt.technology_id
          WHERE pt.project_id = ?
        `, [project.id]);
        
        project.technologies = technologies.map(tech => tech.name);
      }
      
      return projects;
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      throw error;
    }
  }
  
  /**
   * Get all project categories
   * @returns {Promise<Array>} - Array of category objects
   */
  static async getCategories() {
    try {
      const [categories] = await pool.query(`
        SELECT * FROM categories
        ORDER BY name ASC
      `);
      
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
  
  /**
   * Create a new project
   * @param {Object} projectData - Project data
   * @returns {Promise<Object>} - Created project object
   */
  static async create(projectData) {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();
      
      // Insert project
      const [result] = await connection.query(`
        INSERT INTO projects 
        (title, slug, description, long_description, image, category_id, client, year, completed_date, demo_url, featured)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        projectData.title,
        projectData.slug,
        projectData.description,
        projectData.longDescription,
        projectData.image,
        projectData.categoryId,
        projectData.client,
        projectData.year,
        projectData.completedDate,
        projectData.demoUrl,
        projectData.featured || false
      ]);
      
      const projectId = result.insertId;
      
      // Add technologies
      if (projectData.technologies && projectData.technologies.length > 0) {
        for (const techId of projectData.technologies) {
          await connection.query(`
            INSERT INTO project_technologies (project_id, technology_id)
            VALUES (?, ?)
          `, [projectId, techId]);
        }
      }
      
      await connection.commit();
      
      // Get the created project
      return this.getBySlug(projectData.slug);
    } catch (error) {
      await connection.rollback();
      console.error('Error creating project:', error);
      throw error;
    } finally {
      connection.release();
    }
  }
}

module.exports = Project;
```

# server\routes\contactRoutes.js

```js
// server/routes/contactRoutes.js

const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
// const { protect, authorize } = require('../middleware/auth'); // Uncomment when implementing auth

// Submit contact form
router.post('/', contactController.submitContactForm);

// Get all contact messages (protected route for admin)
// router.get('/', protect, authorize('admin'), contactController.getMessages);
router.get('/', contactController.getMessages); // Remove this line after implementing auth

// Get a specific contact message by ID (protected route for admin)
// router.get('/:id', protect, authorize('admin'), contactController.getMessageById);
router.get('/:id', contactController.getMessageById); // Remove this line after implementing auth

// Update the status of a contact message (protected route for admin)
// router.patch('/:id/status', protect, authorize('admin'), contactController.updateMessageStatus);
router.patch('/:id/status', contactController.updateMessageStatus); // Remove this line after implementing auth

module.exports = router;
```

# server\routes\portfolioRoutes.js

```js
// server/routes/portfolioRoutes.js

const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
// const { protect, authorize } = require('../middleware/auth'); // Uncomment when implementing auth

// Get all projects (with optional category filter)
router.get('/', portfolioController.getProjects);

// Get featured projects
router.get('/featured', portfolioController.getFeaturedProjects);

// Get all project categories
router.get('/categories', portfolioController.getCategories);

// Get a specific project by slug
router.get('/:slug', portfolioController.getProjectBySlug);

// Create a new project (protected route for admin)
// router.post('/', protect, authorize('admin'), portfolioController.createProject);
router.post('/', portfolioController.createProject); // Remove this line after implementing auth

module.exports = router;
```

# server\server.js

```js
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
```

# server\utils\emailService.js

```js
// server/utils/emailService.js

const nodemailer = require('nodemailer');
const config = require('../config/config');

// Create transporter
const transporter = nodemailer.createTransport({
  host: config.mailService.host,
  port: config.mailService.port,
  secure: false, // For port 587
  auth: {
    user: config.mailService.auth.user,
    pass: config.mailService.auth.pass,
  },
  // Gmail-specific settings
  tls: {
    rejectUnauthorized: true,
    minVersion: 'TLSv1.2'
  }
});

const verifyConnection = async () => {
  try {
    await transporter.verify();
    console.log('SMTP connection verified and working');
    return true;
  } catch (error) {
    console.error('SMTP connection error:', error);
    return false;
  }
};

/**
 * Email Service utility for sending emails
 */
const emailService = {

  verifyConnection,

  async sendNotification(messageData) {
    try {
      const { name, email, subject, message } = messageData;

      const mailOptions = {
        from: `"Essa Shomali Website" <${config.mailService.auth.user}>`, // Must match your Gmail address
        to: config.mailService.auth.user, // Send to yourself
        subject: `New Contact Message: ${subject}`,
        html: `
          <h2>New Contact Message</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f6f6f6; padding: 15px; border-left: 4px solid #6366f1; margin: 10px 0;">
            ${message.replace(/\n/g, '<br/>')}
          </div>
        `
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Notification email sent successfully:', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending notification email:', error);
      throw error;
    }
  },

  /**
   * Send confirmation email to the person who submitted the contact form
   * @param {Object} data - Contact message data
   * @returns {Promise<Object>} - Nodemailer info object
   */
  async sendConfirmation(data) {
    try {
      const { name, email, subject } = data;

      const mailOptions = {
        from: `"Essa Shomali" <${config.mailService.auth.user}>`, // Must match your Gmail address
        to: email,
        subject: `Thank you for contacting Essa Shomali`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #6366f1;">Thank You for Your Message</h2>
            <p>Hello ${name},</p>
            <p>Thank you for contacting me regarding "${subject}". I have received your message and will get back to you as soon as possible, usually within 1-2 business days.</p>
            <p>In the meantime, feel free to check out my portfolio and recent projects on my website.</p>
            <p>Best regards,<br>Essa Shomali<br><a href="https://eshomali.com">eshomali.com</a></p>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eaeaea; font-size: 12px; color: #666;">
              <p>This is an automated confirmation. Please do not reply to this email.</p>
            </div>
          </div>
        `
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Confirmation email sent successfully:', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending confirmation email:', error);
      throw error;
    }
  },

  /**
   * Send a custom email
   * @param {Object} options - Email options
   * @returns {Promise<Object>} - Nodemailer info object
   */
  async sendCustomEmail(options) {
    const mailOptions = {
      from: config.mailService.from,
      to: options.to,
      subject: options.subject,
      html: options.html
    };

    // Add CC if provided
    if (options.cc) {
      mailOptions.cc = options.cc;
    }

    // Add BCC if provided
    if (options.bcc) {
      mailOptions.bcc = options.bcc;
    }

    // Add attachments if provided
    if (options.attachments) {
      mailOptions.attachments = options.attachments;
    }

    try {
      const info = await transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      console.error('Error sending custom email:', error);
      throw error;
    }
  }
};

if (process.env.NODE_ENV === 'production') {
  verifyConnection().catch(console.error);
}

module.exports = emailService;
```

# src\App.css

```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}

/* src/App.css */

/* Basic reset and container styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body, html {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

#root {
  width: 100%;
  height: 100%;
}

.site-wrapper {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

/* Preloader animation */
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #111827;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.preloader-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loader {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top: 4px solid #6366f1;
  animation: spin 1s linear infinite;
}

.loading-text {
  margin-top: 1rem;
  font-size: 1.125rem;
  color: #fff;
  font-weight: 600;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Page transitions */
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  opacity: 1;
  transition: opacity 300ms ease-in;
}

.fade-exit {
  opacity: 1;
}

.fade-exit-active {
  opacity: 0;
  transition: opacity 300ms ease-out;
}

/* Page header */
.page-header {
  padding: 8rem 1rem 3rem;
  background-color: #1f2937;
  text-align: center;
}

.page-header h1 {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  color: #f9fafb;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: #e5e7eb;
  font-size: clamp(1rem, 2vw, 1.25rem);
  max-width: 600px;
  margin: 0 auto;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .page-header {
    padding: 7rem 1rem 2rem;
  }
}

@media (max-width: 576px) {
  .page-header {
    padding: 6rem 1rem 2rem;
  }
}

/* Dark mode styles */
@media (prefers-color-scheme: dark) {
  body {
    background-color: #111827;
    color: #f9fafb;
  }
}

/* src/App.css */

/* Basic reset and container styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body, html {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background-color: #111827;
  color: #f9fafb;
}

#root {
  width: 100%;
  height: 100%;
}

.site-wrapper {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

/* Container */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Section styling */
.section {
  padding: 5rem 0;
}

.section-title {
  margin-bottom: 3rem;
  text-align: center;
}

.section-title h2 {
  font-size: clamp(2rem, 4vw, 2.5rem);
  color: #f9fafb;
  margin-bottom: 0.5rem;
  position: relative;
  display: inline-block;
}

.section-title h2::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background-color: #6366f1;
  border-radius: 999px;
}

.section-title p {
  color: #e5e7eb;
  font-size: clamp(1rem, 2vw, 1.125rem);
}

/* Button styling */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  border-radius: 0.375rem;
  transition: all 0.3s ease;
  text-decoration: none;
  cursor: pointer;
}

.btn-primary {
  background-color: #6366f1;
  color: white;
  border: 2px solid #6366f1;
}

.btn-primary:hover {
  background-color: #4f46e5;
  border-color: #4f46e5;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.btn-outline {
  background-color: transparent;
  color: #6366f1;
  border: 2px solid #6366f1;
}

.btn-outline:hover {
  background-color: #6366f1;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

.btn-medium {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.btn-small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

/* Header styling */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  padding: 1rem 0;
  transition: background-color 0.3s ease, padding 0.3s ease;
}

.header-scrolled {
  background-color: rgba(17, 24, 39, 0.95);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 0.75rem 0;
  backdrop-filter: blur(8px);
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.logo a {
  display: flex;
  align-items: center;
  color: #f9fafb;
  font-weight: 700;
  font-size: 1.5rem;
  text-decoration: none;
}

.logo a span {
  color: #6366f1;
}

.main-nav ul {
  display: flex;
  gap: 2rem;
}

.main-nav a {
  color: #f9fafb;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

.main-nav a:hover,
.main-nav a.active {
  color: #6366f1;
}

.main-nav a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #6366f1;
  transition: width 0.3s ease;
}

.main-nav a:hover::after,
.main-nav a.active::after {
  width: 100%;
}

/* Mobile menu */
.mobile-nav-toggle {
  display: none;
}

.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 28px;
  height: 20px;
}

.hamburger span {
  width: 100%;
  height: 2px;
  background-color: #f9fafb;
  transition: all 0.3s ease;
}

.hamburger.active span:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

/* Loading and error states */
.loading-container,
.error-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  width: 100%;
  padding: 2rem;
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(99, 102, 241, 0.2);
  border-radius: 50%;
  border-top-color: #6366f1;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

.error-content {
  text-align: center;
  max-width: 500px;
}

.error-content h2 {
  margin-bottom: 1rem;
  color: #f9fafb;
}

.error-content p {
  margin-bottom: 2rem;
  color: #e5e7eb;
}

/* Footer styling */
.footer {
  background-color: #1f2937;

}

.footer-top {
  padding: 5rem 0;

}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 2rem;

}

.footer-info h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #f9fafb;
}

.footer-info p {
  color: #e5e7eb;
  margin-bottom: 1.5rem;
}

.footer h4 {
  font-size: 1.125rem;
  margin-bottom: 1rem;
  color: #f9fafb;

}

.footer-links ul,
.footer-services ul {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-links a,
.footer-services a {
  color: #e5e7eb;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover,
.footer-services a:hover {
  color: #6366f1;
}

.footer-contact p {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  color: #e5e7eb;
}

.footer-contact i {
  color: #6366f1;

}

.social-links {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 2;

}

.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  background-color: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  border-radius: 0.375rem;
  transition: all 0.3s ease;

}

.social-links a:hover {
  background-color: #6366f1;
  color: white;
  transform: translateY(-3px);

}

.footer-bottom {
  padding: 1.5rem 0;
  border-top: 1px solid #374151;
}

.footer-bottom .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copyright {
  color: #e5e7eb;
  font-size: 0.875rem;
}

.credits ul {
  display: flex;
  gap: 1.5rem;
}

.credits a {
  color: #e5e7eb;
  font-size: 0.875rem;
  text-decoration: none;
  transition: color 0.3s ease;
}

.credits a:hover {
  color: #6366f1;
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    row-gap: 3rem;
  }
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
  
  .mobile-nav-toggle {
    display: block;
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .mobile-nav {
    position: fixed;
    top: 0;
    right: -100%;
    width: 80%;
    max-width: 300px;
    height: 100vh;
    background-color: #1f2937;
    padding: 5rem 2rem;
    transition: right 0.3s ease;
    z-index: 99;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
  }
  
  .mobile-nav.mobile-nav-active {
    right: 0;
  }

  .mobile-nav ul {
    display: flex;
    flex-direction: column !important; /* Force vertical layout with !important */
    align-items: center;
    width: 100%;
    padding: 1rem 0;
    margin: 0;
  }

  .mobile-nav ul li {
    width: 100%;
    margin-bottom: 1rem;
  }

  .mobile-nav ul li a {
    display: block;
    width: 100%;
    text-align: center;
    padding: 1rem 0;
    font-size: 1.25rem;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .footer-bottom .container {
    flex-direction: column;
    gap: 1rem;
  }
}

@media (max-width: 576px) {
  .btn {
    padding: 0.625rem 1.25rem;
  }
  
  .project-actions {
    flex-direction: column;
    gap: 1rem;
  }
  
  .footer-links ul,
  .footer-services ul {
    gap: 0.5rem;
  }
  
  .credits ul {
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
  }
}

```

# src\App.jsx

```jsx
// src/App.jsx
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PortfolioPage from './pages/PortfolioPage';
import ProjectPage from './pages/ProjectPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading delay (remove in production)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Initial loading screen
  if (loading) {
    return (
      <div className="preloader">
        <div className="preloader-inner">
          <div className="loader"></div>
          <div className="loading-text">Loading</div>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <Layout>
            <HomePage />
          </Layout>
        } 
      />
      <Route 
        path="/about" 
        element={
          <Layout>
            <AboutPage />
          </Layout>
        } 
      />
      <Route 
        path="/portfolio" 
        element={
          <Layout>
            <PortfolioPage />
          </Layout>
        } 
      />
      <Route 
        path="/portfolio/:slug" 
        element={
          <Layout>
            <ProjectPage />
          </Layout>
        } 
      />
      <Route 
        path="/contact" 
        element={
          <Layout>
            <ContactPage />
          </Layout>
        } 
      />
      <Route 
        path="*" 
        element={
          <Layout>
            <NotFoundPage />
          </Layout>
        } 
      />
    </Routes>
  );
}

export default App;
```

# src\assets\images\about-large.jpg

This is a binary file of the type: Image

# src\assets\images\logo.png

This is a binary file of the type: Image

# src\assets\images\logo.svg

This is a file of the type: SVG Image

# src\assets\react.svg

This is a file of the type: SVG Image

# src\components\common\Button.jsx

```jsx
// src/components/common/Button.jsx
import { Link } from 'react-router-dom';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  type = 'button',
  href, 
  to,
  disabled = false,
  className = '',
  onClick,
  ...props 
}) => {
  const buttonClasses = `
    btn 
    btn-${variant} 
    btn-${size}
    ${disabled ? 'btn-disabled' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  // If href is provided, render an anchor
  if (href) {
    return (
      <a 
        href={href} 
        className={buttonClasses}
        onClick={onClick}
        {...props}
      >
        {children}
      </a>
    );
  }
  
  // If to is provided, render a Link (for react-router)
  if (to) {
    return (
      <Link 
        to={to} 
        className={buttonClasses}
        onClick={onClick}
        {...props}
      >
        {children}
      </Link>
    );
  }
  
  // Otherwise render a button
  return (
    <button 
      type={type} 
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
```

# src\components\common\Footer.jsx

```jsx
// src/components/common/Footer.jsx
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-content">
            <div className="footer-info">
              <h3>Essa Shomali</h3>
              <p>
                Professional app developer helping businesses build remarkable digital experiences.
              </p>

            </div>
            
            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/portfolio">Portfolio</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
            
            <div className="footer-services">
              <h4>Services</h4>
              <ul>
                <li>
                  <Link to="/portfolio?category=web-development">Web Development</Link>
                </li>
                <li>
                  <Link to="/portfolio?category=mobile-app">Mobile Apps</Link>
                </li>
                <li>
                  <Link to="/portfolio?category=ui-ux-design">UI/UX Design</Link>
                </li>
                <li>
                  <Link to="/about#skills">Technical Consulting</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <div className="copyright">
            &copy; {currentYear} <strong>Essa Shomali</strong>. All Rights Reserved.
          </div>
          <div className="credits">
            <ul>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

# src\components\common\Header.jsx

```jsx
// src/components/common/Header.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuOpen && 
        !event.target.closest('.mobile-nav') && 
        !event.target.closest('.mobile-nav-toggle')
      ) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      // Prevent scrolling when mobile menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <Link to="/" aria-label="Go to homepage">
            <h1>ES<span>homali</span></h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="desktop-nav">
          <Navbar />
        </div>

        {/* Mobile Navigation Toggle */}
        <button 
          className="mobile-nav-toggle" 
          aria-controls="mobile-menu" 
          aria-expanded={mobileMenuOpen}
          onClick={toggleMobileMenu}
        >
          <span className="sr-only">Menu</span>
          <div className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${mobileMenuOpen ? 'mobile-nav-active' : ''}`} id="mobile-menu">
          <Navbar isMobile={true} closeMobileMenu={() => setMobileMenuOpen(false)} />
        </div>
      </div>
    </header>
  );
};

export default Header;
```

# src\components\common\Navbar.jsx

```jsx
// src/components/common/Navbar.jsx
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ isMobile = false, closeMobileMenu = () => {} }) => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Handle section highlighting on scroll
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };
    
    // Only add scroll event on homepage
    if (window.location.pathname === '/') {
      window.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    if (isMobile) {
      closeMobileMenu();
    }
  };

  return (
    <nav className={`main-nav ${isMobile ? 'mobile' : 'desktop'}`}>
      <ul>
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive && !isMobile ? 'active' : ''}
            onClick={handleClick}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/about" 
            className={({ isActive }) => isActive ? 'active' : ''}
            onClick={handleClick}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/portfolio" 
            className={({ isActive }) => isActive ? 'active' : ''}
            onClick={handleClick}
          >
            Portfolio
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => isActive ? 'active' : ''}
            onClick={handleClick}
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
```

# src\components\common\ProjectCard.jsx

```jsx
// src/components/common/ProjectCard.jsx
import { Link } from 'react-router-dom';
import Button from './Button';

const ProjectCard = ({ 
  project, 
  variant = 'default',
  showFullDetails = false
}) => {
  const { 
    id, 
    title, 
    slug,
    description, 
    category, 
    image, 
    technologies, 
    client,
    year,
    demoUrl,
    featured
  } = project;

  return (
    <article className={`project-card ${variant === 'featured' ? 'project-card-featured' : ''}`}>
      <div className="project-card-image">
        <img 
          src={image || "https://via.placeholder.com/600x400?text=Project+Image"} 
          alt={`${title} - Project Screenshot`}
          loading="lazy"
        />
        
        {featured && variant !== 'featured' && (
          <div className="project-card-badge">Featured</div>
        )}
        
        <div className="project-card-overlay">
          <div className="project-card-category">{category}</div>
          
          <div className="project-card-actions">
            {demoUrl && (
              <Button
                href={demoUrl}
                variant="outline-light"
                size="small"
                aria-label={`View live demo of ${title}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
              </Button>
            )}
            
            <Button
              to={`/portfolio/${slug}`}
              variant="primary"
              size="small"
              aria-label={`View details of ${title} project`}
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
      
      <div className="project-card-content">
        <h3 className="project-card-title">
          <Link to={`/portfolio/${slug}`}>
            {title}
          </Link>
        </h3>
        
        <p className="project-card-description">
          {showFullDetails ? description : description.substring(0, 120) + (description.length > 120 ? '...' : '')}
        </p>
        
        {showFullDetails && (
          <div className="project-card-meta">
            <div className="project-card-meta-item">
              <strong>Client:</strong> {client}
            </div>
            <div className="project-card-meta-item">
              <strong>Year:</strong> {year}
            </div>
          </div>
        )}
        
        <div className="project-card-technologies">
          {technologies && technologies.map((tech, index) => (
            <span key={index} className="technology-tag">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
```

# src\components\layout\Layout.jsx

```jsx
// src/components/layout/Layout.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  // Add or remove scroll classes for page animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollElements = document.querySelectorAll('.scroll-animation');
      
      scrollElements.forEach(el => {
        const elementPosition = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
          el.classList.add('scrolled');
        }
      });
    };
    
    // Initial check for elements in view
    setTimeout(handleScroll, 300);
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div className="site-wrapper">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
```

# src\components\sections\About.jsx

```jsx
// src/components/sections/About.jsx
import { useState } from 'react';
import Button from '../common/Button';

const About = () => {
  const [activeTab, setActiveTab] = useState('skills');
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const skills = [
    { name: 'AI Integration', percentage: 100 },
    { name: 'Content Management', percentage: 100 },
    { name: 'Location-Based Features', percentage: 100 },
    { name: 'Payment Systems', percentage: 100 },
    { name: 'Client Management', percentage: 100 },
    { name: 'Real-Time Notifications', percentage: 100 },
    { name: 'Security & Analytics', percentage: 100 },
    { name: 'Enhanced User Experience', percentage: 100 },
  ];
  
  const experience = [
    {
      position: 'Senior Software Engineer',
      company: 'MedImpact Healthcare Systems',
      period: '2022 - Present',
      description: ''
    },
    {
      position: 'Software Engineer III',
      company: 'Comerica',
      period: '2019 - 2022',
      description: ''
    },
    {
      position: 'Software Engineer',
      company: 'Asset Health',
      period: '2018 - 2019',
      description: ''
    },
    {
      position: 'Software Developer',
      company: 'Complete Data Products',
      period: '2016 - 2018',
      description: ''
    }
  ];
  
  const education = [
    {
      degree: 'B.S.E. Computer Engineering',
      institution: 'Oakland University, School of Engineering',
      period: '2014 - 2018',
      description: 'Minor in Computer Science, Artificial Intelligence'
    },
    {
      degree: 'Certificates',
      institution: '\n' +
          'Certified ScrumMaster (CSM)',
      period: '',
      description: 'Credential ID 1700324'
    }
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-title">
          <h2>About Me</h2>
        </div>

        <div className="about-container">
          <div className="about-image">
            <div className="image-wrapper">
              <img 
                src="src/assets/images/about-large.jpg"
                alt="Essa Shomali - Professional App Developer"
                loading="lazy"
                style={{
                  width: '280px',
                  height: '280px',
                  overflow: 'hidden',
                  borderRadius: '0%',
                  border: '2px solid #374151',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                  backgroundColor: '#111827',
                  display: 'flex', // Add flexbox for centering
                  justifyContent: 'center', // Center horizontally
                  alignItems: 'center', // Center vertically
                  margin: '0 auto', // Center the entire div in its container
                }}
              />
              <div className="experience-badge" aria-label="8+ years of experience">
                <span className="years">8+</span>
                <span className="text">Years of<br />Experience</span>
              </div>
            </div>
          </div>

          <div className="about-content">
            <h3>Professional App Developer & UI/UX Specialist</h3>
            
            <p className="lead">
              I help businesses transform their digital presence with modern, accessible,
              and high-performance web applications.
            </p>
            
            <p>
              With over 8 years of experience in app development, I specialize in creating
              exceptional digital experiences that help businesses grow. My expertise spans
              across the entire development lifecycle, from concept and design to 
              deployment and maintenance.
            </p>
            
            <p>
              I'm passionate about building applications that are not only visually stunning
              but also highly functional, accessible, and optimized for performance.
              My approach combines technical excellence with a deep understanding of 
              business goals to deliver solutions that drive real results.
            </p>
            
            <div className="about-tabs">
              <div className="tabs-navigation">
                <button 
                  className={`tab-button ${activeTab === 'skills' ? 'active' : ''}`}
                  onClick={() => handleTabChange('skills')}
                  aria-selected={activeTab === 'skills'}
                  aria-controls="skills-tab"
                  id="skills-tab-button"
                >
                  Features
                </button>
                <button 
                  className={`tab-button ${activeTab === 'experience' ? 'active' : ''}`}
                  onClick={() => handleTabChange('experience')}
                  aria-selected={activeTab === 'experience'}
                  aria-controls="experience-tab"
                  id="experience-tab-button"
                >
                  Experience
                </button>
                <button 
                  className={`tab-button ${activeTab === 'education' ? 'active' : ''}`}
                  onClick={() => handleTabChange('education')}
                  aria-selected={activeTab === 'education'}
                  aria-controls="education-tab"
                  id="education-tab-button"
                >
                  Education
                </button>
              </div>
              
              <div className="tabs-content">
                <div 
                  id="skills-tab" 
                  className={`tab-panel ${activeTab === 'skills' ? 'active' : ''}`}
                  role="tabpanel"
                  aria-labelledby="skills-tab-button"
                  hidden={activeTab !== 'skills'}
                >
                  <div className="skills-container">
                    {skills.map((skill, index) => (
                      <div key={index} className="skill-item">
                        <div className="skill-info">
                          <h4>{skill.name}</h4>
                          <span className="skill-percentage">{skill.percentage}%</span>
                        </div>
                        <div className="skill-bar">
                          <div 
                            className="skill-progress" 
                            style={{ width: `${skill.percentage}%` }}
                            aria-valuemin="0"
                            aria-valuemax="100"
                            aria-valuenow={skill.percentage}
                            role="progressbar"
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div 
                  id="experience-tab" 
                  className={`tab-panel ${activeTab === 'experience' ? 'active' : ''}`}
                  role="tabpanel"
                  aria-labelledby="experience-tab-button"
                  hidden={activeTab !== 'experience'}
                >
                  <div className="timeline">
                    {experience.map((job, index) => (
                      <div key={index} className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-date">{job.period}</div>
                        <div className="timeline-content">
                          <h4>{job.position}</h4>
                          <h5>{job.company}</h5>
                          <p>{job.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div 
                  id="education-tab" 
                  className={`tab-panel ${activeTab === 'education' ? 'active' : ''}`}
                  role="tabpanel"
                  aria-labelledby="education-tab-button"
                  hidden={activeTab !== 'education'}
                >
                  <div className="timeline">
                    {education.map((edu, index) => (
                      <div key={index} className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-date">{edu.period}</div>
                        <div className="timeline-content">
                          <h4>{edu.degree}</h4>
                          <h5>{edu.institution}</h5>
                          <p>{edu.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="about-buttons">
              <Button 
                to="/contact"
                variant="outline"
                aria-label="Contact me"
              >
                <i className="fas fa-envelope" aria-hidden="true"></i> &nbsp; Contact Me
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
```

# src\components\sections\Contact.css

```css
/* src/components/sections/Contact.css */
/* Additional styles to enhance the contact sections */

/* Form animations and enhancements */
.form-control {
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.form-control:focus {
  transform: translateY(-2px);
}

/* Create a floating label effect */
.form-group {
  position: relative;
}

.form-control:focus + .floating-label,
.form-control:not(:placeholder-shown) + .floating-label {
  transform: translateY(-1.5rem) scale(0.8);
  color: #6366f1;
}

.floating-label {
  position: absolute;
  left: 1rem;
  top: 1rem;
  transition: all 0.3s ease;
  pointer-events: none;
  color: #6b7280;
  transform-origin: left top;
}

/* Add a nice loading spinner */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.spinner {
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 0.8s linear infinite;
  margin-right: 0.5rem;
}

/* Add a nice contact page link */
.contact-cta {
  margin-top: 2rem;
  text-align: center;
}

.contact-page-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.contact-page-link:hover {
  background-color: rgba(99, 102, 241, 0.2);
  transform: translateY(-2px);
}

.contact-page-link i {
  transition: transform 0.3s ease;
}

.contact-page-link:hover i {
  transform: translateX(5px);
}

/* Add background pattern */
.contact-section {
  position: relative;
}

.contact-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.03) 0%, transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.03) 0%, transparent 40%);
  z-index: 0;
}

/* Add field spacing */
.form-group {
  margin-bottom: 2rem;
}

/* Better form spacing */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Input focus animations */
.form-control:focus {
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2), 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* Custom input styling */
.form-control {
  background-color: rgba(17, 24, 39, 0.8);
  border: 1px solid #374151;
  padding: 1rem 1.25rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  color: #f9fafb;
  width: 100%;
  transition: all 0.3s ease;
}

.form-control:hover {
  border-color: #4f46e5;
}

.form-control::placeholder {
  color: #6b7280;
  opacity: 0.7;
}

/* Textarea styling */
textarea.form-control {
  min-height: 120px;
  resize: vertical;
  line-height: 1.6;
}

/* Form label animation */
.form-label {
  display: block;
  margin-bottom: 0.75rem;
  font-weight: 500;
  color: #e5e7eb;
  transition: color 0.3s ease;
  position: relative;
  padding-left: 1rem;
}

.form-label::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #6366f1;
  transition: transform 0.3s ease;
}

.form-control:focus ~ .form-label,
.form-group:hover .form-label {
  color: #6366f1;
}

.form-control:focus ~ .form-label::before,
.form-group:hover .form-label::before {
  transform: translateY(-50%) scale(1.5);
}

/* Button animation */
.submit-button {
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: all 0.3s ease;
}

.submit-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  z-index: -1;
  transition: left 0.7s ease;
}

.submit-button:hover::before {
  left: 100%;
}

/* Card hover effects */
.contact-info, 
.contact-form-container {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.contact-info:hover,
.contact-form-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 25px 30px -10px rgba(0, 0, 0, 0.2);
}

/* Grid layout for input fields on larger screens */
@media (min-width: 768px) {
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
}

/* Improved social icons */
.social-icons {
  display: flex;
  justify-content: center;
  gap: 1.25rem;
  margin-top: 1rem;
}

.social-icons a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  border-radius: 50%;
  font-size: 1.25rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  z-index: 1;
}

.social-icons a::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #6366f1;
  z-index: -1;
  transform: scale(0);
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.social-icons a:hover {
  color: white;
  transform: translateY(-8px);
  box-shadow: 0 15px 25px -10px rgba(99, 102, 241, 0.4);
}

.social-icons a:hover::after {
  transform: scale(1);
}

/* Add animation to contact info items */
.contact-info-item {
  transition: transform 0.3s ease;
  padding: 1.25rem;
  border-radius: 0.5rem;
  background-color: rgba(31, 41, 55, 0.5);
  border: 1px solid rgba(55, 65, 81, 0.5);
  margin-bottom: 1.5rem;
}

.contact-info-item:hover {
  transform: translateX(5px);
  background-color: rgba(31, 41, 55, 0.8);
  border-color: rgba(99, 102, 241, 0.3);
}

/* Better spacing for the form groups */
.form-group {
  margin-bottom: 1.75rem;
}

.mb-0 {
  margin-bottom: 0 !important;
}

/* Improved alert styling */
.alert {
  padding: 1.25rem;
  border-radius: 0.5rem;
  position: relative;
  margin-bottom: 2rem;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.alert-success {
  background-color: rgba(16, 185, 129, 0.1);
  color: #10b981;
  border-left: 4px solid #10b981;
}

.alert-error {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border-left: 4px solid #ef4444;
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .contact-container {
    gap: 3rem;
  }
}

@media (max-width: 768px) {
  .contact-info-item {
    padding: 1rem;
  }
  
  .form-control {
    padding: 0.875rem 1rem;
  }
  
  .submit-button {
    padding: 1rem !important;
  }
}

@media (max-width: 576px) {
  .contact-info-item {
    padding: 0.875rem;
    margin-bottom: 1.25rem;
  }
  
  .form-group {
    margin-bottom: 1.25rem;
  }
}
```

# src\components\sections\Contact.jsx

```jsx
// src/components/sections/Contact.jsx
import { useState } from 'react';
import Button from '../common/Button';
import { submitContactForm } from '../../utils/api.jsx';

const Contact = () => {
  const initialFormState = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error when typing
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      const response = await submitContactForm(formData);
      
      setSubmitStatus({
        type: 'success',
        message: 'Your message has been sent successfully! I will get back to you soon.'
      });
      
      // Reset form after successful submission
      setFormData(initialFormState);
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later or contact me directly via email.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <div className="section-title">
          <h2>Contact</h2>
          <p>Get in touch with me</p>
        </div>

        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-info-item">
              <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
              <div>
                <h3>Location:</h3>
                <p>Detroit, MI</p>
              </div>
            </div>

            <div className="contact-info-item">
              <i className="fas fa-envelope" aria-hidden="true"></i>
              <div>
                <h3>Email:</h3>
                <p>
                  <a href="mailto:eshomali@gmail.com">eshomali@gmail.com</a>
                </p>
              </div>
            </div>

            <div className="contact-info-item">
              <i className="fas fa-phone" aria-hidden="true"></i>
              <div>
                <h3>Call/Text:</h3>
                <p>
                  <a href="tel:+17348823914">+1 (734) 882-3914</a>
                </p>
              </div>
            </div>

            <div className="social-links">
              <a href="https://linkedin.com/in/eshomali" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://www.instagram.com/eshomz" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div className="contact-form-container">
            {submitStatus && (
              <div 
                className={`alert alert-${submitStatus.type}`}
                role="alert"
                aria-live="assertive"
              >
                {submitStatus.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'form-control error' : 'form-control'}
                  placeholder="John Doe"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <div id="name-error" className="error-message">
                    {errors.name}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'form-control error' : 'form-control'}
                  placeholder="john.doe@example.com"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <div id="email-error" className="error-message">
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={errors.subject ? 'form-control error' : 'form-control'}
                  placeholder="Project Inquiry"
                  aria-invalid={errors.subject ? 'true' : 'false'}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                />
                {errors.subject && (
                  <div id="subject-error" className="error-message">
                    {errors.subject}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? 'form-control error' : 'form-control'}
                  placeholder="Your message here..."
                  rows="5"
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                ></textarea>
                {errors.message && (
                  <div id="message-error" className="error-message">
                    {errors.message}
                  </div>
                )}
              </div>

              <div className="form-group">
                <Button
                  type="submit"
                  variant="primary"
                  size="large"
                  disabled={isSubmitting}
                  aria-label="Send message"
                  className="submit-button"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
```

# src\components\sections\ContactHome.jsx

```jsx
// src/components/sections/ContactHome.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { submitContactForm } from '../../utils/api';
import './Contact.css';

const ContactHome = () => {
  const initialFormState = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error when typing
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      await submitContactForm(formData);
      
      setSubmitStatus({
        type: 'success',
        message: 'Your message has been sent successfully! I will get back to you soon.'
      });
      
      // Reset form after successful submission
      setFormData(initialFormState);
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later or contact me directly via email.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-title">
          <h2>Get In Touch</h2>
        </div>

        <div className="contact-container">
          <div className="contact-info">
            <p className="contact-intro">
              I'm always interested in new projects and collaborations.
              Feel free to reach out with any questions or inquiries,
              and I'll get back to you as soon as possible.
            </p>

            <div className="contact-info-item">
              <i className="fas fa-envelope" aria-hidden="true"></i>
              <div>
                <h4>Email:</h4>
                <p>
                  <a href="mailto:eshomali@gmail.com">eshomali@gmail.com</a>
                </p>
              </div>
            </div>

            <div className="contact-info-item">
              <i className="fas fa-phone" aria-hidden="true"></i>
              <div>
                <h4>Call / Text:</h4>
                <p>
                  <a href="tel:+17348823914">+1 (734) 882-3914</a>
                </p>
              </div>
            </div>

            <br/>
            <div className="social-links">
              <h4>Connect With Me</h4>
              <div className="social-icons">
                <a href="https://linkedin.com/in/eshomali" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://www.instagram.com/eshomz" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
            <br/>
          </div>
        </div>
      </div>
      <br/>
    </section>
  );
};

export default ContactHome;
```

# src\components\sections\ContactPage.css

```css
/* src/pages/ContactPage.css */

/* Contact page header */
.contact-page-header {
  padding: 10rem 0 5rem;
  background-color: #1a202c;
  text-align: center;
  width: 100%;
  background-image: linear-gradient(45deg, rgba(26, 32, 44, 0.95), rgba(17, 24, 39, 0.9)), 
                    url('/images/contact-bg.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}

.contact-page-header::before {
  content: '';
  position: absolute;
  width: 200px;
  height: 200px;
  background: rgba(99, 102, 241, 0.1);
  border-radius: 50%;
  top: -100px;
  right: -50px;
  z-index: 1;
}

.contact-page-header::after {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  background: rgba(99, 102, 241, 0.05);
  border-radius: 50%;
  bottom: -150px;
  left: -100px;
  z-index: 1;
}

.contact-page-header h1 {
  font-size: clamp(3rem, 6vw, 4rem);
  color: #f9fafb;
  margin-bottom: 1rem;
  font-weight: 700;
  position: relative;
  z-index: 2;
}

.contact-page-header p {
  color: #e5e7eb;
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

/* Contact page section */
.contact-page-section {
  padding: 6rem 0;
  background-color: #111827;
  position: relative;
}

.contact-page-container {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
}

.contact-page-container::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.03) 0%, transparent 50%);
  z-index: 1;
  pointer-events: none;
}

/* Contact info */
.contact-info {
  padding: 3rem;
  background-color: #1f2937;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
  border: 1px solid #374151;
  height: fit-content;
  position: relative;
  z-index: 2;
  transform: translateY(-2rem);
}

.contact-info::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    to bottom right,
    rgba(99, 102, 241, 0.05),
    transparent,
    transparent
  );
  border-radius: 1rem;
  z-index: -1;
}

.contact-info h2, 
.contact-form-container h2 {
  font-size: 2rem;
  color: #f9fafb;
  margin-bottom: 2rem;
  font-weight: 700;
}

.contact-info h3 {
  font-size: 1.75rem;
  color: #f9fafb;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 1rem;
  font-weight: 700;
}

.contact-info h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background-color: #6366f1;
  border-radius: 3px;
}

.contact-info h4 {
  font-size: 1.125rem;
  color: #f9fafb;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.contact-intro {
  color: #e5e7eb;
  margin-bottom: 3rem;
  line-height: 1.7;
  font-size: 1.125rem;
}

.contact-info-item {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  position: relative;
  padding-left: 1rem;
}

.contact-info-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background-image: linear-gradient(to bottom, #6366f1, transparent);
  border-radius: 1px;
}

.contact-info-item i {
  color: #6366f1;
  font-size: 1.5rem;
  margin-top: 0.25rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(99, 102, 241, 0.1);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.contact-info-item:hover i {
  background-color: #6366f1;
  color: white;
  transform: translateY(-2px);
}

.contact-info-item p {
  color: #f9fafb;
  margin-bottom: 0;
  font-size: 1.125rem;
}

.contact-info-item a {
  color: #f9fafb;
  text-decoration: none;
  transition: color 0.3s ease;
  position: relative;
  display: inline-block;
}

.contact-info-item a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #6366f1;
  transition: width 0.3s ease;
}

.contact-info-item a:hover {
  color: #6366f1;
}

.contact-info-item a:hover::after {
  width: 100%;
}

.social-links {
  margin-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
}

.social-links h4 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.social-icons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.social-icons a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  border-radius: 50%;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.social-icons a::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #6366f1;
  border-radius: 50%;
  transform: scale(0);
  transition: transform 0.3s ease;
  z-index: -1;
}

.social-icons a:hover {
  color: white;
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
}

.social-icons a:hover::before {
  transform: scale(1);
}

.social-icons i {
  font-size: 1.25rem;
}

/* Contact form */
.contact-form-container {
  padding: 3rem;
  background-color: #1f2937;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
  border: 1px solid #374151;
  position: relative;
  z-index: 2;
  transform: translateY(-2rem);
}

.contact-form-container::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: linear-gradient(
    to bottom right,
    transparent,
    transparent,
    rgba(99, 102, 241, 0.05)
  );
  border-radius: 1rem;
  z-index: -1;
}

.contact-form-container h3 {
  font-size: 1.75rem;
  color: #f9fafb;
  margin-bottom: 2rem;
  font-weight: 700;
  position: relative;
  padding-bottom: 1rem;
}

.contact-form-container h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background-color: #6366f1;
  border-radius: 3px;
}

.alert {
  padding: 1.25rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
}

.alert::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
}

.alert-success {
  background-color: rgba(16, 185, 129, 0.1);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.alert-success::before {
  background-color: #10b981;
}

.alert-error {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.alert-error::before {
  background-color: #ef4444;
}

.form-group {
  margin-bottom: 2rem;
  position: relative;
}

.form-label {
  display: block;
  margin-bottom: 0.75rem;
  font-weight: 500;
  color: #e5e7eb;
  font-size: 1.125rem;
}

.form-control {
  width: 100%;
  padding: 1rem 1.25rem;
  background-color: #111827;
  border: 1px solid #374151;
  border-radius: 0.5rem;
  color: #f9fafb;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  outline: none;
}

.form-control::placeholder {
  color: #6b7280;
}

.form-control.error {
  border-color: #ef4444;
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.error-message::before {
  content: '⚠️';
  font-size: 1rem;
}

.submit-button {
  width: 100%;
  padding: 1.125rem !important;
  font-size: 1.125rem !important;
  position: relative;
  overflow: hidden;
  background-color: #6366f1;
  border: none;
  color: white;
  font-weight: 600;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #4f46e5;
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.4);
}

.submit-button:active {
  transform: translateY(0);
}

.submit-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg, 
    transparent, 
    rgba(255, 255, 255, 0.2), 
    transparent
  );
  transition: all 0.6s ease;
}

.submit-button:hover::before {
  left: 100%;
}

/* Map section */
.map-section {
  height: 500px;
  background-color: #1f2937;
  position: relative;
  z-index: 1;
}

.map-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background-image: linear-gradient(to bottom, #111827, transparent);
  z-index: 2;
  pointer-events: none;
}

.map-container {
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 1;
}

.map-container iframe {
  width: 100%;
  height: 100%;
  border: none;
  filter: grayscale(80%) contrast(1.2);
  transition: all 0.5s ease;
}

.map-container:hover iframe {
  filter: grayscale(0%) contrast(1);
}

/* Contact section (homepage) */
.contact-section {
  padding: 6rem 0;
  background-color: #111827;
  position: relative;
  overflow: hidden;
}

.contact-section::before {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  background: rgba(99, 102, 241, 0.03);
  border-radius: 50%;
  top: -150px;
  right: -150px;
}

.contact-section::after {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  background: rgba(99, 102, 241, 0.02);
  border-radius: 50%;
  bottom: -200px;
  left: -200px;
}

.contact-container {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 2;
}

/* Media queries for responsiveness */
@media (max-width: 1200px) {
  .contact-page-container,
  .contact-container {
    gap: 2rem;
  }
  
  .contact-info,
  .contact-form-container {
    padding: 2.5rem;
  }
}

@media (max-width: 992px) {
  .contact-page-container,
  .contact-container {
    grid-template-columns: 1fr;
  }
  
  .contact-info {
    order: 2;
    transform: translateY(0);
  }
  
  .contact-form-container {
    order: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .contact-page-header {
    padding: 8rem 0 4rem;
  }
  
  .contact-page-section,
  .contact-section {
    padding: 4rem 0;
  }
  
  .contact-info-item {
    gap: 1rem;
  }
  
  .contact-intro {
    margin-bottom: 2rem;
  }
  
  .social-links {
    margin-top: 2rem;
    padding-top: 1.5rem;
  }
}

@media (max-width: 576px) {
  .contact-page-header {
    padding: 7rem 0 3rem;
  }
  
  .contact-page-section,
  .contact-section {
    padding: 3rem 0;
  }
  
  .contact-info, 
  .contact-form-container {
    padding: 2rem;
  }
  
  .contact-info h3,
  .contact-form-container h3 {
    font-size: 1.5rem;
  }
  
  .form-label {
    font-size: 1rem;
  }
  
  .form-control {
    padding: 0.875rem 1rem;
  }
  
  .map-section {
    height: 400px;
  }
}
```

# src\components\sections\ContactPage.jsx

```jsx
// src/pages/ContactPage.jsx
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '../components/common/Button';
import { submitContactForm } from '../utils/api';
import './ContactPage.css';
import '../components/sections/Contact.css';

const ContactPage = () => {
  const initialFormState = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error when typing
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      await submitContactForm(formData);
      
      setSubmitStatus({
        type: 'success',
        message: 'Your message has been sent successfully! I will get back to you soon.'
      });
      
      // Reset form after successful submission
      setFormData(initialFormState);
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later or contact me directly via email.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Me | Essa Shomali - App Developer</title>
        <meta 
          name="description" 
          content="Get in touch with Essa Shomali for app development projects, consultations, or inquiries. I'm here to help bring your digital ideas to life."
        />
      </Helmet>
      
      <section className="contact-page-header">
        <div className="container">
          <h1>Contact Me</h1>
          <p>Let's discuss your project</p>
        </div>
      </section>
      
      <section className="contact-page-section">
        <div className="container">
          <div className="contact-page-container">
            <div className="contact-info">
              <h3>Let's Get In Touch</h3>
              <p className="contact-intro">
                I'm always interested in new projects and collaborations.
                Feel free to reach out with any questions or inquiries,
                and I'll get back to you as soon as possible.
              </p>
              
              <div className="contact-info-item">
                <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                <div>
                  <h4>Location:</h4>
                  <p>Detroit, MI</p>
                </div>
              </div>

              <div className="contact-info-item">
                <i className="fas fa-envelope" aria-hidden="true"></i>
                <div>
                  <h4>Email:</h4>
                  <p>
                    <a href="mailto:eshomali@gmail.com">eshomali@gmail.com</a>
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <i className="fas fa-phone" aria-hidden="true"></i>
                <div>
                  <h4>Call/Text:</h4>
                  <p>
                    <a href="tel:+17348823914">+1 (734) 882-3914</a>
                  </p>
                </div>
              </div>

              <div className="social-links">
                <h4>Connect With Me</h4>
                <div className="social-icons">
                  <a href="https://linkedin.com/in/eshomali" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="https://github.com/eshomali" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="https://www.instagram.com/eshomz" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="map-section">
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d94511.48962049947!2d-83.10633016041866!3d42.33138583207339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824ca0110cb1d75%3A0x5776864e35b9c4d2!2sDetroit%2C%20MI!5e0!3m2!1sen!2sus!4v1688554321000!5m2!1sen!2sus"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Office Location Map"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
```

# src\components\sections\Hero.jsx

```jsx
// src/components/sections/Hero.jsx
import { useState, useEffect } from 'react';
import Button from '../common/Button';
// Import your SVG logo directly as a standard import
import logoSvg from '../../assets/images/logo.svg'; // Update with your actual SVG logo path

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const roles = ['Mobile App Developer', 'UI/UX Designer', 'API Expert', 'Full Stack Developer'];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const typeWriter = () => {
      const currentRole = roles[currentRoleIndex];

      if (!isDeleting) {
        setTypedText(currentRole.substring(0, typedText.length + 1));

        if (typedText === currentRole) {
          // Pause at end of typing
          setTypingSpeed(2000);
          setIsDeleting(true);
        } else {
          setTypingSpeed(100);
        }
      } else {
        setTypedText(currentRole.substring(0, typedText.length - 1));

        if (typedText === '') {
          setIsDeleting(false);
          setCurrentRoleIndex((currentRoleIndex + 1) % roles.length);
          setTypingSpeed(300);
        } else {
          setTypingSpeed(50);
        }
      }
    };

    const timer = setTimeout(typeWriter, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, currentRoleIndex, isDeleting, typingSpeed, roles]);

  return (
      <section id="hero" className="hero-section">
        <div className="hero-container">
          {/* SVG Logo */}
          <div className="hero-logo" style={{ marginBottom: '2rem' }}>
            <div style={{
              width: '280px',
              height: '280px',
              border: '2px solid #374151',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              backgroundColor: '#111827',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0 auto'
            }}>
              <img
                  src={logoSvg}
                  alt="Essa Shomali Logo"
                  width="200"
                  height="200"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            </div>
          </div>

          <div className="hero-content">
            <h1 className="hero-title">
              <span className="name">Essa Shomali</span>
              <span className="role">
              <span className="typed-role" aria-live="polite">{typedText}</span>
              <span className="cursor"></span>
            </span>
            </h1>

            <p className="hero-description">
              Helping businesses transform their digital presence with modern, accessible,
              and high-performance applications.
            </p>

            <div className="hero-buttons">
              <Button
                  to="/portfolio"
                  variant="primary"
                  size="large"
                  aria-label="View my portfolio"
              >
                <i className="fas fa-eye" aria-hidden="true"></i> &nbsp; View My Work
              </Button>
              <Button
                  to="/contact"
                  variant="outline"
                  size="large"
                  aria-label="Contact me"
              >
                <i className="fas fa-envelope" aria-hidden="true"></i> &nbsp; Get In Touch
              </Button>
            </div>
          </div>
        </div>

        <div className="hero-shape-divider">
          <br/>
        </div>

      </section>
  );
};

export default Hero;
```

# src\components\sections\Portfolio.jsx

```jsx
// src/components/sections/Portfolio.jsx
import { useState, useEffect } from 'react';
import ProjectCard from '../common/ProjectCard';
import Button from '../common/Button';
import { fetchProjects } from '../../utils/api.jsx';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const getProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects();
        setProjects(data);
        setFilteredProjects(data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map(project => project.category))];
        setCategories(uniqueCategories);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
        setLoading(false);
      }
    };
    
    getProjects();
  }, []);

  const handleFilterChange = (category) => {
    setActiveFilter(category);
    
    if (category === 'all') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => project.category === category);
      setFilteredProjects(filtered);
    }
    
    // Reset visible count when changing filters
    setVisibleCount(6);
  };

  const loadMoreProjects = () => {
    setVisibleCount(prevCount => prevCount + 3);
  };

  if (loading) {
    return (
      <section id="portfolio" className="portfolio section">
        <div className="container">
          <div className="section-title">
            <h2>Portfolio</h2>
            <p>Check out some of my recent projects</p>
          </div>
          <div className="loading-spinner" aria-label="Loading projects">
            <div className="spinner"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="portfolio" className="portfolio section">
        <div className="container">
          <div className="section-title">
            <h2>Portfolio</h2>
            <p>Check out some of my recent projects</p>
          </div>
          <div className="error-message" role="alert">
            {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="portfolio section">
      <div className="container">
        <div className="section-title">
          <h2>Portfolio</h2>
          <p>Check out some of my recent projects</p>
        </div>

        <div className="portfolio-filters">
          <ul>
            <li>
              <button
                className={activeFilter === 'all' ? 'active' : ''}
                onClick={() => handleFilterChange('all')}
                aria-pressed={activeFilter === 'all'}
              >
                All
              </button>
            </li>
            {categories.map((category, index) => (
              <li key={index}>
                <button
                  className={activeFilter === category ? 'active' : ''}
                  onClick={() => handleFilterChange(category)}
                  aria-pressed={activeFilter === category}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="portfolio-grid">
          {filteredProjects.slice(0, visibleCount).map(project => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              variant={project.featured ? 'featured' : 'default'}
            />
          ))}
        </div>

        {visibleCount < filteredProjects.length && (
          <div className="portfolio-load-more">
            <Button 
              onClick={loadMoreProjects} 
              variant="outline" 
              size="medium"
              aria-label="Load more projects"
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
```

# src\components\sections\PortfolioHome.jsx

```jsx
// src/components/sections/PortfolioHome.jsx
import { useState, useEffect } from 'react';
import Button from '../common/Button';
import { fetchFeaturedProjects } from '../../utils/api';

const PortfolioHome = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFeaturedProjects = async () => {
      try {
        setLoading(true);
        const featuredProjects = await fetchFeaturedProjects(3);
        setProjects(featuredProjects);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching featured projects:', err);
        setError('Failed to load featured projects.');
        setLoading(false);
      }
    };
    
    getFeaturedProjects();
  }, []);

  if (loading) {
    return (
      <section id="portfolio" className="portfolio-home-section">
        <div className="container">
          <div className="section-title">
            <h2>Featured Projects</h2>
            <p>Check out some of my recent work</p>
          </div>
          <div className="loading-spinner-container">
            <div className="spinner"></div>
            <p>Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="portfolio" className="portfolio-home-section">
        <div className="container">
          <div className="section-title">
            <h2>Featured Projects</h2>
            <p>Check out some of my recent work</p>
          </div>
          <div className="error-message" role="alert">
            {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="portfolio-home-section">
      <div className="container">
        <div className="section-title">
          <h2>Featured Projects</h2>
          <p>Check out some of my recent work</p>
        </div>

        <div className="portfolio-home-grid">
          {projects.map(project => (
            <div className="project-card" key={project.id}>
              <div className="project-card-image">
                <img 
                  src={project.image || "https://via.placeholder.com/600x400?text=Project+Image"} 
                  alt={`${project.title} - Project Screenshot`}
                  loading="lazy"
                />
                {project.featured && (
                  <div className="project-card-badge">Featured</div>
                )}
              </div>
              
              <div className="project-card-content">
                <h3 className="project-card-title">
                  {project.title}
                </h3>
                
                <p className="project-card-description">
                  {project.description.length > 120 
                    ? `${project.description.substring(0, 120)}...` 
                    : project.description}
                </p>
                
                <div className="project-technologies">
                  {project.technologies && project.technologies.map((tech, index) => (
                    <span key={index} className="technology-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <Button 
                  to={`/portfolio/${project.slug}`}
                  variant="primary"
                  className="view-details-btn"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
        

      </div>
    </section>
  );
};

export default PortfolioHome;
```

# src\components\sections\Services.jsx

```jsx
// src/components/sections/Services.jsx
import { useState } from 'react';
import Button from '../common/Button';

const Services = () => {
  // Service modal state
  const [activeService, setActiveService] = useState(null);
  
  const services = [
    {
      id: 'web-development',
      title: 'Web Development',
      icon: 'fas fa-code',
      shortDescription: 'Custom, responsive, and high-performance web applications built with modern technologies.',
      longDescription: 'I create custom web applications that are tailored to your specific business needs. Using React, Node.js, and other cutting-edge technologies, I build solutions that are fast, responsive, and scalable. My development process includes thorough testing and optimization to ensure your application performs well across all devices and browsers.',
      features: [
        'Custom frontend and backend development',
        'Responsive design for all devices',
        'Performance optimization',
        'API integration and development',
        'Content management systems',
        'E-commerce solutions'
      ],
      technologies: ['React', 'Node.js', 'Express', 'MySQL', 'MongoDB', 'GraphQL', 'REST API']
    },
    {
      id: 'mobile-apps',
      title: 'Mobile Apps',
      icon: 'fas fa-mobile-alt',
      shortDescription: 'Native and cross-platform mobile applications for iOS and Android with seamless user experiences.',
      longDescription: 'I develop mobile applications that provide seamless experiences across iOS and Android platforms. Using React Native and other cross-platform technologies, I create apps that feel native while maintaining a single codebase. My focus is on creating intuitive interfaces, smooth animations, and optimal performance to ensure your app stands out in the marketplace.',
      features: [
        'Cross-platform development (iOS & Android)',
        'Native application development',
        'Intuitive user interfaces',
        'Offline functionality',
        'Push notifications',
        'App store optimization'
      ],
      technologies: ['React Native', 'Swift', 'Kotlin', 'Firebase', 'Redux', 'Native Modules']
    },
    {
      id: 'consulting',
      title: 'Technical Consulting',
      icon: 'fas fa-lightbulb',
      shortDescription: 'Expert guidance on technology solutions, architecture, and digital transformation strategies.',
      longDescription: 'I provide technical consulting services to help businesses make informed decisions about their digital strategies. Whether you need guidance on technology selection, architecture design, or performance optimization, I offer expert advice based on years of industry experience. My goal is to help you leverage technology effectively to meet your business objectives.',
      features: [
        'Technology stack evaluation',
        'Architecture planning',
        'Performance audit and optimization',
        'Code review and refactoring',
        'Digital transformation strategy',
        'Team training and mentoring'
      ],
      technologies: ['System Architecture', 'DevOps', 'CI/CD', 'Cloud Solutions', 'Security Best Practices', 'Scalability']
    }
  ];
  
  const openServiceModal = (serviceId) => {
    setActiveService(serviceId);
    // Add body class to prevent scrolling
    document.body.classList.add('modal-open');
  };
  
  const closeServiceModal = () => {
    setActiveService(null);
    // Remove body class to allow scrolling
    document.body.classList.remove('modal-open');
  };
  
  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-title">
          <h2>Services</h2>
        </div>
        
        <div className="services-container">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">
                <i className={service.icon} aria-hidden="true"></i>
              </div>
              
              <h3 className="service-title">{service.title}</h3>
              
              <p className="service-description">
                {service.shortDescription}
              </p>
              
              <button 
                className="service-link"
                onClick={() => openServiceModal(service.id)}
                aria-label={`Learn more about ${service.title}`}
              >
                Learn More <i className="fas fa-arrow-right" aria-hidden="true"></i>
              </button>
            </div>
          ))}
          <div className="portfolio-home-btn">
            <Button
                to="/portfolio"
                variant="outline"
                size="large"
            >
              View All Projects
            </Button>
          </div>
        </div>
        
        {/* Service Modals */}
        {services.map((service) => (
          <div 
            key={`modal-${service.id}`}
            className={`service-modal ${activeService === service.id ? 'active' : ''}`}
            id={`service-modal-${service.id}`}
            aria-hidden={activeService !== service.id}
            role="dialog"
            aria-labelledby={`service-modal-title-${service.id}`}
            aria-describedby={`service-modal-description-${service.id}`}
          >
            <div className="service-modal-content">
              <button 
                className="modal-close" 
                onClick={closeServiceModal}
                aria-label="Close modal"
              >
                <i className="fas fa-times" aria-hidden="true"></i>
              </button>
              
              <div className="service-modal-header">
                <div className="service-modal-icon">
                  <i className={service.icon} aria-hidden="true"></i>
                </div>
                <h3 id={`service-modal-title-${service.id}`}>{service.title}</h3>
              </div>
              
              <div className="service-modal-body">
                <p id={`service-modal-description-${service.id}`} className="service-modal-description">
                  {service.longDescription}
                </p>
                
                <div className="service-features">
                  <h4>Services Include:</h4>
                  <ul>
                    {service.features.map((feature, index) => (
                      <li key={index}>
                        <i className="fas fa-check" aria-hidden="true"></i> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="service-technologies">
                  <h4>Technologies:</h4>
                  <div className="technology-tags">
                    {service.technologies.map((tech, index) => (
                      <span key={index} className="technology-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="service-cta">
                  <Button 
                    to={`/services/${service.id}`}
                    variant="primary"
                    aria-label={`Learn more about my ${service.title} services`}
                  >
                    More Details
                  </Button>
                  <Button 
                    to="/contact"
                    variant="outline"
                    aria-label="Contact me about this service"
                  >
                    Request a Quote
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
```

# src\index.css

```css
/* src/index.css */

/* ===== CSS Variables ===== */
:root {
  /* Main colors */
  --primary-color: #6366f1;
  --primary-color-light: #818cf8;
  --primary-color-dark: #4f46e5;
  --secondary-color: #14b8a6;
  --accent-color: #f97316;
  
  /* Neutral colors */
  --bg-color: #ffffff;
  --bg-color-alt: #f9fafb;
  --text-color: #1f2937;
  --text-color-light: #4b5563;
  --text-color-lighter: #9ca3af;
  --border-color: #e5e7eb;
  
  /* Dark mode colors */
  --dark-bg-color: #111827;
  --dark-bg-color-alt: #1f2937;
  --dark-text-color: #f9fafb;
  --dark-text-color-light: #e5e7eb;
  --dark-text-color-lighter: #9ca3af;
  --dark-border-color: #374151;
  
  /* Typography */
  --body-font: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --heading-font: 'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --mono-font: 'Fira Code', monospace;
  
  /* Font sizes */
  --fs-xs: 0.75rem;    /* 12px */
  --fs-sm: 0.875rem;   /* 14px */
  --fs-base: 1rem;     /* 16px */
  --fs-lg: 1.125rem;   /* 18px */
  --fs-xl: 1.25rem;    /* 20px */
  --fs-2xl: 1.5rem;    /* 24px */
  --fs-3xl: 1.875rem;  /* 30px */
  --fs-4xl: 2.25rem;   /* 36px */
  --fs-5xl: 3rem;      /* 48px */
  --fs-6xl: 3.75rem;   /* 60px */
  
  /* Spacing */
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-5: 1.25rem;  /* 20px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-10: 2.5rem;  /* 40px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */
  --space-20: 5rem;    /* 80px */
  --space-24: 6rem;    /* 96px */
  
  /* Border radius */
  --radius-sm: 0.125rem;  /* 2px */
  --radius-md: 0.375rem;  /* 6px */
  --radius-lg: 0.5rem;    /* 8px */
  --radius-xl: 0.75rem;   /* 12px */
  --radius-2xl: 1rem;     /* 16px */
  --radius-full: 9999px;
  
  /* Box shadow */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  
  /* Transitions */
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s ease;
  
  /* Container */
  --container-max-width: 1200px;
  --container-padding: 1.5rem;
  
  /* Z-index layers */
  --z-negative: -1;
  --z-normal: 1;
  --z-header: 100;
  --z-overlay: 200;
  --z-modal: 300;
  --z-tooltip: 400;
}

/* ===== Reset & Base Styles ===== */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

body {
  font-family: var(--body-font);
  font-size: var(--fs-base);
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--bg-color);
  overflow-x: hidden;
  width: 100%;
  min-height: 100%;
  transition: background-color var(--transition-normal), color var(--transition-normal);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--heading-font);
  line-height: 1.25;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-color);
}

h1 {
  font-size: clamp(2.5rem, 5vw, var(--fs-5xl));
}

h2 {
  font-size: clamp(2rem, 4vw, var(--fs-4xl));
}

h3 {
  font-size: clamp(1.5rem, 3vw, var(--fs-3xl));
}

h4 {
  font-size: clamp(1.25rem, 2vw, var(--fs-2xl));
}

h5 {
  font-size: var(--fs-xl);
}

h6 {
  font-size: var(--fs-lg);
}

p {
  margin-bottom: 1rem;
}

a {
  color: var(--primary-color);
  text-decoration: none;
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--primary-color-dark);
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

button, input, textarea, select {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
}

button {
  background: none;
  border: none;
  cursor: pointer;
}

ul, ol {
  list-style: none;
}

.container {
  width: 100%;
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.section {
  padding: var(--space-20) 0;
  position: relative;
}

.section-title {
  text-align: center;
  margin-bottom: var(--space-12);
}

.section-title h2 {
  font-size: clamp(2rem, 4vw, var(--fs-4xl));
  margin-bottom: var(--space-2);
  position: relative;
  display: inline-block;
}

.section-title h2::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background-color: var(--primary-color);
  border-radius: var(--radius-full);
}

.section-title p {
  font-size: var(--fs-lg);
  color: var(--text-color-light);
  max-width: 600px;
  margin: 0 auto;
}

/* Skip link for accessibility */
.skip-link {
  position: absolute;
  top: -100px;
  left: 0;
  z-index: var(--z-header);
  padding: var(--space-2) var(--space-4);
  background-color: var(--primary-color);
  color: white;
  font-weight: 600;
  transition: top var(--transition-fast);
}

.skip-link:focus {
  top: 0;
}

/* ===== Header & Navigation ===== */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: var(--z-header);
  background-color: transparent;
  transition: background-color var(--transition-normal), box-shadow var(--transition-normal);
  padding: var(--space-4) 0;
}

.header-scrolled {
  background-color: rgba(17, 24, 39, 0.95);
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(10px);
  padding: var(--space-2) 0;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.logo {
  z-index: var(--z-header);
}

.logo a {
  display: flex;
  align-items: center;
  color: var(--dark-text-color);
  font-family: var(--heading-font);
  font-weight: 700;
  font-size: var(--fs-2xl);
}

.logo h1 {
  margin-bottom: 0;
  font-size: inherit;
}

.logo span {
  color: var(--primary-color);
}

.main-nav ul {
  display: flex;
  gap: var(--space-6);
}

.main-nav a {
  color: var(--dark-text-color);
  font-weight: 500;
  transition: color var(--transition-fast);
  padding: var(--space-2) var(--space-1);
  position: relative;
}

.main-nav a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary-color);
  transition: width var(--transition-normal);
}

.main-nav a:hover, 
.main-nav a.active {
  color: var(--primary-color);
}

.main-nav a:hover::after, 
.main-nav a.active::after {
  width: 100%;
}

/* Mobile navigation */
.mobile-nav-toggle {
  display: none;
  z-index: var(--z-header);
}

.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
}

.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background-color: var(--dark-text-color);
  transition: transform var(--transition-normal), opacity var(--transition-normal);
}

.hamburger.active span:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

.mobile-nav {
  position: fixed;
  top: 0;
  right: -100%;
  width: 80%;
  max-width: 400px;
  height: 100vh;
  background-color: var(--dark-bg-color);
  box-shadow: var(--shadow-xl);
  padding: var(--space-20) var(--space-8);
  z-index: var(--z-overlay);
  transition: right var(--transition-slow);
  overflow-y: auto;
}

.mobile-nav.mobile-nav-active {
  right: 0;
}

.mobile-nav.mobile ul {
  flex-direction: column;
  gap: var(--space-6);
}

.mobile-nav.mobile a {
  display: block;
  font-size: var(--fs-xl);
}

/* ===== Button Styles ===== */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-6);
  font-weight: 600;
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
  text-align: center;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
  border: 2px solid var(--primary-color);
}

.btn-primary:hover, .btn-primary:focus {
  background-color: var(--primary-color-dark);
  border-color: var(--primary-color-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-outline {
  background-color: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.btn-outline:hover, .btn-outline:focus {
  background-color: var(--primary-color);
  color: white;
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-text {
  background-color: transparent;
  color: var(--primary-color);
  padding: var(--space-2) var(--space-3);
}

.btn-text:hover, .btn-text:focus {
  background-color: rgba(99, 102, 241, 0.1);
  transform: translateY(-2px);
}

.btn-small {
  padding: var(--space-2) var(--space-4);
  font-size: var(--fs-sm);
}

.btn-medium {
  padding: var(--space-3) var(--space-6);
  font-size: var(--fs-base);
}

.btn-large {
  padding: var(--space-4) var(--space-8);
  font-size: var(--fs-lg);
}

.btn-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ===== Hero Section ===== */
.hero {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: var(--dark-bg-color);
  position: relative;
  overflow: hidden;
  padding: 1rem;
}

.hero-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding-top: 6rem;
  width: 100%;
}

.hero-content {
  max-width: 800px;
  width: 100%;
}

.hero h1 {
  font-size: clamp(2.5rem, 5vw, var(--fs-6xl));
  margin-bottom: var(--space-6);
  line-height: 1.1;
  color: var(--dark-text-color);
}

.hero h1 .name {
  display: block;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.hero h1 .role {
  display: block;
  margin-top: var(--space-2);
  color: var(--dark-text-color);
}

.hero-description {
  font-size: clamp(1.1rem, 2vw, var(--fs-xl));
  margin-bottom: var(--space-8);
  color: var(--dark-text-color-light);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-buttons {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2rem;
}

.hero-buttons .btn {
  min-width: 160px;
}

@media (max-width: 600px) {
  .hero-buttons {
    flex-direction: column;
    width: 100%;
    gap: 1rem;
  }
  
  .hero-buttons .btn {
    width: 100%;
  }
}

/* Hero wave divider */
.hero-shape-divider {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.hero-shape-divider svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 80px;
}

.hero-shape-divider .shape-fill {
  fill: var(--bg-color-alt);
}

/* ===== About Section ===== */
.about {
  background-color: var(--bg-color-alt);
  padding: 6rem 1rem;
}

.about-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-12);
  max-width: var(--container-max-width);
  margin: 0 auto;
}

@media (min-width: 992px) {
  .about-container {
    grid-template-columns: 1fr 2fr;
  }
}

.about-image {
  position: relative;
  margin: 0 auto;
  max-width: 350px;
}

.image-wrapper {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  aspect-ratio: 1 / 1;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-normal);
}

.image-wrapper:hover img {
  transform: scale(1.05);
}

.experience-badge {
  position: absolute;
  bottom: -20px;
  right: -20px;
  width: 120px;
  height: 120px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: 700;
  box-shadow: var(--shadow-md);
  padding: var(--space-2);
}

.experience-badge .years {
  font-size: var(--fs-3xl);
  line-height: 1;
}

.experience-badge .text {
  font-size: var(--fs-xs);
  line-height: 1.2;
}

.about-content h3 {
  margin-bottom: var(--space-4);
  color: var(--primary-color);
}

.about-content .lead {
  font-size: var(--fs-xl);
  font-weight: 500;
  margin-bottom: var(--space-6);
}

/* ===== Media Queries ===== */
@media (max-width: 1200px) {
  html {
    font-size: 15px;
  }
  
  .container {
    padding: 0 var(--space-6);
  }
}

@media (max-width: 992px) {
  .section {
    padding: var(--space-16) 0;
  }
  
  .about-container, .contact-container {
    grid-template-columns: 1fr;
  }
  
  .about-image {
    margin-bottom: var(--space-8);
  }
}

@media (max-width: 768px) {
  html {
    font-size: 14px;
  }
  
  h1 {
    font-size: clamp(2rem, 8vw, var(--fs-4xl));
  }
  
  .desktop-nav {
    display: none;
  }
  
  .mobile-nav-toggle {
    display: block;
  }
  
  .hero-container {
    padding-top: 4rem;
  }
  
  .hero-description {
    font-size: var(--fs-base);
  }
  
  .btn-large {
    padding: var(--space-3) var(--space-6);
  }
}

@media (max-width: 576px) {
  .container {
    padding: 0 var(--space-4);
  }
  
  .section {
    padding: var(--space-12) 0;
  }
  
  .hero {
    padding-top: 2rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    gap: var(--space-4);
  }
  
  .hero-buttons .btn {
    width: 100%;
  }
}

/* ===== Dark Mode (Default for this site) ===== */
body {
  background-color: var(--dark-bg-color);
  color: var(--dark-text-color);
}

h1, h2, h3, h4, h5, h6 {
  color: var(--dark-text-color);
}

.about, .testimonials {
  background-color: var(--dark-bg-color-alt);
}

.service-card,
.project-card,
.testimonial-content,
.contact-form-container {
  background-color: var(--dark-bg-color-alt);
  border-color: var(--dark-border-color);
}

.form-control {
  background-color: var(--dark-bg-color);
  border-color: var(--dark-border-color);
  color: var(--dark-text-color);
}

.slider-arrow,
.modal-close {
  background-color: var(--dark-bg-color-alt);
  color: var(--dark-text-color-light);
}

.slider-dot {
  background-color: var(--dark-border-color);
}

.hero-shape-divider .shape-fill {
  fill: var(--dark-bg-color-alt);
}
```

# src\main.jsx

```jsx
// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import './index.css';
import './App.css';

// Import Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css';

// Get the root element
const root = document.getElementById('root');

// Create a root
const reactRoot = createRoot(root);

// Render the app
reactRoot.render(
  <StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </StrictMode>,
);
```

# src\pages\AboutPage.jsx

```jsx
// src/pages/AboutPage.jsx

import { Helmet } from 'react-helmet-async';
import Button from '../components/common/Button';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Me | Essa Shomali - App Developer</title>
        <meta 
          name="description" 
          content="Learn more about Essa Shomali, a professional app developer with expertise in React, Node.js, and UI/UX design. Discover my skills, experience, and education."
        />
      </Helmet>
      
      <section className="page-header">
        <div className="container">
          <h1>About Me</h1>
          <p>Get to know my background and expertise</p>
        </div>
      </section>
      
      <section className="about-intro section">
        <div className="container">
          <div className="about-intro-grid">
            <div
                className="about-intro-image"
                style={{
                  width: '150px',
                  height: '150px',
                  overflow: 'hidden',
                  borderRadius: '50%',
                  border: '2px solid #374151',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                  backgroundColor: '#111827',
                  display: 'flex', // Add flexbox for centering
                  justifyContent: 'center', // Center horizontally
                  alignItems: 'center', // Center vertically
                  margin: '0 auto', // Center the entire div in its container
                }}
            >
              <img
                  src="src/assets/images/about-large.jpg"
                  alt="Essa Shomali - Professional App Developer"
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
              />
            </div>

            
            <div className="about-intro-content">
              <h2>Essa Shomali</h2>
              <h3>Professional App Developer & UI/UX Specialist</h3>
              
              <p className="lead">
                I help businesses transform their digital presence with modern, accessible,
                and high-performance web applications.
              </p>
              
              <p>
                With over 8 years of experience in app development, I specialize in creating
                exceptional digital experiences that help businesses grow. My expertise spans
                across the entire development lifecycle, from concept and design to 
                deployment and maintenance.
              </p>
              
              <p>
                I'm passionate about building applications that are not only visually stunning
                but also highly functional, accessible, and optimized for performance.
                My approach combines technical excellence with a deep understanding of 
                business goals to deliver solutions that drive real results.
              </p>
              
              <div className="personal-info">
                <div className="info-item">
                  <span className="label">Name: </span>
                  <span className="value">Essa Shomali</span>
                </div>
                <div className="info-item">
                  <span className="label">Email: </span>
                  <span className="value">
                    <a href="mailto:eshomali@gmail.com">eshomali@gmail.com</a>
                  </span>
                </div>
                <div className="info-item">
                  <span className="label">Phone: </span>
                  <span className="value">
                    <a href="tel:+17348823914">+1 (734) 882-3914</a>
                  </span>
                </div>
                <div className="info-item">
                  <span className="label">Location: </span>
                  <span className="value">Detroit, MI</span>
                </div>
                <div className="info-item">
                  <span className="label">Languages: </span>
                  <span className="value">English, Arabic</span>
                </div>
              </div>
              
              <div className="about-buttons">
                <Button 
                  to="/contact" 
                  variant="outline" 
                  size="medium"
                  aria-label="Contact me"
                >
                  <i className="fas fa-envelope" aria-hidden="true"></i> &nbsp; Contact Me
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-cta section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to work together?</h2>
            <p>
              Let's discuss how I can help bring your project to life. 
              Whether you need a new website, mobile app, or digital strategy, 
              I'm here to help you achieve your goals.
            </p>
            <Button to="/contact" variant="primary" size="large">
              Get In Touch
            </Button>
          </div>
        </div>
      </section>

    </>
  );
};

export default AboutPage;
```

# src\pages\ContactPage.jsx

```jsx
// src/pages/ContactPage.jsx
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '../components/common/Button';
import { submitContactForm } from '../utils/api.jsx';

const ContactPage = () => {
  const initialFormState = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error when typing
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      const response = await submitContactForm(formData);
      
      setSubmitStatus({
        type: 'success',
        message: 'Your message has been sent successfully! I will get back to you soon.'
      });
      
      // Reset form after successful submission
      setFormData(initialFormState);
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later or contact me directly via email.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Me | Essa Shomali - App Developer</title>
        <meta 
          name="description" 
          content="Get in touch with Essa Shomali for app development projects, consultations, or inquiries. I'm here to help bring your digital ideas to life."
        />
      </Helmet>
      
      <section className="page-header">
        <div className="container">
          <h1>Contact Me</h1>
          <p>Let's discuss your project</p>
        </div>
      </section>
      
      <section className="contact-page-section section">
        <div className="container">
          <div className="contact-page-container">
            <div className="contact-info">
              <h2>Let's Get In Touch</h2>
              <p className="contact-intro">
                I'm always interested in new projects and collaborations.
                Feel free to reach out with any questions or inquiries,
                and I'll get back to you as soon as possible.
              </p>
              
              <div className="contact-info-item">
                <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                <div>
                  <h3>Location: </h3>
                  <p>Detroit, MI</p>
                </div>
              </div>

              <div className="contact-info-item">
                <i className="fas fa-envelope" aria-hidden="true"></i>
                <div>
                  <h3>Email:</h3>
                  <p>
                    <a href="mailto:eshomali@gmail.com">eshomali@gmail.com</a>
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <i className="fas fa-phone" aria-hidden="true"></i>
                <div>
                  <h3>Call/Text:</h3>
                  <p>
                    <a href="tel:+17348823914">+1 (734) 882-3914</a>
                  </p>
                </div>
              </div>
              <br/>
              <div className="social-links">
                <h3>Connect With Me</h3>
                <div className="social-icons">
                  <a href="https://linkedin.com/in/eshomali" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="https://www.instagram.com/eshomz" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="map-section">
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1511826.1404648044!2d-83.28795935000001!3d42.3527111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824ca0110cb1d75%3A0x5776864e35b9c4d2!2sDetroit%2C%20MI!5e0!3m2!1sen!2sus!4v1677654321!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Office Location Map"
          ></iframe>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
```

# src\pages\HomePage.css

```css
/* src/pages/HomePage.css */

/* Hero Section */
.hero-section {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #111827;
  position: relative;
  overflow: hidden;
  padding-top: 80px;
}

.hero-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  width: 100%;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 700;
  color: #f9fafb;
  margin-bottom: 1.5rem;
  line-height: 1.1;
}

.hero-title .name {
  display: block;
  color: #6366f1;
  margin-bottom: 0.9rem;
}

.hero-title .typed-role {
  display: inline-block;
  min-width: 12ch;
  font-size: clamp(1.5rem, 5vw, 2.625rem); /* Responsive font size */
}

.cursor {
  display: inline-block;
  width: 3px;
  height: 1em;
  background-color: #6366f1;
  margin-left: 2px;
  animation: blink 1s infinite;
  vertical-align: text-top;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.hero-description {
  font-size: clamp(1.1rem, 2vw, 1.25rem);
  color: #e5e7eb;
  max-width: 600px;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.hero-buttons .btn {
  min-width: 160px;
}

.hero-shape-divider {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.hero-shape-divider svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 70px;
}

.hero-shape-divider .shape-fill {
  fill: #1f2937;
}

/* About Section */
.about-section {
  padding: 6rem 0;
  background-color: #1f2937;
  position: relative;
}

.about-container {
  display: grid;
  grid-template-columns: minmax(300px, 1fr) 2fr;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.about-image {
  position: relative;
}

.image-wrapper {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  margin: 0 auto;
  aspect-ratio: 1 / 1;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.image-wrapper:hover img {
  transform: scale(1.05);
}

.experience-badge {
  position: absolute;
  bottom: -20px;
  right: -20px;
  width: 120px;
  height: 120px;
  background-color: #6366f1;
  color: white;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: 700;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
  z-index: 2;
}

.experience-badge .years {
  font-size: 2.25rem;
  line-height: 1;
}

.experience-badge .text {
  font-size: 0.75rem;
  line-height: 1.2;
}

.about-content h2 {
  font-size: clamp(2rem, 4vw, 2.5rem);
  color: #f9fafb;
  margin-bottom: 1.5rem;
}

.about-content h3 {
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  color: #6366f1;
  margin-bottom: 1rem;
}

.about-content .lead {
  font-size: clamp(1.1rem, 2vw, 1.25rem);
  font-weight: 500;
  margin-bottom: 1.5rem;
  color: #e5e7eb;
}

.about-content p {
  color: #d1d5db;
  margin-bottom: 1.5rem;
  line-height: 1.7;
}

.about-tabs {
  margin-top: 3rem;
}

.tabs-navigation {
  display: flex;
  border-bottom: 2px solid #374151;
  margin-bottom: 1.5rem;
}

.tab-button {
  padding: 0.75rem 1.5rem;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  color: #e5e7eb;
  font-weight: 600;
  transition: all 0.3s ease;
  background: none;
  border-top: none;
  border-left: none;
  border-right: none;
  cursor: pointer;
}

.tab-button:hover {
  color: #6366f1;
}

.tab-button.active {
  color: #6366f1;
  border-bottom-color: #6366f1;
}

.tab-panel {
  display: none;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.tab-panel.active {
  display: block;
}

.skills-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.skill-item {
  margin-bottom: 1rem;
}

.skill-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.skill-info h4 {
  margin-bottom: 0;
  font-size: 1rem;
  color: #f9fafb;
}

.skill-percentage {
  font-weight: 600;
  color: #6366f1;
}

.skill-bar {
  height: 8px;
  background-color: #374151;
  border-radius: 9999px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(to right, #6366f1, #818cf8);
  border-radius: 9999px;
  transition: width 1s ease;
}

.timeline {
  position: relative;
  padding-left: 1.5rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 2px;
  background-color: #374151;
}

.timeline-item {
  position: relative;
  padding-bottom: 1.5rem;
}

.timeline-dot {
  position: absolute;
  left: -1.5rem;
  top: 6px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #6366f1;
  border: 3px solid #1f2937;
}

.timeline-date {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.timeline-content h4 {
  margin-bottom: 0.25rem;
  font-size: 1.125rem;
  color: #f9fafb;
}

.timeline-content h5 {
  color: #e5e7eb;
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.timeline-content p {
  margin-bottom: 0;
}

.about-buttons {
  text-align: center;
  width: 100%; /* Ensure the container takes full width */
  grid-column: 1 / -1; /* Make it span all columns in the grid */
  margin-top: 2rem; /* Add some spacing from the service cards */
}

/* Services Section */
.services-section {
  padding: 6rem 0;
  background-color: #111827;
  position: relative;
}

.services-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.service-card {
  padding: 2rem 1.5rem;
  background-color: #1f2937;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid #374151;
  position: relative;
  overflow: hidden;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(to right, #6366f1, #818cf8);
  transition: height 0.3s ease;
  z-index: -1;
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
}

.service-card:hover::before {
  height: 100%;
  opacity: 0.05;
}

.service-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  margin-left: auto;
  margin-right: auto; /* These two margin properties will center the icon */
}

.service-card:hover .service-icon {
  background-color: #6366f1;
  color: white;
}

.service-title {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  transition: color 0.3s ease;
  color: #f9fafb;
}

.service-card:hover .service-title {
  color: #6366f1;
}

.service-description {
  color: #e5e7eb;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.service-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #6366f1;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
}

.service-link:hover {
  color: #818cf8;
  gap: 0.75rem;
}

/* Service Modal */
.service-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.service-modal.active {
  opacity: 1;
  visibility: visible;
}

.service-modal-content {
  width: 100%;
  max-width: 800px;
  background-color: #1f2937;
  border-radius: 0.5rem;
  padding: 2.5rem;
  position: relative;
  transform: translateY(50px);
  opacity: 0;
  transition: all 0.3s ease;
  max-height: 80vh;
  overflow-y: auto;
  border: 1px solid #374151;
}

.service-modal.active .service-modal-content {
  transform: translateY(0);
  opacity: 1;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #111827;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: #e5e7eb;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.modal-close:hover {
  background-color: #6366f1;
  color: white;
}

.service-modal-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.service-modal-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #6366f1;
  color: white;
  border-radius: 0.5rem;
  font-size: 1.25rem;
}

.service-modal-header h3 {
  margin-bottom: 0;
  font-size: 1.75rem;
  color: #f9fafb;
}

.service-modal-description {
  margin-bottom: 1.5rem;
  color: #e5e7eb;
  line-height: 1.7;
}

.service-features h4,
.service-technologies h4 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #f9fafb;
}

.service-features ul {
  margin-bottom: 1.5rem;
  padding-left: 0;
  list-style: none;
}

.service-features li {
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #e5e7eb;
}

.service-features li i {
  color: #6366f1;
}

.technology-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.technology-tag {
  padding: 0.25rem 0.75rem;
  background-color: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
}

.service-cta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Portfolio Section (Homepage version) */
.portfolio-home-section {
  padding: 6rem 0;
  background-color: #1f2937;
  position: relative;
}

.portfolio-home-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto 3rem;
  padding: 0 1.5rem;
}

.portfolio-home-btn {
  text-align: center;
  width: 100%; /* Ensure the container takes full width */
  grid-column: 1 / -1; /* Make it span all columns in the grid */
  margin-top: 2rem; /* Add some spacing from the service cards */
}

/* Testimonials Section */
.testimonials-section {
  padding: 6rem 0;
  background-color: #111827;
  position: relative;
}

.testimonial-slider {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  overflow: hidden;
}

.testimonial-track {
  display: flex;
  transition: transform 0.5s ease;
}

.testimonial-item {
  min-width: 100%;
  padding: 0.5rem;
}

.testimonial-content {
  background-color: #1f2937;
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border: 1px solid #374151;
}

.testimonial-quote {
  position: relative;
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
}

.testimonial-quote .fa-quote-left, 
.testimonial-quote .fa-quote-right {
  color: #6366f1;
  opacity: 0.2;
  font-size: 1.5rem;
  position: absolute;
}

.testimonial-quote .fa-quote-left {
  top: 0;
  left: 0;
}

.testimonial-quote .fa-quote-right {
  bottom: 0;
  right: 0;
}

.testimonial-quote p {
  margin-bottom: 0;
  font-style: italic;
  color: #e5e7eb;
  line-height: 1.7;
}

.testimonial-rating {
  margin-bottom: 1.5rem;
  display: flex;
  gap: 0.25rem;
  justify-content: center;
}

.testimonial-rating i {
  color: #6b7280;
}

.testimonial-rating i.filled {
  color: #fbbf24;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #6366f1;
}

.author-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-info h4 {
  margin-bottom: 0;
  font-size: 1rem;
  color: #f9fafb;
}

.author-info p {
  margin-bottom: 0;
  color: #e5e7eb;
  font-size: 0.875rem;
}

.slider-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background-color: #1f2937;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 1;
  transition: all 0.3s ease;
  border: 1px solid #374151;
  color: #e5e7eb;
  cursor: pointer;
}

.slider-arrow:hover {
  background-color: #6366f1;
  color: white;
}

.slider-prev {
  left: -20px;
}

.slider-next {
  right: -20px;
}

.slider-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.slider-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #374151;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
}

.slider-dot:hover {
  background-color: #6366f1;
}

.slider-dot.active {
  background-color: #6366f1;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .about-container {
    grid-template-columns: 1fr;
  }
  
  .about-image {
    max-width: 400px;
    margin: 0 auto 2rem;
  }
  
  .service-modal-content {
    padding: 2rem;
  }

}

@media (max-width: 768px) {
  .hero-buttons {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
  
  .hero-buttons .btn {
    width: 100%;
  }
  
  .about-tabs {
    margin-top: 2rem;
  }
  
  .tabs-navigation {
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 0.5rem;
  }
  
  .tab-button {
    padding: 0.5rem 1rem;
  }
  
  .skills-container {
    grid-template-columns: 1fr;
  }
  
  .about-buttons {
    flex-direction: column;
    max-width: 300px;
  }
  
  .about-buttons .btn {
    width: 100%;
  }
  
  .portfolio-home-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
  
  .slider-arrow {
    width: 35px;
    height: 35px;
  }
  
  .service-modal-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .service-cta {
    flex-direction: column;
  }
  
  .service-cta .btn {
    width: 100%;
  }

}

@media (max-width: 576px) {
  .tab-button {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
  }
  
  .experience-badge {
    width: 100px;
    height: 100px;
  }
  
  .portfolio-home-grid {
    grid-template-columns: 1fr;
  }
  
  .testimonial-author {
    flex-direction: column;
    text-align: center;
  }
  
  .author-image {
    margin: 0 auto;
  }
  
  .slider-arrow {
    display: none;
  }
}

/* Enhanced styling for About page */
.about-intro-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
}

@media (min-width: 992px) {
  .about-intro-grid {
    grid-template-columns: 1fr 2fr;
    gap: 4rem;
  }
}

.about-intro-content {
  position: relative;
  z-index: 2;
}

.about-intro-content h2 {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  background: linear-gradient(90deg, #6366f1, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  position: relative;
}

.about-intro-content h3 {
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: #6366f1;
  margin-bottom: 1.5rem;
  font-weight: 600;
  position: relative;
}

.about-intro-content .lead {
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  font-weight: 500;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: #f9fafb;
  border-left: 4px solid #6366f1;
  padding-left: 1.5rem;
}

.about-intro-content p {
  font-size: clamp(1rem, 1.5vw, 1.1rem);
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: #e5e7eb;
}

.personal-info {
  background: rgba(31, 41, 55, 0.5);
  backdrop-filter: blur(8px);
  border-radius: 1rem;
  padding: 2rem;
  margin: 2rem 0;
  border: 1px solid rgba(99, 102, 241, 0.2);
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.3);
}

.info-item {
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
  position: relative;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-item::before {
  content: '';
  position: absolute;
  left: -1rem;
  width: 4px;
  height: 100%;
  background: linear-gradient(to bottom, #6366f1, transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.info-item:hover::before {
  opacity: 1;
}

.info-item .label {
  font-weight: 600;
  color: #6366f1;
  min-width: 100px;
  position: relative;
}

.info-item .value {
  color: #f9fafb;
}

.info-item .value a {
  color: #818cf8;
  text-decoration: none;
  position: relative;
  transition: all 0.3s ease;
}

.info-item .value a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #6366f1;
  transition: width 0.3s ease;
}

.info-item .value a:hover {
  color: #6366f1;
}

.info-item .value a:hover::after {
  width: 100%;
}

.about-buttons {
  margin-top: 2.5rem;
}

.about-buttons .btn {
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.about-buttons .btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  z-index: -1;
  transition: left 0.5s ease;
}

.about-buttons .btn:hover::before {
  left: 100%;
}

.about-intro-image {
  position: relative;
  transition: transform 0.5s ease;
}

.about-intro-image::before {
  content: '';
  position: absolute;
  top: -20px;
  left: -20px;
  width: calc(100% + 40px);
  height: calc(100% + 40px);
  background: radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.1), transparent 70%);
  z-index: -1;
  border-radius: 50%;
}

.about-intro-image:hover {
  transform: translateY(-5px);
}

/* Contact CTA section enhancement */
.contact-cta {
  position: relative;
  background: linear-gradient(to right, #111827, #1f2937);
  overflow: hidden;
}

.contact-cta::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
          radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.05) 0%, transparent 70%),
          radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.05) 0%, transparent 70%);
  z-index: 1;
}

.cta-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 4rem 1.5rem;
}

.cta-content h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  color: #f9fafb;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
}

.cta-content h2::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(to right, #6366f1, #818cf8);
  border-radius: 2px;
}

.cta-content p {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: #e5e7eb;
  margin-bottom: 2.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-content .btn {
  padding: 1rem 2.5rem;
  font-size: 1.125rem;
  box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.4);
  transition: all 0.3s ease;
}

.cta-content .btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px -5px rgba(99, 102, 241, 0.6);
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .personal-info {
    padding: 1.5rem;
  }

  .info-item {
    flex-direction: column;
    align-items: flex-start;
    border-left: 2px solid rgba(99, 102, 241, 0.2);
    padding-left: 1rem;
    margin-bottom: 1.5rem;
  }

  .info-item .label {
    margin-bottom: 0.5rem;
    min-width: auto;
  }

  .about-intro-image {
    margin-bottom: 2rem;
  }
}

/* Enhanced responsive styling for About page */
.about-intro-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
}

/* Desktop adjustments */
@media (min-width: 992px) {
  .about-intro-grid {
    grid-template-columns: 1fr 2fr;
    gap: 4rem;
    align-items: center;
  }

  .personal-info {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  /* Adjust main content width for better readability */
  .about-intro-content p {
    max-width: 90%;
  }
}

/* Large desktop adjustments */
@media (min-width: 1200px) {
  .about-intro-grid {
    padding: 3rem 2rem;
  }

  .about-intro-content {
    padding-right: 2rem;
  }

  /* Container width adjustments for larger screens */
  .container {
    max-width: 1140px;
  }
}

/* Base styles */
.about-intro-content {
  position: relative;
  z-index: 2;
}

.about-intro-content h2 {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  background: linear-gradient(90deg, #6366f1, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  position: relative;
}

.about-intro-content h3 {
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: #6366f1;
  margin-bottom: 1.5rem;
  font-weight: 600;
  position: relative;
}

.about-intro-content .lead {
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  font-weight: 500;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: #f9fafb;
  border-left: 4px solid #6366f1;
  padding-left: 1.5rem;
}

.about-intro-content p {
  font-size: clamp(1rem, 1.5vw, 1.1rem);
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: #e5e7eb;
}

.personal-info {
  background: rgba(31, 41, 55, 0.5);
  backdrop-filter: blur(8px);
  border-radius: 1rem;
  padding: 2rem;
  margin: 2rem 0;
  border: 1px solid rgba(99, 102, 241, 0.2);
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.3);
}

.info-item {
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
  position: relative;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-item::before {
  content: '';
  position: absolute;
  left: -1rem;
  width: 4px;
  height: 100%;
  background: linear-gradient(to bottom, #6366f1, transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.info-item:hover::before {
  opacity: 1;
}

.info-item .label {
  font-weight: 600;
  color: #6366f1;
  min-width: 100px;
  position: relative;
}

.info-item .value {
  color: #f9fafb;
}

.info-item .value a {
  color: #818cf8;
  text-decoration: none;
  position: relative;
  transition: all 0.3s ease;
}

.info-item .value a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #6366f1;
  transition: width 0.3s ease;
}

.info-item .value a:hover {
  color: #6366f1;
}

.info-item .value a:hover::after {
  width: 100%;
}

.about-buttons {
  margin-top: 2.5rem;
}

.about-buttons .btn {
  position: relative;
  overflow: hidden;
  z-index: 1;
}

/* Adjust the image size and position */
.about-intro-image {
  position: relative;
  transition: transform 0.5s ease;
  max-width: 280px;
  margin: 0 auto;
}

@media (min-width: 992px) {
  .about-intro-image {
    max-width: 300px;
  }
}

/* Contact CTA section enhancement with better responsiveness */
.contact-cta {
  position: relative;
  background: linear-gradient(to right, #111827, #1f2937);
  overflow: hidden;
  padding: 3rem 1rem;
}

@media (min-width: 768px) {
  .contact-cta {
    padding: 5rem 2rem;
  }
}

.cta-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

/* Tablet specific adjustments */
@media (min-width: 768px) and (max-width: 991px) {
  .personal-info {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .about-intro-image {
    max-width: 250px;
  }
}

/* Mobile specific adjustments */
@media (max-width: 767px) {
  .about-intro-grid {
    padding: 1rem;
  }

  .personal-info {
    padding: 1.5rem;
  }

  .info-item {
    flex-direction: column;
    align-items: flex-start;
    border-left: 2px solid rgba(99, 102, 241, 0.2);
    padding-left: 1rem;
    margin-bottom: 1.5rem;
  }

  .info-item .label {
    margin-bottom: 0.5rem;
    min-width: auto;
  }

  .about-intro-image {
    margin-bottom: 2rem;
    max-width: 200px;
  }

  .about-buttons .btn {
    display: block;
    width: 100%;
    margin-bottom: 1rem;
  }
}

/* Small mobile adjustments */
@media (max-width: 480px) {
  .about-intro-grid {
    padding: 1rem 0.5rem;
  }

  .about-intro-content h2 {
    font-size: 2rem;
  }

  .about-intro-content h3 {
    font-size: 1.25rem;
  }

  .about-intro-content .lead {
    font-size: 1rem;
    padding-left: 1rem;
  }

  .personal-info {
    padding: 1.25rem;
  }
}
```

# src\pages\HomePage.jsx

```jsx
// src/pages/HomePage.jsx
import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import PortfolioHome from '../components/sections/PortfolioHome';
import ContactHome from '../components/sections/ContactHome';
import './HomePage.css';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Essa Shomali | Professional App Developer</title>
        <meta 
          name="description" 
          content="Essa Shomali - Professional app developer helping businesses create stunning, high-performance web and mobile applications."
        />
        <meta 
          name="keywords" 
          content="app developer, web development, mobile apps, UI/UX design, react developer, full stack developer" 
        />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://eshomali.com/" />
        <meta property="og:title" content="Essa Shomali | Professional App Developer" />
        <meta 
          property="og:description" 
          content="Professional app developer helping businesses create stunning, high-performance web and mobile applications." 
        />
        <meta property="og:image" content="https://eshomali.com/images/og-image.jpg" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://eshomali.com/" />
        <meta name="twitter:title" content="Essa Shomali | Professional App Developer" />
        <meta 
          name="twitter:description" 
          content="Professional app developer helping businesses create stunning, high-performance web and mobile applications." 
        />
        <meta name="twitter:image" content="https://eshomali.com/images/og-image.jpg" />
      </Helmet>
      
      <Hero />
      
      <About />
      
      <Services />
      
      <ContactHome />
    </>
  );
};

export default HomePage;
```

# src\pages\NotFoundPage.jsx

```jsx
// src/pages/NotFoundPage.jsx
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Essa Shomali</title>
        <meta name="description" content="The page you are looking for doesn't exist." />
      </Helmet>
      
      <section className="not-found-section">
        <div className="container">
          <div className="not-found-content">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>
              The page you are looking for might have been removed, had its name changed,
              or is temporarily unavailable.
            </p>
            
            <div className="not-found-actions">
              <Button to="/" variant="primary" size="large">
                Go Home
              </Button>
              <Button to="/portfolio" variant="outline" size="large">
                View Portfolio
              </Button>
            </div>
            
            <div className="not-found-links">
              <p>Or check out these popular pages:</p>
              <ul>
                <li><Link to="/about">About Me</Link></li>
                <li><Link to="/services/web-development">Web Development Services</Link></li>
                <li><Link to="/services/mobile-apps">Mobile App Development</Link></li>
                <li><Link to="/contact">Contact Me</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="not-found-illustration">
            {/* SVG illustration for 404 page */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 500 500" 
              width="400" 
              height="400"
              aria-hidden="true"
            >
              <g>
                <path
                  d="M389.5,214.7c-30-53.3-93.3-82.2-152.8-69.6c-39.8,8.5-73.4,36.5-89.9,75s-15.3,83.6,4.6,120.9
                  c38.6,72.6,130.1,98.3,202.7,59.7C427.1,361,428.1,284.7,389.5,214.7z"
                  fill="#f2f2f2"
                />
                <circle cx="234.5" cy="273.3" r="43.4" fill="#6366f1" />
                <path
                  d="M172.2,270.3c0,0-4.9,61,48.8,72.8l-54.4,45.6L89.2,312L172.2,270.3z"
                  fill="#6366f1"
                />
                <path
                  d="M123.3,239.7c0,0-60.5,8.9-65.4,65.4l-48.8-50.6l88.6-81.4L123.3,239.7z"
                  fill="#2f2e41"
                />
                <path
                  d="M316.8,352.2c0,0,18.3,24.4,12.2,44l1.2,29.3c0,0-3.7,15.9-1.8,18.9c1.8,3,2.4,19.5,2.4,19.5h9.8l2.4-20.1
                  l3-32.3c0,0,4.9-30.5,0-42.1s-8.6-21-8.6-21l-20.7,3.6V352.2z"
                  fill="#2f2e41"
                />
                <path
                  d="M173.4,370.5c0,0-13.4,27.4-3.7,44.6l3,29.3c0,0,6.1,15.2,4.9,18.3c-1.2,3.1-0.6,19.5-0.6,19.5h-9.8l-4.3-19.5
                  l-8-30.5c0,0-9.8-29.3-7.3-41.6s4.3-22.6,4.3-22.6l21.3,0.6L173.4,370.5z"
                  fill="#2f2e41"
                />
                <circle cx="175.2" cy="179.9" r="24.4" fill="#a0616a" />
                <path
                  d="M145.9,177.9c0,0,3.7,29.9,1.8,33c-1.8,3-24.4,4.9-24.4,4.9v-31.7L145.9,177.9z"
                  fill="#a0616a"
                />
                <path
                  d="M196.5,355.2L158,361.4c0,0-8.6,24.4-7.9,42.7s2.4,26.8,2.4,26.8l-20.7-1.2c0,0-5.5-29.3-14-32.3
                  c-8.5-3-10.4-6.1-10.4-6.1s-3.7-13.4-4.9-25c-1.2-11.6,2.4-25,2.4-25L79.4,325l12.8-92.9l40.9-19.5l59.8,37.8l-12.2,25.6l15.9,78.9
                  V355.2z"
                  fill="#2f2e41"
                />
                <path
                  d="M179.4,209c0,0,6.1,19.5-6.1,22.6l-30.5,6.7c0,0-35.4,0-40.3-3c-4.9-3-15.3-7.9-15.3-7.9s3.7-22,1.2-26.2
                  c0,0,39-15.3,42.1-17.7c3-2.4,23.2-6.7,27.4-1.8C162.3,186.4,179.4,209,179.4,209z"
                  fill="#6366f1"
                />
                <path
                  d="M162.9,119.6c0,0-3.7-1.8-6.1,0c-2.4,1.8-28.7,14-32.9,12.2c-4.2-1.8-9.1-9.8-9.1-9.8s-10.4,4.9-14,1.8
                  c-3.7-3,3-15.9,6.1-18.3c3-2.4,9.8-10.4,9.8-10.4s0-7.9,3-7.9c3,0,4.3-1.2,5.5-5.5c1.2-4.3,3.1-8.9,14.6-8.9s19.5,11.6,19.5,11.6
                  c0.6,1.2,5.5,3,6.1,6.7c0.6,3.7,1.2,8.5,3,8.5s2.4,5.5,1.8,7.9c-0.6,2.4-3,5.5-3,5.5S167.8,120.2,162.9,119.6z"
                  fill="#2f2e41"
                />
                <path
                  d="M142.2,214.5c0,0-9.1,1.8-9.8,3.1c-0.6,1.2-1.2,3.6-1.2,3.6l-40.9,56.2c0,0-30.5,21.3-25.6,36.6
                  c4.9,15.3,34.1,5.5,34.1,5.5s54.9-42.1,61-49.4s9.1-13.4,9.1-13.4s8.5-32.9,3.7-32.9l-6.1-7.3C166.6,216.3,142.2,214.5,142.2,214.5z"
                  fill="#a0616a"
                />
                <path
                  d="M199.5,208.4c0,0,12.2,1.2,14,4.3c1.8,3.1,23.2,53.7,23.2,53.7l15.9,24.4c0,0,17.7,28.7,23.8,31.7
                  c6.1,3.1,18.9,9.8,11.6,17.7c-7.3,7.9-20.7,2.4-20.7,2.4s-29.3-22-44-40.9c-14.6-18.9-25-46.4-25-46.4L199.5,208.4z"
                  fill="#a0616a"
                />
                <path
                  d="M128.8,227.3c0,0-20.9-20.5-25.2-19.9c-4.3,0.6-25,8.5-29.9,11.6s-11,4.3-11,4.3l11,48.2l-11.6,20.7
                  c0,0-11,12.2-4.9,14c6.1,1.8,14-5.5,14-5.5s21.3-15.9,23.2-22.6c1.8-6.7,24.4-25,24.4-25L128.8,227.3z"
                  fill="#a0616a"
                />
                <path
                  d="M179.4,192c0,0,12.8,14.6,22,14c9.1-0.6,20.7-6.1,20.7-6.1s41.5-1.8,18.9,48.2c-22.6,50-31.1,74.4-31.1,74.4
                  L197,315.8l-9.1-50.6l-15.3-33.5L179.4,192z"
                  fill="#6366f1"
                />
              </g>
            </svg>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFoundPage;
```

# src\pages\PortfolioPage.css

```css
/* src/pages/PortfolioPage.css */

/* Portfolio page header */
.page-header {
  padding: 8rem 0 4rem;
  background-color: #1a202c;
  text-align: center;
  width: 100%;
}

.page-header h1 {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  color: #f9fafb;
  margin-bottom: 1rem;
}

.page-header p {
  color: #e5e7eb;
  font-size: clamp(1rem, 2vw, 1.25rem);
  max-width: 600px;
  margin: 0 auto;
}

/* Portfolio section */
.portfolio-section {
  padding: 5rem 0;
  background-color: #111827;
}

.portfolio-section .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Portfolio filters */
.portfolio-filters {
  margin-bottom: 3rem;
}

.portfolio-filters ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  padding: 0;
  list-style: none;
}

.portfolio-filters button {
  padding: 0.75rem 1.5rem;
  background-color: transparent;
  color: #e5e7eb;
  border-radius: 9999px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  cursor: pointer;
}

.portfolio-filters button:hover {
  color: #6366f1;
}

.portfolio-filters button.active {
  background-color: #6366f1;
  color: white;
  border-color: #6366f1;
}

/* Portfolio grid */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

/* Project cards */
.project-card {
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: #1f2937;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #374151;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.project-card-image {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.project-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .project-card-image img {
  transform: scale(1.05);
}

.project-card-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.75rem;
  background-color: #6366f1;
  color: white;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 1;
}

.project-card-category {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  color: white;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.project-card-content {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.project-card-title {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  color: #f9fafb;
}

.project-card-title a {
  color: #f9fafb;
  text-decoration: none;
  transition: color 0.3s ease;
}

.project-card-title a:hover {
  color: #6366f1;
}

.project-card-description {
  color: #e5e7eb;
  margin-bottom: 1rem;
  flex-grow: 1;
}

.project-technologies {
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.technology-tag {
  padding: 0.25rem 0.75rem;
  background-color: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

/* View Details button */
.view-details-btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #6366f1;
  color: white;
  border-radius: 0.375rem;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s ease;
  margin-top: 1rem;
  text-decoration: none;
  border: none;
  cursor: pointer;
}

.view-details-btn:hover {
  background-color: #4f46e5;
  transform: translateY(-2px);
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .portfolio-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

@media (max-width: 768px) {
  .portfolio-grid {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
  
  .project-card-image {
    height: 200px;
  }
}

@media (max-width: 576px) {
  .portfolio-grid {
    grid-template-columns: 1fr;
  }
  
  .portfolio-filters button {
    padding: 0.5rem 1rem;
  }
}


```

# src\pages\PortfolioPage.jsx

```jsx
// src/pages/PortfolioPage.jsx
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '../components/common/Button';
import { fetchProjects, fetchCategories } from '../utils/api.jsx';
import './PortfolioPage.css';

const PortfolioPage = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const getProjectsData = async () => {
      try {
        setLoading(true);
        
        // Fetch projects and categories
        const projectsData = await fetchProjects();
        const categoriesData = await fetchCategories();
        
        setProjects(projectsData);
        setFilteredProjects(projectsData);
        setCategories(categoriesData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching portfolio data:', err);
        setError('Failed to load projects. Please try again later.');
        setLoading(false);
      }
    };
    
    getProjectsData();
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  const handleFilterChange = (category) => {
    setActiveFilter(category);
    
    if (category === 'all') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => project.category_slug === category);
      setFilteredProjects(filtered);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" aria-label="Loading projects">
          <div className="spinner"></div>
          <p>Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Portfolio | Essa Shomali - App Developer</title>
        <meta 
          name="description" 
          content="Explore Essa Shomali's portfolio of web and mobile app development projects. React, Node.js, UI/UX design, and more."
        />
      </Helmet>
      
      <section className="page-header">
        <div className="container">
          <h1>My Portfolio</h1>
          <p>Explore my recent projects and case studies</p>
        </div>
      </section>
      
      <section className="portfolio-section">
        <div className="container">
          <div className="portfolio-filters">
            <ul>
              <li>
                <button
                  className={activeFilter === 'all' ? 'active' : ''}
                  onClick={() => handleFilterChange('all')}
                  aria-pressed={activeFilter === 'all'}
                >
                  All
                </button>
              </li>
              {categories.map((category, index) => (
                <li key={index}>
                  <button
                    className={activeFilter === category.slug ? 'active' : ''}
                    onClick={() => handleFilterChange(category.slug)}
                    aria-pressed={activeFilter === category.slug}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="portfolio-grid">
            {filteredProjects.length > 0 ? (
              filteredProjects.map(project => (
                <div className="project-card" key={project.id}>
                  <div className="project-card-image">
                    <img 
                      src={project.image || "https://via.placeholder.com/600x400?text=Project+Image"} 
                      alt={`${project.title} - Project Screenshot`}
                      loading="lazy"
                    />
                    {project.featured && (
                      <div className="project-card-badge">Featured</div>
                    )}
                  </div>
                  
                  <div className="project-card-content">
                    <h3 className="project-card-title">
                      {project.title}
                    </h3>
                    
                    <p className="project-card-description">
                      {project.description}
                    </p>
                    
                    <div className="project-technologies">
                      {project.technologies && project.technologies.map((tech, index) => (
                        <span key={index} className="technology-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <Button 
                      to={`/portfolio/${project.slug}`}
                      variant="primary"
                      size="medium"
                      className="view-details-btn"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-projects-message">
                <p>No projects found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default PortfolioPage;
```

# src\pages\ProjectPage.css

```css
/* src/pages/ProjectPage.css */

/* Project page header */
.project-page-header {
  padding: 8rem 0 4rem;
  background-color: #1a202c;
  text-align: center;
  width: 100%;
}

.project-breadcrumb {
  margin-bottom: 1.5rem;
  color: #e5e7eb;
  font-size: 0.875rem;
}

.project-breadcrumb a {
  color: #e5e7eb;
  text-decoration: none;
  transition: color 0.3s ease;
}

.project-breadcrumb a:hover {
  color: #6366f1;
}

.project-breadcrumb span {
  color: #6366f1;
}

.project-category {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-top: 0.5rem;
}

/* Project details section */
.project-details {
  padding: 5rem 0;
  background-color: #111827;
}

.project-details-grid {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 3rem;
  align-items: start;
}

/* Project image */
.project-details-image {
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.project-details-image img {
  width: 100%;
  height: auto;
  display: block;
}

/* Project content */
.project-details-content {
  color: #e5e7eb;
}

.project-meta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #374151;
}

.meta-item h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #9ca3af;
}

.meta-item p {
  font-size: 1.125rem;
  color: #f9fafb;
  margin: 0;
}

.project-description h2 {
  font-size: 1.875rem;
  margin-bottom: 1.5rem;
  color: #f9fafb;
}

.project-description p {
  margin-bottom: 1.5rem;
  line-height: 1.7;
}

.technology-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.technology-tag {
  padding: 0.25rem 0.75rem;
  background-color: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
}

.project-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

/* Related projects section */
.related-projects {
  padding: 5rem 0;
  background-color: #1f2937;
}

.related-projects h2 {
  text-align: center;
  font-size: 2.25rem;
  margin-bottom: 3rem;
  color: #f9fafb;
}

.related-projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.related-project {
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: #111827;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid #374151;
}

.related-project:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.related-project-image {
  height: 200px;
  overflow: hidden;
}

.related-project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.related-project:hover .related-project-image img {
  transform: scale(1.05);
}

.related-project h3 {
  padding: 1.5rem;
  margin: 0;
  font-size: 1.25rem;
  color: #f9fafb;
  text-align: center;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .project-details-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .project-details-image {
    margin-bottom: 1rem;
  }
}

@media (max-width: 768px) {
  .related-projects-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .project-meta {
    grid-template-columns: 1fr 1fr;
  }
  
  .project-actions {
    flex-direction: column;
  }
  
  .project-actions .btn {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .related-projects-grid {
    grid-template-columns: 1fr;
  }
  
  .project-meta {
    grid-template-columns: 1fr;
  }
  
  .meta-item {
    padding-bottom: 1rem;
  }
}
```

# src\pages\ProjectPage.jsx

```jsx
// src/pages/ProjectPage.jsx
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Button from '../components/common/Button';
import { fetchProjectBySlug } from '../utils/api.jsx';
import './ProjectPage.css';

const ProjectPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProjectData = async () => {
      try {
        setLoading(true);
        const projectData = await fetchProjectBySlug(slug);
        setProject(projectData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Failed to load project details. Please try again later.');
        setLoading(false);
      }
    };
    
    getProjectData();
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" aria-label="Loading project details">
          <div className="spinner"></div>
          <p>Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h2>Project Not Found</h2>
          <p>{error || "The project you're looking for doesn't exist or has been removed."}</p>
          <Button to="/portfolio" variant="primary">
            Back to Portfolio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{project.title} | Essa Shomali</title>
        <meta name="description" content={project.description} />
      </Helmet>
      
      <section className="project-page-header">
        <div className="container">
          <div className="project-breadcrumb">
            <Link to="/">Home</Link> / <Link to="/portfolio">Portfolio</Link> / <span>{project.title}</span>
          </div>
          <h1>{project.title}</h1>
          <div className="project-category">{project.category}</div>
        </div>
      </section>
      
      <section className="project-details">
        <div className="container">
          <div className="project-details-grid">
            <div className="project-details-image">
              <img 
                src={project.image || "https://via.placeholder.com/800x600?text=Project+Image"} 
                alt={`${project.title} - Project Screenshot`}
              />
            </div>
            
            <div className="project-details-content">
              <div className="project-meta">
                <div className="meta-item">
                  <h3>Client</h3>
                  <p>{project.client}</p>
                </div>
                <div className="meta-item">
                  <h3>Year</h3>
                  <p>{project.year}</p>
                </div>
                <div className="meta-item">
                  <h3>Category</h3>
                  <p>{project.category}</p>
                </div>
              </div>
              
              <div className="project-description">
                <h2>Project Overview</h2>
                <p>{project.description}</p>
                
                {project.long_description && (
                  <p>{project.long_description}</p>
                )}
                
                <h3>Technologies Used</h3>
                <div className="technology-tags">
                  {project.technologies && project.technologies.map((tech, index) => (
                    <span key={index} className="technology-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="project-actions">
                {project.demo_url && (
                  <Button 
                    href={project.demo_url} 
                    variant="primary" 
                    size="large"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-external-link-alt" aria-hidden="true"></i> View Live Demo
                  </Button>
                )}
                <Button 
                  to="/contact" 
                  variant="outline" 
                  size="large"
                >
                  <i className="fas fa-envelope" aria-hidden="true"></i> Project Inquiry
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {project.relatedProjects && project.relatedProjects.length > 0 && (
        <section className="related-projects">
          <div className="container">
            <h2>Related Projects</h2>
            <div className="related-projects-grid">
              {project.relatedProjects.map(relatedProject => (
                <div 
                  key={relatedProject.id} 
                  className="related-project"
                  onClick={() => navigate(`/portfolio/${relatedProject.slug}`)}
                >
                  <div className="related-project-image">
                    <img 
                      src={relatedProject.image || "https://via.placeholder.com/400x300?text=Related+Project"} 
                      alt={relatedProject.title} 
                      loading="lazy"
                    />
                  </div>
                  <h3>{relatedProject.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProjectPage;
```

# src\utils\api.jsx

```jsx
// src/utils/api.js

const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Custom fetch wrapper with error handling
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} Response data
 */
const fetchApi = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error: ${error.message}`);
    throw error;
  }
};

/**
 * Client-side mock data for development (until backend is ready)
 */
const mockProjects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    slug: 'e-commerce-platform',
    description: 'A full-featured e-commerce platform with real-time inventory management and payment processing.',
    image: 'https://via.placeholder.com/800x600?text=E-Commerce+Platform',
    category: 'E-commerce',
    category_slug: 'e-commerce',
    client: 'RetailGrowth Inc.',
    year: 2023,
    demo_url: 'https://retailgrowth-demo.com',
    featured: true,
    technologies: ['React', 'Node.js', 'Express', 'MySQL', 'Tailwind CSS']
  },
  {
    id: 2,
    title: 'Health Monitoring App',
    slug: 'health-monitoring-app',
    description: 'A cross-platform mobile app for health monitoring with real-time data visualization and personalized insights.',
    image: 'https://via.placeholder.com/800x600?text=Health+Monitoring+App',
    category: 'Mobile App',
    category_slug: 'mobile-app',
    client: 'HealthTech Solutions',
    year: 2022,
    demo_url: 'https://healthtech-monitor.com',
    featured: true,
    technologies: ['React Native', 'Firebase', 'MongoDB', 'Redux']
  },
  {
    id: 3,
    title: 'Financial Dashboard',
    slug: 'financial-dashboard',
    description: 'An interactive financial dashboard with real-time data visualization and predictive analytics.',
    image: 'https://via.placeholder.com/800x600?text=Financial+Dashboard',
    category: 'Web Development',
    category_slug: 'web-development',
    client: 'InvestSmart Financial',
    year: 2023,
    demo_url: 'https://investsmart-dash.com',
    featured: false,
    technologies: ['React', 'Node.js', 'GraphQL', 'TypeScript']
  },
  {
    id: 4,
    title: 'Restaurant Ordering System',
    slug: 'restaurant-ordering-system',
    description: 'A complete digital ordering system for restaurants with real-time kitchen updates and customer interface.',
    image: 'https://via.placeholder.com/800x600?text=Restaurant+Ordering+System',
    category: 'Web Development',
    category_slug: 'web-development',
    client: 'Culinary Innovations',
    year: 2022,
    demo_url: 'https://culinary-order-demo.com',
    featured: false,
    technologies: ['React', 'Node.js', 'Express', 'MySQL', 'Socket.io']
  },
  {
    id: 5,
    title: 'Travel Experience Platform',
    slug: 'travel-experience-platform',
    description: 'A modern travel platform focusing on unique experiences with immersive content and booking capabilities.',
    image: 'https://via.placeholder.com/800x600?text=Travel+Experience+Platform',
    category: 'UI/UX Design',
    category_slug: 'ui-ux-design',
    client: 'Wanderlust Travels',
    year: 2023,
    demo_url: 'https://wanderlust-experiences.com',
    featured: true,
    technologies: ['React', 'Node.js', 'MongoDB', 'Figma', 'Tailwind CSS']
  },
  {
    id: 6,
    title: 'Productivity Suite',
    slug: 'productivity-suite',
    description: 'A comprehensive productivity tool suite with task management, time tracking, and team collaboration features.',
    image: 'https://via.placeholder.com/800x600?text=Productivity+Suite',
    category: 'Web Development',
    category_slug: 'web-development',
    client: 'Efficiency Works',
    year: 2022,
    demo_url: 'https://efficiency-suite.com',
    featured: false,
    technologies: ['React', 'Node.js', 'Express', 'MySQL', 'TypeScript']
  }
];

const mockCategories = [
  { id: 1, name: 'Web Development', slug: 'web-development' },
  { id: 2, name: 'Mobile App', slug: 'mobile-app' },
  { id: 3, name: 'UI/UX Design', slug: 'ui-ux-design' },
  { id: 4, name: 'E-commerce', slug: 'e-commerce' }
];

const mockTestimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'CTO',
    company: 'TechVision',
    image: 'https://via.placeholder.com/150x150?text=SJ',
    quote: 'Working with Essa was a game-changer for our company. He delivered a complex web application that exceeded our expectations in terms of performance and user experience. His technical expertise and attention to detail are truly impressive.',
    rating: 5,
    featured: true
  },
  {
    id: 2,
    name: 'Michael Chen',
    position: 'Founder',
    company: 'StartupLaunch',
    image: 'https://via.placeholder.com/150x150?text=MC',
    quote: 'Essa helped us transform our startup idea into a polished digital product. His ability to understand our business needs and translate them into a functional application was remarkable. I highly recommend his services to any startup founder.',
    rating: 5,
    featured: true
  },
  {
    id: 3,
    name: 'Rebecca Torres',
    position: 'Marketing Director',
    company: 'GrowthBrand',
    image: 'https://via.placeholder.com/150x150?text=RT',
    quote: 'Our e-commerce platform needed a complete overhaul, and Essa delivered beyond our expectations. The new site is not only visually stunning but has significantly improved our conversion rates. His technical skills combined with business acumen make him an invaluable partner.',
    rating: 5,
    featured: false
  },
  {
    id: 4,
    name: 'David Williams',
    position: 'Product Manager',
    company: 'EnterpriseApp',
    image: 'https://via.placeholder.com/150x150?text=DW',
    quote: 'The work on our enterprise dashboard was exceptional. He created an intuitive interface that simplified complex data visualization for our users. His communication throughout the project was clear and professional, making the entire process smooth and efficient.',
    rating: 4,
    featured: false
  }
];

/**
 * Determine if we should use mock data or real API
 * This can be toggled during development
 */
// For now, always use mock data until the backend is ready
const USE_MOCK_DATA = true;

/**
 * Fetch all projects with optional category filter
 * @param {string|null} category - Category slug to filter by (optional)
 * @returns {Promise<Array>} - Array of project objects
 */
export const fetchProjects = async (category = null) => {
  if (USE_MOCK_DATA) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (category) {
      return mockProjects.filter(project => project.category_slug === category);
    }
    return mockProjects;
  }
  
  const endpoint = category 
    ? `/portfolio?category=${encodeURIComponent(category)}` 
    : '/portfolio';
  
  const response = await fetchApi(endpoint);
  return response.data;
};

/**
 * Fetch a specific project by slug
 * @param {string} slug - Project slug
 * @returns {Promise<Object|null>} - Project object or null if not found
 */
export const fetchProjectBySlug = async (slug) => {
  if (USE_MOCK_DATA) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const project = mockProjects.find(p => p.slug === slug);
    
    if (!project) {
      return null;
    }
    
    // Add related projects (for mock data)
    const sameCategory = mockProjects.filter(p => 
      p.category_slug === project.category_slug && p.id !== project.id
    );
    
    project.relatedProjects = sameCategory
      .slice(0, 3)
      .map(p => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        image: p.image
      }));
    
    return project;
  }
  
  try {
    const response = await fetchApi(`/portfolio/${slug}`);
    return response.data;
  } catch (error) {
    if (error.message.includes('404')) {
      return null;
    }
    throw error;
  }
};

/**
 * Fetch featured projects
 * @param {number} limit - Maximum number of projects to return
 * @returns {Promise<Array>} - Array of featured project objects
 */
export const fetchFeaturedProjects = async (limit = 3) => {
  if (USE_MOCK_DATA) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return mockProjects
      .filter(project => project.featured)
      .slice(0, limit);
  }
  
  const response = await fetchApi(`/portfolio/featured?limit=${limit}`);
  return response.data;
};

/**
 * Fetch all project categories
 * @returns {Promise<Array>} - Array of category objects
 */
export const fetchCategories = async () => {
  if (USE_MOCK_DATA) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return mockCategories;
  }
  
  const response = await fetchApi('/portfolio/categories');
  return response.data;
};

/**
 * Fetch testimonials
 * @param {boolean} featuredOnly - Whether to fetch only featured testimonials
 * @param {number} limit - Maximum number of testimonials to return
 * @returns {Promise<Array>} - Array of testimonial objects
 */
export const fetchTestimonials = async (featuredOnly = false, limit = 4) => {
  if (USE_MOCK_DATA) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredTestimonials = mockTestimonials;
    
    if (featuredOnly) {
      filteredTestimonials = filteredTestimonials.filter(t => t.featured);
    }
    
    return filteredTestimonials.slice(0, limit);
  }
  
  const endpoint = featuredOnly 
    ? `/testimonials/featured?limit=${limit}` 
    : `/testimonials?limit=${limit}`;
  
  const response = await fetchApi(endpoint);
  return response.data;
};

/**
 * Submit contact form
 * @param {Object} formData - Contact form data
 * @returns {Promise<Object>} - Response data
 */
export const submitContactForm = async (formData) => {
  if (USE_MOCK_DATA) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate validation
    if (!formData.name || !formData.email || !formData.message) {
      throw new Error('Please fill in all required fields');
    }
    
    // Simulate successful submission
    return {
      success: true,
      message: 'Message sent successfully',
      data: {
        id: Math.floor(Math.random() * 1000),
        createdAt: new Date().toISOString()
      }
    };
  }
  
  const response = await fetchApi('/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
  
  return response;
};

/**
 * Subscribe to newsletter
 * @param {string} email - Email address
 * @returns {Promise<Object>} - Response data
 */
export const subscribeNewsletter = async (email) => {
  if (USE_MOCK_DATA) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulate validation
    if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      throw new Error('Please provide a valid email address');
    }
    
    // Simulate successful subscription
    return {
      success: true,
      message: 'Subscribed successfully'
    };
  }
  
  const response = await fetchApi('/newsletter/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
  
  return response;
};

export default {
  fetchProjects,
  fetchProjectBySlug,
  fetchFeaturedProjects,
  fetchCategories,
  fetchTestimonials,
  submitContactForm,
  subscribeNewsletter
};
```

# vite.config.js

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/eshomali.github.io/"
})
```

