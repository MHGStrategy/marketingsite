import Link from 'next/link';
import type { ReactNode } from 'react';
import CTAButton from '@/components/CTAButton';
import Section from '@/components/Section';
import { VerticalLeadForm } from '@/components/leads/LeadCaptureForms';
import TierCards from '@/components/solutions/TierCards';
import type { VerticalContent } from '@/lib/content/verticalsContent';
import { mediaAssets } from '@/lib/media/assets';
import type { SolutionTier } from '@/lib/content/revOpsTiers';

type VerticalPageProps = {
  vertical: VerticalContent;
  showLeadForm?: boolean;
  tiers?: {
    gridTiers: SolutionTier[];
    capstoneTier: SolutionTier;
    capstoneHighlights: string[];
    systemsColumnTitle?: string;
    capstoneCtaLabel?: string;
  };
  children?: ReactNode;
};

export default function VerticalPage({ vertical, showLeadForm = false, tiers, children }: VerticalPageProps) {
  const leadForm = vertical.leadForm;
  const hasLeadForm = showLeadForm || Boolean(leadForm);
  const heroCtaHref = hasLeadForm ? '#lead-form' : '/contact';

  return (
    <>
      <Section
        id="hero"
        fullWidth
        className="relative !pt-0 !pb-0 w-screen max-w-none min-h-[70vh] overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url('${mediaAssets.hero}')` }}
      >
        <div className="relative z-10 flex h-[70vh] items-end justify-center px-4 sm:px-6 md:px-8 lg:px-12 pb-10 md:pb-12 lg:pb-14">
          <div className="w-full max-w-5xl text-center space-y-4">
            <p
              className={`text-sm font-semibold tracking-[0.12em] text-primary-blue drop-shadow ${vertical.heroEyebrow ? 'normal-case' : 'uppercase'}`}
            >
              {vertical.heroEyebrow ?? vertical.name}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow">
              {vertical.promise}
            </h1>
            <p className="text-lg md:text-xl text-gray-100 md:text-gray-200 leading-relaxed max-w-4xl mx-auto drop-shadow">
              {vertical.intro}
            </p>
            <div className="pt-2">
              <CTAButton href={heroCtaHref} variant="primary">
                {hasLeadForm && leadForm ? leadForm.heroCtaLabel : 'Start the Conversation'}
              </CTAButton>
            </div>
          </div>
        </div>
      </Section>

      {(vertical.capabilities.length > 0 || vertical.bestFor || (vertical.links && vertical.links.length > 0)) && (
        <Section bgColor="gray">
          <div className="max-w-5xl mx-auto space-y-10">
            {vertical.capabilities.map((group) => (
              <div
                key={group.title}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 md:p-10 space-y-4"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-primary-black">{group.title}</h2>
                <ul className="space-y-2 text-gray-700">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-primary-blue shrink-0" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {vertical.bestFor && (
              <div className="bg-primary-black border border-gray-800 rounded-2xl p-8 md:p-10">
                <h2 className="text-xl font-bold text-white mb-3">Best for</h2>
                <p className="text-gray-300 leading-relaxed text-lg">{vertical.bestFor}</p>
              </div>
            )}

            {vertical.links && vertical.links.length > 0 && (
              <div className="flex flex-wrap gap-4 justify-center pt-2">
                {vertical.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-block px-6 py-3 rounded-full border border-primary-blue text-primary-blue font-semibold hover:bg-primary-blue hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </Section>
      )}

      {children}

      {tiers && (
        <Section>
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-10">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-blue">
                Engagement Models
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-black">
                Structured tiers that scale with your maturity
              </h2>
            </div>
            <TierCards
              gridTiers={tiers.gridTiers}
              capstoneTier={tiers.capstoneTier}
              capstoneHighlights={tiers.capstoneHighlights}
              systemsColumnTitle={tiers.systemsColumnTitle}
              capstoneCtaLabel={tiers.capstoneCtaLabel}
              capstoneCtaHref={hasLeadForm ? '#lead-form' : '/contact/'}
            />
          </div>
        </Section>
      )}

      <Section bgColor="black" id={hasLeadForm ? 'lead-form' : undefined}>
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          {hasLeadForm && leadForm ? (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Ready to explore {vertical.name}?
              </h2>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">{leadForm.sectionDescription}</p>
              <div className="bg-gray-900/50 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-gray-800/50">
                <VerticalLeadForm
                  config={{
                    formSource: leadForm.formSource,
                    sheetName: leadForm.sheetName,
                    submitLabel: leadForm.submitLabel,
                    fieldIdPrefix: leadForm.fieldIdPrefix,
                    reviewLabel: leadForm.reviewLabel,
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Ready to explore {vertical.name}?
              </h2>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Share your objectives and current systems landscape. We&apos;ll assess fit and recommend the
                right engagement tier.
              </p>
              <div className="pt-4">
                <CTAButton href="/contact" variant="primary">
                  Request an Engagement Assessment →
                </CTAButton>
              </div>
            </>
          )}
        </div>
      </Section>
    </>
  );
}
