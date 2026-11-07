'use client'

import Lenis from 'lenis'
import { usePathname } from 'next/navigation'
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, type ReactNode } from 'react'
import { gsap, motionOn, ScrollTrigger } from '@/lib/motion'

type ScrollApi = {
  scrollTo: (target: string | number, options?: { immediate?: boolean }) => void
  setLocked: (locked: boolean) => void
}

const ScrollContext = createContext<ScrollApi>({ scrollTo: () => {}, setLocked: () => {} })

export const useSmoothScroll = () => useContext(ScrollContext)

const ease = (t: number) => 1 - Math.pow(1 - t, 4)

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenis = useRef<Lenis | null>(null)
  const pathname = usePathname()
  const firstRoute = useRef(true)

  useEffect(() => {
    if (!motionOn()) return

    const instance = new Lenis({ autoRaf: false, lerp: 0.09, smoothWheel: true, anchors: false })
    lenis.current = instance
    instance.on('scroll', ScrollTrigger.update)

    // One clock for scrolling and animation: two loops are what makes smooth scroll shimmer.
    const tick = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      instance.destroy()
      lenis.current = null
    }
  }, [])

  const scrollTo = useCallback<ScrollApi['scrollTo']>((target, options) => {
    const immediate = options?.immediate ?? false
    if (lenis.current) {
      lenis.current.scrollTo(target, { immediate, force: true, duration: 1.5, easing: ease })
    } else if (typeof target === 'number') {
      window.scrollTo(0, target)
    } else {
      document.querySelector(target)?.scrollIntoView()
    }
  }, [])

  const setLocked = useCallback<ScrollApi['setLocked']>((locked) => {
    if (locked) lenis.current?.stop()
    else lenis.current?.start()
  }, [])

  useEffect(() => {
    const isFirst = firstRoute.current
    firstRoute.current = false
    const hash = window.location.hash

    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      // Lenis still holds the previous page's height, which would clamp this jump.
      lenis.current?.resize()
      if (hash) scrollTo(hash, { immediate: true })
      else if (!isFirst) scrollTo(0, { immediate: true })
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, scrollTo])

  useEffect(() => {
    // Sticky stages and the hero's full stop are measured from text, so remeasure once fonts land.
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])

  const api = useMemo(() => ({ scrollTo, setLocked }), [scrollTo, setLocked])

  return <ScrollContext.Provider value={api}>{children}</ScrollContext.Provider>
}
