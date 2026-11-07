'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { HiArrowDown } from 'react-icons/hi2'
import { gsap, motionQuery, ScrollTrigger, scrub, useGSAP } from '@/lib/motion'
import { personal } from '@/utils/data/personal'
import DotField from '../dot-field'

const statement = personal.intro.split(' ')
const strips = [0, 1, 2, 3, 4]

let loaderPlayed = false

function Line({ text }: { text: string }) {
  return (
    <span className="hero-line">
      {text.split('').map((char, i) => (
        <span key={`${char}-${i}`} className="hero-char">
          <span className="hero-char-inner">{char}</span>
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  const stage = useRef<HTMLDivElement>(null)
  const sticky = useRef<HTMLDivElement>(null)
  const stop = useRef<HTMLSpanElement>(null)
  const panel = useRef<HTMLElement>(null)
  const fieldPaused = useRef(false)
  const loader = useRef<HTMLDivElement>(null)
  const count = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const media = gsap.matchMedia()

      media.add(motionQuery(), () => {
        const frame = sticky.current
        const dot = stop.current
        const layer = panel.current
        if (!frame || !dot || !layer) return

        // The manifesto panel is clipped down to the full stop, so the dot itself is the doorway.
        const circle = { x: 0, y: 0, dot: 0, full: 0 }
        const state = { pop: 0, grow: 0 }

        const paint = () => {
          const radius = circle.dot * state.pop + (circle.full - circle.dot) * state.grow
          layer.style.clipPath = `circle(${radius}px at ${circle.x}px ${circle.y}px)`
          fieldPaused.current = state.grow > 0.98
        }

        const measure = () => {
          const box = frame.getBoundingClientRect()
          const mark = dot.getBoundingClientRect()
          circle.x = mark.left - box.left + mark.width / 2
          circle.y = mark.top - box.top + mark.height / 2
          circle.dot = mark.width / 2
          circle.full = Math.hypot(Math.max(circle.x, box.width - circle.x), Math.max(circle.y, box.height - circle.y)) + 4
          paint()
        }

        measure()
        ScrollTrigger.addEventListener('refresh', measure)

        // The counter runs once per visit, and never when arriving at a section by link.
        const skipLoader = loaderPlayed || Boolean(window.location.hash) || window.scrollY > 0
        const wait = skipLoader ? 0 : 1.55
        if (skipLoader) gsap.set(loader.current, { display: 'none' })
        else {
          const tally = { value: 0 }
          gsap
            .timeline({ onComplete: () => gsap.set(loader.current, { display: 'none' }) })
            .to(tally, {
              value: 100,
              duration: 1.15,
              ease: 'power2.inOut',
              onUpdate: () => {
                if (count.current) count.current.textContent = String(Math.round(tally.value))
              },
            })
            .to('.preloader-count', { yPercent: -60, opacity: 0, duration: 0.35, ease: 'power2.in' })
            .to('.preloader-strip', { yPercent: -101, duration: 0.8, ease: 'expo.inOut', stagger: 0.06 }, '-=0.1')
        }
        loaderPlayed = true

        gsap.set('[data-intro]', { visibility: 'visible' })
        gsap
          .timeline({ defaults: { ease: 'expo.out' }, delay: wait })
          .from('.hero-char-inner', { yPercent: 112, rotate: 8, duration: 1.25, stagger: 0.04 }, 0.1)
          .from('[data-hero-photo]', { opacity: 0, y: 70, scale: 1.08, duration: 1.6 }, 0.2)
          .from('[data-hero-meta] > *', { opacity: 0, x: -22, duration: 0.9, stagger: 0.08 }, 0.65)
          .to(state, { pop: 1, duration: 0.7, ease: 'back.out(3.5)', onUpdate: paint }, 0.95)

        // The portrait turns slightly towards the pointer.
        const lookX = gsap.quickTo('[data-hero-photo]', 'rotationY', { duration: 0.9, ease: 'power3' })
        const lookY = gsap.quickTo('[data-hero-photo]', 'rotationX', { duration: 0.9, ease: 'power3' })
        const shiftX = gsap.quickTo('[data-hero-photo]', 'x', { duration: 1.1, ease: 'power3' })
        gsap.set('[data-hero-photo]', { transformPerspective: 1100 })
        const onLook = (e: PointerEvent) => {
          const dx = e.clientX / window.innerWidth - 0.5
          const dy = e.clientY / window.innerHeight - 0.5
          lookX(dx * 14)
          lookY(dy * -10)
          shiftX(dx * 26)
        }
        window.addEventListener('pointermove', onLook, { passive: true })

        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: { trigger: stage.current, start: 'top top', end: 'bottom bottom', scrub: scrub() },
          })
          .to('[data-hero-fade]', { opacity: 0, y: -28, duration: 1.1 }, 0)
          .to('[data-hero-portrait]', { yPercent: -7, scale: 0.93, opacity: 0, duration: 2.5, ease: 'power1.in' }, 0.2)
          .to('.hero-char', { yPercent: -118, rotate: -10, duration: 1.3, stagger: { each: 0.09, from: 'random' }, ease: 'power2.in' }, 0.4)
          .to(state, { grow: 1, duration: 3.3, ease: 'power3.in', onUpdate: paint }, 2.1)
          .fromTo('[data-word]', { opacity: 0.14 }, { opacity: 1, duration: 0.5, stagger: 0.17 }, 5)
          .fromTo('[data-manifesto-note]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 8.1)
          .to({}, { duration: 1 })

        return () => {
          window.removeEventListener('pointermove', onLook)
          ScrollTrigger.removeEventListener('refresh', measure)
        }
      })
    },
    { scope: stage },
  )

  return (
    <div ref={stage} id="top" className="hero-stage relative">
      <div ref={loader} aria-hidden className="preloader">
        {strips.map((strip) => (
          <span key={strip} className="preloader-strip" />
        ))}
        <p className="preloader-count">
          <span ref={count} className="text-mint">0</span>
          <span className="full-stop" />
        </p>
      </div>

      <div ref={sticky} className="hero-sticky">
        <section aria-label="Introduction" className="hero-layer">
          <DotField paused={fieldPaused} />

          {/* The face sits left of centre in the photo, so the frame is nudged right to balance it. */}
          <div className="absolute inset-x-0 top-[14svh] flex justify-center pl-[9vw] lg:top-[6svh] lg:justify-end lg:pl-0 lg:pr-[13%]">
            <div data-hero-portrait className="h-[54svh] w-[34svh] lg:h-[80svh] lg:w-[50svh]">
              <div data-intro data-hero-photo className="relative h-full w-full">
                <Image
                  src={personal.avatar}
                  alt="Rohit Kumar in a navy suit, smiling"
                  fill
                  priority
                  sizes="(min-width: 960px) 50vh, 37vh"
                  className="hero-portrait-image object-cover object-top"
                />
              </div>
            </div>
          </div>

          <div data-hero-fade className="absolute inset-x-0 top-[5.5rem] lg:top-[7.5rem]">
            <ul
              data-intro
              data-hero-meta
              className="flex flex-wrap justify-center gap-x-4 px-[4vw] text-[11px] text-mint lg:flex-col lg:text-sm"
            >
              {personal.roles.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
          </div>

          <h1
            aria-label="Rohit Kumar"
            className="hero-name absolute inset-x-0 bottom-[9svh] flex flex-col items-start px-[4vw] lg:bottom-[5svh] lg:flex-row lg:items-end lg:gap-x-[0.2em]"
          >
            <span aria-hidden className="contents">
              <Line text="Rohit" />
              <span className="inline-flex items-end">
                <Line text="Kumar" />
                <span ref={stop} className="hero-stop" />
              </span>
            </span>
          </h1>

          <div data-hero-fade className="absolute bottom-6 right-[4vw] flex items-center gap-x-2 text-xs text-white/70">
            Scroll
            <HiArrowDown aria-hidden className="scroll-hint text-base text-mint" />
          </div>
        </section>

        <section ref={panel} aria-label="What I do" className="manifesto-layer">
          <div className="w-full px-[6vw] py-24">
            <p className="manifesto-text max-w-[18em] !text-ink">
              {statement.map((word, i) => (
                <span key={`${word}-${i}`} data-word>
                  {word}{' '}
                </span>
              ))}
            </p>
            <p data-manifesto-note className="mt-6 max-w-xl text-sm font-normal !text-ink lg:text-base">
              Assistant Professor at IITM (GGSIPU), Co-Founder &amp; CEO of Sikshasarovar, and author of peer-reviewed
              work in cybersecurity, machine learning and HCI.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
