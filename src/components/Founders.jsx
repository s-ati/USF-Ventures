export default function Founders() {
  return (
    <section id="founders" className="section section--alt">
      <div className="container">
        <p className="section-label">For Founders</p>
        <h2 className="section-heading">
          We partner with exceptional founders.
        </h2>
        <div className="founders-intro">
          <p className="section-subheading">
            Whether you are raising capital or seeking mentorship, USF Ventures
            offers structured pathways to support your company at its earliest stages.
          </p>
        </div>

        <div className="founders-grid">
          <div className="founders-card">
            <p className="founders-card-label">Capital</p>
            <h3 className="founders-card-heading">Submit Your Deck</h3>
            <p className="founders-card-text">
              Share your pitch deck for investment consideration. Our team reviews
              every submission and responds within two weeks.
            </p>
            <form onSubmit={(e) => e.preventDefault()}>
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
                <label className="form-label">Stage</label>
                <select className="form-select">
                  <option value="">Select stage</option>
                  <option value="pre-seed">Pre-Seed</option>
                  <option value="seed">Seed</option>
                  <option value="series-a">Series A</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Deck Link</label>
                <input type="url" className="form-input" placeholder="Link to your pitch deck" />
              </div>
              <div className="form-group">
                <label className="form-label">Brief Description</label>
                <textarea className="form-textarea" placeholder="Tell us about your company in a few sentences"></textarea>
              </div>
              <button type="submit" className="form-submit">Submit Deck</button>
            </form>
          </div>

          <div className="founders-card">
            <p className="founders-card-label">Mentorship</p>
            <h3 className="founders-card-heading">Apply for Mentorship</h3>
            <p className="founders-card-text">
              Access USF&apos;s network of faculty, alumni, and industry professionals.
              Our mentorship program pairs founders with experienced operators.
            </p>
            <form onSubmit={(e) => e.preventDefault()}>
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
              <button type="submit" className="form-submit">Apply Now</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
