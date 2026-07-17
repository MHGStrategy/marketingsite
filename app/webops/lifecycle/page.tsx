import type { Metadata } from 'next';
import Section from '@/components/Section';
import WebServicesLifecycleDoc from '@/components/webservices/WebServicesLifecycleDoc';
import { webServicesLifecycleContent as content } from '@/lib/content/webServicesLifecycleContent';
import { buildPageMetadata } from '@/lib/seo/siteMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: content.metadata.title,
  description: content.metadata.description,
  path: '/webops/lifecycle/',
});

export default function WebServicesLifecyclePage() {
  return (
    <>
      <Section bgColor="gray" className="py-12 md:py-16">
        <WebServicesLifecycleDoc />
      </Section>
    </>
  );
}
