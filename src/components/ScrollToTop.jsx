import { useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()
  const prevPathname = useRef(pathname)

  useLayoutEffect(() => {
    if (navigationType !== 'PUSH') {
      // POP (back/forward): let the browser restore scroll position natively.
      prevPathname.current = pathname
      return
    }

    if (hash) {
      // Scroll to the hash target instantly before the browser paints.
      // This prevents the "homepage flash" when navigating from /team to /#about.
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'instant' })
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }

    prevPathname.current = pathname
  }, [pathname, hash, navigationType])

  return null
}
