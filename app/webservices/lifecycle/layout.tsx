import type { Metadata } from 'next';
import { buildRedirectMetadata } from '@/lib/seo/siteMetadata';

export const metadata: Metadata = buildRedirectMetadata('/webops/lifecycle/');

export default function WebServicesLifecycleRedirectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
