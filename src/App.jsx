import { useState, useEffect, useRef } from 'react'
import './App.css'

function StarField() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId, stars = []
    const COUNT = 400, SPEED = 0.5
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    function init() {
      stars = []
      for (let i = 0; i < COUNT; i++) stars.push({ x: Math.random() * canvas.width - canvas.width / 2, y: Math.random() * canvas.height - canvas.height / 2, z: Math.random() * 1000, size: Math.random() * 1.5 + 0.5 })
    }
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const cx = canvas.width / 2, cy = canvas.height / 2
      for (const s of stars) {
        s.z -= SPEED
        if (s.z <= 0) { s.x = Math.random() * canvas.width - cx; s.y = Math.random() * canvas.height - cy; s.z = 1000 }
        const p = 500 / s.z, sx = s.x * p + cx, sy = s.y * p + cy, sz = s.size * p * 0.5
        if (sx >= 0 && sx <= canvas.width && sy >= 0 && sy <= canvas.height) {
          ctx.beginPath(); ctx.arc(sx, sy, Math.max(0.3, sz), 0, Math.PI * 2)
          ctx.fillStyle = `rgba(200,210,240,${Math.min(1, (1000 - s.z) / 1000) * 0.8})`; ctx.fill()
        }
      }
      animId = requestAnimationFrame(draw)
    }
    resize(); init(); draw()
    const onResize = () => { resize(); init() }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize) }
  }, [])
  return <canvas ref={canvasRef} className="hero-canvas" />
}

const focusAreas = [
  { title: 'Artificial Intelligence', desc: 'Foundation models, AI infrastructure, and applied intelligence systems that augment human capabilities.' },
  { title: 'Quantum Computing', desc: 'Hardware, software, and applications leveraging quantum mechanics to solve problems beyond classical computation.' },
  { title: 'Space & Aerospace', desc: 'Next-generation launch systems, satellite infrastructure, and space-enabled services.' },
  { title: 'Robotics & Autonomy', desc: 'Intelligent machines and autonomous systems operating in the physical world.' },
  { title: 'Advanced Materials', desc: 'Novel materials and manufacturing processes unlocking new possibilities in energy and computing.' },
  { title: 'Biocomputation', desc: 'Computational biology and bio-inspired computing at the intersection of life sciences and technology.' },
]
const companies = ['Orbital','Synthex','NeuralPath','QuantumLeap','Aether Systems','DeepField','Axiom AI','Helix Robotics','Stratosphere','Cortex Labs','Fusion Dynamics','Lattice Bio','Prisma Energy','Vector Space','Nexus Computing','Photon Networks']
const team = [
  { name: 'Alexander Chen', role: 'General Partner', initials: 'AC' },
  { name: 'Sarah Mitchell', role: 'General Partner', initials: 'SM' },
  { name: 'David Park', role: 'Partner', initials: 'DP' },
  { name: 'Elena Rodriguez', role: 'Principal', initials: 'ER' },
  { name: 'James Liu', role: 'Principal', initials: 'JL' },
  { name: 'Maya Patel', role: 'Associate', initials: 'MP' },
]

function App() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="navbar-logo">Type 1</a>
        <div className="navbar-links">
          <a href="#about">About</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#team">Team</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="Home-hero">
        <div className="Home-hero-inner">
          <StarField />
          <div className="hero-content">
            <h1 className="hero-title-main">Type 1</h1>
            <p className="hero-subtitle">Ventures</p>
          </div>
          <div className="hero-scroll-indicator">
            <span>Scroll</span>
            <div className="scroll-line"></div>
          </div>
        </div>
      </section>

      <section id="about" className="section-about">
        <div className="container">
          <div className="grid-12">
            <div className="about-content">
              <p className="about-label">About</p>
              <h2 className="about-heading">We partner with exceptional founders building transformative companies at the frontier of computing.</h2>
              <div className="about-description">
                <p>Type 1 Ventures is an early-stage venture fund investing in founders who are pushing the boundaries of what is possible. We focus on deep technology companies that have the potential to reshape industries and create lasting impact.</p>
                <p>Our team brings decades of experience in building and scaling technology companies. We work closely with our founders from the earliest stages, providing not just capital but strategic guidance, technical expertise, and access to our extensive network.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-focus">
        <div className="container">
          <div className="grid-12">
            <div className="focus-header"><p className="focus-label">Focus Areas</p></div>
            <div className="focus-grid">
              {focusAreas.map((a, i) => (
                <div className="focus-item" key={i}>
                  <p className="focus-item-number">{String(i + 1).padStart(2, '0')}</p>
                  <h3>{a.title}</h3>
                  <p>{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="section-portfolio">
        <div className="container">
          <div className="portfolio-header">
            <p className="portfolio-label">Portfolio</p>
            <h2 className="portfolio-heading">Companies defining the next era of technology</h2>
          </div>
          <div className="portfolio-grid">
            {companies.map((c, i) => (
              <div className="portfolio-item" key={i}><span className="portfolio-item-name">{c}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="section-team">
        <div className="container">
          <div className="team-header">
            <p className="team-label">Team</p>
            <h2 className="team-heading">The people behind Type 1</h2>
          </div>
          <div className="team-grid">
            {team.map((m, i) => (
              <div className="team-card" key={i}>
                <div className="team-card-image"><div className="team-card-placeholder">{m.initials}</div></div>
                <h3>{m.name}</h3>
                <p>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section-contact">
        <div className="container">
          <div className="grid-12">
            <div className="contact-content">
              <p className="contact-label">Contact</p>
              <h2 className="contact-heading">Lets build the future together</h2>
              <a href="mailto:hello@type1ventures.com" className="contact-link">hello@type1ventures.com</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-left">© {new Date().getFullYear()} Type 1 Ventures. All rights reserved.</div>
            <div className="footer-right">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
