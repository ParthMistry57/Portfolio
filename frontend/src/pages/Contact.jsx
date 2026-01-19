import { useEffect, useRef } from 'react';

export default function Contact() {
  const contactRefs = useRef([]);

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

    contactRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="contact-page">
      <div className="page-header">
        <h1 className="page-title">
          <span className="gradient-text">Get In Touch</span>
        </h1>
        <p className="page-subtitle">Let's connect and create something amazing together</p>
      </div>

      <div className="contact-grid">
        <a
          href="tel:+447341712682"
          className="contact-card"
          ref={(el) => (contactRefs.current[0] = el)}
        >
          <div className="contact-icon phone-icon">📞</div>
          <h3 className="contact-label">Phone</h3>
          <p className="contact-value">+44 7341712682</p>
        </a>

        <a
          href="mailto:parthmistry57@gmail.com"
          className="contact-card"
          ref={(el) => (contactRefs.current[1] = el)}
        >
          <div className="contact-icon email-icon">📧</div>
          <h3 className="contact-label">Email</h3>
          <p className="contact-value">parthmistry57@gmail.com</p>
        </a>

        <a
          href="https://www.linkedin.com/in/parth-mistry-24396a166/"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card"
          ref={(el) => (contactRefs.current[2] = el)}
        >
          <div className="contact-icon linkedin-icon">🔗</div>
          <h3 className="contact-label">LinkedIn</h3>
          <p className="contact-value">Connect with me</p>
        </a>

        <a
          href="https://github.com/ParthMistry57"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card"
          ref={(el) => (contactRefs.current[3] = el)}
        >
          <div className="contact-icon github-icon">💻</div>
          <h3 className="contact-label">GitHub</h3>
          <p className="contact-value">View my code</p>
        </a>
      </div>
    </div>
  );
}