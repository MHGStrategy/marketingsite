'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function PortfolioRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const industry = searchParams.get('industry');
    const target = industry
      ? `/portfolio/?industry=${encodeURIComponent(industry)}`
      : '/portfolio/';
    router.replace(target);
  }, [router, searchParams]);

  return (
    <div className="min-h-[40vh] flex items-center justify-center text-gray-600">
      Redirecting to portfolio...
    </div>
  );
}
