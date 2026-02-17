const partners = [
  { name: 'Ecosystem Ventures', logo: '/partners/ecosystem-ventures.jpg' },
  { name: 'One Way Ventures', logo: '/partners/one-way-ventures.jpg' },
  { name: 'Manhattan Venture Partners', logo: '/partners/manhattan-venture-partners.jpg' },
  { name: 'Untapped Ventures', logo: '/partners/untapped-ventures.jpg' },
  { name: 'Hustle Fund', logo: '/partners/hustle-fund.jpg' },
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

export default function Partners() {
  return (
    <section id="partners" className="partners-page">
      <div className="container">
        <div className="partners-header">
          <h2 className="partners-title">Partners</h2>
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
            We partner with leading venture firms and ecosystem institutions for
            co-investment opportunities and to support USF founders at every stage of growth.
          </p>
        </div>
      </div>
    </section>
  )
}
