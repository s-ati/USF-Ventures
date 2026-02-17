import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import teamData from '../data/team'
import Footer from '../components/Footer'

function TeamCard({ member }) {
  return (
    <Link to={`/team/${member.slug}`} className="tp-card">
      <div className="tp-card-image">
        <img src={member.image} alt={member.name} className={`portrait-${member.slug}`} />
        <div className="tp-card-overlay" />
      </div>
      <h3 className="tp-card-name">{member.name}</h3>
      <p className="tp-card-role">{member.role}</p>
    </Link>
  )
}

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState('founding')
  const foundingRef = useRef(null)
  const investmentRef = useRef(null)

  const scrollTo = (key, ref) => {
    setActiveTab(key)
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <div className="tp-page">
        <div className="container">
          <div className="tp-title-section">
            <h1 className="tp-title">Team</h1>
          </div>

          <nav className="team-tabs">
            <button
              className={`team-tab${activeTab === 'founding' ? ' active' : ''}`}
              onClick={() => scrollTo('founding', foundingRef)}
            >
              Founding Team
            </button>
            <button
              className={`team-tab${activeTab === 'investment' ? ' active' : ''}`}
              onClick={() => scrollTo('investment', investmentRef)}
            >
              Investment Team
            </button>
          </nav>

          <div ref={foundingRef} className="tp-section">
            <p className="tp-section-label">Founding Team</p>
            <div className="tp-grid">
              {teamData.foundingTeam.map((member) => (
                <TeamCard key={member.slug} member={member} />
              ))}
            </div>
          </div>

          <div ref={investmentRef} className="tp-section">
            <p className="tp-section-label">Investment Committee</p>
            <div className="tp-grid">
              {teamData.investmentCommittee.map((member) => (
                <TeamCard key={member.slug} member={member} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
