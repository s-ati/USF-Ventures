const companies = [
  'Orbital',
  'Synthex',
  'NeuralPath',
  'QuantumLeap',
  'Aether Systems',
  'DeepField',
  'Axiom AI',
  'Helix Robotics',
  'Stratosphere',
  'Cortex Labs',
  'Fusion Dynamics',
  'Lattice Bio',
  'Prisma Energy',
  'Vector Space',
  'Nexus Computing',
  'Photon Networks',
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="section-portfolio">
      <div className="container">
        <div className="portfolio-header">
          <p className="portfolio-label">Portfolio</p>
          <h2 className="portfolio-heading">
            Companies defining the next era of technology
          </h2>
        </div>
        <div className="portfolio-grid">
          {companies.map((company, i) => (
            <div className="portfolio-item" key={i}>
              <span className="portfolio-item-name">{company}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
