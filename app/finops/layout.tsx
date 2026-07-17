import type { Metadata } from 'next';
import { buildRedirectMetadata } from '@/lib/seo/siteMetadata';

export const metadata: Metadata = buildRedirectMetadata('/solutions/');

export default function FinOpsRedirectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
