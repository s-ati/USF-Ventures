import { lazy, Suspense, startTransition, useEffect, useState } from 'react'
import Hero from '../components/Hero'
import DualMandate from '../components/DualMandate'
import About from '../components/About'
import InvestmentThesis from '../components/InvestmentThesis'
import Team from '../components/Team'
import Partners from '../components/Partners'
import Founders from '../components/Founders'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import SectionErrorBoundary from '../components/SectionErrorBoundary'

const WorldMap = lazy(() => import('../components/WorldMap'))
const TombstoneDisplay = lazy(() => import('../components/TombstoneDisplay'))
const WORLD_MAP_DELAY_MS = 5000

function SectionLoader({ message = 'Loading...', minHeight = 400 }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: `${minHeight}px` }}>
      <div style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)', fontSize: '0.875rem' }}>
        {message}
      </div>
    </div>
  )
}

export default function HomePage() {
  const [showWorldMap, setShowWorldMap] = useState(false)

  useEffect(() => {
    // Give the hero a head start before mounting the heavy globe bundle.
    const timeoutId = window.setTimeout(() => {
      startTransition(() => {
        setShowWorldMap(true)
      })
    }, WORLD_MAP_DELAY_MS)

    return () => window.clearTimeout(timeoutId)
  }, [])

  return (
    <>
      <Hero />
      <DualMandate />
      <About />
      {showWorldMap ? (
        <Suspense fallback={<SectionLoader message="Loading global reach..." />}>
          <SectionErrorBoundary fallback={<SectionLoader message="Global reach section unavailable right now." />}>
            <WorldMap />
          </SectionErrorBoundary>
        </Suspense>
      ) : (
        <SectionLoader message="Loading global reach..." minHeight={520} />
      )}
      <Suspense fallback={<SectionLoader />}>
        <TombstoneDisplay />
      </Suspense>
      <InvestmentThesis />
      <Team />
      <Partners />
      <Founders />
      <Contact />
      <Footer />
    </>
  )
}
