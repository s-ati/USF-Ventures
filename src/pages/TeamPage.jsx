import { Link } from 'react-router-dom'
import teamData, { teamCategories } from '../data/team'
import Footer from '../components/Footer'

function TeamCard({ member }) {
  const initials = member.name.split(' ').map((n) => n[0]).join('')
  return (
    <Link to={`/team/${member.slug}`} className="tp-card">
      <div className="tp-card-image">
        {member.image ? (
          <>
            <img src={member.image} alt={member.name} className={`portrait-${member.slug}`} />
            <div className="tp-card-overlay" />
          </>
        ) : (
          <div className="team-card-placeholder">{initials}</div>
        )}
      </div>
      <h3 className="tp-card-name">{member.name}</h3>
      <p className="tp-card-role">{member.role}</p>
    </Link>
  )
}

function TeamSection({ label, members }) {
  if (!members || members.length === 0) return null
  return (
    <div className="tp-section">
      <p className="tp-section-label">{label}</p>
      <div className="tp-grid">
        {members.map((member) => (
          <TeamCard key={member.slug} member={member} />
        ))}
      </div>
    </div>
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

          {teamCategories.map(({ key, label }) => (
            <TeamSection key={key} label={label} members={teamData[key]} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}
