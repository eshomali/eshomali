// src/components/common/Footer.jsx
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-content">
            <div className="footer-info">
              <h3>Essa Shomali</h3>
              <p>
                Professional app developer helping businesses build remarkable digital experiences.
              </p>

            </div>
            
            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/portfolio">Projects</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
            
            <div className="footer-services">
              <h4>Services</h4>
              <ul>
                <li>
                  <Link to="/portfolio?category=web-development">Web Development</Link>
                </li>
                <li>
                  <Link to="/portfolio?category=mobile-app">Mobile Apps</Link>
                </li>
                <li>
                  <Link to="/portfolio?category=ui-ux-design">UI/UX Design</Link>
                </li>
                <li>
                  <Link to="/about#skills">Technical Consulting</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <div className="copyright">
            &copy; {currentYear} <strong>Essa Shomali</strong>. All Rights Reserved.
          </div>
          <div className="credits">
            <ul>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;