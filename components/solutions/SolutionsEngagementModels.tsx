import Link from 'next/link';
import CTAButton from '@/components/CTAButton';
import { solutionsPageContent } from '@/lib/content/solutionsPageContent';
import { managedOpsVertical } from '@/lib/content/verticalsContent';
import {
  capstoneHighlights,
  capstoneTier,
  gridTiers,
  type SolutionTier,
} from '@/lib/content/solutionsTiers';

function TierCard({ tier }: { tier: SolutionTier }) {
  return (
    <div
      className={`bg-white border rounded-2xl shadow-sm p-8 md:p-10 flex flex-col gap-6 transition-transform duration-200 hover:-translate-y-1 ${
        tier.recommended ? 'border-primary-blue shadow-md' : 'border-gray-200'
      }`}
    >
      <div className="space-y-2">
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-black">{tier.name}</h2>
          {tier.recommended && (
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary-blue text-white">
              {tier.badgeLabel ?? 'Most popular'}
            </span>
          )}
        </div>
        {tier.tag && (
          <p className="text-sm uppercase tracking-wide text-primary-blue font-semibold">{tier.tag}</p>
        )}
        <p className="text-gray-600 leading-relaxed">{tier.overview}</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-primary-black">Analytics &amp; Data</h3>
        <ul className="space-y-2 text-gray-700">
          {tier.analyticsData.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary-blue shrink-0" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-primary-black">Finance Operations &amp; Systems</h3>
        <ul className="space-y-2 text-gray-700">
          {tier.revOpsSystems.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary-blue shrink-0" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {tier.customBuild && (
        <div className="space-y-2">
          <h4 className="text-base font-semibold text-primary-black">Custom Build &amp; Automation</h4>
          <ul className="space-y-2 text-gray-700">
            {tier.customBuild.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-accent-yellowgold shrink-0" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tier.supportModel && (
        <div className="space-y-2">
          <h4 className="text-base font-semibold text-primary-black">Support Model</h4>
          <ul className="space-y-2 text-gray-700">
            {tier.supportModel.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary-black shrink-0" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-2">
        <h4 className="text-base font-semibold text-primary-black">Best For</h4>
        <ul className="space-y-2 text-gray-700">
          {tier.bestFor.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-gray-400 shrink-0" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CapstoneSection({ tier }: { tier: SolutionTier }) {
  const capabilityColumns = [
    {
      title: 'Analytics & Data',
      items: tier.analyticsData,
      dotClass: 'bg-primary-blue',
    },
    {
      title: 'Finance Operations & Systems',
      items: tier.revOpsSystems,
      dotClass: 'bg-primary-blue',
    },
    {
      title: 'Build, Support & Delivery',
      items: [...(tier.customBuild ?? []), ...(tier.supportModel ?? [])],
      dotClass: 'bg-accent-yellowgold',
    },
  ];

  return (
    <div className="w-full mt-8 tier:mt-10">
      <div className="rounded-2xl overflow-hidden border border-primary-blue shadow-xl shadow-primary-blue/10">
        <div className="bg-gradient-to-br from-primary-black via-gray-900 to-primary-black px-8 py-10 tier:px-12 tier:py-12">
          <div className="flex flex-col tier:flex-row tier:items-start tier:justify-between gap-6">
            <div className="space-y-4 max-w-3xl">
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary-blue text-white uppercase tracking-wide">
                Enterprise · Full Ownership
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {tier.name}
              </h2>
              {tier.tag && (
                <p className="text-sm uppercase tracking-wide text-primary-blue font-semibold">{tier.tag}</p>
              )}
            </div>
            <div className="flex flex-wrap gap-2 tier:justify-end tier:max-w-sm">
              {capstoneHighlights.map((highlight) => (
                <span
                  key={highlight}
                  className="px-3 py-1.5 text-xs md:text-sm font-medium rounded-full bg-white/10 text-gray-100 border border-white/20"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white grid grid-cols-1 tier:grid-cols-5 gap-8 tier:gap-10 p-8 md:p-10 tier:p-12">
          <div className="tier:col-span-2 flex flex-col gap-6">
            <p className="text-gray-600 leading-relaxed text-lg">{tier.overview}</p>
            <div className="space-y-2">
              <h4 className="text-base font-semibold text-primary-black">Best For</h4>
              <ul className="space-y-2 text-gray-700">
                {tier.bestFor.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-400 shrink-0" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-2">
              <CTAButton href="/contact" variant="primary">
                Discuss Full Ownership
              </CTAButton>
            </div>
          </div>

          <div className="tier:col-span-3 grid grid-cols-1 tier:grid-cols-3 gap-5">
            {capabilityColumns.map((column) => (
              <div
                key={column.title}
                className="bg-gray-50 border border-gray-100 rounded-xl p-5 md:p-6 flex flex-col gap-3"
              >
                <h3 className="text-base font-semibold text-primary-black">{column.title}</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  {column.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${column.dotClass}`} aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedManagedOpsCard() {
  return (
    <div className="mb-10 pb-10 border-b border-gray-300">
      <div className="rounded-2xl overflow-hidden border-2 border-primary-blue shadow-lg shadow-primary-blue/10 bg-white">
        <div className="bg-gradient-to-br from-primary-blue/10 via-white to-white px-8 py-8 md:px-10 md:py-10">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-black">
              {managedOpsVertical.name}
            </h2>
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary-blue text-white">
              Cross-functional
            </span>
          </div>
          <p className="text-sm uppercase tracking-wide text-primary-blue font-semibold mb-4">
            {managedOpsVertical.promise}
          </p>
          <p className="text-gray-600 leading-relaxed text-lg mb-6 max-w-4xl">
            {managedOpsVertical.intro}
          </p>
          <ul className="space-y-2 text-gray-700 mb-8">
            {managedOpsVertical.capabilities.slice(0, 3).map((group) => (
              <li key={group.title} className="flex gap-2">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-primary-blue shrink-0" aria-hidden />
                <span>
                  <strong>{group.title}:</strong> {group.items[0]}
                </span>
              </li>
            ))}
          </ul>
          <Link
            href="/managed-ops"
            className="inline-flex items-center text-primary-blue font-semibold hover:underline"
          >
            Explore Managed Ops →
          </Link>
        </div>
      </div>
    </div>
  );
}

function SolutionsV1Bridge() {
  const { intro, portfolioLink, preTierCta } = solutionsPageContent;

  return (
    <div className="max-w-5xl mx-auto text-center space-y-6 mb-12">
      <div className="space-y-4">
        <p className="text-sm md:text-base uppercase tracking-[0.2em] text-primary-blue font-semibold">
          {intro.eyebrow}
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-black">
          {intro.headline}
        </h2>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">{intro.subheadline}</p>
      </div>

      <p className="text-base text-gray-600">
        {portfolioLink.prefix}{' '}
        <Link href={portfolioLink.href} className="text-primary-blue font-semibold hover:underline">
          {portfolioLink.label}
        </Link>
        .
      </p>

      <div className="space-y-4 pt-2">
        <p className="text-lg md:text-xl font-semibold text-primary-black">{preTierCta.headline}</p>
        <CTAButton href={preTierCta.href} variant="primary">
          {preTierCta.button}
        </CTAButton>
      </div>
    </div>
  );
}

type SolutionsEngagementModelsProps = {
  showFeaturedCard?: boolean;
  showHeader?: boolean;
  showV1Bridge?: boolean;
};

export default function SolutionsEngagementModels({
  showFeaturedCard = true,
  showHeader = false,
  showV1Bridge = false,
}: SolutionsEngagementModelsProps) {
  return (
    <>
      {showHeader && (
        <div className="max-w-5xl mx-auto text-center space-y-6 mb-10">
          <p className="text-sm md:text-base uppercase tracking-[0.2em] text-primary-blue font-semibold">
            Solutions
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-black">
            Scalable Finance Operations Engagement Models
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Structured engagement models spanning digital transformation, AI deployment, and managed finance operations — designed to meet your organization where it is and scale with its operational maturity.
          </p>
        </div>
      )}

      {showV1Bridge && <SolutionsV1Bridge />}

      {showFeaturedCard && <FeaturedManagedOpsCard />}

      <div className="grid grid-cols-1 tier:grid-cols-2 gap-8 tier:gap-10">
        {gridTiers.map((tier) => (
          <TierCard key={tier.name} tier={tier} />
        ))}
      </div>

      <CapstoneSection tier={capstoneTier} />
    </>
  );
}
