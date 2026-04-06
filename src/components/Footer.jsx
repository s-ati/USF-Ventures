export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-left">
            <span className="footer-signoff">
              &copy; {new Date().getFullYear()} USF Ventures.
            </span>
            <span className="footer-institution">
              University of San Francisco.
            </span>
          </div>
          <div className="footer-right">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
