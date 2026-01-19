import { useState, useEffect, useRef } from 'react';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://portfolio-production-bde8.up.railway.app/api/projects');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, index * 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, [projects]);

  if (loading) return <div className="projects-loading">Loading projects...</div>;
  if (error) return <div className="projects-error">Error: {error}</div>;

  return (
    <div className="projects-page">
      <div className="page-header">
        <h1 className="page-title">
          <span className="gradient-text">Projects</span>
        </h1>
        <p className="page-subtitle">A collection of my recent work and contributions</p>
      </div>

      <div className="projects-grid">
        {projects.length === 0 ? (
          <div className="no-projects">
            <div className="no-projects-icon">📁</div>
            <p>No projects found. Add some projects from the Analytics page!</p>
          </div>
        ) : (
          projects.map((project, index) => (
            <div
              key={project._id}
              className="project-card-modern"
              ref={(el) => (cardRefs.current[index] = el)}
            >
              <div className="project-card-header">
                <div className="project-header-content">
                  <h3 className="project-name">{project.name}</h3>
                  <div className="project-meta">
                    <span className="project-company">{project.company}</span>
                    <span className="project-date">{project.date}</span>
                  </div>
                </div>
                <div className="project-card-glow"></div>
              </div>
              
              <div className="project-card-body">
                <div className="project-description">{project.description}</div>
                
                <div className="project-technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag-modern">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="project-card-footer">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link github-link-modern"
                  >
                    <svg className="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link live-link-modern"
                  >
                    <svg className="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}