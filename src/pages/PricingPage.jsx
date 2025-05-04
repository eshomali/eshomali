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
          features: [
            'Full website',
            'Basic design',
            'Standard SEO',
            'Web Hosting',
            'Security',
            'Email Support',
            'Analytics',
            '3 Changes / month'
          ]
        },
        {
          name: 'Plus',
          setupFee: '$599',
          features: [
            'Custom multi-page website',
            'Payment/CRM integrations',
            'Advanced SEO & analytics',
            'Responsive design',
            'Email + AI support',
            '5 changes/month'
          ],
          featured: true
        },
        {
          name: 'Pro',
          setupFee: '$749',
          features: [
            'Complex web app',
            'Real-time data integrations',
            'Premium SEO & analytics',
            'High-performance hosting',
            '7 changes/month',
            'Priority support'
          ]
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
          features: [
            'iOS or Android',
            'Basic Interface',
            'App Hosting',
            'Security',
            'Email support',
            'Analytics',
            '3 changes/month'
          ]
        },
        {
          name: 'Plus',
          setupFee: '$1999',
          features: [
            'Custom cross-platform app',
            'iOS + Android',
            'Push notifications',
            'Social media integrations',
            'Enhanced UI/UX',
            'Email + chat support',
            'Detailed analytics',
            '5 changes/month'
          ],
          featured: true
        },
        {
          name: 'Pro',
          setupFee: '$2449',
          features: [
            'Complex cross-platform app',
            'Advanced AI features',
            'Premium UI/UX',
            'High scalability',
            'Priority support',
            'Comprehensive analytics',
            '7 changes/month'
          ]
        }
      ]
    },
    webMobileApp: {
      title: 'Web + Mobile',
      monthlyFee: '$600',
      tiers: [
        {
          name: 'Starter',
          setupFee: '$1749',
          features: [
            'Basic multi-page website',
            'Basic single-platform app',
            'iOS or Android',
            'Template design',
            'Core functionality',
            'Basic SEO',
            'Hosting',
            'Security updates',
            'Email support',
            'Analytics',
            '3 changes/month'
          ]
        },
        {
          name: 'Plus',
          setupFee: '$2199',
          features: [
            'Custom multi-page website',
            'Custom cross-platform app',
            'iOS + Android',
            'Payment/CRM integrations',
            'Push notifications',
            'Advanced SEO & analytics',
            'Enhanced UI/UX',
            'Email + AI support',
            'Detailed analytics',
            '5 changes/month'
          ],
          featured: true
        },
        {
          name: 'Pro',
          setupFee: '$2649',
          features: [
            'Complex web app',
            'Complex cross-platform app',
            'AI integrations',
            'Premium SEO',
            'High-performance hosting',
            'Premium UI/UX',
            'Priority support',
            'Comprehensive analytics',
            '7 changes/month'
          ]
        }
      ]
    }
  };

  // Create arrays for each tier level
  const tiers = ['Starter', 'Plus', 'Pro'];
  const services = [pricingData.webApp, pricingData.mobileApp, pricingData.webMobileApp];

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

            {/* Service Type Headers */}
            <div className="pricing-headers">
              <div className="pricing-header-spacer"></div>
              {services.map((service, index) => (
                  <div key={index} className="pricing-service-header">
                    <h3>{service.title}</h3>
                    <div className="monthly-fee">
                      <span className="amount">{service.monthlyFee}</span>
                      <span className="period">/month</span>
                    </div>
                  </div>
              ))}
            </div>

            {/* Pricing Tiers */}
            {tiers.map((tierName, tierIndex) => (
                <div key={tierName} className="pricing-tier-row">
                  <div className="tier-label">
                    <h4>{tierName}</h4>
                  </div>
                  <div className="pricing-cards-grid">
                    {services.map((service, serviceIndex) => {
                      const tier = service.tiers[tierIndex];
                      return (
                          <div
                              key={serviceIndex}
                              className={`pricing-card ${tier.featured ? 'featured' : ''}`}
                          >
                            {/* Add service title for mobile */}
                            <div className="service-title">
                              {service.title === 'Web + Mobile App' ? 'Web + Mobile' : service.title}
                            </div>

                            {tier.featured && <div className="featured-badge">Most Popular</div>}

                            <div className="setup-fee">
                              <br/>
                              <h6 className="setup-title">{service.title}</h6>
                              <span className="amount">{tier.setupFee}</span>
                              <span className="label">Initial Setup Fee</span>
                            </div>

                            <div className="tier-features">
                              {tier.features.map((feature, featureIndex) => (
                                  <span key={featureIndex} className="feature-tag">
                            {feature}
                          </span>
                              ))}
                            </div>
                          </div>
                      );
                    })}
                  </div>
                </div>
            ))}

            <div className="pricing-notes">
              <h3>What’s Included in Your Monthly Fee?</h3>
              <ul>
                <li><i className="fas fa-check"></i> Fully Managed Hosting & Infrastructure</li>
                <li><i className="fas fa-check"></i> Ongoing Maintenance & Security</li>
                <li><i className="fas fa-check"></i> Up to 3–7 Changes Per Month</li>
                <li><i className="fas fa-check"></i> Email & Transactional Systems</li>
                <li><i className="fas fa-check"></i> Robust Search Engine Optimization</li>
                <li><i className="fas fa-check"></i> Slick Marketing Tools</li>
                <li><i className="fas fa-check"></i> Comprehensive Support</li>
                <li><i className="fas fa-check"></i> Flat, Predictable Pricing</li>
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