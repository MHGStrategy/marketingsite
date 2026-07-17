import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo/siteMetadata';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/intake/',
        '/webops/intake/',
        '/webservices/intake/',
        '/webops/1s/',
        '/scrapped/',
        '/app/',
        '/v1/',
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
