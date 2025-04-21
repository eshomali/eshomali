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