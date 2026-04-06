import { useEffect, useRef } from 'react'

export default function Hero() {
  const wrapperRef = useRef(null)
  const imageRef = useRef(null)
  const imageSoftRef = useRef(null)
  const overlayRef = useRef(null)
  const vignetteRef = useRef(null)
  const grainRef = useRef(null)
  const contentRef = useRef(null)
  const scrollIndicatorRef = useRef(null)

  useEffect(() => {
    let ticking = false
    let wrapperTop = 0
    let scrollableDistance = 1
    let lastScrollY = 0
    let lastProgress = -1

    const measure = () => {
      const wrapper = wrapperRef.current
      if (!wrapper) return

      wrapperTop = wrapper.offsetTop
      scrollableDistance = Math.max(wrapper.offsetHeight - window.innerHeight, 1)
    }

    const update = () => {
      const image = imageRef.current
      const imageSoft = imageSoftRef.current
      const overlay = overlayRef.current
      const vignette = vignetteRef.current
      const grain = grainRef.current
      const content = contentRef.current
      const scrollIndicator = scrollIndicatorRef.current

      if (!image || !imageSoft || !overlay || !vignette || !grain || !content || !scrollIndicator) {
        ticking = false
        return
      }

      const raw = (lastScrollY - wrapperTop) / scrollableDistance
      const progress = Math.max(0, Math.min(raw, 1))

      if (Math.abs(progress - lastProgress) < 0.002) {
        ticking = false
        return
      }

      lastProgress = progress
      const veilProgress = Math.min(progress / 0.72, 1)
      const imageScale = 1.01 + progress * 0.03

      image.style.transform = `translate3d(0, 0, 0) scale(${imageScale})`
      imageSoft.style.transform = `translate3d(0, 0, 0) scale(${imageScale})`
      imageSoft.style.opacity = `${0.98 * (1 - veilProgress)}`
      overlay.style.opacity = `${1 - veilProgress}`
      vignette.style.opacity = `${0.95 * (1 - Math.min(progress / 0.82, 1))}`
      grain.style.opacity = `${0.02 * (1 - Math.min(progress / 0.65, 1))}`

      const textProgress = Math.min(progress / 0.35, 1)
      const textOpacity = 1 - textProgress
      content.style.opacity = textOpacity
      content.style.transform = `translate3d(0, ${-textProgress * 24}px, 0)`

      const indicatorProgress = Math.min(progress / 0.2, 1)
      scrollIndicator.style.opacity = 0.5 * (1 - indicatorProgress)

      ticking = false
    }

    const handleScroll = () => {
      lastScrollY = window.scrollY
      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
    }

    const handleResize = () => {
      measure()
      handleScroll()
    }

    measure()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="hero-scroll-wrapper" ref={wrapperRef}>
      <section className="hero">
        <div className="hero-bg-image" ref={imageRef}></div>
        <div className="hero-bg-image-soft" ref={imageSoftRef}></div>
        <div className="hero-overlay" ref={overlayRef}></div>
        <div className="hero-vignette" ref={vignetteRef}></div>
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
