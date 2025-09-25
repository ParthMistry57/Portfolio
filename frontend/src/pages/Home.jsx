import FormattedName from '../components/FormattedName.jsx'
import me from '../assets/me.jpg'

export default function Home() {
  return (
    <section className="profile">
      <img className="profile-photo" src={me} alt="Parth Rajesh Mistry" />
      <div className="profile-text">
        <FormattedName />
        <p>Software Engineer with 2.5 years of experience and a Master's in Software Engineering from Cardiff University. I specialize in building responsive, user-focused web applications using React, JavaScript (ES6+), Node.js, HTML5, and CSS3, with hands-on experience across both front-end and back-end development.</p>
        <p>I've contributed to impactful projects, including work for the Welsh Government with Cafcass Cymru, and thrive in Agile teams using Git for collaboration. With a strong foundation in UI/UX principles and clean coding practices, I enjoy creating scalable, reliable digital solutions.</p>
        <p>I'm passionate about continuous learning, problem-solving, and contributing to meaningful products that make a difference.</p>
      </div>
    </section>
  )
}