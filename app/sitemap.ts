import type { MetadataRoute } from 'next';
import { insightPosts } from '@/lib/insights/posts';
import { SITE_URL } from '@/lib/seo/siteMetadata';

/** Public sitemap — hidden routes (e.g. /webops/intake/*) are intentionally omitted. */
export default function sitemap(): MetadataRoute.Sitemap {
  const insightEntries: MetadataRoute.Sitemap = insightPosts.map((post) => ({
    url: `${SITE_URL}/insights/${post.slug}/`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    { url: `${SITE_URL}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/webops/`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/revops/`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/managed-ops/`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/solutions/`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/portfolio/`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/about/`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/contact/`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/book/`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/book/webops/`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/book/revops/`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/webops/lifecycle/`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/webops/bluehost/`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/insights/`, changeFrequency: 'weekly', priority: 0.8 },
    ...insightEntries,
  ];
}
