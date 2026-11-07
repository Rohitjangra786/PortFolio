'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { BsArrowUpRight } from 'react-icons/bs'
import { gsap, narrowMotionQuery, ScrollTrigger, scrub, useGSAP, wideMotionQuery } from '@/lib/motion'
import { projects, type Project } from '@/utils/data/projects'
import { useSmoothScroll } from '../smooth-scroll'
import { Seam, Stopped } from '../type'

const pad = (n: number) => String(n).padStart(2, '0')

function Media({ project, index }: { project: Project; index: number }) {
  if (project.image) {
    return (
      <Image
        data-work-inner
        src={project.image}
        alt={`Screenshot of ${project.name}`}
        fill
        sizes="(min-width: 960px) 60vw, 100vw"
        className="scale-[1.14] object-cover object-top"
      />
    )
  }

  // Measured results earn the one red poster. Everything else shows what it was built with.
  if (project.metrics) {
    return (
      <div className="absolute inset-0 flex flex-col justify-between bg-accent p-5 text-ink lg:p-10">
        <p className="text-sm font-medium !text-ink">{project.role}</p>
        <dl data-work-inner className="grid grid-cols-2 gap-x-6 gap-y-4">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col">
              <dt className="order-last text-sm font-medium">{metric.label}</dt>
              <dd className="text-2xl font-semibold tracking-tight lg:text-4xl">{metric.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    )
  }

  return (
    <div
      className={`absolute inset-0 flex flex-col justify-between p-5 lg:p-10 ${index % 2 === 0 ? 'on-color bg-mint' : 'work-poster'}`}
    >
      <p className="text-xs text-white/70 lg:text-sm">{project.role}</p>
      <ul data-work-inner className="text-xl font-semibold leading-[1.15] tracking-tight lg:text-[2.2vw]">
        {project.tools.slice(0, 4).map((tool) => (
          <li key={tool}>{tool}</li>
        ))}
      </ul>
    </div>
  )
}

export default function Work() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLSpanElement>(null)
  const { scrollTo } = useSmoothScroll()

  useGSAP(
    () => {
      const media = gsap.matchMedia()

      media.add(wideMotionQuery(), () => {
        const stage = root.current
        const row = track.current
        if (!stage || !row) return

        const distance = () => row.scrollWidth - window.innerWidth
        const fit = () => {
          stage.style.height = `${distance() + window.innerHeight}px`
        }
        fit()
        ScrollTrigger.addEventListener('refreshInit', fit)

        const slide = gsap.to(row, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: stage,
            start: 'top top',
            end: 'bottom bottom',
            scrub: scrub(),
            invalidateOnRefresh: true,
            onUpdate: (self) => gsap.set(bar.current, { scaleX: self.progress }),
          },
        })

        // A carousel in depth: panels swing in, face the viewer at centre, then swing away.
        gsap.utils.toArray<HTMLElement>('.work-panel').forEach((panel) => {
          const inner = panel.querySelector('[data-work-inner]')
          const passing = {
            trigger: panel,
            containerAnimation: slide,
            start: 'left right',
            end: 'right left',
            scrub: true,
          }
          gsap
            .timeline({ defaults: { ease: 'sine.inOut' }, scrollTrigger: passing })
            .fromTo(panel, { rotationY: -30, scale: 0.84, transformPerspective: 1500 }, { rotationY: 0, scale: 1, duration: 1 })
            .to(panel, { rotationY: 30, scale: 0.84, duration: 1 })
          if (inner) gsap.fromTo(inner, { xPercent: -6 }, { xPercent: 6, ease: 'none', scrollTrigger: passing })
        })

        // Tabbing into an off-screen panel has to move the page, because the row itself cannot scroll.
        const onFocus = (e: FocusEvent) => {
          const panel = (e.target as Element).closest<HTMLElement>('.work-panel')
          const trigger = slide.scrollTrigger
          if (!panel || !trigger) return
          const left = panel.offsetLeft - (window.innerWidth - panel.offsetWidth) / 2
          const progress = gsap.utils.clamp(0, 1, left / distance())
          scrollTo(trigger.start + (trigger.end - trigger.start) * progress)
        }
        row.addEventListener('focusin', onFocus)

        return () => {
          row.removeEventListener('focusin', onFocus)
          ScrollTrigger.removeEventListener('refreshInit', fit)
          stage.style.height = ''
        }
      })
    },
    { scope: root },
  )

  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add(narrowMotionQuery(), () => {
        gsap.utils.toArray<HTMLElement>('.work-panel').forEach((panel) => {
          gsap.fromTo(
            panel,
            { rotationX: 26, y: 70, opacity: 0.2, scale: 0.92, transformPerspective: 900, transformOrigin: '50% 100%' },
            {
              rotationX: 0,
              y: 0,
              opacity: 1,
              scale: 1,
              ease: 'none',
              scrollTrigger: { trigger: panel, start: 'top 98%', end: 'top 62%', scrub: scrub() },
            },
          )
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="work" aria-labelledby="work-title" className="work-stage relative z-10 bg-ink">
      <Seam color="var(--color-primary)" />
      <div className="work-sticky">
        <div ref={track} className="work-track">
          <header className="work-intro flex shrink-0 flex-col justify-center">
            <h2 id="work-title" data-split="rise" className="display">
              <Stopped text="Selected work" />
            </h2>
            <p data-reveal className="mt-6 max-w-sm text-base lg:text-lg">
              Products, client websites and research projects I have built. Open any project for the full story.
            </p>
          </header>

          {projects.map((project, i) => (
            <Link key={project.slug} href={`/work/${project.slug}`} data-cursor="View" className="work-panel group block shrink-0">
              <div data-tilt className="work-media relative aspect-[16/10] overflow-clip rounded-lg bg-surface">
                <Media project={project} index={i} />
              </div>
              <div className="mt-5 flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs text-mint lg:text-sm">
                    {pad(i + 1)} · {project.categories[0]}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight lg:text-3xl">{project.name}</h3>
                  <p className="mt-1 max-w-xl text-sm lg:text-base">{project.tagline}</p>
                </div>
                <BsArrowUpRight
                  aria-hidden
                  className="arrow-loop mt-6 shrink-0 text-xl text-mint"
                />
              </div>
            </Link>
          ))}
        </div>

        <span aria-hidden className="absolute inset-x-[6vw] bottom-6 hidden h-px bg-white/15 lg:block">
          <span ref={bar} className="block h-px origin-left scale-x-0 bg-mint" />
        </span>
      </div>
    </section>
  )
}
