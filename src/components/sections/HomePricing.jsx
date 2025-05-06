// Create a new component: src/components/sections/HomePricing.jsx
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const HomePricing = () => {
  return (
    <section id="home-pricing" className="home-pricing-section">
      <div className="container">
        <div className="section-title">
          <h2>Pricing</h2>
          <br/>
        </div>
        
        <div className="home-pricing-content">
          <div className="pricing-overview">
            <h3>Simple, Transparent Pricing</h3>
            <p>
              Choose your package.
              All plans include professional development, hosting, maintenance, 
              and regular updates.
            </p>
            
            <div className="pricing-highlights">
              <div className="pricing-highlight-item">
                <div className="highlight-icon">
                  <i className="fas fa-code"></i>
                </div>
                <div className="highlight-content">
                  <h4>Web App</h4>
                  <p>
                    <span>$599 Development Fee</span><br/>
                    <span>+</span><br/>
                    <span>$350/month</span>
                  </p>
                </div>
              </div>
              
              <div className="pricing-highlight-item">
                <div className="highlight-icon">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <div className="highlight-content">
                  <h4>Mobile Apps</h4>
                  <p>
                    <span>$1,999 Development Fee</span><br/>
                    <span>+</span><br/>
                    <span>$450/month</span>
                  </p>
                </div>
              </div>
              
              <div className="pricing-highlight-item">
                <div className="highlight-icon">
                  <i className="fas fa-laptop-code"></i>
                </div>
                <div className="highlight-content">
                  <h4>Web + Mobile</h4>
                  <p>
                    <span>$2,449 Development Fee</span><br/>
                    <span>+</span><br/>
                    <span>$600/month</span>
                  </p>
                </div>
              </div>
            </div>
            
            <p className="pricing-note">
              Monthly fee includes hosting, maintenance, support, and regular updates.
            </p>
            
            <div className="pricing-cta">
              <Button
                to="/pricing"
                variant="primary"
                size="large"
                aria-label="View pricing details"
              >
                View Pricing Details
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .home-pricing-section {
          padding: 6rem 0;
          background-color: #1f2937;
          position: relative;
        }
        
        .home-pricing-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.03) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.03) 0%, transparent 40%);
          z-index: 0;
        }
        
        .home-pricing-content {
          position: relative;
          z-index: 1;
          max-width: 1000px;
          margin: 0 auto;
        }
        
        .pricing-overview {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .pricing-overview h3 {
          font-size: clamp(1.75rem, 3vw, 2.25rem);
          color: #f9fafb;
          margin-bottom: 1rem;
        }
        
        .pricing-overview p {
          color: #e5e7eb;
          font-size: clamp(1rem, 2vw, 1.125rem);
          max-width: 700px;
          margin: 0 auto 2rem;
        }
        
        .pricing-highlights {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
          margin: 3rem 0;
        }
        
        .pricing-highlight-item {
          background-color: rgba(31, 41, 55, 0.6);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 1rem;
          padding: 2rem;
          width: 100%;
          max-width: 300px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        
        .pricing-highlight-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.3);
          border-color: rgba(99, 102, 241, 0.4);
        }
        
        .highlight-icon {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(99, 102, 241, 0.1));
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        
        .highlight-icon i {
          font-size: 2rem;
          color: #6366f1;
        }
        
        .highlight-content h4 {
          font-size: 1.25rem;
          color: #f9fafb;
          margin-bottom: 0.5rem;
        }
        
        .highlight-content p {
          color: #6366f1;
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0;
        }
        
        .pricing-note {
          color: #9ca3af;
          font-size: 0.875rem;
          margin-bottom: 2rem;
          font-style: italic;
        }
        
        .pricing-cta {
          margin-top: 2rem;
        }
        
        /* Responsive adjustments */
        @media (max-width: 992px) {
          .pricing-highlights {
            gap: 1.5rem;
          }
          
          .pricing-highlight-item {
            padding: 1.5rem;
          }
        }
        
        @media (max-width: 768px) {
          .pricing-highlights {
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
          }
          
          .pricing-highlight-item {
            max-width: 100%;
            width: 100%;
            padding: 1.5rem;
          }
        }
        
        @media (max-width: 480px) {
          .home-pricing-section {
            padding: 4rem 0;
          }
          
          .highlight-icon {
            width: 60px;
            height: 60px;
          }
          
          .highlight-icon i {
            font-size: 1.5rem;
          }
          
          .highlight-content h4 {
            font-size: 1.125rem;
          }
          
          .highlight-content p {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default HomePricing;