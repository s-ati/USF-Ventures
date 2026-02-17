import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const forceScrolled = !isHome || scrolled

  const handleAnchorClick = (hash) => {
    setMenuOpen(false)
    if (!isHome) return
    const el = document.querySelector(hash)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={`navbar ${forceScrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
        USF Ventures
      </Link>
      <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        {isHome ? (
          <>
            <a href="#about" onClick={() => handleAnchorClick('#about')}>About</a>
            <a href="#thesis" onClick={() => handleAnchorClick('#thesis')}>Thesis</a>
          </>
        ) : (
          <>
            <Link to="/#about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/#thesis" onClick={() => setMenuOpen(false)}>Thesis</Link>
          </>
        )}
        <Link to="/team" onClick={() => setMenuOpen(false)}>Team</Link>
        <Link to="/partners" onClick={() => setMenuOpen(false)}>Partners</Link>
        <Link to="/success-stories" onClick={() => setMenuOpen(false)}>Stories</Link>
        {isHome ? (
          <>
            <a href="#founders" onClick={() => handleAnchorClick('#founders')}>Founders</a>
            <a href="#contact" onClick={() => handleAnchorClick('#contact')}>Contact</a>
          </>
        ) : (
          <>
            <Link to="/#founders" onClick={() => setMenuOpen(false)}>Founders</Link>
            <Link to="/#contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </>
        )}
      </div>
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  )
}
