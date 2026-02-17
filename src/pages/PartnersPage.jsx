import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const partners = [
  { name: 'Plug and Play', initials: 'P&P' },
  { name: 'Y Combinator', initials: 'YC' },
  { name: 'Sequoia Capital', initials: 'SQ' },
  { name: 'Andreessen Horowitz', initials: 'a16z' },
  { name: 'Kleiner Perkins', initials: 'KP' },
  { name: 'Accel Partners', initials: 'ACCEL' },
  { name: 'Greylock Partners', initials: 'GL' },
]

function PartnerLogo({ name, initials }) {
  return (
    <div className="marquee-logo" aria-label={name}>
      <div className="marquee-logo-inner">
        <span className="marquee-logo-initials">{initials}</span>
        <span className="marquee-logo-name">{name}</span>
      </div>
    </div>
  )
}

export default function PartnersPage() {
  return (
    <>
      <div className="partners-page">
        <div className="container">
          <div className="partners-header">
            <h1 className="partners-title">Partners</h1>
            <p className="partners-subtitle">
              Collaborating with leading venture firms, institutions, and ecosystem partners.
            </p>
          </div>
        </div>

        <div className="marquee-section">
          <div className="marquee-track">
            <div className="marquee-content">
              {partners.map((p, i) => (
                <PartnerLogo key={i} name={p.name} initials={p.initials} />
              ))}
              {partners.map((p, i) => (
                <PartnerLogo key={`dup-${i}`} name={p.name} initials={p.initials} />
              ))}
            </div>
          </div>
        </div>

        <div className="container">
          <div className="partners-statement">
            <p>
              We partner with leading venture firms and ecosystem institutions to support
              USF founders at every stage of growth.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
