import { useEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()
  const prevPathname = useRef(pathname)

  useEffect(() => {
    // Only act on PUSH navigations (clicking a link).
    // For POP (back/forward), let the browser restore the scroll position natively.
    if (navigationType === 'PUSH') {
      const cameFromDifferentPage = prevPathname.current !== pathname

      if (hash) {
        // Wait for the page to render, then scroll to the target element.
        // Use instant scroll when arriving from another page so the user
        // doesn't see a jarring speed-scroll across the whole page.
        setTimeout(() => {
          const el = document.querySelector(hash)
          if (el) {
            el.scrollIntoView({ behavior: cameFromDifferentPage ? 'instant' : 'smooth' })
          }
        }, 100)
      } else {
        window.scrollTo(0, 0)
      }
    }

    prevPathname.current = pathname
  }, [pathname, hash, navigationType])

  return null
}
