import FormattedName from '../components/FormattedName.jsx'
import me from '../assets/me.jpg'

export default function Home() {
  return (
    <div className="minimalist-container">
      <div className="minimalist-grid">
        <div className="grid-item photo-item">
          <img className="minimalist-photo" src={me} alt="Parth Rajesh Mistry" />
        </div>
        <div className="grid-item name-item">
          <FormattedName />
        </div>
        <div className="grid-item title-item">
          <h2 className="minimalist-title">Software Engineer</h2>
        </div>
        <div className="grid-item description-item">
          <p className="minimalist-text">I'm a Software Engineer with a Master's degree in Software Engineering from Cardiff University. I specialize in creating responsive, user-friendly web applications using modern technologies like React, Next.js, TypeScript, Node.js, and MySQL.</p>
        </div>
        <div className="grid-item experience-item">
          <p className="minimalist-text">I've worked on projects across both front-end and back-end development, from UI design in Figma to building and integrating scalable web solutions. Previously, I contributed to impactful projects such as a web platform for the Welsh Government with Cafcass Cymru, and I'm currently involved in the end-to-end development of a startup website.</p>
        </div>
        <div className="grid-item passion-item">
          <p className="minimalist-text">I'm passionate about continuous learning, problem-solving, and contributing to meaningful products that make a difference.</p>
        </div>
      </div>
    </div>
  )
}