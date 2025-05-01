// src/pages/AboutPage.jsx

import { Helmet } from 'react-helmet-async';
import Button from '../components/common/Button';
import aboutImage from '../assets/images/about-large.jpg';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Me | Essa Shomali - App Developer</title>
        <meta 
          name="description" 
          content="Learn more about Essa Shomali, a professional app developer with expertise in React, Node.js, and UI/UX design. Discover my skills, experience, and education."
        />
      </Helmet>
      
      <section className="page-header">
        <div className="container">
          <h1>About Me</h1>
        </div>
      </section>
      
      <section className="about-intro section">
        <div className="container">
          <div className="about-intro-grid">
            <div
                className="about-intro-image"
                style={{
                  width: '150px',
                  height: '150px',
                  overflow: 'hidden',
                  borderRadius: '50%',
                  border: '2px solid #374151',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                  backgroundColor: '#111827',
                  display: 'flex', // Add flexbox for centering
                  justifyContent: 'center', // Center horizontally
                  alignItems: 'center', // Center vertically
                  margin: '0 auto', // Center the entire div in its container
                }}
            >
              <img
                  src={aboutImage}
                  alt="Essa Shomali - Professional App Developer"
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
              />
            </div>

            
            <div className="about-intro-content">
              <h2>Essa Shomali</h2>
              <h3>Professional App Developer</h3>
              
              <p className="lead">
                  With over 8 years of experience, I create exceptional digital experiences that are aligned with your business goals.
              </p>

              <div className="personal-info">
                <div className="info-item">
                  <span className="label">Name: </span>
                  <span className="value">Essa Shomali</span>
                </div>
                <div className="info-item">
                  <span className="label">Email: </span>
                  <span className="value">
                    <a href="mailto:eshomali@gmail.com">eshomali@gmail.com</a>
                  </span>
                </div>
                <div className="info-item">
                  <span className="label">Phone: </span>
                  <span className="value">
                    <a href="tel:+17348823914">+1 (734) 882-3914</a>
                  </span>
                </div>
                <div className="info-item">
                  <span className="label">Location: </span>
                  <span className="value">Detroit, MI</span>
                </div>
                <div className="info-item">
                  <span className="label">Languages: </span>
                  <span className="value">English, Arabic</span>
                </div>
              </div>
              
              <div className="about-buttons">
                <Button 
                  to="/contact" 
                  variant="outline" 
                  size="medium"
                  aria-label="Contact me"
                >
                  <i className="fas fa-envelope" aria-hidden="true"></i> &nbsp; Contact Me
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-cta section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to work together?</h2>
            <p>
              Let's discuss how I can help bring your project to life. 
              Whether you need a new website, mobile app, or digital strategy, 
              I'm here to help you achieve your goals.
            </p>
            <Button to="/contact" variant="primary" size="large">
              Get In Touch
            </Button>
          </div>
        </div>
      </section>

    </>
  );
};

export default AboutPage;