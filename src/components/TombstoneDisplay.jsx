import { useState, useEffect, useMemo } from 'react'
import tombstoneData, { sectionOrder } from '../data/tombstones'

/* Shuffle helper – runs once on mount for random order */
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/* ---------- single card ---------- */
function TombstoneCard({ entry }) {
  const initials = entry.founder
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .join('')

  return (
    <div className="tombstone-card">
      <div className="tombstone-card-top">
        <div className="tombstone-card-avatar">
          {entry.photo ? (
            <img
              src={entry.photo}
              alt={entry.founder}
              className="tombstone-card-avatar-img"
            />
          ) : (
            <span className="tombstone-card-initials">{initials}</span>
          )}
        </div>
        <span className="tombstone-card-name">{entry.founder}</span>
      </div>

      <div className="tombstone-card-middle">
        <span className="tombstone-card-company">{entry.company}</span>
      </div>

      {entry.funding && (
        <div className="tombstone-card-highlight">
          <span className="tombstone-card-funding">
            Raised {entry.funding}
          </span>
          {entry.year && (
            <span className="tombstone-card-year"> in {entry.year}</span>
          )}
        </div>
      )}
    </div>
  )
}

/* ---------- main component ---------- */
export default function TombstoneDisplay() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const handler = (e) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  /* Shuffle entries once on mount */
  const columns = useMemo(
    () =>
      sectionOrder.map((section) => ({
        name: section,
        entries: shuffle(tombstoneData[section].entries),
      })),
    []
  )

  /* Each column scrolls at a distinct speed for variety (seconds) */
  const speeds = [38, 48, 42, 52]

  return (
    <section className="tombstone-section">
      <div className="container">
        <p className="section-label">Portfolio</p>
        <h2 className="section-heading">USF Ventures Ecosystem</h2>
        <p className="section-subheading">
          Explore the founders, partners, and professionals that make up the USF
          Ventures network.
        </p>
      </div>

      <div
        className={`tombstone-matrix${isPaused ? ' tombstone-matrix--paused' : ''}${prefersReducedMotion ? ' tombstone-matrix--static' : ''}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {columns.map((col, colIdx) => (
          <div className="tombstone-column" key={col.name}>
            <div className="tombstone-column-header">{col.name}</div>
            <div className="tombstone-column-track-wrapper">
              <div
                className="tombstone-column-track"
                style={{ '--scroll-speed': `${speeds[colIdx]}s` }}
              >
                {/* duplicate for seamless infinite loop */}
                {[...col.entries, ...col.entries].map((entry, i) => (
                  <TombstoneCard
                    key={`${entry.founder}-${i}`}
                    entry={entry}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}

        {isPaused && (
          <div className="tombstone-paused-indicator">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
            <span>Paused</span>
          </div>
        )}
      </div>
    </section>
  )
}
