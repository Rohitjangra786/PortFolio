'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react'
import { HiBars2, HiXMark } from 'react-icons/hi2'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/motion'
import { personal } from '@/utils/data/personal'
import { useSmoothScroll } from './smooth-scroll'

const links = [
  { name: 'About', id: 'about' },
  { name: 'Work', id: 'work' },
  { name: 'Services', id: 'services' },
  { name: 'Research', id: 'research' },
]
const menuLinks = [...links, { name: 'Contact', id: 'contact' }]

export default function SiteNav() {
  const pathname = usePathname()
  const { scrollTo, setLocked } = useSmoothScroll()
  const bar = useRef<HTMLDivElement>(null)
  const progress = useRef<HTMLSpanElement>(null)
  const menu = useRef<HTMLDivElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useGSAP(
    () => {
      const el = bar.current
      if (!el) return
      const move = gsap.quickTo(el, 'yPercent', { duration: 0.5, ease: 'power3.out' })

      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          gsap.set(progress.current, { scaleX: self.progress })
          const hide = self.direction === 1 && self.scroll() > 240 && !el.contains(document.activeElement)
          move(hide ? -170 : 0)
        },
      })

      menuLinks.forEach(({ id }) => {
        const section = document.getElementById(id)
        if (!section) return
        ScrollTrigger.create({
          trigger: section,
          start: 'top 50%',
          end: 'bottom 50%',
          onToggle: (self) => setActive((current) => (self.isActive ? id : current === id ? '' : current)),
        })
      })
    },
    { dependencies: [pathname], revertOnUpdate: true },
  )

  const close = () => {
    setOpen(false)
    setLocked(false)
    toggle.current?.focus()
  }

  useEffect(() => {
    if (!open) return
    setLocked(true)
    menu.current?.querySelector('a')?.focus()
    gsap.fromTo(
      menu.current,
      { clipPath: 'circle(0% at 92% 6%)' },
      { clipPath: 'circle(150% at 92% 6%)', duration: 0.7, ease: 'expo.inOut' },
    )
    gsap.fromTo(
      '[data-menu-link]',
      { yPercent: 110 },
      { yPercent: 0, duration: 0.8, ease: 'expo.out', stagger: 0.06, delay: 0.22 },
    )
  }, [open, setLocked])

  const go = (e: MouseEvent, id: string) => {
    // Unlock first: restarting Lenis cancels any scroll already in flight.
    if (open) {
      setOpen(false)
      setLocked(false)
    }
    if (pathname === '/') {
      e.preventDefault()
      window.history.replaceState(null, '', `#${id}`)
      scrollTo(`#${id}`)
    }
  }

  const home = (e: MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault()
      window.history.replaceState(null, '', '/')
      scrollTo(0)
    }
  }

  const onMenuKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') close()
    if (e.key !== 'Tab') return
    const items = menu.current?.querySelectorAll<HTMLElement>('a, button')
    if (!items?.length) return
    const first = items[0]
    const last = items[items.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-4 lg:top-5">
        <div
          ref={bar}
          className="pointer-events-auto relative flex h-14 w-full max-w-3xl items-center justify-between gap-4 overflow-hidden rounded-full border border-white/10 bg-primary pl-6 pr-2"
        >
          <Link href="/" onClick={home} aria-label="Rohit Kumar, home" className="inline-flex min-h-11 items-center text-lg tracking-tight">
            <span className="font-semibold">rohit</span>
            <span className="ml-1 font-light">kumar</span>
            <span aria-hidden className="full-stop" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-x-1 lg:flex">
            {links.map(({ name, id }) => (
              <Link
                key={id}
                href={`/#${id}`}
                onClick={(e) => go(e, id)}
                aria-current={active === id ? 'location' : undefined}
                className={`inline-flex min-h-11 items-center px-3 text-sm transition-colors duration-200 hover:text-white ${
                  active === id ? 'text-white' : 'text-white/60'
                }`}
              >
                {name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-x-1">
            <Link
              data-magnetic
              href="/#contact"
              onClick={(e) => go(e, 'contact')}
              className="inline-flex h-11 items-center rounded-full bg-accent px-5 text-sm font-semibold text-ink transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
            >
              Let&apos;s talk
            </Link>
            <button
              ref={toggle}
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="flex h-11 w-11 items-center justify-center text-2xl lg:hidden"
            >
              <HiBars2 aria-hidden />
            </button>
          </div>

          <span ref={progress} aria-hidden className="absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-accent" />
        </div>
      </header>

      {open && (
        <div
          ref={menu}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          onKeyDown={onMenuKey}
          className="fixed inset-0 z-[70] flex flex-col justify-between bg-primary px-6 pb-10 pt-6"
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="ml-auto flex h-11 w-11 items-center justify-center text-3xl"
          >
            <HiXMark aria-hidden />
          </button>
          <nav aria-label="Menu" className="flex flex-col gap-y-1">
            {menuLinks.map(({ name, id }) => (
              <span key={id} className="block overflow-clip">
                <Link
                  data-menu-link
                  href={`/#${id}`}
                  onClick={(e) => go(e, id)}
                  className="block py-1 text-[13vw] font-semibold leading-[1.1] tracking-tight sm:text-7xl"
                >
                  {name}
                </Link>
              </span>
            ))}
          </nav>
          <a href={`mailto:${personal.email}`} className="inline-block min-h-11 py-2 text-white/70">
            {personal.email}
          </a>
        </div>
      )}
    </>
  )
}
