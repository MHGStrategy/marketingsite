import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CalBookingView } from '@/components/cal/CalBookingView';
import { buildPageMetadata } from '@/lib/seo/siteMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Book a Call | MHG Strategy',
  description: 'Schedule a discovery call with MHG Strategy for WebOps or RevOps support.',
  path: '/book/',
});

export default function BookPage() {
  return (
    <Suspense fallback={null}>
      <CalBookingView activeType="webops" />
    </Suspense>
  );
}
