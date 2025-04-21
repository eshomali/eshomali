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