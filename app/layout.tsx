import { GoogleTagManager } from '@next/third-parties/google'
import type { Metadata, Viewport } from 'next'
import { Sora } from 'next/font/google'
import type { ReactNode } from 'react'
import { personal, siteUrl } from '@/utils/data/personal'
import CursorDot from './components/cursor-dot'
import { MotionPrompt } from './components/motion-control'
import SiteNav from './components/site-nav'
import SmoothScroll from './components/smooth-scroll'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora-family',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const description =
  'Rohit Kumar is a full-stack developer, Assistant Professor (UGC-NET 2026) and Co-Founder & CEO of Sikshasarovar, publishing research in cybersecurity, machine learning and HCI.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Rohit Kumar | Full-Stack Developer & Assistant Professor', template: '%s | Rohit Kumar' },
  description,
  keywords: [
    'Rohit Kumar', 'Full-Stack Developer', 'Assistant Professor', 'Sikshasarovar', 'UGC-NET',
    'Cybersecurity Research', 'MERN Stack', 'Java', 'Spring Boot', 'React', 'Next.js',
  ],
  authors: [{ name: personal.name }],
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: personal.name,
    title: 'Rohit Kumar | Full-Stack Developer & Assistant Professor',
    description,
  },
  twitter: { card: 'summary_large_image', title: 'Rohit Kumar', description },
}

export const viewport: Viewport = { themeColor: '#131424', colorScheme: 'dark' }

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: personal.name,
  url: siteUrl,
  image: `${siteUrl}${personal.portrait}`,
  jobTitle: 'Assistant Professor & Full-Stack Developer',
  email: `mailto:${personal.email}`,
  address: { '@type': 'PostalAddress', addressLocality: 'New Delhi', addressCountry: 'IN' },
  sameAs: personal.socials.map((s) => s.href),
}

/** Hides pre-animation states before first paint, and restores the plain page if the bundle never runs. */
const motionBootstrap = `(function(){var d=document.documentElement,s=null;try{s=localStorage.getItem('motion')}catch(e){}
if(s==='on'||(s!=='off'&&!matchMedia('(prefers-reduced-motion: reduce)').matches))d.classList.add('motion');
setTimeout(function(){if(!window.__motionReady)d.classList.remove('motion')},6000)})()`

export default function RootLayout({ children }: { children: ReactNode }) {
  const gtm = process.env.NEXT_PUBLIC_GTM

  return (
    <html lang="en" className={sora.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBootstrap }} />
      </head>
      <body className="relative font-sora">
        <a
          href="#main"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-white px-5 py-3 text-sm font-medium text-primary focus:translate-y-0"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SmoothScroll>
          <SiteNav />
          <CursorDot />
          <MotionPrompt />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
        </SmoothScroll>
      </body>
      {gtm ? <GoogleTagManager gtmId={gtm} /> : null}
    </html>
  )
}
