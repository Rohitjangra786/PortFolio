'use client'

import { useRef } from 'react'
import type { IconType } from 'react-icons'
import { FaAws, FaJava } from 'react-icons/fa'
import {
  SiBootstrap, SiCss, SiDocker, SiExpress, SiFigma, SiGit, SiHtml5, SiJavascript, SiMongodb, SiMysql, SiNextdotjs,
  SiNodedotjs, SiPostgresql, SiPython, SiReact, SiSelenium, SiSpringboot, SiTailwindcss, SiTypescript,
} from 'react-icons/si'
import { gsap, motionQuery, ScrollTrigger, useGSAP } from '@/lib/motion'

type Skill = [string, IconType]

const groups: { title: string; skills: Skill[] }[] = [
  { title: 'Languages', skills: [['Java', FaJava], ['JavaScript', SiJavascript], ['TypeScript', SiTypescript], ['Python', SiPython]] },
  { title: 'Frontend', skills: [['React', SiReact], ['Next.js', SiNextdotjs], ['HTML', SiHtml5], ['CSS', SiCss], ['Tailwind', SiTailwindcss], ['Bootstrap', SiBootstrap]] },
  { title: 'Backend', skills: [['Node.js', SiNodedotjs], ['Express', SiExpress], ['Spring Boot', SiSpringboot]] },
  { title: 'Data', skills: [['MongoDB', SiMongodb], ['PostgreSQL', SiPostgresql], ['MySQL', SiMysql]] },
  { title: 'Tools', skills: [['Docker', SiDocker], ['AWS', FaAws], ['Git', SiGit], ['Selenium', SiSelenium], ['Figma', SiFigma]] },
]

const rows: Skill[][] = [groups.slice(0, 2).flatMap((g) => g.skills), groups.slice(2).flatMap((g) => g.skills)]

function Row({ skills }: { skills: Skill[] }) {
  const items = [...skills, ...skills, ...skills, ...skills]
  return (
    <div data-marquee className="marquee-row">
      {items.map(([name, Icon], i) => (
        <span key={`${name}-${i}`} className="flex items-center gap-x-3 pr-9 text-2xl font-semibold tracking-tight lg:pr-12 lg:text-4xl">
          <Icon className="marquee-icon text-xl text-mint lg:text-3xl" />
          {name}
        </span>
      ))}
    </div>
  )
}

export default function Stack() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add(motionQuery(), () => {
        const lines = gsap.utils.toArray<HTMLElement>('[data-marquee]').map((el, i) => ({
          set: gsap.quickSetter(el, 'x', 'px'),
          lean: gsap.quickSetter(el, 'skewX', 'deg'),
          el,
          half: el.scrollWidth / 2,
          x: 0,
          direction: i % 2 ? 1 : -1,
        }))
        let onScreen = false
        let push = 0

        const measure = () => lines.forEach((line) => (line.half = line.el.scrollWidth / 2))
        ScrollTrigger.addEventListener('refresh', measure)
        ScrollTrigger.create({
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => {
            onScreen = self.isActive
            root.current?.classList.toggle('is-spinning', self.isActive)
          },
          onUpdate: (self) => (push = gsap.utils.clamp(-7, 7, self.getVelocity() / 260)),
        })

        // Scrolling pushes the rows along; scrolling back reverses them.
        const tick = (_time: number, delta: number) => {
          if (!onScreen) return
          push *= 0.94
          const step = (1 + push) * delta * 0.06
          lines.forEach((line) => {
            line.x = gsap.utils.wrap(-line.half, 0, line.x + line.direction * step)
            line.set(line.x)
            line.lean(push * line.direction * 1.6)
          })
        }
        gsap.ticker.add(tick)

        return () => {
          gsap.ticker.remove(tick)
          ScrollTrigger.removeEventListener('refresh', measure)
        }
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} aria-label="Skills" className="relative z-10 overflow-clip bg-ink py-[8svh] lg:py-[12svh]">
      <ul className="sr-only">
        {groups.map((group) => (
          <li key={group.title}>
            {group.title}: {group.skills.map(([name]) => name).join(', ')}
          </li>
        ))}
      </ul>
      <div aria-hidden className="space-y-4 lg:space-y-8">
        {rows.map((skills, i) => (
          <Row key={i} skills={skills} />
        ))}
      </div>
    </section>
  )
}
