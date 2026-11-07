import { BsArrowUpRight } from 'react-icons/bs'
import { publications } from '@/utils/data/publications'
import { Stopped } from '../type'

const tally = (['Published', 'Accepted', 'Under Review'] as const).map((status) => ({
  status,
  total: publications.filter((p) => p.status === status).length,
}))

export default function Research() {
  return (
    <section id="research" aria-labelledby="research-title" className="relative z-10 bg-ink py-[10svh] lg:py-[16svh]">
      <div className="grid gap-14 px-[6vw] lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div className="self-start lg:sticky lg:top-32">
          <h2 id="research-title" data-split="flip" data-skew className="display">
            <Stopped text="Research" />
          </h2>
          <p data-reveal className="mt-6 max-w-sm text-base lg:text-lg">
            Peer-reviewed work across cybersecurity, machine learning and HCI.
          </p>
          <dl className="mt-10 flex gap-x-10">
            {tally.map(({ status, total }) => (
              <div key={status} className="flex flex-col">
                <dt className="order-last mt-1 text-xs text-white/70 lg:text-sm">{status}</dt>
                <dd className="text-3xl font-semibold tracking-tight text-mint lg:text-4xl">
                  <span data-count={total}>{total}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <ol>
          {publications.map((paper) => (
            <li key={paper.id} data-reveal className="paper-row group relative border-t border-white/15 py-5 lg:py-7">
              <span aria-hidden className="paper-sweep" />
              <div className="relative">
              <p className="text-xs text-mint lg:text-sm">{paper.status}</p>
              <h3 className="mt-2 text-base font-medium leading-snug lg:text-lg">{paper.title}</h3>
              <p className="mt-2 text-xs lg:text-sm">
                {paper.venue} · {paper.date}
              </p>
              {paper.link && (
                <a
                  href={paper.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-1 inline-flex min-h-11 items-center gap-x-2 text-sm font-medium transition-colors duration-200 hover:text-accent-soft"
                >
                  Read paper
                  <BsArrowUpRight aria-hidden className="arrow-loop text-mint" />
                </a>
              )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
