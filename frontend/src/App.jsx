import { useState, useEffect, createContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import Analytics from './components/Analytics.jsx'
import AnalyticsDashboard from './pages/Analytics.jsx'

export const ThemeContext = createContext()
export const ActiveSectionContext = createContext({
  activeSection: 'about',
  setActiveSection: () => {},
})

export default function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
        <div className="app">
          <Analytics />
          <NavBar />
          <main className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/analytics" element={<AnalyticsDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ActiveSectionContext.Provider>
    </ThemeContext.Provider>
  )
}