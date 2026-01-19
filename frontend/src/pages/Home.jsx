import { useEffect, useRef } from 'react'
import FormattedName from '../components/FormattedName.jsx'
import me from '../assets/me.jpg'

export default function Home() {
  const photoRef = useRef(null)
  const textRefs = useRef([])

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'translateY(0)'
          }
        })
      },
      { threshold: 0.1 }
    )

    if (photoRef.current) observer.observe(photoRef.current)
    textRefs.current.forEach((ref) => ref && observer.observe(ref))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="hero-container">
      <div className="hero-content">
        {/* Photo Section */}
        <div className="hero-photo-wrapper" ref={photoRef}>
          <img className="hero-photo" src={me} alt="Parth Rajesh Mistry" />
        </div>

        {/* Text Content */}
        <div className="hero-text">
          <div className="hero-greeting fade-in-up" ref={(el) => (textRefs.current[0] = el)}>
            <FormattedName />
          </div>
          
          <div className="hero-title-wrapper fade-in-up" ref={(el) => (textRefs.current[1] = el)}>
            <h2 className="hero-title">
              <span className="gradient-text">Software Engineer</span>
            </h2>
            <div className="title-underline"></div>
          </div>

          <div className="hero-description fade-in-up" ref={(el) => (textRefs.current[2] = el)}>
            <p className="description-text">
              I'm a Software Engineer with a Master's degree in Software Engineering from Cardiff University. I specialize in creating responsive, user-friendly web applications using modern technologies like React, Next.js, TypeScript, Node.js, and MySQL.
            </p>
          </div>

          <div className="hero-description fade-in-up" ref={(el) => (textRefs.current[3] = el)}>
            <p className="description-text">
              I've worked on projects across both front-end and back-end development, from UI design in Figma to building and integrating scalable web solutions. Previously, I contributed to impactful projects such as a web platform for the Welsh Government with Cafcass Cymru, and I'm currently involved in the end-to-end development of a startup website.
            </p>
          </div>

          <div className="hero-description fade-in-up" ref={(el) => (textRefs.current[4] = el)}>
            <p className="description-text highlight-text">
              I'm passionate about continuous learning, problem-solving, and contributing to meaningful products that make a difference.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}