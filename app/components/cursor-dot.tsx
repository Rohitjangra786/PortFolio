'use client'

import { useEffect, useRef } from 'react'
import { gsap, motionOn } from '@/lib/motion'

/**
 * A full stop trailing the real cursor, which stays visible. It also drives the pointer effects:
 * buttons lean towards the cursor, tilt surfaces turn in 3D, and labelled links name themselves.
 */
export default function CursorDot() {
  const dot = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = dot.current
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!el || !canHover || !motionOn()) return

    const x = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3' })
    const y = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3' })
    let shown = false
    let magnet: HTMLElement | null = null
    let tilt: HTMLElement | null = null

    const release = () => {
      if (magnet) gsap.to(magnet, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' })
      magnet = null
    }
    const untilt = () => {
      if (tilt) gsap.to(tilt, { rotationX: 0, rotationY: 0, duration: 0.7, ease: 'power3.out', overwrite: 'auto' })
      tilt = null
    }

    const onMove = (e: PointerEvent) => {
      if (!shown) {
        shown = true
        gsap.set(el, { x: e.clientX, y: e.clientY })
        gsap.to(el, { opacity: 1, duration: 0.3 })
      }
      x(e.clientX)
      y(e.clientY)

      const target = e.target as Element
      const nextMagnet = target.closest<HTMLElement>('[data-magnetic]')
      if (nextMagnet !== magnet) release()
      magnet = nextMagnet
      if (magnet) {
        const box = magnet.getBoundingClientRect()
        gsap.to(magnet, {
          x: (e.clientX - box.left - box.width / 2) * 0.32,
          y: (e.clientY - box.top - box.height / 2) * 0.32,
          duration: 0.4,
          overwrite: 'auto',
        })
      }

      const nextTilt = target.closest<HTMLElement>('[data-tilt]')
      if (nextTilt !== tilt) untilt()
      tilt = nextTilt
      if (tilt) {
        const box = tilt.getBoundingClientRect()
        gsap.to(tilt, {
          rotationY: ((e.clientX - box.left) / box.width - 0.5) * 12,
          rotationX: ((e.clientY - box.top) / box.height - 0.5) * -12,
          transformPerspective: 1000,
          duration: 0.5,
          overwrite: 'auto',
        })
      }
    }

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element
      const typing = target.closest('input, textarea')
      const named = target.closest<HTMLElement>('[data-cursor]')
      const active = target.closest('a, button')
      if (label.current) label.current.textContent = named?.dataset.cursor ?? ''
      gsap.to(el, {
        scale: typing ? 0 : named ? 8 : active ? 4 : 1,
        opacity: named ? 1 : active ? 0.45 : 1,
        duration: 0.35,
        overwrite: 'auto',
      })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
    }
  }, [])

  return (
    <div ref={dot} aria-hidden className="cursor-dot">
      <span ref={label} className="cursor-label" />
    </div>
  )
}
