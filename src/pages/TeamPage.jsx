import { Link } from 'react-router-dom'
import teamData from '../data/team'
import Footer from '../components/Footer'

function TeamCard({ member }) {
  return (
    <Link to={`/team/${member.slug}`} className="tp-card">
      <div className="tp-card-image">
        <img src={member.image} alt={member.name} />
        <div className="tp-card-overlay" />
      </div>
      <h3 className="tp-card-name">{member.name}</h3>
      <p className="tp-card-role">{member.role}</p>
    </Link>
  )
}

export default function TeamPage() {
  return (
    <>
      <div className="tp-page">
        <div className="container">
          <div className="tp-title-section">
            <h1 className="tp-title">Team</h1>
          </div>

          <div className="tp-section">
            <p className="tp-section-label">Founding Team</p>
            <div className="tp-grid">
              {teamData.foundingTeam.map((member) => (
                <TeamCard key={member.slug} member={member} />
              ))}
            </div>
          </div>

          <div className="tp-section">
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
