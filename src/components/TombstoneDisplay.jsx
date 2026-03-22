import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
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
      {entry.section && (
        <div className="tombstone-card-section-label">{entry.section}</div>
      )}
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
  const [activeCards, setActiveCards] = useState([])
  const poolRef = useRef([])
  const indexRef = useRef(0)
  const idCounter = useRef(0)
  const timersRef = useRef([])

  /* Build a shuffled pool of all entries with section labels */
  const allEntries = useMemo(() => {
    const entries = []
    sectionOrder.forEach((section) => {
      const sectionEntries = tombstoneData[section].entries
      if (sectionEntries.length > 0) {
        sectionEntries.forEach((e) => {
          entries.push({ ...e, section })
        })
      }
    })
    return shuffle(entries)
  }, [])

  /* Grid positions — 4 columns x 3 rows = 12 slots, pick randomly */
  const getRandomSlot = useCallback(() => {
    const col = Math.floor(Math.random() * 4)
    const row = Math.floor(Math.random() * 3)
    return { col, row }
  }, [])

  /* Spawn a card: pick next entry, assign random grid slot, fade in then out */
  const spawnCard = useCallback(() => {
    if (allEntries.length === 0) return

    const entry = allEntries[indexRef.current % allEntries.length]
    indexRef.current++

    const { col, row } = getRandomSlot()
    const id = idCounter.current++

    const card = { id, entry, col, row, phase: 'entering' }

    setActiveCards((prev) => {
      /* limit to 4 cards max on screen */
      const limited = prev.length >= 4 ? prev.slice(1) : prev
      return [...limited, card]
    })

    /* After fade-in completes, mark as visible */
    const t1 = setTimeout(() => {
      setActiveCards((prev) =>
        prev.map((c) => (c.id === id ? { ...c, phase: 'visible' } : c))
      )
    }, 800)

    /* Start fade-out after display time */
    const t2 = setTimeout(() => {
      setActiveCards((prev) =>
        prev.map((c) => (c.id === id ? { ...c, phase: 'exiting' } : c))
      )
    }, 3500)

    /* Remove after fade-out */
    const t3 = setTimeout(() => {
      setActiveCards((prev) => prev.filter((c) => c.id !== id))
    }, 4800)

    timersRef.current.push(t1, t2, t3)
  }, [allEntries, getRandomSlot])

  useEffect(() => {
    /* Spawn first few cards staggered */
    const initialTimers = [
      setTimeout(() => spawnCard(), 200),
      setTimeout(() => spawnCard(), 1200),
      setTimeout(() => spawnCard(), 2400),
    ]

    /* Then keep spawning at interval */
    const interval = setInterval(() => {
      spawnCard()
    }, 1800)

    return () => {
      initialTimers.forEach(clearTimeout)
      clearInterval(interval)
      timersRef.current.forEach(clearTimeout)
    }
  }, [spawnCard])

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

      <div className="tombstone-rain">
        {/* Matrix rain background lines */}
        <div className="tombstone-rain-bg">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="tombstone-rain-line"
              style={{
                left: `${8 + (i % 4) * 24 + Math.random() * 8}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Floating tombstone cards */}
        {activeCards.map((card) => (
          <TombstoneCard
            key={card.id}
            entry={card.entry}
            className={`tombstone-rain-card tombstone-rain-card--${card.phase}`}
            style={{
              '--rain-col': card.col,
              '--rain-row': card.row,
            }}
          />
        ))}
      </div>
    </section>
  )
}
