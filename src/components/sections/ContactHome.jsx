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