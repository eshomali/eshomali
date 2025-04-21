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