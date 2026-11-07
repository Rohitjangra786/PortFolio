'use client'

import Link from 'next/link'
import { useRef, type MouseEvent } from 'react'
import { BsArrowRight } from 'react-icons/bs'
import type { IconType } from 'react-icons'
import { RxCrop, RxDesktop, RxMobile, RxPencil2 } from 'react-icons/rx'
import { gsap, motionQuery, scrub, useGSAP } from '@/lib/motion'
import { services } from '@/utils/data/profile'
import { useSmoothScroll } from '../smooth-scroll'
import { Dots, Seam, Stopped } from '../type'

const surfaces = ['bg-surface', 'on-color bg-mint', 'bg-[#20213a]', 'on-color bg-accent']
const icons: IconType[] = [RxDesktop, RxMobile, RxPencil2, RxCrop]

export default function Services() {
  const root = useRef<HTMLElement>(null)
  const { scrollTo } = useSmoothScroll()

  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add(motionQuery(), () => {
        const panels = gsap.utils.toArray<HTMLElement>('.service-panel')
        panels.slice(0, -1).forEach((panel, i) => {
          gsap.to(panel.firstElementChild, {
            scale: 0.82,
            rotationX: -14,
            y: -60,
            opacity: 0.12,
            transformPerspective: 1300,
            transformOrigin: '50% 0%',
            ease: 'none',
            scrollTrigger: { trigger: panels[i + 1], start: 'top bottom', end: 'top top', scrub: scrub() },
          })
        })
      })
    },
    { scope: root },
  )

  const toContact = (e: MouseEvent) => {
    e.preventDefault()
    scrollTo('#contact')
  }

  return (
    <section ref={root} id="services" aria-labelledby="services-title" className="relative z-10 bg-primary">
      <Seam color="var(--color-ink)" />
      <Dots
        items={[
          { top: '3%', left: '78%', size: 120, speed: 0.7 },
          { top: '9%', left: '58%', size: 30, speed: 1.5, mint: true },
        ]}
      />
      <div className="relative px-[6vw] pb-[6svh] pt-[17svh] lg:pb-[8svh] lg:pt-[24svh]">
        <h2 id="services-title" data-split="flip" data-skew className="display">
          <Stopped text="What I can do for you" />
        </h2>
        <p data-reveal className="mt-6 max-w-md text-base lg:text-lg">
          From a first sketch to a deployed product, handled by the person who writes the code.
        </p>
      </div>

      {services.map((service, i) => {
        const Icon = icons[i]
        return (
        <article key={service.title} className={`service-panel flex min-h-svh items-center overflow-clip ${surfaces[i]}`}>
          <div className="w-full origin-top px-[6vw] py-16 lg:py-24">
            <div className="flex items-center justify-between">
              <span data-icon className="service-icon">
                <Icon aria-hidden />
              </span>
              <p data-scramble className="text-sm text-white/70">
                {i + 1} / {services.length}
              </p>
            </div>
            <h3 data-split="rise" className="mt-6 text-[8.2vw] font-semibold leading-[1.08] tracking-tight lg:text-[4vw]">{service.title}</h3>
            <div className="mt-6 grid gap-6 lg:mt-10 lg:grid-cols-2 lg:gap-8">
              <p data-reveal className="max-w-lg text-base lg:text-lg">{service.body}</p>
              <div>
                <ul>
                  {service.items.map((item) => (
                    <li key={item} data-reveal className="border-t border-white/15 py-2.5 text-sm text-white/85 lg:py-3 lg:text-base">
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  data-magnetic
                  href="/#contact"
                  onClick={toContact}
                  aria-label={`${service.title}: start a project`}
                  className="group mt-4 inline-flex min-h-11 items-center gap-x-2 font-medium transition-colors duration-200 hover:text-accent-soft"
                >
                  Start a project
                  <BsArrowRight aria-hidden className="arrow-pass" />
                </Link>
              </div>
            </div>
          </div>
        </article>
        )
      })}
    </section>
  )
}
