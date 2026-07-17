import Link from 'next/link';
import type { WebOpsTier } from '@/lib/content/webOpsTiers';

type WebOpsTierCardsProps = {
  gridTiers: WebOpsTier[];
  capstoneTier: WebOpsTier;
  capstoneHighlights: string[];
  contactHref?: string;
};

function TierDetailSection({
  title,
  items,
  dotClass,
  barClass = 'bg-primary-blue',
  headingLevel = 'h3',
  compact = false,
}: {
  title: string;
  items: string[];
  dotClass: string;
  barClass?: string;
  headingLevel?: 'h3' | 'h4';
  compact?: boolean;
}) {
  const Heading = headingLevel;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-2.5">
        <span className={`w-0.5 h-4 rounded-full shrink-0 ${barClass}`} aria-hidden />
        <Heading
          className={`font-semibold text-white ${
            compact ? 'text-sm uppercase tracking-wide' : 'text-base uppercase tracking-wide'
          }`}
        >
          {title}
        </Heading>
      </div>
      <ul className={`text-gray-300 ${compact ? 'space-y-1 text-sm' : 'space-y-1.5 text-sm'}`}>
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 items-start">
            <span className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${dotClass}`} aria-hidden />
            <span className="leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PricingDisplay({
  tier,
  prominent = false,
  goldAccent = false,
}: {
  tier: WebOpsTier;
  prominent?: boolean;
  goldAccent?: boolean;
}) {
  if ('hidden' in tier.pricing && tier.pricing.hidden) {
    return null;
  }

  if ('gated' in tier.pricing && tier.pricing.gated) {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-accent-yellowgold/10 border border-accent-yellowgold/30 text-xs font-bold uppercase tracking-widest text-accent-yellowgold">
        By qualification
      </span>
    );
  }

  const display = 'display' in tier.pricing ? tier.pricing.display : '';

  if (goldAccent) {
    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-md bg-accent-yellowgold/15 border border-accent-yellowgold/40 text-xs font-bold uppercase tracking-widest text-accent-yellowgold ${
          prominent ? 'text-sm' : ''
        }`}
      >
        {display}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md bg-primary-blue/10 border border-primary-blue/20 text-xs font-bold uppercase tracking-widest text-primary-blue ${
        prominent ? 'text-sm' : ''
      }`}
    >
      {display}
    </span>
  );
}

function TierCardHeader({
  tier,
  compact = false,
  goldAccent = false,
}: {
  tier: WebOpsTier;
  compact?: boolean;
  goldAccent?: boolean;
}) {
  const showPricing = !('hidden' in tier.pricing && tier.pricing.hidden);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap">
          <h2
            className={`font-bold leading-tight ${
              goldAccent ? 'text-accent-yellowgold' : 'text-white'
            } ${compact ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'}`}
          >
            {tier.name}
          </h2>
          {tier.recommended && (
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-accent-yellowgold text-primary-black uppercase tracking-wider shrink-0">
              {tier.badgeLabel ?? 'Most popular'}
            </span>
          )}
        </div>
        {showPricing && <PricingDisplay tier={tier} goldAccent={goldAccent} />}
      </div>
      {tier.tag && (
        <p className={`text-xs leading-snug ${goldAccent ? 'text-gray-300' : 'text-gray-400'}`}>
          {tier.tag}
        </p>
      )}
    </div>
  );
}

function TierCta({
  tier,
  fallbackHref,
}: {
  tier: WebOpsTier;
  fallbackHref: string;
}) {
  if (!tier.ctaLabel) return null;

  return (
    <div className="mt-5 pt-4 border-t border-gray-800">
      <Link
        href={tier.ctaHref ?? fallbackHref}
        className="inline-block text-center px-6 py-3 rounded-full bg-accent-yellowgold text-primary-black font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:bg-yellow-400"
      >
        {tier.ctaLabel}
      </Link>
    </div>
  );
}

