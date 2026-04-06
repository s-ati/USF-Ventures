import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      const nextScrolled = window.scrollY > 50
      setScrolled((current) => (current === nextScrolled ? current : nextScrolled))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const forceScrolled = !isHome || scrolled

  const handleAnchorClick = (e, hash) => {
    e.preventDefault()
    setMenuOpen(false)
    if (!isHome) return
    const el = document.querySelector(hash)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={`navbar ${forceScrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="navbar-logo" onClick={(e) => {
        setMenuOpen(false)
        if (isHome) {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }}>
        <span className="navbar-logo-lockup">
          <span className="navbar-logo-usf">
            <span className="navbar-logo-u">U</span>
            <span className="navbar-logo-sf">SF</span>
          </span>
          <img src="/usf-mark.png" alt="USF logo" className="navbar-logo-image" />
          <span className="navbar-logo-text">Ventures</span>
        </span>
      </Link>
      <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        {isHome ? (
          <>
            <a href="#about" onClick={(e) => handleAnchorClick(e, '#about')}>About</a>
            <a href="#ecosystem" onClick={(e) => handleAnchorClick(e, '#ecosystem')}>Ecosystem</a>
            <a href="#thesis" onClick={(e) => handleAnchorClick(e, '#thesis')}>Thesis</a>
            <a href="#team" onClick={(e) => handleAnchorClick(e, '#team')}>Team</a>
            <a href="#partners" onClick={(e) => handleAnchorClick(e, '#partners')}>Partners</a>
            <a href="#founders" onClick={(e) => handleAnchorClick(e, '#founders')}>Founders</a>
            <a href="#contact" onClick={(e) => handleAnchorClick(e, '#contact')}>Contact</a>
          </>
        ) : (
          <>
            <Link to="/#about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/#ecosystem" onClick={() => setMenuOpen(false)}>Ecosystem</Link>
            <Link to="/#thesis" onClick={() => setMenuOpen(false)}>Thesis</Link>
            <Link to="/#team" onClick={() => setMenuOpen(false)}>Team</Link>
            <Link to="/#partners" onClick={() => setMenuOpen(false)}>Partners</Link>
            <Link to="/#founders" onClick={() => setMenuOpen(false)}>Founders</Link>
            <Link to="/#contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </>
        )}
      </div>
      <button
        type="button"
        className="menu-toggle"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  )
}
