'use client';

import Section from '@/components/Section';
import GuideStep from '@/components/webservices/GuideStep';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  beforeYouStartItems,
  BLUEHOST_AFFILIATE_URL,
  BLUEHOST_ACCOUNT_MANAGER_URL,
  BLUEHOST_PRICING_NOTE,
  BLUEHOST_SIGNUP_HELP_URL,
  bluehostGuideSections,
  hostingIncludedFeatures,
  MHG_ADMIN_EMAIL,
} from '@/lib/webservices/bluehostGuideContent';

function GuideSection({
  sectionKey,
  affiliateHref,
}: {
  sectionKey: keyof typeof bluehostGuideSections;
  affiliateHref: string;
}) {
  const section = bluehostGuideSections[sectionKey];

  return (
    <Section bgColor="black" className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
            {section.title}
          </h2>
          <p className="text-gray-400 text-lg">{section.subtitle}</p>
          {sectionKey === 'signup' && (
            <p className="text-gray-500 text-sm mt-4">
              Step-by-step screenshots:{' '}
              <a
                href={BLUEHOST_SIGNUP_HELP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-blue font-semibold hover:underline"
              >
                Bluehost signup help article
              </a>
            </p>
          )}
        </div>

        <div className="space-y-5">
          {section.steps.map((step) => (
            <GuideStep
              key={`${section.id}-${step.stepNumber}`}
              stepNumber={step.stepNumber}
              title={step.title}
              description={step.description}
              imageSrc={step.imageSrc}
              imageAlt={step.imageAlt}
              tips={step.tips}
              link={
                step.link
                  ? {
                      ...step.link,
                      href: step.link.href === BLUEHOST_AFFILIATE_URL ? affiliateHref : step.link.href,
                    }
                  : undefined
              }
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

export default function BluehostGuidePage() {
  const [subId, setSubId] = useState('guide');

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('lead');
    if (p) setSubId(p);
  }, []);

  const affiliateHref = `${BLUEHOST_AFFILIATE_URL}?subId1=${encodeURIComponent(subId)}`;

  return (
    <>
      {/* Hero */}
      <Section bgColor="black" className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center">
          <div className="inline-block px-4 py-2 rounded-full bg-primary-blue/20 border border-primary-blue/30 mb-6">
            <span className="text-sm font-bold uppercase tracking-wider text-primary-blue">
              Hosting setup
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Set Up Your <span className="text-primary-blue">Bluehost</span> Hosting
          </h1>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8">
            Follow this guide to sign up for Bluehost Shared hosting and add MHG Strategy as an
            admin. You own your account — we never need your password.
          </p>
          <a
            href={affiliateHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-accent-yellowgold text-primary-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:bg-yellow-400"
          >
            Start with Bluehost
          </a>
          <p className="text-gray-400 text-sm mt-4 max-w-lg mx-auto">{BLUEHOST_PRICING_NOTE}</p>
          <p className="text-gray-500 text-sm mt-4">
            We recommend Bluehost; we may earn a commission if you sign up.
          </p>
        </div>
      </Section>

      {/* What's included */}
      <Section bgColor="black" className="py-12 md:py-16 border-t border-gray-800/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-2 rounded-full bg-primary-blue/20 border border-primary-blue/30 mb-4">
              <span className="text-sm font-bold uppercase tracking-wider text-primary-blue">
                Your hosting includes
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              What comes with your Bluehost account
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto">
              MHG builds your custom site directly on your hosting — no WordPress, no page builders, no templates. You own everything.
            </p>
          </div>
          <ul className="space-y-3 max-w-xl mx-auto">
            {hostingIncludedFeatures.map((item) => (
              <li key={item} className="flex items-start gap-3 text-gray-300">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-blue flex items-center justify-center text-sm font-bold text-white mt-0.5">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Before you start */}
      <Section bgColor="black" className="py-12 md:py-16 border-t border-gray-800/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
            Before you start
          </h2>
          <ul className="space-y-3 max-w-xl mx-auto">
            {beforeYouStartItems.map((item) => (
              <li key={item} className="flex items-start gap-3 text-gray-300">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-blue flex items-center justify-center text-sm font-bold text-white mt-0.5">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <GuideSection sectionKey="signup" affiliateHref={affiliateHref} />

      {/* Admin email callout between sections */}
      <Section bgColor="black" className="py-8 md:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="rounded-2xl border border-primary-blue/30 bg-primary-blue/10 p-6 text-center">
            <p className="text-gray-300 mb-2">When adding an admin user, use this email:</p>
            <p className="text-white font-mono text-lg md:text-xl font-semibold break-all">
              {MHG_ADMIN_EMAIL}
            </p>
          </div>
        </div>
      </Section>

      <GuideSection sectionKey="admin" affiliateHref={affiliateHref} />

      {/* Done */}
      <Section bgColor="black" className="py-16 md:py-24 bg-gradient-to-b from-gray-900/30 to-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            You&apos;re all set
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Shaun will receive an email invitation to accept admin access. Once accepted, we can
            start building your site. You will also receive an order confirmation email from
            Bluehost with your account details.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={BLUEHOST_ACCOUNT_MANAGER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 rounded-full border border-gray-600 text-white font-semibold hover:border-primary-blue hover:text-primary-blue transition-colors"
            >
              Open Account Manager
            </a>
            <Link
              href="/contact/"
              className="inline-block px-6 py-3 rounded-full bg-primary-blue text-white font-semibold hover:bg-primary-blue/90 transition-colors"
            >
              Need help? Contact us
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
