import Footer from '../components/Footer'

const partners = [
  { name: 'Plug and Play', logo: '/partners/plug-and-play.svg' },
  { name: 'Y Combinator', logo: '/partners/y-combinator.svg' },
  { name: 'Sequoia Capital', logo: '/partners/sequoia.svg' },
  { name: 'Andreessen Horowitz', logo: '/partners/a16z.svg' },
  { name: 'Kleiner Perkins', logo: '/partners/kleiner-perkins.svg' },
  { name: 'Accel Partners', logo: '/partners/accel.svg' },
  { name: 'Greylock Partners', logo: '/partners/greylock.svg' },
]

function PartnerLogo({ name, logo }) {
  return (
    <div className="marquee-logo" aria-label={name}>
      <img
        src={logo}
        alt={name}
        className="marquee-logo-img"
        loading="lazy"
        draggable="false"
      />
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
                <PartnerLogo key={i} name={p.name} logo={p.logo} />
              ))}
              {partners.map((p, i) => (
                <PartnerLogo key={`dup-${i}`} name={p.name} logo={p.logo} />
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
