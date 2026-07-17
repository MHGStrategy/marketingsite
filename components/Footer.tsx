import Link from 'next/link';
import FooterBrand from '@/components/FooterBrand';
import FooterNav from '@/components/FooterNav';
import FooterSpacingSync from '@/components/FooterSpacingSync';

function FooterContactAndCopyright() {
  return (
    <div className="text-center space-y-2">
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-gray-300 text-base md:text-lg">
        <Link href="tel:9252908604" className="hover:text-primary-blue transition-colors">
          925.290.8604
        </Link>
        <span className="text-gray-500">•</span>
        <Link href="mailto:hello@mhgstrategy.com" className="hover:text-primary-blue transition-colors">
          hello@mhgstrategy.com
        </Link>
      </div>
      <Link
        href="/webops/"
        className="inline-block text-primary-blue hover:text-primary-blue/80 transition-colors font-medium text-sm md:text-base"
      >
        &copy; {new Date().getFullYear()} MHG Strategy. All rights reserved.
      </Link>
    </div>
  );
}

/** Baseline footer top padding; FooterSpacingSync adjusts to keep logo fixed. */
const footerTopPadding = 'pt-16 md:pt-20';

export default function Footer() {
  return (
    <footer className={`bg-primary-black text-white ${footerTopPadding} pb-4 md:pb-6`}>
      <FooterSpacingSync />
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <div className="w-full">
            <FooterNav />
          </div>

          <FooterBrand logoClassName="h-40 w-auto md:h-48" />
        </div>

        <div className="border-t border-gray-700 mt-12 md:mt-16 pt-5 md:pt-6">
          <FooterContactAndCopyright />
        </div>
      </div>
    </footer>
  );
}
