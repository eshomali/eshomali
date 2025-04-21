// src/components/sections/About.jsx
import { useState } from 'react';
import Button from '../common/Button';

const About = () => {
  const [activeTab, setActiveTab] = useState('skills');
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const skills = [
    { name: 'AI Integration', percentage: 100 },
    { name: 'Content Management', percentage: 100 },
    { name: 'Location-Based Features', percentage: 100 },
    { name: 'Payment Systems', percentage: 100 },
    { name: 'Client Management', percentage: 100 },
    { name: 'Real-Time Notifications', percentage: 100 },
    { name: 'Security & Analytics', percentage: 100 },
    { name: 'Enhanced User Experience', percentage: 100 },
  ];
  
  const experience = [
    {
      position: 'Senior Software Engineer',
      company: 'MedImpact Healthcare Systems',
      period: '2022 - Present',
      description: ''
    },
    {
      position: 'Software Engineer III',
      company: 'Comerica',
      period: '2019 - 2022',
      description: ''
    },
    {
      position: 'Software Engineer',
      company: 'Asset Health',
      period: '2018 - 2019',
      description: ''
    },
    {
      position: 'Software Developer',
      company: 'Complete Data Products',
      period: '2016 - 2018',
      description: ''
    }
  ];
  
  const education = [
    {
      degree: 'B.S.E. Computer Engineering',
      institution: 'Oakland University, School of Engineering',
      period: '2014 - 2018',
      description: 'Minor in Computer Science, Artificial Intelligence'
    },
    {
      degree: 'Certificates',
      institution: '\n' +
          'Certified ScrumMaster (CSM)',
      period: '',
      description: 'Credential ID 1700324'
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
                src="src/assets/images/about-large.jpg"
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
                  display: 'flex', // Add flexbox for centering
                  justifyContent: 'center', // Center horizontally
                  alignItems: 'center', // Center vertically
                  margin: '0 auto', // Center the entire div in its container
                }}
              />
              <div className="experience-badge" aria-label="8+ years of experience">
                <span className="years">8+</span>
                <span className="text">Years of<br />Experience</span>
              </div>
            </div>
          </div>

          <div className="about-content">
            <h3>Professional App Developer & UI/UX Specialist</h3>
            
            <p className="lead">
              I help businesses transform their digital presence with modern, accessible,
              and high-performance web applications.
            </p>
            
            <p>
              With over 8 years of experience in app development, I specialize in creating
              exceptional digital experiences that help businesses grow. My expertise spans
              across the entire development lifecycle, from concept and design to 
              deployment and maintenance.
            </p>
            
            <p>
              I'm passionate about building applications that are not only visually stunning
              but also highly functional, accessible, and optimized for performance.
              My approach combines technical excellence with a deep understanding of 
              business goals to deliver solutions that drive real results.
            </p>
            
            <div className="about-tabs">
              <div className="tabs-navigation">
                <button 
                  className={`tab-button ${activeTab === 'skills' ? 'active' : ''}`}
                  onClick={() => handleTabChange('skills')}
                  aria-selected={activeTab === 'skills'}
                  aria-controls="skills-tab"
                  id="skills-tab-button"
                >
                  Features
                </button>
                <button 
                  className={`tab-button ${activeTab === 'experience' ? 'active' : ''}`}
                  onClick={() => handleTabChange('experience')}
                  aria-selected={activeTab === 'experience'}
                  aria-controls="experience-tab"
                  id="experience-tab-button"
                >
                  Experience
                </button>
                <button 
                  className={`tab-button ${activeTab === 'education' ? 'active' : ''}`}
                  onClick={() => handleTabChange('education')}
                  aria-selected={activeTab === 'education'}
                  aria-controls="education-tab"
                  id="education-tab-button"
                >
                  Education
                </button>
              </div>
              
              <div className="tabs-content">
                <div 
                  id="skills-tab" 
                  className={`tab-panel ${activeTab === 'skills' ? 'active' : ''}`}
                  role="tabpanel"
                  aria-labelledby="skills-tab-button"
                  hidden={activeTab !== 'skills'}
                >
                  <div className="skills-container">
                    {skills.map((skill, index) => (
                      <div key={index} className="skill-item">
                        <div className="skill-info">
                          <h4>{skill.name}</h4>
                          <span className="skill-percentage">{skill.percentage}%</span>
                        </div>
                        <div className="skill-bar">
                          <div 
                            className="skill-progress" 
                            style={{ width: `${skill.percentage}%` }}
                            aria-valuemin="0"
                            aria-valuemax="100"
                            aria-valuenow={skill.percentage}
                            role="progressbar"
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div 
                  id="experience-tab" 
                  className={`tab-panel ${activeTab === 'experience' ? 'active' : ''}`}
                  role="tabpanel"
                  aria-labelledby="experience-tab-button"
                  hidden={activeTab !== 'experience'}
                >
                  <div className="timeline">
                    {experience.map((job, index) => (
                      <div key={index} className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-date">{job.period}</div>
                        <div className="timeline-content">
                          <h4>{job.position}</h4>
                          <h5>{job.company}</h5>
                          <p>{job.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div 
                  id="education-tab" 
                  className={`tab-panel ${activeTab === 'education' ? 'active' : ''}`}
                  role="tabpanel"
                  aria-labelledby="education-tab-button"
                  hidden={activeTab !== 'education'}
                >
                  <div className="timeline">
                    {education.map((edu, index) => (
                      <div key={index} className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-date">{edu.period}</div>
                        <div className="timeline-content">
                          <h4>{edu.degree}</h4>
                          <h5>{edu.institution}</h5>
                          <p>{edu.description}</p>
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
    </section>
  );
};

export default About;