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
          name: 'Pro',
          setupFee: '$599',
          features: [
            'Custom Web App',
            'Payment integration',
            'AI Integration',
            'Premium SEO & analytics',
            'Responsive Design',
            'Real-Time Data',
            'High-Performance Hosting',
            'Priority support'
          ],
          featured: true
        }
      ]
    },
    mobileApp: {
      title: 'Mobile Apps',
      monthlyFee: '$450',
      tiers: [
        {
          name: 'Pro',
          setupFee: '$1999',
          features: [
            'Apple Mobile App',
            'Android Mobile App',
            'Push Notifications',
            'Advanced AI features',
            'Social Media',
            'Enhanced Design',
            'Email Support',
            'Chat Integration',
            'Detailed analytics',
            'Priority support'
          ],
          featured: true
        }
      ]
    },
    webMobileApp: {
      title: 'Web+Mobile',
      monthlyFee: '$600',
      tiers: [
        {
          name: 'Pro',
          setupFee: '$2449',
          features: [
            'Custom Web App',
            'Apple Mobile App',
            'Android Mobile App',
            'Payment integration',
            'Responsive Design',
            'Real-Time Data',
            'High-Performance',
            'Push Notifications',
            'Advanced AI features',
            'Social Media',
            'Enhanced Design',
            'Email Support',
            'Chat Integration',
            'Premium SEO & analytics',
            'Priority support'
          ],
          featured: true
        }
      ]
    }
  };

  // Only Pro tier exists
  const tiers = ['Pro'];
  const services = [pricingData.webApp, pricingData.mobileApp, pricingData.webMobileApp];

  return (
      <>
        <Helmet>
          <title>Pricing | Essa Shomali - App Developer</title>
          <meta
              name="description"
              content="Transparent pricing for web and mobile app development services. Choose our Pro package for your business needs."
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
              <h2>Choose Your Package</h2>
              <p>Select the perfect plan for your business needs. All plans include hosting, maintenance, and regular updates.</p>
            </div>

            {/* Pro Tier */}
            <div className="pricing-tier-row">
              <div className="tier-label">
                <h4>Pro Package</h4>
              </div>
              <div className="pricing-cards-grid pricing-cards-grid-two">
                {services.map((service, serviceIndex) => {
                  const tier = service.tiers[0]; // Pro tier is at index 0
                  return (
                      <div
                          key={serviceIndex}
                          className={`pricing-card ${tier.featured ? 'featured' : ''}`}
                      >
                        <div className="service-title">
                          {service.title === 'Web+Mobile' ? 'Web+Mobile' : service.title}
                        </div>

                        {tier.featured && <div className="featured-badge">Most Popular</div>}

                        <div className="setup-fee">
                          <br/>
                          <h6 className="setup-title">{service.title}</h6>
                          <span className="amount">{tier.setupFee}</span>
                          <span className="label">Development Fee</span>
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

            {/* Monthly Fee Services Comparison */}
            <div className="pricing-notes monthly-services-comparison">
              <h3>Monthly Fee</h3>
              <div className="services-grid">
                {services.map((service, index) => (
                    <div key={index} className="service-column">
                      <h3>{service.title}</h3>
                      <div className="monthly-fee">
                        <span className="amount">{service.monthlyFee}</span>
                        <span className="period">/month</span>
                      </div>
                    </div>
                ))}
              </div>

              <h3>What's Included in Your Monthly Fee?</h3>
              <ul>
                <li><i className="fas fa-check"></i> Fully Managed Hosting & Infrastructure</li>
                <li><i className="fas fa-check"></i> Ongoing Maintenance & Security</li>
                <li><i className="fas fa-check"></i> Up to 5–7 Changes Per Month</li>
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