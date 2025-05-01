// src/pages/PortfolioPage.jsx
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '../components/common/Button';
import { fetchProjects, fetchCategories } from '../utils/api.jsx';
import './PortfolioPage.css';

const PortfolioPage = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const getProjectsData = async () => {
      try {
        setLoading(true);
        
        // Fetch projects and categories
        const projectsData = await fetchProjects();
        const categoriesData = await fetchCategories();
        
        setProjects(projectsData);
        setFilteredProjects(projectsData);
        setCategories(categoriesData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching portfolio data:', err);
        setError('Failed to load projects. Please try again later.');
        setLoading(false);
      }
    };
    
    getProjectsData();
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  const handleFilterChange = (category) => {
    setActiveFilter(category);
    
    if (category === 'all') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => project.category_slug === category);
      setFilteredProjects(filtered);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" aria-label="Loading projects">
          <div className="spinner"></div>
          <p>Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Portfolio | Essa Shomali - App Developer</title>
        <meta 
          name="description" 
          content="Explore Essa Shomali's portfolio of web and mobile app development projects. React, Node.js, UI/UX design, and more."
        />
      </Helmet>
      
      <section className="page-header">
        <div className="container">
          <h1>Applications</h1>
        </div>
      </section>
      
      <section className="portfolio-section">
        <div className="container">
          <div className="portfolio-filters">
            <ul>
              <li>
                <button
                  className={activeFilter === 'all' ? 'active' : ''}
                  onClick={() => handleFilterChange('all')}
                  aria-pressed={activeFilter === 'all'}
                >
                  All
                </button>
              </li>
              {categories.map((category, index) => (
                <li key={index}>
                  <button
                    className={activeFilter === category.slug ? 'active' : ''}
                    onClick={() => handleFilterChange(category.slug)}
                    aria-pressed={activeFilter === category.slug}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="portfolio-grid">
            {filteredProjects.length > 0 ? (
              filteredProjects.map(project => (
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
                      {project.description}
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
                      size="medium"
                      className="view-details-btn"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-projects-message">
                <p>No projects found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default PortfolioPage;