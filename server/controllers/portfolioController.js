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