import { useState, useEffect } from 'react';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div className="projects-loading">Loading projects...</div>;
  if (error) return <div className="projects-error">Error: {error}</div>;

  return (
    <div className="projects-page">
      <h1 className="page-title">🚀 Projects</h1>

      {/* Project Cards */}
      <div className="projects-grid">
        {projects.length === 0 ? (
          <div className="no-projects">
            <p>No projects found. Add some projects from the Analytics page!</p>
          </div>
        ) : (
          projects.map((project) => (
            <div key={project._id} className="project-card">
              <div className="project-header">
                <h3 className="project-name">{project.name}</h3>
                <span className="project-company">{project.company}</span>
                <span className="project-date">{project.date}</span>
              </div>
              <div className="project-content">
                <div className="project-description">{project.description}</div>
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="github-link">
                      <span className="github-icon">🔗</span>
                      View on GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="live-link">
                      <span className="live-icon">🌐</span>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}