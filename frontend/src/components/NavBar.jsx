import { NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <header className="navbar">
      <nav className="nav">
        <NavLink to="/">About Me</NavLink>
        <NavLink to="/experience">Experience</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
    </header>
  )
}