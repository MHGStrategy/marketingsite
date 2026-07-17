import type { Metadata } from 'next';
import { buildRedirectMetadata } from '@/lib/seo/siteMetadata';

export const metadata: Metadata = buildRedirectMetadata('/webops/');

export default function MHGMediaRedirectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
