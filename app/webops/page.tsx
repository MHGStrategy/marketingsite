import type { Metadata } from 'next';
import WebOpsLandingPage from '@/components/webops/WebOpsLandingPage';
import { buildPageMetadata } from '@/lib/seo/siteMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Website Management Service for Small Business | MHG Strategy',
  description:
    'Managed website operations from $600/month — we build, host, maintain, and monitor your site so you never have to. No setup fee. Serving California.',
  path: '/webops/',
});

export default function WebOpsPage() {
  return <WebOpsLandingPage />;
}
