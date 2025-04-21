// src/components/sections/Hero.jsx
import { useState, useEffect } from 'react';
import Button from '../common/Button';
// Import your SVG logo directly as a standard import
import logoSvg from '../../assets/images/logo.svg'; // Update with your actual SVG logo path

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const roles = ['Mobile App Developer', 'UI/UX Designer', 'API Expert', 'Full Stack Developer'];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const typeWriter = () => {
      const currentRole = roles[currentRoleIndex];

      if (!isDeleting) {
        setTypedText(currentRole.substring(0, typedText.length + 1));

        if (typedText === currentRole) {
          // Pause at end of typing
          setTypingSpeed(2000);
          setIsDeleting(true);
        } else {
          setTypingSpeed(100);
        }
      } else {
        setTypedText(currentRole.substring(0, typedText.length - 1));

        if (typedText === '') {
          setIsDeleting(false);
          setCurrentRoleIndex((currentRoleIndex + 1) % roles.length);
          setTypingSpeed(300);
        } else {
          setTypingSpeed(50);
        }
      }
    };

    const timer = setTimeout(typeWriter, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, currentRoleIndex, isDeleting, typingSpeed, roles]);

  return (
      <section id="hero" className="hero-section">
        <div className="hero-container">
          {/* SVG Logo */}
          <div className="hero-logo" style={{ marginBottom: '2rem' }}>
            <div style={{
              width: '280px',
              height: '280px',
              border: '2px solid #374151',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              backgroundColor: '#111827',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0 auto'
            }}>
              <img
                  src={logoSvg}
                  alt="Essa Shomali Logo"
                  width="200"
                  height="200"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            </div>
          </div>

          <div className="hero-content">
            <h1 className="hero-title">
              <span className="name">Essa Shomali</span>
              <span className="role">
              <span className="typed-role" aria-live="polite">{typedText}</span>
              <span className="cursor"></span>
            </span>
            </h1>

            <p className="hero-description">
              Helping businesses transform their digital presence with modern, accessible,
              and high-performance applications.
            </p>

            <div className="hero-buttons">
              <Button
                  to="/portfolio"
                  variant="primary"
                  size="large"
                  aria-label="View my portfolio"
              >
                <i className="fas fa-eye" aria-hidden="true"></i> &nbsp; View My Work
              </Button>
              <Button
                  to="/contact"
                  variant="outline"
                  size="large"
                  aria-label="Contact me"
              >
                <i className="fas fa-envelope" aria-hidden="true"></i> &nbsp; Get In Touch
              </Button>
            </div>
          </div>
        </div>

        <div className="hero-shape-divider">
          <br/>
        </div>

      </section>
  );
};

export default Hero;