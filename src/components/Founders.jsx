import { useState, useRef } from 'react'

function DeckUpload() {
  const [file, setFile] = useState(null)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef(null)

  function handleFile(f) {
    if (f && f.type === 'application/pdf') {
      setFile(f)
    }
  }

  return (
    <div className="form-group">
      <label className="form-label">Pitch Deck (PDF)</label>
      <div
        className={`deck-dropzone${dragging ? ' deck-dropzone--active' : ''}${file ? ' deck-dropzone--has-file' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]) }}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          style={{ display: 'none' }}
          onChange={(e) => handleFile(e.target.files[0])}
        />
        {file ? (
          <div className="deck-dropzone-file">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{file.name}</span>
            <button
              type="button"
              className="deck-dropzone-remove"
              onClick={(e) => { e.stopPropagation(); setFile(null) }}
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="deck-dropzone-prompt">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>Drop your PDF here or click to browse</span>
          </div>
        )}
      </div>
    </div>
  )
}

const founders = [
  {
    name: 'Germain Bahri',
    company: 'ZaZu',
    photo: '/founders/germain-bahri.jpg',
    description:
      'USF 2015 SOM Alum. Successfully raised $1M in Dec 2025 for ZaZu, an innovative fintech startup providing small business banking across Africa. Round led by Plug and Play. Actively seeking USF Ventures for future funding rounds.',
  },
  {
    name: 'Pablo Hansen',
    company: 'Proliferate',
    photo: '/founders/pablo-hansen.jpg',
    description:
      'Founder of Proliferate (YC S25), an autonomous engineering organization where coding agents, engineers, and operators build together, faster. Raised a $5.2M pre-seed round after graduating YC.',
  },
  {
    name: 'Caroline Early',
    company: 'Pillar',
    photo: '/founders/caroline-early.jpg',
    description:
      "Founder & Co-CEO of Pillar (YC S21), a white-label healthcare enablement platform. Previously exited women's health company (YC S15) to P&G in 2019 for $100M. Currently preparing Pillar for an exit.",
  },
]

function FounderBlock({ name, company, photo, description }) {
  const initials = name.split(' ').map((n) => n[0]).join('')
  return (
    <div className="ss-founder-block">
      <div className="ss-founder-avatar">
        {photo ? (
          <img src={photo} alt={name} className="ss-founder-avatar-img" />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      <h3 className="ss-founder-name">
        {name} <span className="ss-founder-company">({company})</span>
      </h3>
      <p className="ss-founder-desc">{description}</p>
    </div>
  )
}

export default function Founders() {
  return (
    <section id="founders" className="section">
      {/* Success Stories Intro */}
      <div className="container">
        <p className="section-label">Founders</p>
        <p className="ss-raised">
          Between 2023 and 2025, USF founders raised $145M.
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

      {/* Founder Stories */}
      <div className="ss-founders">
        <div className="container">
          <h2 className="section-heading">USF Founder Success Stories</h2>
          <p className="section-subheading" style={{ marginBottom: '2rem' }}>
            Highlighting alumni who are building and scaling innovative ventures.
          </p>
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
          <p className="ss-cta-text">
            Are you a USF founder building something ambitious? We&apos;d love to hear from you.
          </p>
          <a href="#founder-forms" className="ss-cta-button">
            Tell Us Your Story
          </a>
        </div>
      </div>

      {/* Forms */}
      <div id="founder-forms" className="container">
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
            <div className="founders-card-top">
              <p className="founders-card-label">Capital</p>
              <h3 className="founders-card-heading">Submit Your Deck</h3>
              <p className="founders-card-text">
                Share your pitch deck for investment consideration. Our team reviews
                every submission and responds within two weeks.
              </p>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="founders-form">
              <div className="founders-form-fields">
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
                <DeckUpload />
                <div className="form-group">
                  <label className="form-label">Brief Description</label>
                  <textarea className="form-textarea" placeholder="Tell us about your company in a few sentences"></textarea>
                </div>
              </div>
              <button type="submit" className="form-submit">Submit Deck</button>
            </form>
          </div>

          <div className="founders-card">
            <div className="founders-card-top">
              <p className="founders-card-label">Mentorship</p>
              <h3 className="founders-card-heading">Apply for Mentorship</h3>
              <p className="founders-card-text">
                Access USF&apos;s network of faculty, alumni, and industry professionals.
                Our mentorship program pairs founders with experienced operators.
              </p>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="founders-form">
              <div className="founders-form-fields">
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
              </div>
              <button type="submit" className="form-submit">Apply Now</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