function TierCard({
  tier,
  className = '',
  compact = false,
  goldAccent = false,
  contactHref = '#contact',
}: {
  tier: WebOpsTier;
  className?: string;
  compact?: boolean;
  goldAccent?: boolean;
  contactHref?: string;
}) {
  const accentBorder = tier.recommended || goldAccent
    ? 'border-t-2 border-t-accent-yellowgold'
    : 'border-t-2 border-t-primary-blue/50';

  const cardBase = `rounded-2xl overflow-hidden transition-transform duration-200 hover:-translate-y-1 ${accentBorder} ${
    tier.recommended
      ? 'border border-accent-yellowgold/25 bg-gray-900 shadow-xl shadow-accent-yellowgold/5'
      : goldAccent
        ? 'border border-accent-yellowgold/25 bg-gradient-to-br from-gray-900 via-gray-900 to-accent-yellowgold/[0.06] shadow-lg shadow-accent-yellowgold/10 hover:shadow-accent-yellowgold/20'
        : 'border border-gray-800 bg-gray-900 shadow-lg shadow-black/40'
  } ${className}`;

  const header = <TierCardHeader tier={tier} compact={compact} goldAccent={goldAccent} />;

  const details = (
    <>
      {tier.overview && (
        <p className="text-gray-300 text-sm leading-relaxed">{tier.overview}</p>
      )}
      {tier.inheritsFrom && (
        <p className="text-gray-500 italic text-xs leading-relaxed">{tier.inheritsFrom}</p>
      )}
      {tier.sections.map((section, index) => (
        <TierDetailSection
          key={section.title}
          title={section.title}
          items={section.items}
          dotClass={goldAccent ? 'bg-accent-yellowgold' : 'bg-primary-blue'}
          barClass={
            goldAccent
              ? index % 2 === 0
                ? 'bg-accent-yellowgold'
                : 'bg-primary-blue'
              : 'bg-primary-blue'
          }
          headingLevel={compact ? 'h4' : 'h3'}
          compact={compact}
        />
      ))}
      {tier.bestFor && (
        <div className="space-y-1 pt-1">
          <p
            className={`text-xs font-bold uppercase tracking-widest ${
              goldAccent ? 'text-accent-yellowgold/80' : 'text-gray-500'
            }`}
          >
            Best For
          </p>
          <p className="text-gray-300 text-sm leading-snug">{tier.bestFor}</p>
        </div>
      )}
    </>
  );

  return (
    <div className={cardBase}>
      <div className="p-6 md:p-8">
        <div className="pb-5 mb-5 border-b border-gray-800">{header}</div>
        <div className="flex flex-col gap-5">{details}</div>
        <TierCta tier={tier} fallbackHref={contactHref} />
      </div>
    </div>
  );
}

function CapstoneSection({
  tier,
  capstoneHighlights,
  contactHref,
}: {
  tier: WebOpsTier;
  capstoneHighlights: string[];
  contactHref: string;
}) {
  return (
    <div className="w-full mt-5 lg:mt-6">
      <div className="rounded-2xl overflow-hidden border border-primary-blue/40 shadow-2xl shadow-primary-blue/10">
        <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-primary-black px-8 py-10 lg:px-12 lg:py-12 border-b border-gray-800">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {tier.name}
              </h2>
              {tier.tag && <p className="text-sm text-gray-400">{tier.tag}</p>}
              {tier.overview && (
                <p className="text-gray-300 text-sm leading-relaxed">{tier.overview}</p>
              )}
            </div>
            {capstoneHighlights.length > 0 && (
              <div className="flex flex-wrap gap-2 lg:justify-end lg:max-w-sm">
                {capstoneHighlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/5 text-gray-300 border border-gray-700"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-900">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-800">
            {tier.sections.map((section) => (
              <div key={section.title} className="p-8 md:p-10 lg:p-12">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-0.5 h-4 rounded-full bg-primary-blue shrink-0" aria-hidden />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white">{section.title}</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-2.5 items-start">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 bg-primary-blue" aria-hidden />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {(tier.ctaLabel || tier.bestFor || tier.footnote) && (
            <div className="border-t border-gray-800 p-8 md:p-10 lg:p-12 space-y-4">
              {tier.bestFor && (
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-300">Best For</p>
                  <p className="text-gray-300 text-sm leading-snug">{tier.bestFor}</p>
                </div>
              )}
              {tier.footnote && (
                <p className="text-xs text-gray-300 leading-relaxed">{tier.footnote}</p>
              )}
              {tier.ctaLabel && (
                <div>
                  <Link
                    href={tier.ctaHref ?? contactHref}
                    className="inline-block text-center px-6 py-3 rounded-full bg-accent-yellowgold text-primary-black font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:bg-yellow-400"
                  >
                    {tier.ctaLabel}
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WebOpsTierCards({
  gridTiers,
  capstoneTier,
  capstoneHighlights,
  contactHref = '#contact',
}: WebOpsTierCardsProps) {
  return (
    <>
      <div className="flex flex-col gap-5 lg:gap-6">
        {gridTiers.map((tier) => (
          <TierCard key={tier.name} tier={tier} goldAccent contactHref={contactHref} />
        ))}
      </div>
      <CapstoneSection
        tier={capstoneTier}
        capstoneHighlights={capstoneHighlights}
        contactHref={contactHref}
      />
    </>
  );
}
