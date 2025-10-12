import { useState, useEffect } from 'react';
import Login from '../components/Login';

export default function Analytics() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clearing, setClearing] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    name: '',
    company: '',
    date: '',
    description: '',
    technologies: '',
    githubUrl: '',
    liveUrl: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchAnalytics = async () => {
      try {
        // Get stored credentials from localStorage
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');
        
        if (!storedUsername || !storedPassword) {
          throw new Error('Authentication required');
        }

        const response = await fetch('https://portfolio-production-bde8.up.railway.app/api/analytics/dashboard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: storedUsername,
            password: storedPassword
          })
        });
        if (!response.ok) throw new Error('Failed to fetch analytics');
        const data = await response.json();
        setAnalyticsData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await fetch('https://portfolio-production-bde8.up.railway.app/api/projects');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      }
    };

    fetchAnalytics();
    fetchProjects();
  }, [isAuthenticated]);

  const clearAllData = async () => {
    if (!window.confirm('Are you sure you want to clear all analytics data? This action cannot be undone.')) {
      return;
    }

    setClearing(true);
    try {
      const storedUsername = localStorage.getItem('username');
      const storedPassword = localStorage.getItem('password');

      const response = await fetch('https://portfolio-production-bde8.up.railway.app/api/analytics/clear', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: storedUsername,
          password: storedPassword
        })
      });

      if (!response.ok) throw new Error('Failed to clear data');

      // Refresh the data
      const dashboardResponse = await fetch('https://portfolio-production-bde8.up.railway.app/api/analytics/dashboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: storedUsername,
          password: storedPassword
        })
      });
      const data = await dashboardResponse.json();
      setAnalyticsData(data);

      alert('All analytics data cleared successfully!');
    } catch (err) {
      setError(err.message);
      alert('Failed to clear analytics data');
    } finally {
      setClearing(false);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const technologiesArray = projectForm.technologies
        .split(',')
        .map(tech => tech.trim())
        .filter(tech => tech.length > 0);

        const url = editingProject 
          ? `https://portfolio-production-bde8.up.railway.app/api/projects/${editingProject._id}`
          : 'https://portfolio-production-bde8.up.railway.app/api/projects';
      
      const method = editingProject ? 'PUT' : 'POST';

      const storedUsername = localStorage.getItem('username');
      const storedPassword = localStorage.getItem('password');

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...projectForm,
          technologies: technologiesArray,
          username: storedUsername,
          password: storedPassword
        })
      });

      if (!response.ok) throw new Error(`Failed to ${editingProject ? 'update' : 'create'} project`);

      const result = await response.json();
      alert(`Project ${editingProject ? 'updated' : 'added'} successfully!`);
      
      // Refresh projects list
      const projectsResponse = await fetch('https://portfolio-production-bde8.up.railway.app/api/projects');
      const projectsData = await projectsResponse.json();
      setProjects(projectsData);
      
      // Reset form
      resetForm();
    } catch (err) {
      setError(err.message);
      alert(`Failed to ${editingProject ? 'update' : 'add'} project`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleProjectFormChange = (e) => {
    setProjectForm({
      ...projectForm,
      [e.target.name]: e.target.value
    });
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setProjectForm({
      name: project.name,
      company: project.company,
      date: project.date,
      description: project.description,
      technologies: project.technologies.join(', '),
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || ''
    });
    setShowProjectForm(true);
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      const storedUsername = localStorage.getItem('username');
      const storedPassword = localStorage.getItem('password');

      const response = await fetch(`https://portfolio-production-bde8.up.railway.app/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: storedUsername,
          password: storedPassword
        })
      });

      if (!response.ok) throw new Error('Failed to delete project');

      // Refresh projects list
      const projectsResponse = await fetch('https://portfolio-production-bde8.up.railway.app/api/projects');
      const projectsData = await projectsResponse.json();
      setProjects(projectsData);

      alert('Project deleted successfully!');
    } catch (err) {
      setError(err.message);
      alert('Failed to delete project');
    }
  };

  const resetForm = () => {
    setProjectForm({
      name: '',
      company: '',
      date: '',
      description: '',
      technologies: '',
      githubUrl: '',
      liveUrl: ''
    });
    setEditingProject(null);
    setShowProjectForm(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    setIsAuthenticated(false);
    setAnalyticsData(null);
    setProjects([]);
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={setIsAuthenticated} />;
  }

  if (loading) return <div className="analytics-loading">Loading analytics...</div>;
  if (error) return <div className="analytics-error">Error: {error}</div>;
  if (!analyticsData) return <div className="analytics-error">No data available</div>;

  return (
    <div className="analytics-dashboard">
      <div className="analytics-header">
        <h1 className="analytics-title">📊 Visitor Counter</h1>
        <div className="analytics-header-actions">
          <button 
            className="add-project-btn"
            onClick={() => {
              if (showProjectForm) {
                resetForm();
              } else {
                setShowProjectForm(true);
              }
            }}
          >
            {showProjectForm ? '❌ Cancel' : '➕ Add Project'}
          </button>
          <button 
            className="logout-btn"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>
        </div>
      </div>
      
      {/* Main Counter */}
      <div className="analytics-overview">
        <div className="stat-card main-counter">
          <h3>👥 Total Unique Visitors</h3>
          <p className="stat-number">{analyticsData.totalVisitors}</p>
          <p className="stat-description">Each person who visits the website</p>
        </div>
      </div>

      {/* Recent Visitors */}
      <div className="analytics-section">
        <h2>👤 Recent Visitors</h2>
        <div className="recent-visitors">
          {analyticsData.recentVisitors.map((visitor, index) => (
            <div key={index} className="visitor-item">
              <span className="visitor-number">{index + 1}.</span>
              <span className="visitor-time">
                {new Date(visitor.timestamp).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

          {/* Action Buttons */}
          <div className="analytics-actions">
            <button
              className="refresh-btn"
              onClick={() => window.location.reload()}
            >
              🔄 Refresh Data
            </button>

            <button
              className="clear-btn"
              onClick={clearAllData}
              disabled={clearing}
            >
              {clearing ? '⏳ Clearing...' : '🗑️ Clear All Data'}
            </button>
          </div>

          {/* Projects Management */}
          {projects.length > 0 && (
            <div className="projects-management-section">
              <h2 className="section-title">📁 Manage Projects</h2>
              <div className="projects-list">
                {projects.map((project) => (
                  <div key={project._id} className="project-item">
                    <div className="project-info">
                      <h4 className="project-name">{project.name}</h4>
                      <p className="project-company">{project.company} • {project.date}</p>
                      <div className="project-description-preview">{project.description}</div>
                    </div>
                    <div className="project-actions">
                      <button 
                        className="edit-btn"
                        onClick={() => handleEditProject(project)}
                      >
                        ✏️ Edit
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDeleteProject(project._id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add/Edit Project Form */}
          {showProjectForm && (
            <div className="project-form-section">
              <h2 className="form-title">
                {editingProject ? '✏️ Edit Project' : '➕ Add New Project'}
              </h2>
              <form onSubmit={handleProjectSubmit} className="project-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Project Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={projectForm.name}
                      onChange={handleProjectFormChange}
                      required
                      placeholder="e.g., Portfolio Website"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">Company/Type *</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={projectForm.company}
                      onChange={handleProjectFormChange}
                      required
                      placeholder="e.g., Personal Project"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date">Date *</label>
                    <input
                      type="text"
                      id="date"
                      name="date"
                      value={projectForm.date}
                      onChange={handleProjectFormChange}
                      required
                      placeholder="e.g., 2024"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="technologies">Technologies (comma-separated)</label>
                    <input
                      type="text"
                      id="technologies"
                      name="technologies"
                      value={projectForm.technologies}
                      onChange={handleProjectFormChange}
                      placeholder="e.g., React, Node.js, MongoDB"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description *</label>
                  <textarea
                    id="description"
                    name="description"
                    value={projectForm.description}
                    onChange={handleProjectFormChange}
                    required
                    rows="4"
                    placeholder="Describe your project..."
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="githubUrl">GitHub URL</label>
                    <input
                      type="url"
                      id="githubUrl"
                      name="githubUrl"
                      value={projectForm.githubUrl}
                      onChange={handleProjectFormChange}
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="liveUrl">Live Demo URL</label>
                    <input
                      type="url"
                      id="liveUrl"
                      name="liveUrl"
                      value={projectForm.liveUrl}
                      onChange={handleProjectFormChange}
                      placeholder="https://your-demo.com"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={submitting}
                  >
                    {submitting 
                      ? `⏳ ${editingProject ? 'Updating...' : 'Adding...'}` 
                      : `✅ ${editingProject ? 'Update Project' : 'Add Project'}`
                    }
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      );
    }
