import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const metrics = [
  { value: '17', label: 'Startups Funded' },
  { value: '$145.4M', label: 'Raised (2023–2025)' },
  { value: '25', label: 'Exits (2022–2025)' },
  { value: '92%', label: 'Acquisition' },
  { value: '8%', label: 'IPO' },
]

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
      <blockquote className="ss-founder-quote">"{quote}"</blockquote>
    </div>
  )
}

export default function SuccessStoriesPage() {
  return (
    <>
      <div className="ss-page">
        {/* Intro */}
        <section className="ss-intro">
          <div className="container">
            <h1 className="ss-title">USF Founder Success Stories</h1>
            <p className="ss-subtitle">
              Highlighting alumni who are building and scaling innovative ventures.
            </p>
            <p className="ss-raised">
              Between 2023 and 2025, USF founders raised $XXX.
            </p>
            <p className="ss-initiative">
              This initiative is long overdue. With the Entrepreneurship and Innovation
              (E&amp;I) program growing, the timing is ideal.
            </p>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="ss-metrics">
          <div className="container">
            <div className="ss-metrics-grid">
              {metrics.map((m) => (
                <div className="ss-metric" key={m.label}>
                  <span className="ss-metric-value">{m.value}</span>
                  <span className="ss-metric-label">{m.label}</span>
                </div>
              ))}
            </div>
            <div className="ss-accent-line" />
          </div>
        </section>

        {/* Charts */}
        <section className="ss-charts">
          <div className="container">
            <div className="ss-charts-grid">
              <BarChart />
              <DonutChart />
            </div>
          </div>
        </section>

        {/* Founder Stories */}
        <section className="ss-founders">
          <div className="container">
            <div className="ss-founders-grid">
              {founders.map((f) => (
                <FounderBlock key={f.name} {...f} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="ss-cta">
          <div className="container">
            <Link to="/contact" className="ss-cta-button">
              Tell Us Your Story
            </Link>
            <p className="ss-cta-text">
              Are you a USF founder building something ambitious? We'd love to hear from you.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
