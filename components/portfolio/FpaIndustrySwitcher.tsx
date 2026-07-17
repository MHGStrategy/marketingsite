'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import FpaIndustryPanel from '@/components/portfolio/FpaIndustryPanel';
import {
  type FpaIndustry,
  type FpaIndustryId,
} from '@/lib/portfolio/multiEntityFpaContent';

type FpaIndustrySwitcherProps = {
  industries: FpaIndustry[];
  defaultIndustryId?: FpaIndustryId;
};

export default function FpaIndustrySwitcher({
  industries,
  defaultIndustryId = 'logistics',
}: FpaIndustrySwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryIndustry = searchParams.get('industry');

  const isVisibleIndustry = (id: string | null): id is FpaIndustryId =>
    Boolean(id && industries.some((industry) => industry.id === id));

  const initialIndustryId = isVisibleIndustry(queryIndustry) ? queryIndustry : defaultIndustryId;
  const [activeIndustryId, setActiveIndustryId] = useState<FpaIndustryId>(initialIndustryId);

  const activeIndustry = useMemo(
    () => industries.find((industry) => industry.id === activeIndustryId) ?? industries[0],
    [activeIndustryId, industries]
  );

  const updateIndustry = useCallback(
    (industryId: FpaIndustryId) => {
      setActiveIndustryId(industryId);
      const params = new URLSearchParams(searchParams.toString());
      params.set('industry', industryId);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  useEffect(() => {
    if (isVisibleIndustry(queryIndustry) && queryIndustry !== activeIndustryId) {
      setActiveIndustryId(queryIndustry);
    }
  }, [queryIndustry, activeIndustryId, industries]);

  if (!activeIndustry) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="sticky top-20 z-40 bg-white/95 backdrop-blur border-y border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl py-4">
          <div
            role="tablist"
            aria-label="FP&A industry selection"
            className="flex flex-wrap justify-center gap-3"
          >
            {industries.map((industry) => {
              const isActive = industry.id === activeIndustryId;
              return (
                <button
                  key={industry.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => updateIndustry(industry.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-primary-blue text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {industry.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <FpaIndustryPanel key={activeIndustry.id} industry={activeIndustry} />
    </div>
  );
}
