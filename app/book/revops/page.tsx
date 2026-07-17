import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CalBookingView } from '@/components/cal/CalBookingView';
import { buildPageMetadata } from '@/lib/seo/siteMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Book a RevOps Call | MHG Strategy',
  description:
    "Book a revenue operations review. We'll map your pipeline, CRM, and reporting gaps in one call — no prep required.",
  path: '/book/revops/',
});

export default function BookRevOpsPage() {
  return (
    <Suspense fallback={null}>
      <CalBookingView activeType="revops" />
    </Suspense>
  );
}
