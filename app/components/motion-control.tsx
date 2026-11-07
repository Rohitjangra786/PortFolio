'use client'

import { useEffect, useState } from 'react'
import { chooseMotion, motionOn } from '@/lib/motion'

/** Footer switch for everyone, so the choice can always be changed back. */
export function MotionToggle() {
  const [on, setOn] = useState<boolean | null>(null)

  useEffect(() => setOn(motionOn()), [])

  if (on === null) return null

  return (
    <button type="button" onClick={() => chooseMotion(!on)} className="inline-flex min-h-11 items-center hover:text-white">
      Animations: {on ? 'on' : 'off'}
    </button>
  )
}

/** Shown only when the system asks for reduced motion and the visitor has not chosen yet. */
export function MotionPrompt() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let saved: string | null = null
    try {
      saved = localStorage.getItem('motion')
    } catch {
      // Treated as no saved choice.
    }
    setShow(!motionOn() && saved === null)
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-x-4 bottom-4 z-[60] mx-auto flex max-w-md items-center justify-between gap-4 rounded-full border border-white/15 bg-primary py-2 pl-6 pr-2">
      <span className="text-sm text-white/80">Animations are off on this device.</span>
      <button
        type="button"
        onClick={() => chooseMotion(true)}
        className="h-10 shrink-0 rounded-full bg-accent px-5 text-sm font-semibold text-ink"
      >
        Turn on
      </button>
    </div>
  )
}
