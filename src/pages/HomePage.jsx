import { lazy, Suspense } from 'react'
import Hero from '../components/Hero'
import DualMandate from '../components/DualMandate'
import About from '../components/About'
import InvestmentThesis from '../components/InvestmentThesis'
import Team from '../components/Team'
import Partners from '../components/Partners'
import Founders from '../components/Founders'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const WorldMap = lazy(() => import('../components/WorldMap'))
const TombstoneDisplay = lazy(() => import('../components/TombstoneDisplay'))

function SectionLoader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
      <div style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)', fontSize: '0.875rem' }}>
        Loading...
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <DualMandate />
      <About />
      <Suspense fallback={<SectionLoader />}>
        <WorldMap />
      </Suspense>
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
