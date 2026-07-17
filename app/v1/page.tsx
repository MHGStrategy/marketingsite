import type { Metadata } from 'next';
import Link from 'next/link';
import { buildRedirectMetadata } from '@/lib/seo/siteMetadata';

export const metadata: Metadata = buildRedirectMetadata('/solutions/');

export default function V1RedirectPage() {
  return (
    <>
      <head>
        <meta httpEquiv="refresh" content="0; url=/solutions/" />
      </head>
      <div className="min-h-[40vh] flex flex-col items-center justify-center px-4 text-center">
        <p className="text-lg text-gray-600">
          Redirecting to{' '}
          <Link href="/solutions" className="text-primary-blue font-semibold hover:underline">
            Solutions
          </Link>
          …
        </p>
      </div>
    </>
  );
}
