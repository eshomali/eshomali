// src/components/common/Navbar.jsx
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ isMobile = false, closeMobileMenu = () => {} }) => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Handle section highlighting on scroll
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };
    
    // Only add scroll event on homepage
    if (window.location.pathname === '/') {
      window.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    if (isMobile) {
      closeMobileMenu();
    }
  };

  return (
    <nav className={`main-nav ${isMobile ? 'mobile' : 'desktop'}`}>
      <ul>
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive && !isMobile ? 'active' : ''}
            onClick={handleClick}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/about" 
            className={({ isActive }) => isActive ? 'active' : ''}
            onClick={handleClick}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/portfolio" 
            className={({ isActive }) => isActive ? 'active' : ''}
            onClick={handleClick}
          >
            Applications
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => isActive ? 'active' : ''}
            onClick={handleClick}
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;