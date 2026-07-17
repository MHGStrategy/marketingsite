'use client';

import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';
import type { CalBookingType } from '@/lib/cal';
import { getCalLink } from '@/lib/cal';

type CalEmbedProps = {
  bookingType: CalBookingType;
  prefill?: {
    name?: string;
    email?: string;
  };
  className?: string;
};

const BRAND_COLOR = '#239bf6';

export function CalEmbed({ bookingType, prefill, className = '' }: CalEmbedProps) {
  const calLink = getCalLink(bookingType);

  useEffect(() => {
    if (!calLink) return;

    void (async () => {
      const cal = await getCalApi();
      cal('ui', {
        theme: 'light',
        styles: { branding: { brandColor: BRAND_COLOR } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, [calLink]);

  if (!calLink) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-8 text-center text-amber-900">
        <p className="font-semibold">Scheduling is being set up</p>
        <p className="mt-2 text-sm leading-relaxed">
          Cal.com is not configured yet. Email{' '}
          <a href="mailto:hello@mhgstrategy.com" className="underline">
            hello@mhgstrategy.com
          </a>{' '}
          or call{' '}
          <a href="tel:9252908604" className="underline">
            (925) 290-8604
          </a>{' '}
          to book a time.
        </p>
      </div>
    );
  }

  return (
    <div className={`min-h-[640px] w-full overflow-hidden rounded-2xl border border-gray-200 bg-white ${className}`}>
      <Cal
        calLink={calLink}
        style={{ width: '100%', height: '100%', minHeight: '640px', overflow: 'auto' }}
        config={{
          layout: 'month_view',
          theme: 'light',
          ...(prefill?.name ? { name: prefill.name } : {}),
          ...(prefill?.email ? { email: prefill.email } : {}),
        }}
      />
    </div>
  );
}
