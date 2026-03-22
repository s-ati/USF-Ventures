import { useState, useEffect, useMemo, useRef } from 'react'
import tombstoneData, { sectionOrder } from '../data/tombstones'

/* Shuffle helper */
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/* ---------- single card ---------- */
function TombstoneCard({ entry, style, className }) {
  const initials = entry.founder
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .join('')

  return (
    <div className={`tombstone-card ${className || ''}`} style={style}>
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

/* ---------- Matrix rain characters column ---------- */
function RainColumn({ left, speed, delay }) {
  /* Generate random katakana-like chars */
  const chars = useMemo(() => {
    const pool = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789'
    return Array.from({ length: 25 }, () =>
      pool[Math.floor(Math.random() * pool.length)]
    ).join('\n')
  }, [])

  return (
    <div
      className="matrix-rain-col"
      style={{
        left: `${left}%`,
        animationDuration: `${speed}s`,
        animationDelay: `${delay}s`,
      }}
    >
      {chars}
    </div>
  )
}

/* ---------- single lane (sub-column) ---------- */
function RainLane({ entries, speed }) {
  const doubled = useMemo(() => [...entries, ...entries], [entries])

  return (
    <div className="tombstone-lane">
      <div
        className="tombstone-lane-track"
        style={{ '--lane-speed': `${speed}s` }}
      >
        {doubled.map((entry, i) => (
          <TombstoneCard key={`${entry.founder}-${i}`} entry={entry} />
        ))}
      </div>
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

  /* Build 8 lanes: 2 per section, each with shuffled entries */
  const lanes = useMemo(() => {
    const result = []
    sectionOrder.forEach((section) => {
      const entries = tombstoneData[section].entries
      if (entries.length === 0) {
        /* Empty section: 2 empty lanes */
        result.push({ section, entries: [] })
        result.push({ section, entries: [] })
        return
      }
      const shuffled = shuffle(entries)
      const mid = Math.ceil(shuffled.length / 2)
      result.push({ section, entries: shuffled.slice(0, mid) })
      result.push({ section, entries: shuffled.slice(mid) })
    })
    return result
  }, [])

  /* Varying speeds for each of the 8 lanes */
  const speeds = [26, 32, 22, 28, 24, 30, 20, 34]

  /* Matrix rain background columns */
  const rainCols = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      left: 3 + (i / 20) * 94 + (Math.random() - 0.5) * 3,
      speed: 4 + Math.random() * 6,
      delay: Math.random() * 8,
    }))
  }, [])

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
        className={`tombstone-rain${isPaused ? ' tombstone-rain--paused' : ''}${prefersReducedMotion ? ' tombstone-rain--static' : ''}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Matrix green rain background */}
        <div className="matrix-rain-bg">
          {rainCols.map((col, i) => (
            <RainColumn key={i} {...col} />
          ))}
        </div>

        {/* Section headers spanning 2 lanes each */}
        <div className="tombstone-headers">
          {sectionOrder.map((section) => (
            <div key={section} className="tombstone-header">
              {section}
            </div>
          ))}
        </div>

        {/* 8 rain lanes */}
        <div className="tombstone-lanes">
          {lanes.map((lane, i) => (
            <RainLane
              key={`lane-${i}`}
              entries={lane.entries}
              speed={speeds[i]}
            />
          ))}
        </div>

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
