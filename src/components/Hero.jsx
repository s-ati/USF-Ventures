import { useEffect, useRef } from 'react'

export default function Hero() {
  const wrapperRef = useRef(null)
  const heroRef = useRef(null)
  const imageRef = useRef(null)
  const overlayRef = useRef(null)
  const vignetteRef = useRef(null)
  const grainRef = useRef(null)
  const contentRef = useRef(null)
  const scrollIndicatorRef = useRef(null)

  useEffect(() => {
    let ticking = false

    const update = () => {
      const wrapper = wrapperRef.current
      const image = imageRef.current
      const overlay = overlayRef.current
      const vignette = vignetteRef.current
      const grain = grainRef.current
      const content = contentRef.current
      const scrollIndicator = scrollIndicatorRef.current

      if (!wrapper || !image) return

      const wrapperTop = wrapper.offsetTop
      const scrollableDistance = wrapper.offsetHeight - window.innerHeight
      const scrollY = window.scrollY

      // progress: 0 at top of wrapper, 1 when hero unpins
      const raw = (scrollY - wrapperTop) / scrollableDistance
      const progress = Math.max(0, Math.min(raw, 1))

      // --- Image reveal ---
      // Blur: 1.5px → 0
      const blur = 1.5 * (1 - progress)
      // Brightness: 0.55 → 1.0
      const brightness = 0.55 + progress * 0.45
      // Saturation: 0.7 → 1.0
      const saturation = 0.7 + progress * 0.3
      // Contrast stays at 1.15, fades to 1.0
      const contrast = 1.15 - progress * 0.15

      image.style.filter = `brightness(${brightness}) saturate(${saturation}) contrast(${contrast}) blur(${blur}px)`
      // Gentle scale increase during reveal
      image.style.transform = `scale(${1.08 + progress * 0.06})`

      // --- Overlay: fade to 0 ---
      overlay.style.opacity = 1 - progress

      // --- Vignette: fade to 0 ---
      vignette.style.opacity = 1 - progress

      // --- Grain: fade to 0 ---
      grain.style.opacity = 0.045 * (1 - progress)

      // --- Text: fade out in first 35% of scroll ---
      const textProgress = Math.min(progress / 0.35, 1)
      const textOpacity = 1 - textProgress
      content.style.opacity = textOpacity
      content.style.transform = `translateY(${-textProgress * 30}px)`

      // --- Scroll indicator: fade out in first 20% ---
      const indicatorProgress = Math.min(progress / 0.2, 1)
      scrollIndicator.style.opacity = 0.5 * (1 - indicatorProgress)

      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Run once on mount to set initial state
    update()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="hero-scroll-wrapper" ref={wrapperRef}>
      <section className="hero" ref={heroRef}>
        {/* Background image */}
        <div className="hero-bg-image" ref={imageRef}></div>

        {/* Dark gradient overlay */}
        <div className="hero-overlay" ref={overlayRef}></div>

        {/* Vignette overlay */}
        <div className="hero-vignette" ref={vignetteRef}></div>

        {/* Subtle grain/noise texture */}
        <div className="hero-grain" ref={grainRef}></div>

        <div className="hero-content" ref={contentRef}>
          <h1 className="hero-title">USF Ventures</h1>
          <p className="hero-subtitle">
            Disrupting Venture Capital with a Dual Mandate
          </p>
          <p className="hero-subtitle">
            Mentoring in the Jesuit Tradition
          </p>
        </div>
        <div className="hero-scroll-indicator" ref={scrollIndicatorRef}>
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </section>
    </div>
  )
}
