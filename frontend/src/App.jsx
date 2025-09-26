import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Contact from './pages/Contact.jsx'
import Analytics from './components/Analytics.jsx'
import AnalyticsDashboard from './pages/Analytics.jsx'

export default function App() {
  return (
    <div className="app">
      <Analytics />
      <NavBar />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Home />} />
          <Route path="/experience" element={<div />} />
          <Route path="/projects" element={<div />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}