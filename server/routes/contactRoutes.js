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