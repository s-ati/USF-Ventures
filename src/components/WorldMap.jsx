import { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import Globe from 'react-globe.gl'
import { feature } from 'topojson-client'
import * as THREE from 'three'
import globalReachData from '../data/globalReach'

const BG_COLOR = '#f0f0ee'

// Globe material — matches the non-highlighted polygon colour so any
// z-fighting between the sphere surface and polygon edges is invisible.
const GLOBE_MATERIAL = new THREE.MeshPhongMaterial({
  color: new THREE.Color('#ebebE8'),
  transparent: true,
  opacity: 0.95,
})

// Map country names to ISO numeric codes used by world-atlas topojson
const COUNTRY_ISO_NUM = {
  'United States': '840',
  Turkey: '792',
  'United Kingdom': '826',
  Indonesia: '360',
  Taiwan: '158',
  'Hong Kong': '344',
  'The Netherlands': '528',
  Singapore: '702',
  France: '250',
  India: '356',
  Australia: '036',
  Luxembourg: '442',
  Brazil: '076',
  Ghana: '288',
  'United Arab Emirates': '784',
  Egypt: '818',
  'South Africa': '710',
  China: '156',
  Poland: '616',
  Sweden: '752',
  Canada: '124',
  Mali: '466',
}

// Build lookup from numeric ISO to company count
function buildCountryLookup() {
  const map = {}
  globalReachData.forEach((d) => {
    const id = COUNTRY_ISO_NUM[d.country]
    if (id) map[id] = d.companies
  })
  return map
}

const countryLookup = buildCountryLookup()
const maxCompanies = Math.max(...globalReachData.map((d) => d.companies))

// Green heatmap: lighter for fewer, darker for more
function getCountryColor(companies) {
  if (!companies) return 'rgba(235, 235, 232, 0.7)' // very light grey for non-highlighted
  const ratio = Math.log(companies + 1) / Math.log(maxCompanies + 1)
  // From light green #b8e6c8 to dark green #00543C
  const r = Math.round(184 - ratio * 184)
  const g = Math.round(230 - ratio * (230 - 84))
  const b = Math.round(200 - ratio * (200 - 60))
  return `rgb(${r}, ${g}, ${b})`
}

export default function WorldMap() {
  const globeRef = useRef()
  const containerRef = useRef()
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })
  const [countries, setCountries] = useState([])
  const [hoverD, setHoverD] = useState(null)
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
        const h = Math.min(w * 0.75, 620)
        setDimensions({ width: w, height: h })
      }
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  // Load GeoJSON for country polygons
  useEffect(() => {
    fetch('https://unpkg.com/world-atlas@2.0.2/countries-50m.json')
      .then((r) => r.json())
      .then((data) => {
        const features = feature(data, data.objects.countries).features
        setCountries(features)
      })
  }, [])

  // Auto-rotate
  useEffect(() => {
    if (globeRef.current && !prefersReducedMotion) {
      const controls = globeRef.current.controls()
      controls.autoRotate = true
      controls.autoRotateSpeed = 0.4
      controls.enableZoom = false
    }
  }, [prefersReducedMotion])

  // Initial point of view
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.pointOfView({ lat: 20, lng: -40, altitude: 2.2 }, 0)
    }
  }, [])

  const polygonColor = useCallback((feat) => {
    const id = feat.id || feat.properties?.id
    const companies = countryLookup[id] || 0
    return getCountryColor(companies)
  }, [])

  const polygonStroke = useCallback(() => 'rgba(0,0,0,0)', [])

  const polygonSideColor = useCallback(() => 'rgba(0, 0, 0, 0.04)', [])

  const polygonAltitude = useCallback(() => 0.006, [])

  const handlePolygonHover = useCallback((feat) => {
    setHoverD(feat)
    if (feat) {
      const id = feat.id || feat.properties?.id
      const companies = countryLookup[id] || 0
      if (companies) {
        const entry = globalReachData.find(
          (d) => COUNTRY_ISO_NUM[d.country] === id
        )
        if (entry) {
          setTooltip({
            name: entry.country,
            companies: entry.companies,
          })
        }
      } else {
        setTooltip(null)
      }
    } else {
      setTooltip(null)
    }
    if (containerRef.current) {
      const id = feat?.id || feat?.properties?.id
      const companies = feat ? countryLookup[id] || 0 : 0
      containerRef.current.style.cursor = companies ? 'pointer' : 'default'
    }
  }, [])

  // Total companies
  const totalCompanies = useMemo(
    () => globalReachData.reduce((sum, d) => sum + d.companies, 0),
    []
  )

  const internationalCompanies = useMemo(
    () =>
      globalReachData
        .filter((d) => d.country !== 'United States')
        .reduce((sum, d) => sum + d.companies, 0),
    []
  )

  const totalCountries = globalReachData.length

  return (
    <section className="world-map-section">
      <div className="container">
        <p className="section-label">Global Reach</p>
        <h2 className="section-heading">USF Founders Across the World</h2>
        <p className="section-subheading">
          USF has a truly global footprint, with alumni companies spanning{' '}
          {totalCountries} countries worldwide. With more than 137 companies in
          the United States and around {internationalCompanies} companies
          internationally, USF founders represent a diverse range of industries
          across North America, Europe, Asia, and beyond.
        </p>
      </div>

      <div className="world-map-container" ref={containerRef}>
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          backgroundColor={BG_COLOR}
          showGlobe={true}
          globeMaterial={GLOBE_MATERIAL}
          showAtmosphere={true}
          atmosphereColor="rgba(46, 168, 122, 0.15)"
          atmosphereAltitude={0.15}
          polygonsData={countries}
          polygonCapColor={polygonColor}
          polygonSideColor={polygonSideColor}
          polygonStrokeColor={polygonStroke}
          polygonAltitude={polygonAltitude}
          polygonLabel={null}
          onPolygonHover={handlePolygonHover}
          showGraticules={false}
          animateIn={!prefersReducedMotion}
        />

        {/* Hover tooltip */}
        {tooltip && (
          <div className="world-map-tooltip">
            <strong>{tooltip.name}</strong>
            <span>
              {tooltip.companies}{' '}
              {tooltip.companies === 1 ? 'company' : 'companies'}
            </span>
          </div>
        )}

        {/* Heatmap legend */}
        <div className="world-map-legend">
          <span className="world-map-legend-label">Fewer</span>
          <div className="world-map-legend-bar" />
          <span className="world-map-legend-label">More</span>
        </div>
      </div>

      {/* Key Stats */}
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
            <div className="world-map-stat-item">
              <span className="world-map-stat-value">$3.97B</span>
              <span className="world-map-stat-label">
                Total Capital Invested
              </span>
            </div>
            <div className="world-map-stat-item">
              <span className="world-map-stat-value">$585M</span>
              <span className="world-map-stat-label">Largest Investment</span>
            </div>
            <div className="world-map-stat-item">
              <span className="world-map-stat-value">50</span>
              <span className="world-map-stat-label">Acquired</span>
            </div>
          </div>
        </div>
      </div>

      {/* IPO Highlights */}
      <div className="world-map-ipos">
        <div className="container">
          <h3 className="world-map-ipos-heading">IPO Highlights</h3>
          <div className="world-map-ipos-grid">
            <div className="world-map-ipo-card">
              <span className="world-map-ipo-name">Grocery Outlet</span>
              <span className="world-map-ipo-detail">
                IPO 2019 &middot; $439M raised
              </span>
              <span className="world-map-ipo-ticker">NASDAQ: GO</span>
            </div>
            <div className="world-map-ipo-card">
              <span className="world-map-ipo-name">Five9</span>
              <span className="world-map-ipo-detail">
                IPO 2014 &middot; $861.6M raised
              </span>
              <span className="world-map-ipo-ticker">NASDAQ: FIVN</span>
            </div>
            <div className="world-map-ipo-card">
              <span className="world-map-ipo-name">Prenetics</span>
              <span className="world-map-ipo-detail">
                SPAC IPO 2022 &middot; $235.65M raised
              </span>
              <span className="world-map-ipo-ticker">NASDAQ: PRE</span>
            </div>
          </div>
          <p className="world-map-closing">
            This broad geographic distribution and strong financial backing
            highlight the international success and global impact of our
            founders truly following the motto to{' '}
            <span className="world-map-closing-highlight">
              CHANGE THE WORLD FROM HERE
            </span>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
