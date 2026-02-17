import { Link } from 'react-router-dom'

const fundingData = [
  { label: 'Pre-Seed', value: 25 },
  { label: 'Seed', value: 40 },
  { label: 'Series A', value: 55 },
  { label: 'Series B+', value: 30 },
]

const founders = [
  {
    name: 'Germain Bahri',
    company: 'ZaZu',
    description:
      'USF 2015 SOM alum. Raised $1M in December 2025 for ZaZu, an innovative tech startup led by Plug and Play. Actively exploring future growth rounds.',
    quote: "I'd love to have USF Ventures on the cap table.",
  },
  {
    name: 'Pablo Hansen',
    company: 'Proliferate',
    description:
      'Founder of Proliferate (YC S25), an autonomous engineering organization where coding agents and operators build together faster. Raised $5.2M seed after YC.',
    quote: "It's great to have a USF-specific venture fund.",
  },
  {
    name: 'Caroline Early',
    company: 'Pillar',
    description:
      "Founder & Co-CEO of Pillar (YC S21), a white-label healthcare enablement platform. Previously exited a women's health company to P&G (2019). Preparing Pillar for future exit.",
    quote:
      "I'd love to have USF Ventures on a term sheet in a future company.",
  },
]

function BarChart() {
  const maxVal = Math.max(...fundingData.map((d) => d.value))

  return (
    <div className="ss-chart-card">
      <h3 className="ss-chart-title">Funding by Type</h3>
      <div className="ss-bar-chart">
        {fundingData.map((d) => (
          <div className="ss-bar-group" key={d.label}>
            <div className="ss-bar-track">
              <div
                className="ss-bar-fill"
                style={{ height: `${(d.value / maxVal) * 100}%` }}
              />
            </div>
            <span className="ss-bar-label">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DonutChart() {
  const acquisition = 92
  const ipo = 8
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const acqLen = (acquisition / 100) * circumference
  const ipoLen = (ipo / 100) * circumference

  return (
    <div className="ss-chart-card">
      <h3 className="ss-chart-title">Exit Split</h3>
      <div className="ss-donut-wrapper">
        <svg className="ss-donut" viewBox="0 0 128 128" aria-label="Exit split: 92% acquisition, 8% IPO">
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke="var(--color-border-light)"
            strokeWidth="16"
          />
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="16"
            strokeDasharray={`${acqLen} ${circumference}`}
            strokeDashoffset="0"
            transform="rotate(-90 64 64)"
            strokeLinecap="butt"
          />
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke="#3a7d5c"
            strokeWidth="16"
            strokeDasharray={`${ipoLen} ${circumference}`}
            strokeDashoffset={`-${acqLen}`}
            transform="rotate(-90 64 64)"
            strokeLinecap="butt"
          />
        </svg>
        <div className="ss-donut-legend">
          <div className="ss-legend-item">
            <span className="ss-legend-dot ss-legend-dot--acq" />
            <span>Acquisition (92%)</span>
          </div>
          <div className="ss-legend-item">
            <span className="ss-legend-dot ss-legend-dot--ipo" />
            <span>IPO (8%)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function FounderBlock({ name, company, description, quote }) {
  return (
    <div className="ss-founder-block">
      <div className="ss-founder-avatar">
        <span>{name.split(' ').map((n) => n[0]).join('')}</span>
      </div>
      <h3 className="ss-founder-name">
        {name} <span className="ss-founder-company">({company})</span>
      </h3>
      <p className="ss-founder-desc">{description}</p>
      <blockquote className="ss-founder-quote">&ldquo;{quote}&rdquo;</blockquote>
    </div>
  )
}

export default function Founders() {
  return (
    <section id="founders" className="section">
      {/* Success Stories Intro */}
      <div className="container">
        <p className="section-label">Founders</p>
        <h2 className="section-heading">USF Founder Success Stories</h2>
        <div className="founders-intro">
          <p className="section-subheading">
            Highlighting alumni who are building and scaling innovative ventures.
          </p>
        </div>
        <p className="ss-raised">
          Between 2023 and 2025, USF founders raised $145M.
        </p>
        <p className="ss-initiative">
          This initiative is long overdue. With the Entrepreneurship and Innovation
          (E&amp;I) program growing, the timing is ideal.
        </p>
      </div>

      {/* Key Metrics — 2-over-3 layout */}
      <div className="ss-metrics">
        <div className="container">
          <div className="ss-metrics-row-primary">
            <div className="ss-metric ss-metric--large">
              <span className="ss-metric-value">17</span>
              <span className="ss-metric-label">Funded 2023–2025</span>
            </div>
            <div className="ss-metric ss-metric--large">
              <span className="ss-metric-value">$145.4M</span>
              <span className="ss-metric-label">Total Capital Raised 2023–2025</span>
            </div>
          </div>
          <div className="ss-metrics-divider" />
          <div className="ss-metrics-row-secondary">
            <div className="ss-metric">
              <span className="ss-metric-value">25</span>
              <span className="ss-metric-label">Total Exits 2022–2025</span>
            </div>
            <div className="ss-metric">
              <span className="ss-metric-value">92%</span>
              <span className="ss-metric-label">Acquisition</span>
            </div>
            <div className="ss-metric">
              <span className="ss-metric-value">8%</span>
              <span className="ss-metric-label">IPO</span>
            </div>
          </div>
          <div className="ss-accent-line" />
        </div>
      </div>

      {/* Charts */}
      <div className="ss-charts">
        <div className="container">
          <div className="ss-charts-grid">
            <BarChart />
            <DonutChart />
          </div>
        </div>
      </div>

      {/* Founder Stories */}
      <div className="ss-founders">
        <div className="container">
          <div className="ss-founders-grid">
            {founders.map((f) => (
              <FounderBlock key={f.name} {...f} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="ss-cta">
        <div className="container">
          <Link to="/#contact" className="ss-cta-button">
            Tell Us Your Story
          </Link>
          <p className="ss-cta-text">
            Are you a USF founder building something ambitious? We&apos;d love to hear from you.
          </p>
        </div>
      </div>

      {/* Original Forms */}
      <div className="container">
        <div className="founders-forms-divider" />
        <p className="section-label">For Founders</p>
        <h3 className="section-heading">
          We partner with exceptional founders.
        </h3>
        <div className="founders-intro">
          <p className="section-subheading">
            Whether you are raising capital or seeking mentorship, USF Ventures
            offers structured pathways to support your company at its earliest stages.
          </p>
        </div>

        <div className="founders-grid">
          <div className="founders-card">
            <p className="founders-card-label">Capital</p>
            <h3 className="founders-card-heading">Submit Your Deck</h3>
            <p className="founders-card-text">
              Share your pitch deck for investment consideration. Our team reviews
              every submission and responds within two weeks.
            </p>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input type="text" className="form-input" placeholder="First name" />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input type="text" className="form-input" placeholder="Last name" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" className="form-input" placeholder="you@company.com" />
              </div>
              <div className="form-group">
                <label className="form-label">Company Name</label>
                <input type="text" className="form-input" placeholder="Company name" />
              </div>
              <div className="form-group">
                <label className="form-label">Stage</label>
                <select className="form-select">
                  <option value="">Select stage</option>
                  <option value="pre-seed">Pre-Seed</option>
                  <option value="seed">Seed</option>
                  <option value="series-a">Series A</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Deck Link</label>
                <input type="url" className="form-input" placeholder="Link to your pitch deck" />
              </div>
              <div className="form-group">
                <label className="form-label">Brief Description</label>
                <textarea className="form-textarea" placeholder="Tell us about your company in a few sentences"></textarea>
              </div>
              <button type="submit" className="form-submit">Submit Deck</button>
            </form>
          </div>

          <div className="founders-card">
            <p className="founders-card-label">Mentorship</p>
            <h3 className="founders-card-heading">Apply for Mentorship</h3>
            <p className="founders-card-text">
              Access USF&apos;s network of faculty, alumni, and industry professionals.
              Our mentorship program pairs founders with experienced operators.
            </p>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input type="text" className="form-input" placeholder="First name" />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input type="text" className="form-input" placeholder="Last name" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" className="form-input" placeholder="you@company.com" />
              </div>
              <div className="form-group">
                <label className="form-label">Company Name</label>
                <input type="text" className="form-input" placeholder="Company name" />
              </div>
              <div className="form-group">
                <label className="form-label">USF Affiliation</label>
                <select className="form-select">
                  <option value="">Select affiliation</option>
                  <option value="current-student">Current Student</option>
                  <option value="alumni">Alumni</option>
                  <option value="faculty">Faculty / Staff</option>
                  <option value="none">No USF Affiliation</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">What do you need help with?</label>
                <textarea className="form-textarea" placeholder="Describe the areas where mentorship would be most valuable"></textarea>
              </div>
              <button type="submit" className="form-submit">Apply Now</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
