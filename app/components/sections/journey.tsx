'use client'

import { useRef } from 'react'
import { gsap, motionQuery, ScrollTrigger, scrub, useGSAP } from '@/lib/motion'
import { achievements, certifications, education, experiences } from '@/utils/data/profile'
import { Stopped } from '../type'

const credentials = [...certifications, ...education]

export default function Journey() {
  const root = useRef<HTMLElement>(null)
  const rail = useRef<HTMLDivElement>(null)
  const when = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add(motionQuery(), () => {
        const track = rail.current
        if (!track) return

        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: { trigger: track, start: 'top 55%', end: 'bottom 55%', scrub: scrub(), invalidateOnRefresh: true },
          })
          .fromTo('[data-rail-fill]', { scaleY: 0 }, { scaleY: 1 }, 0)
          .fromTo('[data-rail-head]', { y: 0 }, { y: () => track.offsetHeight }, 0)

        gsap.utils.toArray<HTMLElement>('[data-role]').forEach((role) => {
          gsap.fromTo(
            role,
            { opacity: 0.12, x: 70, rotationY: -26, transformPerspective: 1100, transformOrigin: '0% 50%' },
            {
              opacity: 1,
              x: 0,
              rotationY: 0,
              ease: 'none',
              scrollTrigger: { trigger: role, start: 'top 88%', end: 'top 55%', scrub: scrub() },
            },
          )
          ScrollTrigger.create({
            trigger: role,
            start: 'top 55%',
            end: 'bottom 55%',
            onToggle: (self) => {
              if (self.isActive && when.current) {
                gsap.to(when.current, {
                  duration: 0.7,
                  overwrite: true,
                  scrambleText: { text: role.dataset.role ?? '', chars: '0123456789', speed: 0.8 },
                })
              }
            },
          })
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} aria-labelledby="journey-title" className="relative z-10 overflow-x-clip bg-primary pb-[9svh] lg:pb-[14svh]">
      <div className="grid gap-12 px-[6vw] lg:grid-cols-[1fr_1.35fr] lg:gap-20">
        <div className="lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:self-start">
          <h2 id="journey-title" data-split="scatter" data-skew className="display">
            <Stopped text="The path so far" />
          </h2>
          <p className="mt-6 hidden text-lg font-normal text-mint lg:block">
            <span ref={when} aria-hidden>
              {experiences[0].duration}
            </span>
          </p>
        </div>

        <div ref={rail} className="relative pl-8 lg:my-[30svh] lg:pl-14">
          <span aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-white/15" />
          <span data-rail-fill aria-hidden className="absolute bottom-0 left-0 top-0 w-px origin-top bg-mint" />
          <span data-rail-head aria-hidden className="absolute -left-[5px] -top-[5px] h-[11px] w-[11px] rounded-full bg-mint" />

          <ol className="space-y-[7svh] lg:space-y-[12svh]">
            {experiences.map((role) => (
              <li key={role.title + role.company} data-role={role.duration}>
                <p data-scramble className="text-xs text-mint lg:text-sm">{role.duration}</p>
                <h3 className="mt-2 text-xl font-semibold leading-tight tracking-tight lg:text-3xl">{role.title}</h3>
                <p className="mt-1 text-sm !text-white lg:text-base">{role.company}</p>
                <ul className="mt-4 max-w-xl space-y-2">
                  {role.details.map((detail) => (
                    <li key={detail} className="text-sm font-light leading-relaxed text-white/70 lg:text-base">
                      {detail}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-[8svh] grid gap-16 px-[6vw] lg:grid-cols-2 lg:gap-20">
        <div>
          <h3 data-reveal className="text-xl font-semibold lg:text-2xl">
            Achievements
          </h3>
          <ul className="mt-6">
            {achievements.map((item) => (
              <li key={item.title} data-reveal className="border-t border-white/15 py-5">
                <p className="font-medium !text-white">{item.title}</p>
                <p className="mt-1 text-sm">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 data-reveal className="text-xl font-semibold lg:text-2xl">
            Credentials
          </h3>
          <ul className="mt-6">
            {credentials.map((item) => (
              <li key={item.title} data-reveal className="border-t border-white/15 py-5">
                <p className="font-medium !text-white">{item.title}</p>
                <p className="mt-1 text-sm">
                  {item.place} · {item.duration}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
