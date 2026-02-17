import { useEffect, useRef } from 'react'

export default function Hero() {
  const heroRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current) return
      const scrollY = window.scrollY
      const heroHeight = heroRef.current?.offsetHeight || 0
      if (scrollY <= heroHeight) {
        // Subtle parallax: image moves at 30% of scroll speed
        imageRef.current.style.transform = `scale(1.08) translateY(${scrollY * 0.3}px)`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="hero" ref={heroRef}>
      {/* Background image with slow zoom animation */}
      <div className="hero-bg-image" ref={imageRef}></div>

      {/* Dark gradient overlay (60-75% opacity) */}
      <div className="hero-overlay"></div>

      {/* Vignette overlay */}
      <div className="hero-vignette"></div>

      {/* Subtle grain/noise texture */}
      <div className="hero-grain"></div>

      <div className="hero-content">
        <h1 className="hero-title">USF Ventures</h1>
        <p className="hero-subtitle">
          Disrupting Venture Capital with a Dual Mandate.
        </p>
      </div>
      <div className="hero-scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  )
}
