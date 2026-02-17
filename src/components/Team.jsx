import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import teamData from '../data/team'

export default function Team() {
  const [activeTab, setActiveTab] = useState('founding')
  const foundingRef = useRef(null)
  const investmentRef = useRef(null)

  const scrollTo = (key, ref) => {
    setActiveTab(key)
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="team" className="section-team">
      <div className="container">
        <div className="team-header">
          <p className="team-label">Team</p>
          <h2 className="team-heading">The people behind USF Ventures</h2>
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

        <div ref={foundingRef} className="team-group">
          <p className="team-group-label">Founding Team</p>
          <div className="team-grid">
            {teamData.foundingTeam.map((member) => (
              <Link to={`/team/${member.slug}`} className="team-card" key={member.slug}>
                <div className="team-card-image">
                  <img
                    src={member.image}
                    alt={member.name}
                    className={`team-card-img portrait-${member.slug}`}
                  />
                  <div className="team-card-hover" />
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </Link>
            ))}
          </div>
        </div>

        <div ref={investmentRef} className="team-group">
          <p className="team-group-label">Investment Committee</p>
          <div className="team-grid">
            {teamData.investmentCommittee.map((member) => (
              <Link to={`/team/${member.slug}`} className="team-card" key={member.slug}>
                <div className="team-card-image">
                  <img
                    src={member.image}
                    alt={member.name}
                    className={`team-card-img portrait-${member.slug}`}
                  />
                  <div className="team-card-hover" />
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
