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