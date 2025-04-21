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