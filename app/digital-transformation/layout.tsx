import type { Metadata } from 'next';
import { buildRedirectMetadata } from '@/lib/seo/siteMetadata';

export const metadata: Metadata = buildRedirectMetadata('/managed-ops/');

export default function DigitalTransformationRedirectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
