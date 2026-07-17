import type { Metadata } from 'next';
import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo/siteMetadata';

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: 'Page Not Found | MHG Strategy',
    description: 'The page you are looking for could not be found on MHG Strategy.',
    path: '/404/',
  }),
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-primary-black mb-2">404</h1>
      <p className="text-xl text-gray-600 mb-8">This page could not be found.</p>
      <Link
        href="/"
        className="inline-block bg-primary-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
      >
        Go home
      </Link>
    </div>
  );
}
