// src/components/sections/Portfolio.jsx
import { useState, useEffect } from 'react';
import ProjectCard from '../common/ProjectCard';
import Button from '../common/Button';
import { fetchProjects } from '../../utils/api.jsx';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const getProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects();
        setProjects(data);
        setFilteredProjects(data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map(project => project.category))];
        setCategories(uniqueCategories);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
        setLoading(false);
      }
    };
    
    getProjects();
  }, []);

  const handleFilterChange = (category) => {
    setActiveFilter(category);
    
    if (category === 'all') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => project.category === category);
      setFilteredProjects(filtered);
    }
    
    // Reset visible count when changing filters
    setVisibleCount(6);
  };

  const loadMoreProjects = () => {
    setVisibleCount(prevCount => prevCount + 3);
  };

  if (loading) {
    return (
      <section id="portfolio" className="portfolio section">
        <div className="container">
          <div className="section-title">
            <h2>Projects</h2>
            <p>Check out some of my recent projects</p>
          </div>
          <div className="loading-spinner" aria-label="Loading projects">
            <div className="spinner"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="portfolio" className="portfolio section">
        <div className="container">
          <div className="section-title">
            <h2>Projects</h2>
            <p>Check out some of my recent projects</p>
          </div>
          <div className="error-message" role="alert">
            {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="portfolio section">
      <div className="container">
        <div className="section-title">
          <h2>Projects</h2>
          <p>Check out some of my recent projects</p>
        </div>

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
                  className={activeFilter === category ? 'active' : ''}
                  onClick={() => handleFilterChange(category)}
                  aria-pressed={activeFilter === category}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="portfolio-grid">
          {filteredProjects.slice(0, visibleCount).map(project => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              variant={project.featured ? 'featured' : 'default'}
            />
          ))}
        </div>

        {visibleCount < filteredProjects.length && (
          <div className="portfolio-load-more">
            <Button 
              onClick={loadMoreProjects} 
              variant="outline" 
              size="medium"
              aria-label="Load more projects"
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;