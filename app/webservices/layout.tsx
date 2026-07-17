import type { Metadata } from 'next';
import { buildRedirectMetadata } from '@/lib/seo/siteMetadata';

export const metadata: Metadata = buildRedirectMetadata('/webops/');

export default function WebServicesRedirectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
