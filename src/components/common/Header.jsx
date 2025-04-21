// src/components/common/Header.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuOpen && 
        !event.target.closest('.mobile-nav') && 
        !event.target.closest('.mobile-nav-toggle')
      ) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      // Prevent scrolling when mobile menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <Link to="/" aria-label="Go to homepage">
            <h1>ES<span>homali</span></h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="desktop-nav">
          <Navbar />
        </div>

        {/* Mobile Navigation Toggle */}
        <button 
          className="mobile-nav-toggle" 
          aria-controls="mobile-menu" 
          aria-expanded={mobileMenuOpen}
          onClick={toggleMobileMenu}
        >
          <span className="sr-only">Menu</span>
          <div className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${mobileMenuOpen ? 'mobile-nav-active' : ''}`} id="mobile-menu">
          <Navbar isMobile={true} closeMobileMenu={() => setMobileMenuOpen(false)} />
        </div>
      </div>
    </header>
  );
};

export default Header;