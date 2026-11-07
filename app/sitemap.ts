import type { MetadataRoute } from 'next'
import { siteUrl } from '@/utils/data/personal'
import { projects } from '@/utils/data/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, priority: 1 },
    ...projects.map((p) => ({ url: `${siteUrl}/work/${p.slug}`, priority: 0.6 })),
  ]
}
