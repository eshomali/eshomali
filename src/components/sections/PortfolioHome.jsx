// src/components/sections/PortfolioHome.jsx
import { useState, useEffect } from 'react';
import Button from '../common/Button';
import { fetchFeaturedProjects } from '../../utils/api';

const PortfolioHome = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFeaturedProjects = async () => {
      try {
        setLoading(true);
        const featuredProjects = await fetchFeaturedProjects(3);
        setProjects(featuredProjects);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching featured projects:', err);
        setError('Failed to load featured projects.');
        setLoading(false);
      }
    };
    
    getFeaturedProjects();
  }, []);

  if (loading) {
    return (
      <section id="portfolio" className="portfolio-home-section">
        <div className="container">
          <div className="section-title">
            <h2>Featured Projects</h2>
          </div>
          <div className="loading-spinner-container">
            <div className="spinner"></div>
            <p>Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="portfolio" className="portfolio-home-section">
        <div className="container">
          <div className="section-title">
            <h2>Featured Projects</h2>
          </div>
          <div className="error-message" role="alert">
            {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="portfolio-home-section">
      <div className="container">
        <div className="section-title">
          <h2>Featured Projects</h2>
          <p>Check out some of my recent work</p>
        </div>

        <div className="portfolio-home-grid">
          {projects.map(project => (
            <div className="project-card" key={project.id}>
              <div className="project-card-image">
                <img 
                  src={project.image || "https://via.placeholder.com/600x400?text=Project+Image"} 
                  alt={`${project.title} - Project Screenshot`}
                  loading="lazy"
                />
                {project.featured && (
                  <div className="project-card-badge">Featured</div>
                )}
              </div>
              
              <div className="project-card-content">
                <h3 className="project-card-title">
                  {project.title}
                </h3>
                
                <p className="project-card-description">
                  {project.description.length > 120 
                    ? `${project.description.substring(0, 120)}...` 
                    : project.description}
                </p>
                
                <div className="project-technologies">
                  {project.technologies && project.technologies.map((tech, index) => (
                    <span key={index} className="technology-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <Button 
                  to={`/portfolio/${project.slug}`}
                  variant="primary"
                  className="view-details-btn"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
        

      </div>
    </section>
  );
};

export default PortfolioHome;