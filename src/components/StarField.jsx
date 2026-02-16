import { useEffect, useRef } from 'react'

export default function StarField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let stars = []
    const STAR_COUNT = 400
    const SPEED = 0.5

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function initStars() {
      stars = []
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * canvas.width - canvas.width / 2,
          y: Math.random() * canvas.height - canvas.height / 2,
          z: Math.random() * 1000,
          size: Math.random() * 1.5 + 0.5,
        })
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const cx = canvas.width / 2
      const cy = canvas.height / 2

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i]
        star.z -= SPEED

        if (star.z <= 0) {
          star.x = Math.random() * canvas.width - cx
          star.y = Math.random() * canvas.height - cy
          star.z = 1000
        }

        const perspective = 500 / star.z
        const sx = star.x * perspective + cx
        const sy = star.y * perspective + cy
        const size = star.size * perspective * 0.5

        if (sx >= 0 && sx <= canvas.width && sy >= 0 && sy <= canvas.height) {
          const opacity = Math.min(1, (1000 - star.z) / 1000) * 0.8
          ctx.beginPath()
          ctx.arc(sx, sy, Math.max(0.3, size), 0, Math.PI * 2)
          ctx.fillStyle = `rgba(200, 210, 240, ${opacity})`
          ctx.fill()
        }
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    resize()
    initStars()
    draw()

    window.addEventListener('resize', () => {
      resize()
      initStars()
    })

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-canvas" />
}
