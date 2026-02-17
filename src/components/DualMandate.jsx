export default function DualMandate() {
  return (
    <section className="section-mandate">
      <div className="mandate-grid">
        <div className="mandate-panel mandate-panel--left">
          <p className="mandate-label">Mandate I</p>
          <div className="mandate-divider"></div>
          <h2 className="mandate-heading">Return on Investment</h2>
          <p className="mandate-text">
            We deploy capital with the discipline and rigor of an institutional fund.
            Every investment is evaluated on its potential to generate meaningful
            financial returns for our stakeholders.
          </p>
        </div>
        <div className="mandate-panel mandate-panel--right">
          <p className="mandate-label">Mandate II</p>
          <div className="mandate-divider"></div>
          <h2 className="mandate-heading">Return on Innovation</h2>
          <p className="mandate-text">
            We invest in ideas that push boundaries. Our second mandate measures
            the impact of our portfolio on the broader innovation ecosystem,
            advancing research, knowledge, and real-world solutions.
          </p>
        </div>
      </div>
    </section>
  )
}
