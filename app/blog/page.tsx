import type { Metadata } from 'next'
import { BsArrowUpRight } from 'react-icons/bs'
import { personal } from '@/utils/data/personal'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Articles by Rohit Kumar.',
  alternates: { canonical: '/blog' },
}
export const revalidate = 3600

type Article = { id: number; title: string; url: string; readable_publish_date: string }

async function getArticles(): Promise<Article[]> {
  try {
    const res = await fetch(`https://dev.to/api/articles?username=${personal.devUsername}`, {
      next: { revalidate: 3600 },
    })
    return res.ok ? await res.json() : []
  } catch {
    return []
  }
}

export default async function Blog() {
  const articles = await getArticles()

  return (
    <div className="min-h-dvh bg-primary/30 pb-32 pt-44 lg:pt-32">
      <div className="container mx-auto max-w-4xl">
        <h1 className="h2">
          Writing<span className="text-accent">.</span>
        </h1>
        {articles.length === 0 ? (
          <p>No articles to show right now. Please check back soon.</p>
        ) : (
          <ul className="divide-y divide-white/10">
            {articles.map((article) => (
              <li key={article.id}>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-6 py-5"
                >
                  <span>
                    <span className="block text-xl font-medium">{article.title}</span>
                    <span className="mt-1 block text-sm text-white/70">{article.readable_publish_date}</span>
                  </span>
                  <BsArrowUpRight aria-hidden className="mt-1 shrink-0 group-hover:text-accent-soft" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
