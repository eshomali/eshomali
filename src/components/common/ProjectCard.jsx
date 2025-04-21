// src/components/common/ProjectCard.jsx
import { Link } from 'react-router-dom';
import Button from './Button';

const ProjectCard = ({ 
  project, 
  variant = 'default',
  showFullDetails = false
}) => {
  const { 
    id, 
    title, 
    slug,
    description, 
    category, 
    image, 
    technologies, 
    client,
    year,
    demoUrl,
    featured
  } = project;

  return (
    <article className={`project-card ${variant === 'featured' ? 'project-card-featured' : ''}`}>
      <div className="project-card-image">
        <img 
          src={image || "https://via.placeholder.com/600x400?text=Project+Image"} 
          alt={`${title} - Project Screenshot`}
          loading="lazy"
        />
        
        {featured && variant !== 'featured' && (
          <div className="project-card-badge">Featured</div>
        )}
        
        <div className="project-card-overlay">
          <div className="project-card-category">{category}</div>
          
          <div className="project-card-actions">
            {demoUrl && (
              <Button
                href={demoUrl}
                variant="outline-light"
                size="small"
                aria-label={`View live demo of ${title}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
              </Button>
            )}
            
            <Button
              to={`/portfolio/${slug}`}
              variant="primary"
              size="small"
              aria-label={`View details of ${title} project`}
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
      
      <div className="project-card-content">
        <h3 className="project-card-title">
          <Link to={`/portfolio/${slug}`}>
            {title}
          </Link>
        </h3>
        
        <p className="project-card-description">
          {showFullDetails ? description : description.substring(0, 120) + (description.length > 120 ? '...' : '')}
        </p>
        
        {showFullDetails && (
          <div className="project-card-meta">
            <div className="project-card-meta-item">
              <strong>Client:</strong> {client}
            </div>
            <div className="project-card-meta-item">
              <strong>Year:</strong> {year}
            </div>
          </div>
        )}
        
        <div className="project-card-technologies">
          {technologies && technologies.map((tech, index) => (
            <span key={index} className="technology-tag">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;