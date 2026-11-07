import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BsArrowLeft, BsArrowRight, BsArrowUpRight } from 'react-icons/bs'
import { getProject, projects } from '@/utils/data/projects'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug)
  if (!project) return {}
  return {
    title: project.name,
    description: project.tagline,
    alternates: { canonical: `/work/${project.slug}` },
  }
}

const pill =
  'inline-flex h-13 items-center gap-x-2 rounded-full border border-white/50 px-7 text-sm transition-all duration-300 hover:border-accent hover:text-accent-soft'

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const next = projects[(projects.findIndex((p) => p.slug === slug) + 1) % projects.length]

  return (
    <article className="min-h-dvh bg-primary/30 pb-32 pt-44 lg:pt-32 xl:pb-20">
      <div className="container mx-auto max-w-5xl xl:px-16">
        <Link href="/#work" className="inline-flex min-h-11 items-center gap-x-2 text-sm text-white/70 hover:text-accent-soft">
          <BsArrowLeft aria-hidden /> All work
        </Link>

        <div data-reveal>
          <p className="mt-4 text-xs uppercase tracking-[1px] text-mint">{project.categories.join(' · ')}</p>
          <h1 className="h2 !mb-2">
            {project.name}
            <span className="text-accent">.</span>
          </h1>
          <p className="max-w-2xl text-lg">{project.tagline}</p>
        </div>

        {project.image && (
          <div data-reveal className="relative mt-8 aspect-[16/10] overflow-hidden rounded-lg">
            <Image
              src={project.image}
              alt={`Screenshot of ${project.name}`}
              fill
              priority
              sizes="(min-width: 1024px) 900px, 100vw"
              className="object-cover object-top"
            />
          </div>
        )}

        <div data-reveal className="mt-10 grid gap-10 md:grid-cols-3">
          <aside className="space-y-6">
            <div>
              <h2 className="text-xs uppercase tracking-[1px] text-white/70">Role</h2>
              <p className="mt-1 !text-white">{project.role}</p>
            </div>
            <div>
              <h2 className="text-xs uppercase tracking-[1px] text-white/70">Stack</h2>
              <p className="mt-1 !text-white">{project.tools.join(', ')}</p>
            </div>
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className={pill}>
                {project.demoLabel ?? 'Open project'} <BsArrowUpRight aria-hidden />
              </a>
            )}
            {project.code && (
              <a href={project.code} target="_blank" rel="noopener noreferrer" className={pill}>
                View on GitHub <BsArrowUpRight aria-hidden />
              </a>
            )}
          </aside>

          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold">Overview</h2>
            <p className="mt-2">{project.overview}</p>

            <h2 className="mt-10 text-2xl font-semibold">What I did</h2>
            <ul className="mt-3 space-y-3">
              {project.contributions.map((item) => (
                <li key={item} className="flex gap-x-3 font-light leading-relaxed text-white/80">
                  <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
                  {item}
                </li>
              ))}
            </ul>

            {project.metrics && (
              <>
                <h2 className="mt-10 text-2xl font-semibold">Results</h2>
                <dl className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-4">
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="flex flex-col-reverse gap-1">
                      <dt className="text-xs uppercase tracking-[1px]">{metric.label}</dt>
                      <dd className="text-3xl font-extrabold text-mint">{metric.value}</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}
          </div>
        </div>

        <Link
          href={`/work/${next.slug}`}
          className="group mt-16 flex items-center justify-between gap-6 border-t border-white/10 pt-8"
        >
          <span>
            <span className="block text-xs uppercase tracking-[1px] text-white/70">Next project</span>
            <span className="mt-1 block text-2xl font-semibold md:text-4xl">{next.name}</span>
          </span>
          <BsArrowRight aria-hidden className="shrink-0 text-3xl transition-transform duration-300 group-hover:translate-x-2" />
        </Link>
      </div>
    </article>
  )
}
