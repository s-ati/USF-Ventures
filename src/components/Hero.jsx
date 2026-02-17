import { useEffect, useRef } from 'react'

export default function Hero() {
  const heroRef = useRef(null)
  const imageRef = useRef(null)
  const overlayRef = useRef(null)
  const vignetteRef = useRef(null)
  const grainRef = useRef(null)
  const contentRef = useRef(null)
  const scrollIndicatorRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current || !heroRef.current) return
      const scrollY = window.scrollY
      const heroHeight = heroRef.current.offsetHeight

      if (scrollY > heroHeight) return

      // progress: 0 at top, 1 at bottom of hero
      const progress = Math.min(scrollY / heroHeight, 1)

      // Parallax: image moves at 30% of scroll speed
      imageRef.current.style.transform = `scale(${1.08 + progress * 0.04}) translateY(${scrollY * 0.3}px)`

      // Image clears up as you scroll: blur fades out, brightness increases
      const blur = 1.5 * (1 - progress)
      const brightness = 0.55 + progress * 0.45
      const saturation = 0.7 + progress * 0.3
      imageRef.current.style.filter = `brightness(${brightness}) saturate(${saturation}) contrast(1.15) blur(${blur}px)`

      // Overlay fades out as you scroll
      overlayRef.current.style.opacity = 1 - progress * 0.85

      // Vignette fades out
      vignetteRef.current.style.opacity = 1 - progress * 0.7

      // Grain fades out
      grainRef.current.style.opacity = 0.045 * (1 - progress)

      // Text and scroll indicator fade out as image clears
      const textFade = Math.max(1 - progress * 2.5, 0)
      contentRef.current.style.opacity = textFade
      contentRef.current.style.transform = `translateY(${-scrollY * 0.15}px)`
      scrollIndicatorRef.current.style.opacity = textFade * 0.5
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="hero" ref={heroRef}>
      {/* Background image with slow zoom animation */}
      <div className="hero-bg-image" ref={imageRef}></div>

      {/* Dark gradient overlay (60-75% opacity) */}
      <div className="hero-overlay" ref={overlayRef}></div>

      {/* Vignette overlay */}
      <div className="hero-vignette" ref={vignetteRef}></div>

      {/* Subtle grain/noise texture */}
      <div className="hero-grain" ref={grainRef}></div>

      <div className="hero-content" ref={contentRef}>
        <h1 className="hero-title">USF Ventures</h1>
        <p className="hero-subtitle">
          Disrupting Venture Capital with a Dual Mandate.
        </p>
      </div>
      <div className="hero-scroll-indicator" ref={scrollIndicatorRef}>
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  )
}
