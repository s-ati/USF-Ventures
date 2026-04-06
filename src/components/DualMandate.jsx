export default function DualMandate() {
  return (
    <section className="section-mandate">
      <h2 className="mandate-section-title">Dual Mandate</h2>
      <div className="mandate-grid">
        <div className="mandate-panel mandate-panel--left">
          <div className="mandate-divider"></div>
          <h3 className="mandate-heading">Return on Investment</h3>
          <p className="mandate-text">
            We deploy capital with the discipline and rigor of an institutional fund.
            Every investment is evaluated on its potential to generate meaningful
            venture asset class financial returns for our stakeholders.
          </p>
        </div>
        <div className="mandate-panel mandate-panel--right">
          <div className="mandate-divider"></div>
          <h3 className="mandate-heading">Return on Innovation</h3>
          <p className="mandate-text">
            We invest in the future of USF and the people that make up the USF community.
            We help drive success in USF Founders and USF Venture Capitalists. We provide
            world-class experiences for students, from paid internships to broader initiatives
            across campus in partnership with{' '}
            <a
              className="mandate-inline-link"
              href="https://www.usfca.edu/entrepreneurship-for-all-initiative"
              target="_blank"
              rel="noreferrer"
            >
              Entrepreneurship for All
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
