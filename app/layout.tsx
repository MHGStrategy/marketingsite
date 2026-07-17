import './globals.css';
import JsonLd from '@/components/seo/JsonLd';
import SiteShell from '@/components/SiteShell';
import { organizationJsonLd, webSiteJsonLd } from '@/lib/seo/jsonLd';
import { rootMetadata } from '@/lib/seo/siteMetadata';

export const metadata = rootMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <JsonLd data={[organizationJsonLd, webSiteJsonLd]} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
