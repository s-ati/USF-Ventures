export default function About() {
  return (
    <section id="about" className="section section--alt">
      <div className="container">
        <p className="section-label">About</p>
        <h2 className="section-heading">
          A venture fund rooted in San Francisco.
        </h2>
        <p className="section-subheading">
          USF Ventures operates at the intersection of institutional capital and
          academic innovation, and the Entrepreneurship for All initiative.
        </p>

        <div className="about-grid">
          <div>
            <p className="about-block-label">Who We Are</p>
            <h3 className="about-block-heading">
              University-backed. Founder-focused.
            </h3>
            <p className="about-block-text">
              USF Ventures is an early-stage venture fund managed by students, faculty,
              and alumni of the University of San Francisco. We bring institutional
              credibility and academic rigor to the venture capital process, while
              maintaining the agility and conviction that early-stage investing demands.
            </p>
          </div>
          <div>
            <p className="about-block-label">Why San Francisco</p>
            <h3 className="about-block-heading">
              At the center of global innovation.
            </h3>
            <p className="about-block-text">
              At the center of global innovation. Change the World from here. San
              Francisco remains the world&apos;s most concentrated ecosystem for
              technology startups, venture capital, and most recently, Artificial
              Intelligence.
            </p>
          </div>
        </div>

        <div className="about-stats">
          <div>
            <p className="about-stat-value">San Francisco</p>
            <p className="about-stat-label">Headquartered at USF</p>
          </div>
          <div>
            <p className="about-stat-value">Seed &amp; Series A</p>
            <p className="about-stat-label">Investment stage focus</p>
          </div>
          <div>
            <p className="about-stat-value">Dual Mandate</p>
            <p className="about-stat-label">Returns &amp; Innovation</p>
          </div>
        </div>
      </div>
    </section>
  )
}
