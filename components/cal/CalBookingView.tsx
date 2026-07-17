'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Section from '@/components/Section';
import { CalEmbed } from '@/components/cal/CalEmbed';
import {
  CAL_BOOKING_CONFIG,
  type CalBookingType,
  isCalBookingType,
} from '@/lib/cal';

type CalBookingViewProps = {
  activeType: CalBookingType;
};

const BOOKING_TYPES: CalBookingType[] = ['webops', 'revops'];

export function CalBookingView({ activeType }: CalBookingViewProps) {
  const searchParams = useSearchParams();
  const prefillName = searchParams.get('name')?.trim() || undefined;
  const prefillEmail = searchParams.get('email')?.trim() || undefined;
  const active = CAL_BOOKING_CONFIG[activeType];

  return (
    <>
      <Section className="pt-8 md:pt-12">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-black">Book a call</h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            Pick a time that works for you. We&apos;ll send a calendar invite with video call details.
          </p>
        </div>
      </Section>

      <Section bgColor="gray" className="pb-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BOOKING_TYPES.map((type) => {
              const config = CAL_BOOKING_CONFIG[type];
              const isActive = type === activeType;
              return (
                <Link
                  key={type}
                  href={config.siteBookPath}
                  className={`rounded-2xl border p-6 text-left transition-all ${
                    isActive
                      ? 'border-primary-blue bg-white shadow-lg shadow-primary-blue/10'
                      : 'border-gray-200 bg-white hover:border-primary-blue/40'
                  }`}
                >
                  <p className="font-bold text-primary-black">{config.label}</p>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{config.description}</p>
                </Link>
              );
            })}
          </div>

          <div>
            <h2 className="text-xl font-bold text-primary-black mb-4">{active.label}</h2>
            <CalEmbed
              bookingType={activeType}
              prefill={{ name: prefillName, email: prefillEmail }}
            />
          </div>

          <p className="text-center text-sm text-gray-500">
            Prefer to start with a form instead?{' '}
            <Link href={active.fallbackAnchor} className="text-primary-blue underline hover:text-primary-blue/80">
              Request a {active.shortLabel} review →
            </Link>
          </p>
        </div>
      </Section>
    </>
  );
}

export function resolveBookingType(value: string | undefined): CalBookingType {
  if (value && isCalBookingType(value)) {
    return value === 'managed-ops' ? 'revops' : value;
  }
  return 'webops';
}
