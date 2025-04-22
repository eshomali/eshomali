// src/components/sections/Services.jsx
import { useState } from 'react';
import Button from '../common/Button';

const Services = () => {
  // Service modal state
  const [activeService, setActiveService] = useState(null);
  
  const services = [
    {
      id: 'web-development',
      title: 'Website Development',
      icon: 'fas fa-code',
      shortDescription: 'Custom, responsive, and high-performance web applications built with modern technologies.',
      longDescription: 'I create custom web applications that are tailored to your specific business needs. Using React, Node.js, and other cutting-edge technologies, I build solutions that are fast, responsive, and scalable. My development process includes thorough testing and optimization to ensure your application performs well across all devices and browsers.',
      features: [
        'Custom frontend and backend development',
        'Responsive design for all devices',
        'Performance optimization',
        'API integration and development',
        'Content management systems',
        'E-commerce solutions'
      ],
      technologies: ['React', 'Node.js', 'Express', 'MySQL', 'MongoDB', 'GraphQL', 'REST API']
    },
    {
      id: 'mobile-apps',
      title: 'Mobile Apps',
      icon: 'fas fa-mobile-alt',
      shortDescription: 'Native and cross-platform mobile applications for iOS and Android with seamless user experiences.',
      longDescription: 'I develop mobile applications that provide seamless experiences across iOS and Android platforms. Using React Native and other cross-platform technologies, I create apps that feel native while maintaining a single codebase. My focus is on creating intuitive interfaces, smooth animations, and optimal performance to ensure your app stands out in the marketplace.',
      features: [
        'Cross-platform development (iOS & Android)',
        'Native application development',
        'Intuitive user interfaces',
        'Offline functionality',
        'Push notifications',
        'App store optimization'
      ],
      technologies: ['React Native', 'Swift', 'Kotlin', 'Firebase', 'Redux', 'Native Modules']
    },
    {
      id: 'consulting',
      title: 'Technical Consulting',
      icon: 'fas fa-lightbulb',
      shortDescription: 'Expert guidance on technology solutions, architecture, and digital transformation strategies.',
      longDescription: 'I provide technical consulting services to help businesses make informed decisions about their digital strategies. Whether you need guidance on technology selection, architecture design, or performance optimization, I offer expert advice based on years of industry experience. My goal is to help you leverage technology effectively to meet your business objectives.',
      features: [
        'Technology stack evaluation',
        'Architecture planning',
        'Performance audit and optimization',
        'Code review and refactoring',
        'Digital transformation strategy',
        'Team training and mentoring'
      ],
      technologies: ['System Architecture', 'DevOps', 'CI/CD', 'Cloud Solutions', 'Security Best Practices', 'Scalability']
    }
  ];
  
  const openServiceModal = (serviceId) => {
    setActiveService(serviceId);
    // Add body class to prevent scrolling
    document.body.classList.add('modal-open');
  };
  
  const closeServiceModal = () => {
    setActiveService(null);
    // Remove body class to allow scrolling
    document.body.classList.remove('modal-open');
  };
  
  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-title">
          <h2>Services</h2>
        </div>
        
        <div className="services-container">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">
                <i className={service.icon} aria-hidden="true"></i>
              </div>
              
              <h3 className="service-title">{service.title}</h3>
              
              <p className="service-description">
                {service.shortDescription}
              </p>
              
              <button 
                className="service-link"
                onClick={() => openServiceModal(service.id)}
                aria-label={`Learn more about ${service.title}`}
              >
                Learn More <i className="fas fa-arrow-right" aria-hidden="true"></i>
              </button>
            </div>
          ))}
          <div className="portfolio-home-btn">
            <Button
                to="/portfolio"
                variant="outline"
                size="large"
            >
              View All Projects
            </Button>
          </div>
        </div>
        
        {/* Service Modals */}
        {services.map((service) => (
          <div 
            key={`modal-${service.id}`}
            className={`service-modal ${activeService === service.id ? 'active' : ''}`}
            id={`service-modal-${service.id}`}
            {...(activeService !== service.id ? { inert: '' } : {})}
            role="dialog"
            aria-labelledby={`service-modal-title-${service.id}`}
            aria-describedby={`service-modal-description-${service.id}`}
          >
            <div className="service-modal-content">
              <button 
                className="modal-close" 
                onClick={closeServiceModal}
                aria-label="Close modal"
              >
                <i className="fas fa-times" aria-hidden="true"></i>
              </button>
              
              <div className="service-modal-header">
                <div className="service-modal-icon">
                  <i className={service.icon} aria-hidden="true"></i>
                </div>
                <h3 id={`service-modal-title-${service.id}`}>{service.title}</h3>
              </div>
              
              <div className="service-modal-body">
                <p id={`service-modal-description-${service.id}`} className="service-modal-description">
                  {service.longDescription}
                </p>
                
                <div className="service-features">
                  <h4>Services Include:</h4>
                  <ul>
                    {service.features.map((feature, index) => (
                      <li key={index}>
                        <i className="fas fa-check" aria-hidden="true"></i> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="service-technologies">
                  <h4>Technologies:</h4>
                  <div className="technology-tags">
                    {service.technologies.map((tech, index) => (
                      <span key={index} className="technology-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="service-cta">
                  {/*
                  <Button
                    to={`/services/${service.id}`}
                    variant="primary"
                    aria-label={`Learn more about my ${service.title} services`}
                  >
                    More Details
                  </Button>
                  <Button 
                    to="/contact"
                    variant="outline"
                    aria-label="Contact me about this service"
                  >
                    Request a Quote
                  </Button> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;