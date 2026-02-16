const areas = [
  {
    title: 'Artificial Intelligence',
    description:
      'Foundation models, AI infrastructure, and applied intelligence systems that augment human capabilities and automate complex workflows.',
  },
  {
    title: 'Quantum Computing',
    description:
      'Hardware, software, and applications that leverage quantum mechanics to solve problems beyond the reach of classical computation.',
  },
  {
    title: 'Space & Aerospace',
    description:
      'Next-generation launch systems, satellite infrastructure, and space-enabled services that expand humanity\'s presence beyond Earth.',
  },
  {
    title: 'Robotics & Autonomy',
    description:
      'Intelligent machines and autonomous systems that operate in the physical world, from manufacturing to exploration.',
  },
  {
    title: 'Advanced Materials',
    description:
      'Novel materials and manufacturing processes that unlock new possibilities in energy, computing, and construction.',
  },
  {
    title: 'Biocomputation',
    description:
      'Computational biology, synthetic biology, and bio-inspired computing at the intersection of life sciences and technology.',
  },
]

export default function FocusAreas() {
  return (
    <section className="section-focus">
      <div className="container">
        <div className="grid-12">
          <div className="focus-header">
            <p className="focus-label">Focus Areas</p>
          </div>
          <div className="focus-grid">
            {areas.map((area, i) => (
              <div className="focus-item" key={i}>
                <p className="focus-item-number">{String(i + 1).padStart(2, '0')}</p>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
