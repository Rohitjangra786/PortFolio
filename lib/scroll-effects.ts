import { gsap, ScrollTrigger, scrub, SplitText } from './motion'

const all = <T extends HTMLElement = HTMLElement>(selector: string) => gsap.utils.toArray<T>(selector)

function reveals() {
  const items = all('[data-reveal]')
  gsap.set(items, { y: 44 })
  ScrollTrigger.batch(items, {
    start: 'top 90%',
    once: true,
    onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08, overwrite: true }),
  })
}

/** Each heading picks its own entrance, so no two sections arrive the same way. */
function headings() {
  all('[data-split]').forEach((el) => {
    const mode = el.dataset.split
    const split = SplitText.create(el, {
      type: 'words,chars',
      wordsClass: 'split-word',
      mask: mode === 'rise' ? 'words' : undefined,
    })
    const { chars } = split
    const stops = el.querySelectorAll('.full-stop')
    gsap.set(el, { visibility: 'visible' })
    gsap.set(stops, { scale: 0 })

    const pop = () => gsap.to(stops, { scale: 1, duration: 0.7, ease: 'back.out(4)', overwrite: true })
    const hide = () => gsap.to(stops, { scale: 0, duration: 0.2, overwrite: true })

    if (mode === 'rise') {
      gsap.from(chars, {
        yPercent: 118,
        rotate: 7,
        duration: 1.05,
        ease: 'expo.out',
        stagger: 0.022,
        clearProps: 'transform',
        onComplete: pop,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    }

    if (mode === 'flip') {
      gsap.from(chars, {
        rotationX: -100,
        y: 26,
        opacity: 0,
        transformPerspective: 500,
        transformOrigin: '50% 100%',
        duration: 0.95,
        ease: 'back.out(1.6)',
        stagger: 0.024,
        clearProps: 'transform,opacity',
        onComplete: pop,
        scrollTrigger: { trigger: el, start: 'top 86%', once: true },
      })
    }

    if (mode === 'scatter') {
      gsap.from(chars, {
        x: () => gsap.utils.random(-220, 220),
        y: () => gsap.utils.random(-140, 140),
        rotation: () => gsap.utils.random(-70, 70),
        opacity: 0,
        ease: 'none',
        stagger: { each: 0.012, from: 'random' },
        scrollTrigger: {
          trigger: el,
          start: 'top 96%',
          end: 'top 48%',
          scrub: scrub(),
          onLeave: pop,
          onEnterBack: hide,
        },
      })
    }

    if (mode === 'wave') {
      gsap.from(chars, {
        y: (i) => Math.sin(i * 0.75) * 76,
        rotation: (i) => Math.cos(i * 0.75) * 16,
        opacity: 0,
        ease: 'none',
        stagger: 0.03,
        scrollTrigger: {
          trigger: el,
          start: 'top 98%',
          end: 'top 52%',
          scrub: scrub(),
          onLeave: pop,
          onEnterBack: hide,
        },
      })
    }
  })
}

function paragraphs() {
  all('[data-words]').forEach((el) => {
    const { words } = SplitText.create(el, { type: 'words' })
    gsap.fromTo(
      words,
      { opacity: 0.16 },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.05,
        scrollTrigger: { trigger: el, start: 'top 84%', end: 'bottom 58%', scrub: scrub() },
      },
    )
  })
}

function scrambles() {
  all('[data-scramble]').forEach((el) => {
    const text = el.textContent ?? ''
    gsap.to(el, {
      duration: 1.1,
      ease: 'none',
      scrambleText: { text, chars: '01<>/#*+', speed: 0.7, revealDelay: 0.2 },
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    })
  })
}

function counters() {
  all('[data-count]').forEach((el) => {
    const counter = { value: 0 }
    el.textContent = '0'
    gsap.to(counter, {
      value: Number(el.dataset.count),
      duration: 1.8,
      ease: 'power3.out',
      onUpdate: () => {
        el.textContent = String(Math.round(counter.value))
      },
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    })
  })
}

function rules() {
  all('[data-rule]').forEach((rule) => {
    gsap.fromTo(
      rule,
      { scaleX: 0 },
      { scaleX: 1, ease: 'none', scrollTrigger: { trigger: rule, start: 'top 96%', end: 'top 70%', scrub: scrub() } },
    )
  })
}

/** Drifting dots: each moves at its own speed, which gives the flat page its depth. */
function floats() {
  all('[data-float]').forEach((el) => {
    const speed = Number(el.dataset.float)
    gsap.fromTo(
      el,
      { y: 260 * speed, rotation: -40 * speed },
      {
        y: -260 * speed,
        rotation: 40 * speed,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: scrub() },
      },
    )
  })
}

/** The join between two sections breaks into tiles of the section above. */
function seams() {
  all('[data-seam]').forEach((seam) => {
    gsap.to(seam.children, {
      scaleY: 0,
      ease: 'none',
      transformOrigin: '50% 0%',
      stagger: { each: 0.012, from: 'random' },
      scrollTrigger: { trigger: seam, start: 'top 92%', end: 'top 18%', scrub: scrub() },
    })
  })
}

/** Icons spring in, and marked ones keep turning with the scroll. */
function icons() {
  all('[data-icon]').forEach((el) => {
    gsap.from(el, {
      scale: 0,
      rotation: -220,
      duration: 1,
      ease: 'back.out(2.2)',
      scrollTrigger: { trigger: el, start: 'top 94%', once: true },
    })
  })
}

/** Large type leans into fast scrolling, then settles. */
function velocitySkew() {
  const items = all('[data-skew]')
  if (!items.length) return
  const lean = gsap.quickTo(items, 'skewY', { duration: 0.5, ease: 'power3' })
  // Scroll updates stop arriving when the page stops, so settling needs its own timer.
  const settle = gsap.delayedCall(0.12, () => lean(0)).pause()
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      lean(gsap.utils.clamp(-4, 4, self.getVelocity() / -420))
      settle.restart(true)
    },
  })
}

export function initScrollEffects() {
  reveals()
  headings()
  paragraphs()
  scrambles()
  counters()
  rules()
  floats()
  seams()
  icons()
  velocitySkew()
}
