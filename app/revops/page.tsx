import type { Metadata } from 'next';
import RevOpsOfferingSection from '@/components/revops/RevOpsOfferingSection';
import VerticalPage from '@/components/verticals/VerticalPage';
import { revOpsVertical } from '@/lib/content/verticalsContent';
import { buildPageMetadata } from '@/lib/seo/siteMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: revOpsVertical.metadata.title,
  description: revOpsVertical.metadata.description,
  path: '/revops/',
});

export default function RevOpsPage() {
  return (
    <VerticalPage vertical={revOpsVertical} showLeadForm>
      <RevOpsOfferingSection />
    </VerticalPage>
  );
}
