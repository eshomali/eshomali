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