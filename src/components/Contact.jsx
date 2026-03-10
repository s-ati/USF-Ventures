export default function Contact() {
  return (
    <section id="contact" className="section-contact">
      <div className="container">
        <div className="contact-inner">
          <p className="section-label">Contact</p>
          <h2 className="contact-heading">Get in touch</h2>
          <p className="contact-text">
            USF Ventures is based in San Francisco. For inquiries regarding
            investment, partnerships, or general information, reach out to
            our team directly.
          </p>
          <div className="contact-details">
            <div>
              <p className="contact-detail-label">Email</p>
              <p className="contact-detail-value">
                <a href="mailto:ventures@usfca.edu">ventures@usfca.edu</a>
              </p>
            </div>
            <div>
              <p className="contact-detail-label">Location</p>
              <p className="contact-detail-value">
                University of San Francisco<br />
                2130 Fulton Street<br />
                San Francisco, CA 94117
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
