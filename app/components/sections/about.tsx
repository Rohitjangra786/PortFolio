import { personal } from '@/utils/data/personal'
import { projects } from '@/utils/data/projects'
import { publications } from '@/utils/data/publications'
import { Dots, Seam } from '../type'

const stats = [
  { end: 2, suffix: '+', label: 'Years of experience' },
  { end: publications.filter((p) => p.status !== 'Under Review').length, suffix: '', label: 'Papers published or accepted' },
  { end: projects.length, suffix: '', label: 'Projects built' },
  { end: 1, suffix: '', label: 'EdTech startup' },
]

export default function About() {
  return (
    <section id="about" className="relative z-10 bg-primary pb-[10svh] pt-[17svh] lg:pb-[16svh] lg:pt-[24svh]">
      <Seam color="var(--color-accent)" />
      <Dots
        items={[
          { top: '18%', left: '84%', size: 90, speed: 0.9 },
          { top: '58%', left: '70%', size: 26, speed: 1.6, mint: true },
          { top: '42%', left: '46%', size: 150, speed: 0.5, ring: true },
        ]}
      />
      <div className="relative px-[6vw]">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-end">
          <h2 data-split="rise" data-skew className="display">
            I teach,
            <br />
            I build,
            <br />
            <span className="whitespace-nowrap">
              I research<span aria-hidden className="full-stop" />
            </span>
          </h2>
          <p data-words className="max-w-lg text-base lg:text-lg">
            I started as a full-stack developer, moved into teaching computer science, and co-founded an EdTech platform
            along the way. Today I work across classrooms, client projects and journals, and I am UGC-NET qualified
            (2026).{' '}
            <a
              href={personal.resume}
              target="_blank"
              rel="noopener"
              className="font-normal text-white underline underline-offset-4 transition-colors duration-200 hover:text-accent-soft"
            >
              Download my résumé
            </a>
            .
          </p>
        </div>

        <dl className="mt-[8svh] grid lg:mt-[12svh] grid-cols-2 gap-y-12 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="relative flex flex-col pr-6 pt-6">
              <span data-rule aria-hidden className="absolute inset-x-0 top-0 h-px origin-left bg-white/20" />
              <dt className="text-xs text-white/70 lg:text-sm">{stat.label}</dt>
              <dd className="order-first text-4xl font-semibold tracking-tight text-mint lg:text-5xl">
                <span data-count={stat.end}>{stat.end}</span>
                {stat.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
