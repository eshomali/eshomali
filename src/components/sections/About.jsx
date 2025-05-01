// src/components/sections/About.jsx
import { useState } from 'react';
import Button from '../common/Button';
import aboutImage from '../../assets/images/about-large.jpg';

const About = () => {
  const [activeTab, setActiveTab] = useState('services');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const services = [
    {
      title: "Design & User Experience",
      description: "Tailored designs to match your branding, enhancing user engagement through intuitive interfaces.",
      icon: "fas fa-palette"
    },
    {
      title: "E-Commerce & Sales",
      description: "Setup and management of online stores, including payment gateways and inventory systems.",
      icon: "fas fa-shopping-cart"
    },
    {
      title: "Content Management",
      description: "Enable easy content updates with systems like SquareSpace and Shopify for seamless maintenance.",
      icon: "fas fa-file-alt"
    },
    {
      title: "Mobile & Cross-Platform",
      description: "iOS and Android apps to complement your web services for a cohesive digital presence.",
      icon: "fas fa-mobile-alt"
    },
    {
      title: "Security & Compliance",
      description: "Implement robust security systems and ensure compliance with industry regulations.",
      icon: "fas fa-shield-alt"
    },
    {
      title: "AI Integration",
      description: "Features like chatbots, location services, and real-time notifications for smart enhancements.",
      icon: "fas fa-robot"
    }
  ];

  const features = [
    {
      title: "User Accounts",
      description: "Secure authentication and personalized user experiences",
      icon: "fas fa-user-circle"
    },
    {
      title: "Online Ordering",
      description: "Streamlined purchasing process with order tracking",
      icon: "fas fa-shopping-bag"
    },
    {
      title: "Table Reservations",
      description: "Digital booking system for hospitality businesses",
      icon: "fas fa-utensils"
    },
    {
      title: "Inventory Management",
      description: "Real-time stock tracking and automated alerts",
      icon: "fas fa-boxes"
    },
    {
      title: "Marketplace Integration",
      description: "Connect with third-party platforms and vendors",
      icon: "fas fa-store"
    },
    {
      title: "Check-in / Check-out",
      description: "Simplified process for hospitality and events",
      icon: "fas fa-clipboard-check"
    },
    {
      title: "Customer Loyalty Program",
      description: "Rewards systems to encourage repeat business",
      icon: "fas fa-award"
    },
    {
      title: "Payment Processing",
      description: "Secure handling of multiple payment methods",
      icon: "fas fa-credit-card"
    },
    {
      title: "Progress Tracking",
      description: "Visualize goals and achievements with analytics",
      icon: "fas fa-chart-bar"
    },
    {
      title: "Scheduling",
      description: "Automated calendars and appointment systems",
      icon: "fas fa-calendar-alt"
    }
  ];

  return (
      <section id="about" className="about-section">
        <div className="container">
          <div className="section-title">
            <h2>About Me</h2>
          </div>

          <div className="about-container">
            <div className="about-image">
              <div className="image-wrapper">
                <img
                    src={aboutImage}
                    alt="Essa Shomali - Professional App Developer"
                    loading="lazy"
                    style={{
                      width: '280px',
                      height: '280px',
                      overflow: 'hidden',
                      borderRadius: '0%',
                      border: '2px solid #374151',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                      backgroundColor: '#111827',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: '0 auto',
                    }}
                />
                <div className="experience-badge" aria-label="8+ years of experience">
                  <span className="years">8+</span>
                  <span className="text">Years of<br />Experience</span>
                </div>
              </div>
            </div>

            <div className="about-content">
              <h3>Professional App Developer</h3>

              <p className="lead">
                With over 8 years of experience, I create exceptional digital experiences that are aligned with your business goals.
              </p>

              <div className="about-tabs">
                <div className="tabs-navigation">
                  <button
                      className={`tab-button ${activeTab === 'services' ? 'active' : ''}`}
                      onClick={() => handleTabChange('services')}
                      aria-selected={activeTab === 'services'}
                      aria-controls="services-tab"
                      id="services-tab-button"
                  >
                    Services
                  </button>
                  <button
                      className={`tab-button ${activeTab === 'features' ? 'active' : ''}`}
                      onClick={() => handleTabChange('features')}
                      aria-selected={activeTab === 'features'}
                      aria-controls="features-tab"
                      id="features-tab-button"
                  >
                    Features
                  </button>
                </div>

                <div className="tabs-content">
                  <div
                      id="services-tab"
                      className={`tab-panel ${activeTab === 'services' ? 'active' : ''}`}
                      role="tabpanel"
                      aria-labelledby="services-tab-button"
                      hidden={activeTab !== 'services'}
                  >
                    <div className="services-grid">
                      {services.map((service, index) => (
                          <div key={index} className="service-item">
                            <div className="service-icon">
                              <i className={service.icon}></i>
                            </div>
                            <div className="service-content">
                              <h4>{service.title}</h4>
                              <p>{service.description}</p>
                            </div>
                          </div>
                      ))}
                    </div>
                  </div>

                  <div
                      id="features-tab"
                      className={`tab-panel ${activeTab === 'features' ? 'active' : ''}`}
                      role="tabpanel"
                      aria-labelledby="features-tab-button"
                      hidden={activeTab !== 'features'}
                  >
                    <div className="features-grid">
                      {features.map((feature, index) => (
                          <div key={index} className="feature-item">
                            <div className="feature-icon">
                              <i className={feature.icon}></i>
                            </div>
                            <div className="feature-content">
                              <h4>{feature.title}</h4>
                              <p>{feature.description}</p>
                            </div>
                          </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="about-buttons">
                <Button
                    to="/contact"
                    variant="outline"
                    aria-label="Contact me"
                >
                  <i className="fas fa-envelope" aria-hidden="true"></i> &nbsp; Contact Me
                </Button>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
        .services-grid, .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        
        .service-item, .feature-item {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 1rem;
          padding: 1.5rem;
          border: 1px solid rgba(55, 65, 81, 0.5);
          transition: all 0.3s ease;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          height: 100%;
        }
        
        .service-item:hover, .feature-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.3);
          border-color: rgba(99, 102, 241, 0.3);
        }
        
        .service-icon, .feature-icon {
          width: 50px;
          height: 50px;
          min-width: 50px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(99, 102, 241, 0.1));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          color: #6366f1;
          transition: all 0.3s ease;
        }
        
        .service-item:hover .service-icon, .feature-item:hover .feature-icon {
          background: #6366f1;
          color: white;
          transform: rotateY(180deg);
          transition: all 0.5s ease;
        }
        
        .service-content h4, .feature-content h4 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #f9fafb;
        }
        
        .service-content p, .feature-content p {
          font-size: 0.875rem;
          color: #d1d5db;
          margin: 0;
        }
        
        @media (max-width: 768px) {
          .services-grid, .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      </section>
  );
};

export default About;