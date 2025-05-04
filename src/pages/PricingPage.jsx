// src/pages/PricingPage.jsx
import { Helmet } from 'react-helmet-async';
import Button from '../components/common/Button';
import './PricingPage.css';

const PricingPage = () => {
  const pricingData = {
    webApp: {
      title: 'Web App',
      monthlyFee: '$350',
      tiers: [
        {
          name: 'Starter',
          setupFee: '$449',
          description: 'Basic single-page or multi-page website, template design, basic SEO, hosting, security updates, up to 3 changes/month, email support'
        },
        {
          name: 'Plus',
          setupFee: '$599',
          description: 'Custom multi-page website, payment/CRM integrations, advanced SEO, responsive design, up to 5 changes/month, email + chat support',
          featured: true
        },
        {
          name: 'Pro',
          setupFee: '$749',
          description: 'Complex web app (e.g., e-commerce), API/real-time data integrations, premium SEO, high-performance hosting, up to 7 changes/month, priority support'
        }
      ]
    },
    mobileApp: {
      title: 'Mobile App',
      monthlyFee: '$450',
      tiers: [
        {
          name: 'Starter',
          setupFee: '$1449',
          description: 'Basic single-platform app (iOS or Android), core functionality (e.g., user profiles), basic UI, hosting, security updates, up to 3 changes/month, email support, basic analytics'
        },
        {
          name: 'Plus',
          setupFee: '$1999',
          description: 'Custom cross-platform app (iOS + Android), push notifications/social media integrations, enhanced UI/UX, up to 5 changes/month, email + chat support, detailed analytics',
          featured: true
        },
        {
          name: 'Pro',
          setupFee: '$2449',
          description: 'Complex cross-platform app (e.g., e-commerce, AI), advanced features, premium UI/UX, high scalability, up to 7 changes/month, priority support, comprehensive analytics'
        }
      ]
    },
    webMobileApp: {
      title: 'Web + Mobile App',
      monthlyFee: '$600',
      tiers: [
        {
          name: 'Starter',
          setupFee: '$1749',
          description: 'Basic single-page website + basic single-platform mobile app (iOS or Android), template design, core functionality (e.g., user profiles), basic SEO, hosting, security updates, up to 3 changes/month, email support, basic analytics'
        },
        {
          name: 'Plus',
          setupFee: '$2199',
          description: 'Custom multi-page website + custom cross-platform mobile app (iOS + Android), payment/CRM integrations, push notifications, advanced SEO, enhanced UI/UX, up to 5 changes/month, email + chat support, detailed analytics',
          featured: true
        },
        {
          name: 'Pro',
          setupFee: '$2649',
          description: 'Complex web app (e.g., e-commerce) + complex cross-platform mobile app (e.g., AI, real-time features), API integrations, premium SEO, high-performance hosting, premium UI/UX, up to 7 changes/month, priority support, comprehensive analytics'
        }
      ]
    }
  };

  const PricingColumn = ({ data, category }) => (
    <div className="pricing-column">
      <div className="pricing-header">
        <h3>{data.title}</h3>
        <div className="monthly-fee">
          <span className="amount">{data.monthlyFee}</span>
          <span className="period">/month</span>
        </div>
      </div>
      
      {data.tiers.map((tier, index) => (
        <div 
          key={index} 
          className={`pricing-tier ${tier.featured ? 'featured' : ''}`}
        >
          {tier.featured && <div className="featured-badge">Most Popular</div>}
          <div className="tier-name">{tier.name}</div>
          <div className="setup-fee">
            <span className="amount">{tier.setupFee}</span>
            <span className="label">Setup Fee</span>
          </div>
          <p className="tier-description">{tier.description}</p>
          <Button 
            to="/contact" 
            variant={tier.featured ? 'primary' : 'outline'}
            size="medium"
            className="tier-button"
          >
            Get Started
          </Button>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Pricing | Essa Shomali - App Developer</title>
        <meta 
          name="description" 
          content="Transparent pricing for web and mobile app development services. Choose from Starter, Plus, or Pro packages for your business needs."
        />
      </Helmet>
      
      <section className="page-header">
        <div className="container">
          <h1>Pricing Plans</h1>
          <p>Transparent pricing for quality development services</p>
        </div>
      </section>
      
      <section className="pricing-section">
        <div className="container">
          <div className="pricing-intro">
            <h2>Choose Your Development Package</h2>
            <p>Select the perfect plan for your business needs. All plans include hosting, maintenance, and regular updates.</p>
          </div>
          
          <div className="pricing-grid">
            <PricingColumn data={pricingData.webApp} category="web" />
            <PricingColumn data={pricingData.mobileApp} category="mobile" />
            <PricingColumn data={pricingData.webMobileApp} category="web-mobile" />
          </div>
          
          <div className="pricing-notes">
            <h3>All Plans Include:</h3>
            <ul>
              <li><i className="fas fa-check"></i> Free initial consultation</li>
              <li><i className="fas fa-check"></i> Hosting and security updates</li>
              <li><i className="fas fa-check"></i> Regular maintenance</li>
              <li><i className="fas fa-check"></i> Dedicated support</li>
              <li><i className="fas fa-check"></i> Analytics reporting</li>
              <li><i className="fas fa-check"></i> SSL certificate</li>
            </ul>
          </div>
          
          <div className="pricing-cta">
            <h3>Need a Custom Solution?</h3>
            <p>Contact us for enterprise pricing and custom development packages tailored to your specific requirements.</p>
            <Button to="/contact" variant="primary" size="large">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default PricingPage;