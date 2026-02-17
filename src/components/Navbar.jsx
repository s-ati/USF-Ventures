import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#" className="navbar-logo">
        USF Ventures
      </a>
      <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#thesis" onClick={() => setMenuOpen(false)}>Thesis</a>
        <a href="#team" onClick={() => setMenuOpen(false)}>Team</a>
        <a href="#founders" onClick={() => setMenuOpen(false)}>Founders</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
      </div>
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  )
}
