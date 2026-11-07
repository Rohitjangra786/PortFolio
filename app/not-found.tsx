import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-primary/30 px-6 pb-24 text-center">
      <h1 className="h1 !mb-2">
        Page not <span className="text-accent">found.</span>
      </h1>
      <p className="mb-8">The page you are looking for does not exist or has moved.</p>
      <Link
        href="/"
        className="inline-flex h-13 items-center rounded-full border border-white/50 px-8 transition-all duration-300 hover:border-accent hover:text-accent-soft"
      >
        Back to home
      </Link>
    </div>
  )
}
