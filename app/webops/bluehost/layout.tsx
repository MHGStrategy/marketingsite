import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/siteMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Bluehost Setup Guide | MHG Strategy',
  description:
    'Step-by-step instructions to sign up for Bluehost Shared hosting and add MHG Strategy as an admin so we can build your website.',
  path: '/webops/bluehost/',
});

export default function BluehostGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
