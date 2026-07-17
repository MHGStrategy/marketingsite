import type { Metadata } from 'next';

export const SITE_URL = 'https://mhgstrategy.com';
export const SITE_NAME = 'MHG Strategy';
export const DEFAULT_OG_IMAGE = '/uploads/mhgstrategyhero.png';

export const siteConfig = {
  name: SITE_NAME,
  url: SITE_URL,
  description:
    'AI-powered operations for your website and revenue engine. We build it, host it, run it, and watch it — so you never have to.',
  email: 'hello@mhgstrategy.com',
  phone: '+1-925-290-8604',
  locale: 'en_US',
} as const;

/** Build an absolute URL with trailing slash (matches site trailingSlash config). */
export function absoluteUrl(path: string): string {
  if (path === '/') return `${SITE_URL}/`;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized.endsWith('/') ? normalized : `${normalized}/`}`;
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
  publishedTime?: string;
};

/** Per-page metadata with canonical URL, Open Graph, and Twitter cards. */
export function buildPageMetadata({
  title,
  description,
  path,
  ogType = 'website',
  noIndex = false,
  publishedTime,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: ogType,
      siteName: SITE_NAME,
      locale: siteConfig.locale,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

/** Metadata for client-side redirect pages — noindex with canonical to target. */
export function buildRedirectMetadata(canonicalPath: string): Metadata {
  return {
    title: 'Redirecting… | MHG Strategy',
    robots: { index: false, follow: true },
    alternates: { canonical: absoluteUrl(canonicalPath) },
  };
}

/** Root layout defaults merged with every page. */
export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'MHG Strategy | AI-Powered Ops',
    template: '%s',
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'MHG Strategy | AI-Powered Ops',
    description: siteConfig.description,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MHG Strategy | AI-Powered Ops',
    description: siteConfig.description,
    images: [DEFAULT_OG_IMAGE],
  },
  icons: {
    icon: '/mhg-logo.svg',
    shortcut: '/mhg-logo.svg',
  },
  robots: {
    index: true,
    follow: true,
  },
};
