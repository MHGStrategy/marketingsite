import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CalBookingView } from '@/components/cal/CalBookingView';
import { buildPageMetadata } from '@/lib/seo/siteMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Book a WebOps Call | MHG Strategy',
  description:
    "Schedule a free website strategy call with MHG Strategy. We'll audit your current site and show you what managed operations looks like.",
  path: '/book/webops/',
});

export default function BookWebOpsPage() {
  return (
    <Suspense fallback={null}>
      <CalBookingView activeType="webops" />
    </Suspense>
  );
}
