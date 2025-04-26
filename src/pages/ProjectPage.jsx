// src/pages/ProjectPage.jsx
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Button from '../components/common/Button';
import ProjectCarousel from '../components/ProjectCarousel'; // Import the carousel component
import { fetchProjectBySlug } from '../utils/api.jsx';
import './ProjectPage.css';

const ProjectPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProjectData = async () => {
      try {
        setLoading(true);
        const projectData = await fetchProjectBySlug(slug);
        setProject(projectData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Failed to load project details. Please try again later.');
        setLoading(false);
      }
    };

    getProjectData();

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
        <div className="loading-container">
          <div className="loading-spinner" aria-label="Loading project details">
            <div className="spinner"></div>
            <p>Loading project details...</p>
          </div>
        </div>
    );
  }

  if (error || !project) {
    return (
        <div className="error-container">
          <div className="error-content">
            <h2>Project Not Found</h2>
            <p>{error || "The project you're looking for doesn't exist or has been removed."}</p>
            <Button to="/portfolio" variant="primary">
              Back to Portfolio
            </Button>
          </div>
        </div>
    );
  }

  // Determine which images to use for the carousel
  // - Use project.images array if available
  // - Fall back to a single image if no images array
  // - Use a placeholder if neither is available
  const carouselImages = project.images ||
      (project.image ? [project.image] :
          ["https://via.placeholder.com/800x600?text=Project+Image"]);

  return (
      <>
        <Helmet>
          <title>{project.title} | Essa Shomali</title>
          <meta name="description" content={project.description} />
        </Helmet>

        <section className="project-page-header">
          <div className="container">
            <div className="project-breadcrumb">
              <Link to="/">Home</Link> / <Link to="/portfolio">Portfolio</Link> / <span>{project.title}</span>
            </div>
            <h1>{project.title}</h1>
            <div className="project-category">{project.category}</div>
          </div>
        </section>

        <section className="project-details">
          <div className="container">
            <div className="project-details-grid">
              <div className="project-details-image">
                {/* Replace the static image with our carousel component */}
                <ProjectCarousel images={carouselImages} />
              </div>

              <div className="project-details-content">
                <div className="project-meta">
                  <div className="meta-item">
                    <h3>Client</h3>
                    <p>{project.client}</p>
                  </div>
                  <div className="meta-item">
                    <h3>Year</h3>
                    <p>{project.year}</p>
                  </div>
                  <div className="meta-item">
                    <h3>Category</h3>
                    <p>{project.category}</p>
                  </div>
                </div>

                <div className="project-description">
                  <h2>Project Overview</h2>
                  <p>{project.description}</p>

                  {project.long_description && (
                      <p>{project.long_description}</p>
                  )}

                  <h3>Supported Platforms</h3>
                  <div className="technology-tags">
                    {project.technologies && project.technologies.map((tech, index) => (
                        <span key={index} className="technology-tag">
                      {tech}
                    </span>
                    ))}
                  </div>
                </div>

                <div className="project-actions">
                  {/*{project.demo_url && (
                    <Button
                    href={project.demo_url} 
                    variant="primary" 
                    size="large"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-external-link-alt" aria-hidden="true"></i> View Live Demo
                  </Button>
                )}*/}
                  <Button
                      to="/contact"
                      variant="outline"
                      size="large"
                  >
                    <i className="fas fa-envelope" aria-hidden="true"> </i> Project Inquiry
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {project.relatedProjects && project.relatedProjects.length > 0 && (
            <section className="related-projects">
              <div className="container">
                <h2>Related Projects</h2>
                <div className="related-projects-grid">
                  {project.relatedProjects.map(relatedProject => (
                      <div
                          key={relatedProject.id}
                          className="related-project"
                          onClick={() => navigate(`/portfolio/${relatedProject.slug}`)}
                      >
                        <div className="related-project-image">
                          <img
                              src={relatedProject.image || "https://via.placeholder.com/400x300?text=Related+Project"}
                              alt={relatedProject.title}
                              loading="lazy"
                          />
                        </div>
                        <h3>{relatedProject.title}</h3>
                      </div>
                  ))}
                </div>
              </div>
            </section>
        )}
      </>
  );
};

export default ProjectPage;