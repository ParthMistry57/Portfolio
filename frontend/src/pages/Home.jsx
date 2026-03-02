import { useContext, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FormattedName from '../components/FormattedName.jsx'
import me from '../assets/me.jpg'
import '../styles/home.css'
import { ActiveSectionContext } from '../App.jsx'

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [expandedProjectIds, setExpandedProjectIds] = useState(new Set());
  const observerRefs = useRef([]);
  const location = useLocation();
  const { setActiveSection } = useContext(ActiveSectionContext)

  const toggleProjectExpanded = (id) => {
    setExpandedProjectIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Use scrollIntoView so scroll-margin-top on sections is respected
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (id === 'about' || id === 'experience' || id === 'contact') {
          setActiveSection(id)
        }
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('about')
    }
  }, [location, setActiveSection]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://portfolio-production-bde8.up.railway.app/api/projects');
        if (response.ok) {
          const data = await response.json();
          setFeaturedProjects(data.slice(0, 2));
        }
      } catch (err) {
        console.error('Failed to fetch projects', err);
      }
    };
    fetchProjects();

    const observer = new IntersectionObserver(
      (entries) => {
        let topVisibleSection = null;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            if (
              !topVisibleSection ||
              entry.boundingClientRect.top < topVisibleSection.boundingClientRect.top
            ) {
              topVisibleSection = entry;
            }
          }
        });

        if (topVisibleSection && topVisibleSection.target.id) {
          const id = topVisibleSection.target.id;

          if (id === 'about' || id === 'experience' || id === 'contact') {
            setActiveSection(id)
          }
        }
      },
      { threshold: 0.4 }
    );

    observerRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, [setActiveSection]);

  const addToRefs = (el) => {
    if (el && !observerRefs.current.includes(el)) {
      observerRefs.current.push(el);
    }
  };

  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section id="about" className="hero-section fade-up" ref={addToRefs}>
        <div className="hero-grid">
          <div className="hero-image-container">
            <div className="hero-image-wrapper">
              <img src={me} alt="Parth Rajesh Mistry" className="hero-profile-image" />
            </div>
            <p className="hero-image-caption">Profile photo</p>
          </div>

          <div className="hero-text-content">
            <p className="welcome-text">WELCOME TO MY SPACE</p>
            <FormattedName />
            <h2 className="hero-role">Software Engineer</h2>

            <div className="hero-bio">
              <p>I'm a Software Engineer with a Master's degree in Software Engineering from Cardiff University. I specialize in creating responsive, user-friendly web applications using modern technologies like React, Next.js, TypeScript, Node.js, C#, and ASP.NET.</p>
              <p>
                I've worked on projects across both front-end and back-end development, from UI design in Figma to building and integrating scalable web solutions.
                {!isBioExpanded && (
                  <span>
                    ... <button onClick={() => setIsBioExpanded(true)} className="read-more-btn">read more</button>
                  </span>
                )}
                {isBioExpanded && (
                  <span>
                    &nbsp;Previously, I contributed to impactful projects such as a web platform for the Welsh Government with Cafcass Cymru, and I'm currently involved in the end-to-end development of websites for a startup.
                    <button onClick={() => setIsBioExpanded(false)} className="read-more-btn"> show less</button>
                  </span>
                )}
              </p>
            </div>

            <div className="hero-actions">
              <a href="https://github.com/ParthMistry57" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="GitHub">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/parth-mistry-24396a166/" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#contact" className="primary-btn">
                Get In Touch <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="stats-section fade-up" ref={addToRefs}>
        <div className="stats-grid">
          <div className="stat-box">
            <h3>2.5+</h3>
            <p>YEARS EXPERIENCE</p>
          </div>
          <div className="stat-box">
            <h3>15+</h3>
            <p>PROJECTS COMPLETED</p>
          </div>
          <div className="stat-box">
            <h3>10+</h3>
            <p>TECHNOLOGIES MASTERED</p>
          </div>
          <div className="stat-box">
            <h3>100%</h3>
            <p>CLIENT SATISFACTION</p>
          </div>
        </div>
      </section>

      {/* JOURNEY / PROJECTS SECTION */}
      <section id="experience" className="journey-section fade-up" ref={addToRefs}>
        <div className="section-header-row">
          <div className="section-title-wrapper">
            <p className="section-subtitle">JOURNEY</p>
            <h2 className="contact-heading">Experience & Projects</h2>
            <p className="section-desc">Transforming complex problems into elegant, user-centric software solutions.<br />Here's what I've been building lately.</p>
          </div>
          <Link to="/projects" className="secondary-btn">View all work &nbsp; <span>→</span></Link>
        </div>

        <div className="featured-projects-grid">
          {featuredProjects.map((project, index) => {
            const isExpanded = expandedProjectIds.has(project._id);
            const showReadMore = project.description.length > 120;
            return (
              <div
                key={project._id}
                className={`featured-card ${isExpanded ? 'featured-card--expanded' : ''}`}
              >
                <div className="featured-card-image" style={{ background: index % 2 === 0 ? '#10b981' : '#3b82f6', opacity: 0.8 }}>
                  <div className="image-overlay-shape"></div>
                </div>
                <div className="featured-card-content">
                  <p className="featured-card-meta">{project.company} • {project.date}</p>
                  <h3 className="featured-card-title">{project.name}</h3>
                  <p className="featured-card-desc" style={{ whiteSpace: 'pre-wrap' }}>
                    {showReadMore && !isExpanded
                      ? project.description.slice(0, 120).trim()
                      : project.description}
                    {showReadMore && !isExpanded && (
                      <>.... <button type="button" onClick={() => toggleProjectExpanded(project._id)} className="read-more-btn">read more</button></>
                    )}
                    {showReadMore && isExpanded && (
                      <> <button type="button" onClick={() => toggleProjectExpanded(project._id)} className="read-more-btn">read less</button></>
                    )}
                  </p>
                </div>
              </div>
            );
          })}
          {featuredProjects.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)', gridColumn: '1 / -1' }}>
              Loading projects...
            </div>
          )}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="contact-section fade-up" ref={addToRefs}>
        <div className="contact-grid-modern">
          <div className="contact-info-panel">
            <p className="section-subtitle">GET IN TOUCH</p>
            <h2 className="contact-heading">Let's build<br />something amazing<br />together</h2>

            <div className="contact-methods">
              <div className="contact-method-card">
                <div className="method-icon-wrapper">
                  <div className="mock-avatar"></div>
                </div>
                <div className="method-text">
                  <p className="method-label">Send an email</p>
                  <p className="method-value">parthmistry57@gmail.com</p>
                </div>
              </div>

              <div className="contact-method-card">
                <div className="method-icon-wrapper">
                  <div className="mock-avatar"></div>
                </div>
                <div className="method-text">
                  <p className="method-label">Contact Number</p>
                  <p className="method-value">+44 7341712682</p>
                </div>
              </div>

              <div className="contact-method-card">
                <div className="method-icon-wrapper">
                  <div className="mock-avatar"></div>
                </div>
                <div className="method-text">
                  <p className="method-label">Based in</p>
                  <p className="method-value">Cardiff, United Kingdom</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row-modern">
                <div className="form-group-modern">
                  <input type="text" placeholder="Name" className="form-input-modern" />
                </div>
                <div className="form-group-modern">
                  <input type="email" placeholder="Email" className="form-input-modern" />
                </div>
              </div>
              <div className="form-group-modern">
                <input type="text" placeholder="Subject" className="form-input-modern" />
              </div>
              <div className="form-group-modern">
                <textarea placeholder="Message" rows="10" className="form-input-modern"></textarea>
              </div>
              <button type="button" className="primary-btn submit-btn full-width">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}