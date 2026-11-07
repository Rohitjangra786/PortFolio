import type { Metadata } from 'next'
import About from './components/sections/about'
import Contact from './components/sections/contact'
import Hero from './components/sections/hero'
import Journey from './components/sections/journey'
import Research from './components/sections/research'
import Services from './components/sections/services'
import Stack from './components/sections/stack'
import Work from './components/sections/work'

export const metadata: Metadata = { alternates: { canonical: '/' } }

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Journey />
      <Work />
      <Stack />
      <Services />
      <Research />
      <Contact />
    </>
  )
}
