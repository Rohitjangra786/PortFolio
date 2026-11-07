import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, useGSAP)
ScrollTrigger.config({ ignoreMobileResize: true })

/** Set before first paint from the visitor's saved choice, falling back to their system setting. */
export const motionOn = () => document.documentElement.classList.contains('motion')

export const motionQuery = () => (motionOn() ? 'all' : 'not all')
export const wideMotionQuery = () => (motionOn() ? '(min-width: 960px)' : 'not all')
export const narrowMotionQuery = () => (motionOn() ? '(max-width: 959px)' : 'not all')

/** Saves the choice and reloads, because every scroll stage is built around it. */
export function chooseMotion(on: boolean) {
  try {
    localStorage.setItem('motion', on ? 'on' : 'off')
  } catch {
    // Private windows can refuse storage. The choice then lasts for this visit only.
  }
  window.location.reload()
}

/** Lenis already eases wheel input, so only touch needs ScrollTrigger's own smoothing. */
export const scrub = () => (ScrollTrigger.isTouch === 1 ? 0.35 : true)

export { gsap, ScrollTrigger, SplitText, useGSAP }
