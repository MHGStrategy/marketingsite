import type { Metadata } from 'next';
import HomePageContent from '@/components/HomePageContent';
import { homePageContent } from '@/lib/content/homePageContent';
import { buildPageMetadata } from '@/lib/seo/siteMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: homePageContent.metadata.title,
  description: homePageContent.metadata.description,
  path: '/',
});

export default function Home() {
  return <HomePageContent />;
}
