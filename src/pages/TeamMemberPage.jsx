import { useParams, Link } from 'react-router-dom'
import { getMemberBySlug } from '../data/team'
import Footer from '../components/Footer'

function LinkedInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export default function TeamMemberPage() {
  const { slug } = useParams()
  const member = getMemberBySlug(slug)

  if (!member) {
    return (
      <>
        <div className="tm-page">
          <div className="container">
            <div className="tm-not-found">
              <h1 className="tm-name">Member not found</h1>
              <Link to="/team" className="tm-back">
                &larr; Back to Team
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <div className="tm-page">
        <div className="container">
          <Link to="/team" className="tm-back">
            &larr; Back to Team
          </Link>

          <div className="tm-header">
            <h1 className="tm-name">{member.name}</h1>
            <p className="tm-role">{member.role}</p>
          </div>

          <div className="tm-divider" />

          <div className="tm-content">
            <div className="tm-image-col">
              <div className="tm-image">
                <img src={member.image} alt={member.name} />
              </div>
            </div>
            <div className="tm-bio-col">
              <div className="tm-bio">
                {member.bio.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              <div className="tm-contact">
                <p className="tm-contact-label">Get in touch</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tm-linkedin"
                  aria-label={`${member.name} on LinkedIn`}
                >
                  <LinkedInIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
