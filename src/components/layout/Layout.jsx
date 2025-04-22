// src/components/layout/Layout.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    // More aggressive scroll reset
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Use 'instant' instead of smooth for more reliable behavior
    });

    // Sometimes the initial scroll doesn't work, so let's add a small delay as well
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]);
  
  // Add or remove scroll classes for page animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollElements = document.querySelectorAll('.scroll-animation');
      
      scrollElements.forEach(el => {
        const elementPosition = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
          el.classList.add('scrolled');
        }
      });
    };
    
    // Initial check for elements in view
    setTimeout(handleScroll, 300);
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div className="site-wrapper">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;