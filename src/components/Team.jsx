import { Link } from 'react-router-dom'
import teamData from '../data/team'

const previewMembers = teamData.foundingTeam.slice(0, 6)

export default function Team() {
  return (
    <section id="team" className="section-team">
      <div className="container">
        <div className="team-header">
          <p className="team-label">Team</p>
          <h2 className="team-heading">The people behind USF Ventures</h2>
        </div>
        <div className="team-grid">
          {previewMembers.map((member) => (
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
        <div className="team-cta">
          <Link to="/team" className="team-cta-link">View full team &rarr;</Link>
        </div>
      </div>
    </section>
  )
}
