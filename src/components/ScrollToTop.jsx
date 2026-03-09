import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    // Only act on PUSH navigations (clicking a link).
    // For POP (back/forward), let the browser restore the scroll position natively.
    if (navigationType === 'PUSH') {
      if (hash) {
        // Wait for the page to render, then scroll to the target element
        setTimeout(() => {
          const el = document.querySelector(hash)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      } else {
        window.scrollTo(0, 0)
      }
    }
  }, [pathname, hash, navigationType])

  return null
}
