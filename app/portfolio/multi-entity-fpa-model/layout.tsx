import type { Metadata } from 'next';
import { buildRedirectMetadata } from '@/lib/seo/siteMetadata';

export const metadata: Metadata = buildRedirectMetadata('/portfolio/');

export default function MultiEntityFpaRedirectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
