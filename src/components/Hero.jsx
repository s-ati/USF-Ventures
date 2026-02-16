import StarField from './StarField'

export default function Hero() {
  return (
    <section className="Home-hero">
      <div className="Home-hero-inner">
        <StarField />
        <div className="hero-content">
          <h1 className="hero-title-main">Type 1</h1>
          <p className="hero-subtitle">Ventures</p>
        </div>
        <div className="hero-scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </div>
    </section>
  )
}
