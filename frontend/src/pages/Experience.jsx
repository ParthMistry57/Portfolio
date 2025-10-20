export default function Experience() {
  return (
    <div className="experience-page">
      <h1 className="page-title">💼 Experience</h1>
      
      {/* Work Experience Section */}
      <section className="experience-section">
        <h2 className="section-title">Work Experience</h2>

        <div className="experience-item">
          <div className="experience-header">
            <h3 className="job-title">Junior Web Developer</h3>
            <span className="company">MBLogistics Group</span>
            <span className="duration">Sept 2025 - Present</span>
          </div>
          <div className="experience-content">
            <p className="job-description">
            • Contributing to the design and full-stack development of new websites, from initial concept and wireframing in Figma to front-end implementation and back-end integration. <br/>
            • Developing modern, scalable web applications using React, Next.js, TypeScript, Tailwind CSS, MUI, and ShadCN, ensuring responsive design and optimal user experience across devices. <br/>
            • Implementing and maintaining back-end functionality with Node.js, Express.js, and MySQL, including database schema design and RESTful API integration. <br/>
            • Collaborating with developers and stakeholders in an Agile environment to translate requirements into clean, maintainable, and documented code. <br/>
            • Actively involved in debugging, code reviews, and documentation to ensure quality, consistency, and team-wide knowledge sharing. <br/>
            • Contributing to workflow improvements by suggesting UI/UX enhancements and process optimizations that support efficient, high-quality development. <br/>
            </p>
          </div>
        </div>
        
        <div className="experience-item">
          <div className="experience-header">
            <h3 className="job-title">Software Specialist</h3>
            <span className="company">eClinicalWorks</span>
            <span className="duration">April 2021 - August 2023</span>
          </div>
          <div className="experience-content">
            <p className="job-description">
              • Managed migration of on-premises servers to Microsoft Azure, enhancing system scalability.<br/>
              • Developed PowerShell scripts to automate data extraction, boosting operational efficiency.<br/>
              • Led database conversion projects from MySQL to MSSQL for optimized database performance.<br/>
              • Configured and deployed Azure Virtual Desktop (AVD), integrating it with eClinicalWorks software.<br/>
              • Delivered rapid technical support and bug resolution as part of the Fastlane Team, directly impacting platform stability and user experience.<br/>
              • Automated system configurations using Chef and streamlined issue resolution processes through JIRA.<br/>
              • Collaborated with development teams and external vendors to ensure seamless cloud operations.<br/>
              • Received Rising Star Award for exceptional contributions and problem-solving at eClinicalWorks.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="experience-section">
        <h2 className="section-title">Technical Skills</h2>
        
        <div className="skills-grid">
          <div className="skill-category">
            <h4>Frontend</h4>
            <div className="skill-tags">
              <span className="skill-tag">React</span>
              <span className="skill-tag">Next.js</span>
              <span className="skill-tag">Vue.js</span>
              <span className="skill-tag">TypeScript</span>
              <span className="skill-tag">JavaScript (ES6+)</span>
              <span className="skill-tag">HTML5</span>
              <span className="skill-tag">CSS3</span>
              <span className="skill-tag">MUI</span>
              <span className="skill-tag">ShadCN</span>
              <span className="skill-tag">Tailwind CSS</span>
              <span className="skill-tag">Axios</span>
              <span className="skill-tag">Vite</span>
              <span className="skill-tag">Figma (UI/UX)</span>
              <span className="skill-tag">Responsive Design</span>
            </div>
          </div>
          
          <div className="skill-category">
            <h4>Backend</h4>
            <div className="skill-tags">
              <span className="skill-tag">Node.js</span>
              <span className="skill-tag">Express</span>
              <span className="skill-tag">REST APIs</span>
              <span className="skill-tag">GraphQL</span>
              <span className="skill-tag">Swagger</span>
              <span className="skill-tag">C#</span>
              <span className="skill-tag">ASP.NET MVC</span>
            </div>
          </div>

          <div className="skill-category">
            <h4>Database</h4>
            <div className="skill-tags">
              <span className="skill-tag">MySQL</span>
              <span className="skill-tag">MSSQL</span>
              <span className="skill-tag">MongoDB</span>
              <span className="skill-tag">PostgreSQL</span>
            </div>
          </div>
          
          <div className="skill-category">
            <h4>Tools & Others</h4>
            <div className="skill-tags">
              <span className="skill-tag">Git</span>
              <span className="skill-tag">Jira</span>
              <span className="skill-tag">Agile</span>
              <span className="skill-tag">Electron</span>
              <span className="skill-tag">Playwright</span>
              <span className="skill-tag">Unit & Integration Testing</span>
              <span className="skill-tag">Clean Code</span>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="experience-section">
        <h2 className="section-title">Education</h2>
        
        <div className="experience-item">
          <div className="experience-header">
            <h3 className="job-title">Master's in Software Engineering</h3>
            <span className="company">Cardiff University</span>
            <span className="duration">Sept 2023 - Sept 2024</span>
          </div>
          <div className="experience-content">
            <p className="job-description">
              Modules: Web Applications, Programming Principles and Practice, DevOps, Agile Software Development, Extreme Programming (XP), Manipulating and exploiting data.
            </p>
          </div>
        </div>

        <div className="experience-item">
          <div className="experience-header">
            <h3 className="job-title">Bachelor of Engineering in Electronics</h3>
            <span className="company">University Of Mumbai</span>
            <span className="duration">June 2016 – May 2020</span>
          </div>
        </div>
      </section>

      <section className="experience-section">
        <h2 className="section-title">Part-Time Experience</h2>
        
        <div className="experience-item">
          <div className="experience-header">
            <h3 className="job-title">Service Assistant </h3>
            <span className="company">Sainsbury’s Supermarket</span>
            <span className="duration">Nov 2023 - Present</span>
          </div>
          <div className="experience-content">
            <p className="job-description">
              • Gained problem-solving and technical skills by managing POS systems and troubleshooting self-checkout kiosks.<br/>
              • Assisted customers with digital transaction issues and provided support in a fast-paced environment.<br/>
              • Worked closely with team members to streamline operations, strengthening my ability to collaborate effectively, a skill that translates well into software development projects.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
