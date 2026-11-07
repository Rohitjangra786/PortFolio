'use client'

import { useRef, type ReactNode } from 'react'
import { gsap, motionQuery, useGSAP } from '@/lib/motion'
import { initScrollEffects } from '@/lib/scroll-effects'

let hasNavigated = false

/** Next remounts this on every route, so page-wide scroll effects are wired up here by data attribute. */
export default function Template({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null)
  const curtain = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      ;(window as Window & { __motionReady?: boolean }).__motionReady = true

      const media = gsap.matchMedia()
      media.add(motionQuery(), () => {
        initScrollEffects()

        if (hasNavigated && curtain.current) {
          gsap.fromTo(
            curtain.current,
            { clipPath: 'circle(150% at 50% 50%)', visibility: 'visible' },
            {
              clipPath: 'circle(0% at 50% 50%)',
              duration: 0.9,
              ease: 'expo.inOut',
              onComplete: () => gsap.set(curtain.current, { visibility: 'hidden' }),
            },
          )
        }
      })
      hasNavigated = true
    },
    { scope },
  )

  return (
    <div ref={scope}>
      <div ref={curtain} aria-hidden className="route-curtain" />
      {children}
    </div>
  )
}
