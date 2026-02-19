import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import teamData, { teamCategories } from '../data/team'
import Footer from '../components/Footer'

function TeamCard({ member }) {
  const initials = member.name.split(' ').map((n) => n[0]).join('')
  return (
    <Link to={`/team/${member.slug}`} className="tp-card">
      <div className="tp-card-image">
        {member.image ? (
          <img src={member.image} alt={member.name} className={`portrait-${member.slug}`} />
        ) : (
          <div className="team-card-placeholder">{initials}</div>
        )}
        <div className="tp-card-overlay">
          {member.specialty && (
            <span className="tp-card-specialty">{member.specialty}</span>
          )}
        </div>
      </div>
      <h3 className="tp-card-name">{member.name}</h3>
      <p className="tp-card-role">{member.role}</p>
    </Link>
  )
}

export default function TeamPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const sectionRefs = useRef({})
  const tabBarRef = useRef(null)
  const [indicatorStyle, setIndicatorStyle] = useState({})

  useEffect(() => {
    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [activeCategory])

  function updateIndicator() {
    if (!tabBarRef.current) return
    const activeEl = tabBarRef.current.querySelector('.tp-tab.active')
    if (activeEl) {
      setIndicatorStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
      })
    }
  }

  function handleTabClick(key) {
    setActiveCategory(key)
    if (key === 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const el = sectionRefs.current[key]
      if (el) {
        const offset = 200
        const top = el.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }
  }

  const visibleCategories = activeCategory === 'all'
    ? teamCategories
    : teamCategories.filter(({ key }) => key === activeCategory)

  return (
    <>
      <div className="tp-page">
        {/* Hero Banner */}
        <div className="tp-banner">
          <div className="tp-banner-overlay" />
          <div className="tp-banner-content">
            <p className="tp-banner-tag">Our People</p>
            <h1 className="tp-banner-title">Team</h1>
            <p className="tp-banner-subtitle">
              The investors, operators, and advisors behind USF Ventures.
            </p>
          </div>
        </div>

        {/* Sticky Tab Navigation */}
        <div className="tp-tab-wrapper">
          <div className="container">
            <nav className="tp-tab-bar" ref={tabBarRef}>
              <button
                className={`tp-tab${activeCategory === 'all' ? ' active' : ''}`}
                onClick={() => handleTabClick('all')}
              >
                All
              </button>
              {teamCategories.map(({ key, label }) => (
                <button
                  key={key}
                  className={`tp-tab${activeCategory === key ? ' active' : ''}`}
                  onClick={() => handleTabClick(key)}
                >
                  {label}
                </button>
              ))}
              <span className="tp-tab-indicator" style={indicatorStyle} />
            </nav>
          </div>
        </div>

        {/* Team Content */}
        <div className="container">
          <div className="tp-content">
            {visibleCategories.map(({ key, label }) => {
              const members = teamData[key]
              if (!members || members.length === 0) return null
              return (
                <div
                  className="tp-section"
                  key={key}
                  ref={(el) => (sectionRefs.current[key] = el)}
                >
                  <p className="tp-section-label">{label}</p>
                  <div className="tp-grid">
                    {members.map((member) => (
                      <TeamCard key={member.slug} member={member} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
