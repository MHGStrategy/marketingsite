import { Suspense } from 'react';
import PortfolioRedirect from '@/components/portfolio/PortfolioRedirect';

export default function MultiEntityFpaRedirectPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[40vh] flex items-center justify-center text-gray-600">
          Redirecting to portfolio...
        </div>
      }
    >
      <PortfolioRedirect />
    </Suspense>
  );
}
