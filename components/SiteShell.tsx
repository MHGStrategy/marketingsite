'use client';

import { usePathname } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const CHROMELESS_PATHS = new Set(['/webops/1s']);

function isChromelessPath(pathname: string): boolean {
  const normalized = pathname.replace(/\/$/, '') || '/';
  return CHROMELESS_PATHS.has(normalized);
}

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const chromeless = isChromelessPath(pathname ?? '');

  if (chromeless) {
    return <main>{children}</main>;
  }

  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}
