import { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import Globe from 'react-globe.gl'
import globalReachData from '../data/globalReach'

const ACCENT = '#00543C'
const ACCENT_LIGHT = '#2ea87a'
const GLOBE_BG = '#0a0f1a'

export default function WorldMap() {
  const globeRef = useRef()
  const containerRef = useRef()
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })
  const [activePin, setActivePin] = useState(null)
  const [tooltip, setTooltip] = useState(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Check reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const handler = (e) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Responsive sizing
  useEffect(() => {
    function updateSize() {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const w = rect.width
        const h = Math.min(w * 0.75, 700)
        setDimensions({ width: w, height: h })
      }
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  // Auto-rotate
  useEffect(() => {
    if (globeRef.current && !prefersReducedMotion) {
      const controls = globeRef.current.controls()
      controls.autoRotate = true
      controls.autoRotateSpeed = 0.5
      controls.enableZoom = true
      controls.minDistance = 200
      controls.maxDistance = 500
    }
  }, [prefersReducedMotion])

  // Initial point of view
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.pointOfView({ lat: 20, lng: -40, altitude: 2.5 }, 0)
    }
  }, [])

  // Compute max for scaling
  const maxCompanies = useMemo(
    () => Math.max(...globalReachData.map((d) => d.companies)),
    []
  )

  const pointAltitude = useCallback(
    (d) => 0.01 + (d.companies / maxCompanies) * 0.15,
    [maxCompanies]
  )

  const pointRadius = useCallback(
    (d) => 0.3 + (d.companies / maxCompanies) * 0.7,
    [maxCompanies]
  )

  const pointColor = useCallback(
    (d) => (activePin && activePin.country === d.country ? '#ffffff' : ACCENT_LIGHT),
    [activePin]
  )

  const handlePointClick = useCallback((point) => {
    setActivePin((prev) => (prev?.country === point.country ? null : point))
    if (globeRef.current) {
      globeRef.current.pointOfView(
        { lat: point.lat, lng: point.lng, altitude: 1.8 },
        800
      )
    }
  }, [])

  const handlePointHover = useCallback((point) => {
    setTooltip(point || null)
    if (containerRef.current) {
      containerRef.current.style.cursor = point ? 'pointer' : 'default'
    }
  }, [])

  // Ring effect for active pin
  const ringsData = useMemo(
    () => (activePin ? [{ lat: activePin.lat, lng: activePin.lng }] : []),
    [activePin]
  )

  // Total companies
  const totalCompanies = useMemo(
    () => globalReachData.reduce((sum, d) => sum + d.companies, 0),
    []
  )

  const totalCountries = globalReachData.length

  return (
    <section className="world-map-section">
      <div className="container">
        <p className="section-label">Global Reach</p>
        <h2 className="section-heading">Our Founders Across the World</h2>
        <p className="section-subheading">
          USF founders and portfolio companies span {totalCountries} countries
          with {totalCompanies}+ ventures worldwide.
        </p>
      </div>

      <div className="world-map-container" ref={containerRef}>
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          backgroundColor={GLOBE_BG}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
          atmosphereColor={ACCENT}
          atmosphereAltitude={0.2}
          pointsData={globalReachData}
          pointLat="lat"
          pointLng="lng"
          pointAltitude={pointAltitude}
          pointRadius={pointRadius}
          pointColor={pointColor}
          pointsMerge={false}
          onPointClick={handlePointClick}
          onPointHover={handlePointHover}
          ringsData={ringsData}
          ringLat="lat"
          ringLng="lng"
          ringColor={() => ACCENT_LIGHT}
          ringMaxRadius={3}
          ringPropagationSpeed={2}
          ringRepeatPeriod={1000}
          animateIn={!prefersReducedMotion}
        />

        {/* Hover tooltip */}
        {tooltip && !activePin && (
          <div className="world-map-tooltip">
            <strong>{tooltip.country}</strong>
            <span>{tooltip.companies} {tooltip.companies === 1 ? 'company' : 'companies'}</span>
          </div>
        )}

        {/* Click detail panel */}
        {activePin && (
          <div className="world-map-detail">
            <button
              className="world-map-detail-close"
              onClick={() => setActivePin(null)}
              aria-label="Close details"
            >
              &times;
            </button>
            <h3 className="world-map-detail-country">{activePin.country}</h3>
            <div className="world-map-detail-stat">
              <span className="world-map-detail-value">{activePin.companies}</span>
              <span className="world-map-detail-label">
                {activePin.companies === 1 ? 'Company' : 'Companies'}
              </span>
            </div>
            <div className="world-map-detail-industries">
              <span className="world-map-detail-industries-title">Industries</span>
              <div className="world-map-detail-tags">
                {activePin.industries.map((ind) => (
                  <span key={ind} className="world-map-tag">{ind}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stats bar */}
      <div className="world-map-stats">
        <div className="container">
          <div className="world-map-stats-grid">
            <div className="world-map-stat-item">
              <span className="world-map-stat-value">{totalCountries}</span>
              <span className="world-map-stat-label">Countries</span>
            </div>
            <div className="world-map-stat-item">
              <span className="world-map-stat-value">{totalCompanies}+</span>
              <span className="world-map-stat-label">Portfolio Companies</span>
            </div>
            <div className="world-map-stat-item">
              <span className="world-map-stat-value">6</span>
              <span className="world-map-stat-label">Continents</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
