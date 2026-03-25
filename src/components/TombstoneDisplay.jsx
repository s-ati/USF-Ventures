import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import tombstoneData, { sectionOrder } from '../data/tombstones'

/* Shuffle helper (Fisher-Yates) */
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/* ---------- single card ---------- */
function TombstoneCard({ entry, phase }) {
  const initials = entry.founder
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .join('')

  return (
    <div className={`tombstone-card tombstone-card--${phase}`}>
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
const CARDS_PER_SECTION = 5
const COLS = 5
const ROWS = 3
const TOTAL_SLOTS = COLS * ROWS

/* Timing constants (ms) */
const SPAWN_STAGGER = 500       // delay between each card spawn
const VISIBLE_HOLD = 3500       // how long all 5 stay visible after last spawns
const EXIT_STAGGER = 300        // delay between each card exit start
const EXIT_DURATION = 1400      // CSS exit animation duration
const SECTION_GAP = 800         // pause between sections

export default function TombstoneDisplay() {
  const [activeCards, setActiveCards] = useState([])
  const [currentSection, setCurrentSection] = useState(0)
  const [headerPhase, setHeaderPhase] = useState('visible') // 'visible' | 'exiting' | 'entering'
  const idCounter = useRef(0)
  const timersRef = useRef([])
  const sectionIdxRef = useRef(0)

  /* Per-section shuffled queues — cycle through every entry before repeating */
  const queuesRef = useRef(
    sectionOrder.map((s) => shuffle([...tombstoneData[s].entries]))
  )

  /* Get next N entries from a section queue (reshuffles when exhausted) */
  const getEntries = useCallback((sIdx, count) => {
    const result = []
    for (let i = 0; i < count; i++) {
      if (queuesRef.current[sIdx].length === 0) {
        queuesRef.current[sIdx] = shuffle([...tombstoneData[sectionOrder[sIdx]].entries])
      }
      result.push(queuesRef.current[sIdx].pop())
    }
    return result
  }, [])

  /* Pick N random non-adjacent slots from the grid */
  const pickSlots = useCallback((count) => {
    const available = []
    for (let c = 0; c < COLS; c++) {
      for (let r = 0; r < ROWS; r++) {
        available.push({ col: c, row: r })
      }
    }
    const shuffled = shuffle(available)
    const chosen = []

    for (const slot of shuffled) {
      if (chosen.length >= count) break
      // Check no adjacent (horizontally) slots already chosen
      const hasAdj = chosen.some(
        (s) => Math.abs(s.col - slot.col) <= 1 && s.row === slot.row
      )
      if (!hasAdj) chosen.push(slot)
    }

    // If adjacency constraint was too strict, fill remaining with any unused slot
    if (chosen.length < count) {
      const usedKeys = new Set(chosen.map((s) => `${s.col}-${s.row}`))
      for (const slot of shuffled) {
        if (chosen.length >= count) break
        const key = `${slot.col}-${slot.row}`
        if (!usedKeys.has(key)) {
          chosen.push(slot)
          usedKeys.add(key)
        }
      }
    }

    return chosen
  }, [])

  /* Run one full section cycle: spawn 5, hold, exit, then trigger next */
  const runSection = useCallback((sIdx) => {
    const entries = getEntries(sIdx, CARDS_PER_SECTION)
    const slots = pickSlots(CARDS_PER_SECTION)
    const cardIds = []

    // Update header
    setCurrentSection(sIdx)
    setHeaderPhase('entering')
    const hTimer = setTimeout(() => setHeaderPhase('visible'), 600)
    timersRef.current.push(hTimer)

    // Stagger spawn each card
    entries.forEach((entry, i) => {
      const spawnDelay = i * SPAWN_STAGGER
      const t = setTimeout(() => {
        const id = idCounter.current++
        cardIds.push(id)
        const card = {
          id,
          entry,
          col: slots[i].col,
          row: slots[i].row,
          phase: 'entering',
        }
        setActiveCards((prev) => [...prev, card])

        // Transition to visible
        const t1 = setTimeout(() => {
          setActiveCards((prev) =>
            prev.map((c) => (c.id === id ? { ...c, phase: 'visible' } : c))
          )
        }, 900)
        timersRef.current.push(t1)
      }, spawnDelay)
      timersRef.current.push(t)
    })

    // After all spawned + hold time, start exiting
    const allSpawnedAt = (CARDS_PER_SECTION - 1) * SPAWN_STAGGER + 900
    const exitStart = allSpawnedAt + VISIBLE_HOLD

    // Exit header
    const hExitTimer = setTimeout(() => setHeaderPhase('exiting'), exitStart)
    timersRef.current.push(hExitTimer)

    // Stagger exit each card
    for (let i = 0; i < CARDS_PER_SECTION; i++) {
      const exitDelay = exitStart + i * EXIT_STAGGER
      const t = setTimeout(() => {
        setActiveCards((prev) => {
          // Find the i-th card that's still visible/entering
          const visibleCards = prev.filter(
            (c) => c.phase === 'visible' || c.phase === 'entering'
          )
          if (visibleCards.length === 0) return prev
          const cardToExit = visibleCards[0]
          return prev.map((c) =>
            c.id === cardToExit.id ? { ...c, phase: 'exiting' } : c
          )
        })
      }, exitDelay)
      timersRef.current.push(t)
    }

    // Clean up all cards and start next section
    const cleanupAt = exitStart + (CARDS_PER_SECTION - 1) * EXIT_STAGGER + EXIT_DURATION
    const cleanupTimer = setTimeout(() => {
      setActiveCards([])
    }, cleanupAt)
    timersRef.current.push(cleanupTimer)

    // Start next section
    const nextTimer = setTimeout(() => {
      const nextIdx = (sIdx + 1) % sectionOrder.length
      sectionIdxRef.current = nextIdx
      runSection(nextIdx)
    }, cleanupAt + SECTION_GAP)
    timersRef.current.push(nextTimer)
  }, [getEntries, pickSlots])

  useEffect(() => {
    // Start the first section after a brief delay
    const initTimer = setTimeout(() => runSection(0), 400)
    timersRef.current.push(initTimer)

    return () => {
      timersRef.current.forEach(clearTimeout)
    }
  }, [runSection])

  /* Rain lines */
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

        {/* Single animated section header */}
        <div className="tombstone-headers">
          <div className={`tombstone-header tombstone-header--${headerPhase}`}>
            {sectionOrder[currentSection]}
          </div>
        </div>

        {/* 5-col × 3-row grid where cards fade in/out */}
        <div className="tombstone-lanes">
          {Array.from({ length: COLS }).map((_, colIdx) => (
            <div key={colIdx} className="tombstone-lane">
              {Array.from({ length: ROWS }).map((_, rowIdx) => (
                <div
                  key={rowIdx}
                  className={`tombstone-slot tombstone-slot--row${rowIdx}`}
                >
                  {activeCards
                    .filter((c) => c.col === colIdx && c.row === rowIdx)
                    .map((c) => (
                      <TombstoneCard key={c.id} entry={c.entry} phase={c.phase} />
                    ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
