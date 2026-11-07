import { personal } from '@/utils/data/personal'
import ContactForm from '../contact-form'
import Socials from '../socials'
import { MotionToggle } from '../motion-control'
import { Dots, Seam, Stopped } from '../type'

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative z-10 bg-primary pt-[17svh] lg:pt-[24svh]">
      <Seam color="var(--color-ink)" />
      <Dots
        items={[
          { top: '16%', left: '80%', size: 110, speed: 0.8 },
          { top: '30%', left: '93%', size: 22, speed: 1.2, mint: true },
        ]}
      />
      <div className="relative px-[6vw]">
        <h2 id="contact-title" data-split="wave" data-skew className="text-[10.5vw] font-semibold leading-none tracking-tighter lg:text-[5.6vw]">
          <Stopped text="Let's connect" />
        </h2>

        <div className="mt-[6svh] grid gap-10 lg:mt-[10svh] lg:gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div data-reveal>
            <a
              href={`mailto:${personal.email}`}
              className="block min-h-11 break-all py-1 text-base font-medium transition-colors duration-200 hover:text-accent-soft lg:text-xl"
            >
              {personal.email}
            </a>
            <a
              href={`tel:${personal.phone.replace(/\s/g, '')}`}
              className="block min-h-11 py-1 text-base lg:text-lg text-white/70 transition-colors duration-200 hover:text-accent-soft"
            >
              {personal.phone}
            </a>
            <p className="mt-2">{personal.location}</p>
            <div className="-ml-3 mt-6">
              <Socials />
            </div>
          </div>
          <div data-reveal>
            <ContactForm />
          </div>
        </div>
      </div>

      <footer className="mt-[9svh] flex lg:mt-[14svh] flex-wrap items-center justify-between gap-4 border-t border-white/10 px-[6vw] py-8 text-sm text-white/60">
        <span>
          © {new Date().getFullYear()} {personal.name}
        </span>
        <span className="flex items-center gap-x-6">
          <MotionToggle />
          <a href={personal.resume} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center hover:text-white">
            Résumé
          </a>
        </span>
      </footer>
    </section>
  )
}
