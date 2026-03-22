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
function TombstoneCard({ entry, phase, style }) {
  const initials = entry.founder
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .join('')

  return (
    <div className={`tombstone-card tombstone-card--${phase}`} style={style}>
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

/* ---------- Rain line (slim fading green line) ---------- */
function RainLine({ left, speed, delay, brightness, height }) {
  return (
    <div
      className="matrix-line"
      style={{
        left: `${left}%`,
        animationDuration: `${speed}s`,
        animationDelay: `${delay}s`,
        height: `${height}%`,
        '--line-brightness': brightness,
      }}
    />
  )
}

/* ---------- main component ---------- */
export default function TombstoneDisplay() {
  const [activeCards, setActiveCards] = useState([])
  const poolRef = useRef([])
  const indexRef = useRef(0)
  const idCounter = useRef(0)
  const timersRef = useRef([])
  const occupiedRef = useRef(new Set())

  /* Build a shuffled pool of all entries tagged with their section index */
  const allEntries = useMemo(() => {
    const entries = []
    sectionOrder.forEach((section, sIdx) => {
      const sectionEntries = tombstoneData[section].entries
      sectionEntries.forEach((e) => {
        /* Each section owns lanes sIdx*2 and sIdx*2+1 */
        entries.push({ ...e, laneBase: sIdx * 2 })
      })
    })
    return shuffle(entries)
  }, [])

  /* Pick a random lane + row slot that isn't occupied */
  const pickSlot = useCallback(
    (laneBase) => {
      /* Try both sub-lanes and both rows */
      const options = []
      for (let l = 0; l < 2; l++) {
        for (let r = 0; r < 2; r++) {
          const key = `${laneBase + l}-${r}`
          if (!occupiedRef.current.has(key)) {
            options.push({ lane: laneBase + l, row: r, key })
          }
        }
      }
      if (options.length === 0) return null
      return options[Math.floor(Math.random() * options.length)]
    },
    []
  )

  const spawnCard = useCallback(() => {
    if (allEntries.length === 0) return

    /* Try up to 8 entries to find one with a free slot */
    let entry, slot
    for (let attempts = 0; attempts < 8; attempts++) {
      entry = allEntries[indexRef.current % allEntries.length]
      indexRef.current++
      slot = pickSlot(entry.laneBase)
      if (slot) break
    }
    if (!slot) return

    const id = idCounter.current++
    occupiedRef.current.add(slot.key)

    const card = { id, entry, lane: slot.lane, row: slot.row, slotKey: slot.key, phase: 'entering' }

    setActiveCards((prev) => [...prev, card])

    /* Visible after entrance animation */
    const t1 = setTimeout(() => {
      setActiveCards((prev) =>
        prev.map((c) => (c.id === id ? { ...c, phase: 'visible' } : c))
      )
    }, 900)

    /* Start exit */
    const t2 = setTimeout(() => {
      setActiveCards((prev) =>
        prev.map((c) => (c.id === id ? { ...c, phase: 'exiting' } : c))
      )
    }, 4000)

    /* Remove and free slot */
    const t3 = setTimeout(() => {
      occupiedRef.current.delete(slot.key)
      setActiveCards((prev) => prev.filter((c) => c.id !== id))
    }, 5400)

    timersRef.current.push(t1, t2, t3)
  }, [allEntries, pickSlot])

  useEffect(() => {
    /* Stagger initial cards */
    const inits = [
      setTimeout(() => spawnCard(), 300),
      setTimeout(() => spawnCard(), 1000),
      setTimeout(() => spawnCard(), 1800),
      setTimeout(() => spawnCard(), 2600),
    ]

    /* Keep spawning */
    const interval = setInterval(() => {
      spawnCard()
    }, 1600)

    return () => {
      inits.forEach(clearTimeout)
      clearInterval(interval)
      timersRef.current.forEach(clearTimeout)
    }
  }, [spawnCard])

  /* Rain lines — slim fading green lines */
  const lines = useMemo(() => {
    return Array.from({ length: 35 }, (_, i) => ({
      left: (i / 35) * 100 + (Math.random() - 0.5) * 2,
      speed: 4 + Math.random() * 7,
      delay: Math.random() * 12,
      brightness: 0.12 + Math.random() * 0.3,
      height: 15 + Math.random() * 30,
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

      <div className="tombstone-rain">
        {/* Rain lines background */}
        <div className="matrix-rain-bg">
          {lines.map((l, i) => (
            <RainLine key={i} {...l} />
          ))}
        </div>

        {/* Scanline overlay */}
        <div className="matrix-scanlines" />

        {/* Vignette */}
        <div className="matrix-vignette" />

        {/* Section headers */}
        <div className="tombstone-headers">
          {sectionOrder.map((section) => (
            <div key={section} className="tombstone-header">
              {section}
            </div>
          ))}
        </div>

        {/* 8-lane grid where cards fade in/out */}
        <div className="tombstone-lanes">
          {Array.from({ length: 8 }).map((_, laneIdx) => (
            <div key={laneIdx} className="tombstone-lane">
              {/* Row 0 (top half) */}
              <div className="tombstone-slot tombstone-slot--top">
                {activeCards
                  .filter((c) => c.lane === laneIdx && c.row === 0)
                  .map((c) => (
                    <TombstoneCard key={c.id} entry={c.entry} phase={c.phase} />
                  ))}
              </div>
              {/* Row 1 (bottom half) */}
              <div className="tombstone-slot tombstone-slot--bottom">
                {activeCards
                  .filter((c) => c.lane === laneIdx && c.row === 1)
                  .map((c) => (
                    <TombstoneCard key={c.id} entry={c.entry} phase={c.phase} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
