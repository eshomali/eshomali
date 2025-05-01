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
          </div>
        </section>

        <section className="contact-page-section section">
          <div className="container">
            <div className="contact-page-container">
              <div className="contact-info">
                <h2>Let's Get In Touch</h2>
                <p className="contact-intro">
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1511826.1404648044!2d-83.28795935000001!3d42.3527111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824ca0110cb1d75%3A0x5776864e35b9c4d2!2sDetroit%2C%20MI!5e0!3m2!1sen!2sus!4v1677654321!5m2!1sen!2sus"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
            ></iframe>
          </div>
        </section>
      </>
  );
};

export default ContactPage;