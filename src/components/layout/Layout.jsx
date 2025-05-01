// src/components/layout/Layout.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
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