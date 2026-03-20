import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import tombstoneData, { sectionOrder } from '../data/tombstones'

const SECTION_TITLE_DURATION = 5000
const SECTION_DISPLAY_DURATION = 12000
const CARD_SPAWN_INTERVAL = 400

function TombstoneCard({ entry, index, isPaused }) {
  const delay = index * CARD_SPAWN_INTERVAL
  const duration = 6 + Math.random() * 4 // 6-10s fall duration
  const initials = entry.founder
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .join('')

  return (
    <div
      className={`tombstone-card ${isPaused ? 'tombstone-card--paused' : ''}`}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}s`,
      }}
    >
      <div className="tombstone-card-top">
        <div className="tombstone-card-avatar">
          {entry.photo ? (
            <img src={entry.photo} alt={entry.founder} className="tombstone-card-avatar-img" />
          ) : (
            <span className="tombstone-card-initials">{initials}</span>
          )}
        </div>
        <span className="tombstone-card-name">{entry.founder}</span>
      </div>

      <div className="tombstone-card-middle">
        <span className="tombstone-card-company">{entry.company}</span>
        <span className="tombstone-card-industry">{entry.industry}</span>
      </div>

      <div className="tombstone-card-bottom">
        {entry.funding && (
          <span className="tombstone-card-funding">{entry.funding}</span>
        )}
        <span className="tombstone-card-location">{entry.location}</span>
        {entry.year && (
          <span className="tombstone-card-year">{entry.year}</span>
        )}
      </div>

      <div className="tombstone-card-links">
        {entry.linkedIn && entry.linkedIn !== '#' && (
          <a href={entry.linkedIn} target="_blank" rel="noopener noreferrer" aria-label={`${entry.founder} LinkedIn`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
        )}
        {entry.website && entry.website !== '#' && (
          <a href={entry.website} target="_blank" rel="noopener noreferrer" aria-label={`${entry.company} website`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
          </a>
        )}
      </div>
    </div>
  )
}

export default function TombstoneDisplay() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [phase, setPhase] = useState('title') // 'title' | 'cards' | 'fadeout'
  const [isPaused, setIsPaused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const timerRef = useRef(null)
  const displayRef = useRef(null)

  const currentSection = sectionOrder[currentSectionIndex]
  const sectionData = tombstoneData[currentSection]

  // Reduced motion check
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const handler = (e) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Phase cycle logic
  const advancePhase = useCallback(() => {
    if (isPaused) return
    setPhase((prev) => {
      if (prev === 'title') return 'cards'
      if (prev === 'cards') return 'fadeout'
      // fadeout -> next section title
      setCurrentSectionIndex((i) => (i + 1) % sectionOrder.length)
      return 'title'
    })
  }, [isPaused])

  useEffect(() => {
    if (isPaused) return
    let duration
    if (phase === 'title') duration = SECTION_TITLE_DURATION
    else if (phase === 'cards') duration = SECTION_DISPLAY_DURATION
    else duration = 1000 // fadeout

    timerRef.current = setTimeout(advancePhase, duration)
    return () => clearTimeout(timerRef.current)
  }, [phase, advancePhase, isPaused])

  const handleMouseEnter = useCallback(() => setIsPaused(true), [])
  const handleMouseLeave = useCallback(() => setIsPaused(false), [])

  // Arrange cards in a grid layout (no falling) for reduced motion
  const cardClass = prefersReducedMotion
    ? 'tombstone-cards tombstone-cards--static'
    : 'tombstone-cards'

  return (
    <section className="tombstone-section">
      <div className="container">
        <p className="section-label">Portfolio</p>
        <h2 className="section-heading">USF Ventures Ecosystem</h2>
        <p className="section-subheading">
          Explore the founders, partners, and professionals that make up the USF Ventures network.
        </p>
      </div>

      <div
        className="tombstone-display"
        ref={displayRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Section indicator dots */}
        <div className="tombstone-nav">
          {sectionOrder.map((name, i) => (
            <button
              key={name}
              className={`tombstone-nav-dot ${i === currentSectionIndex ? 'tombstone-nav-dot--active' : ''}`}
              onClick={() => {
                setCurrentSectionIndex(i)
                setPhase('title')
              }}
              aria-label={name}
            />
          ))}
        </div>

        {/* Title phase */}
        <div className={`tombstone-title ${phase === 'title' ? 'tombstone-title--visible' : ''}`}>
          <h3 className="tombstone-title-text">{currentSection}</h3>
          <p className="tombstone-title-sub">{sectionData?.subtitle}</p>
        </div>

        {/* Cards phase */}
        <div className={`${cardClass} ${phase === 'cards' ? 'tombstone-cards--visible' : ''} ${phase === 'fadeout' ? 'tombstone-cards--fadeout' : ''}`}>
          {sectionData?.entries.map((entry, i) => (
            <TombstoneCard
              key={`${currentSection}-${entry.founder}`}
              entry={entry}
              index={i}
              isPaused={isPaused}
            />
          ))}
        </div>

        {/* Pause indicator */}
        {isPaused && (
          <div className="tombstone-paused-indicator">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
            <span>Paused</span>
          </div>
        )}
      </div>
    </section>
  )
}
