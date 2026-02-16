const team = [
  {
    name: 'Alexander Chen',
    role: 'General Partner',
    initials: 'AC',
  },
  {
    name: 'Sarah Mitchell',
    role: 'General Partner',
    initials: 'SM',
  },
  {
    name: 'David Park',
    role: 'Partner',
    initials: 'DP',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Principal',
    initials: 'ER',
  },
  {
    name: 'James Liu',
    role: 'Principal',
    initials: 'JL',
  },
  {
    name: 'Maya Patel',
    role: 'Associate',
    initials: 'MP',
  },
]

export default function Team() {
  return (
    <section id="team" className="section-team">
      <div className="container">
        <div className="team-header">
          <p className="team-label">Team</p>
          <h2 className="team-heading">The people behind Type 1</h2>
        </div>
        <div className="team-grid">
          {team.map((member, i) => (
            <div className="team-card" key={i}>
              <div className="team-card-image">
                <div className="team-card-placeholder">{member.initials}</div>
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
