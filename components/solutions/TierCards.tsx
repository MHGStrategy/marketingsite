import CTAButton from '@/components/CTAButton';
import type { SolutionTier } from '@/lib/content/revOpsTiers';

type TierCardsProps = {
  gridTiers: SolutionTier[];
  capstoneTier: SolutionTier;
  capstoneHighlights: string[];
  systemsColumnTitle?: string;
  capstoneCtaLabel?: string;
  capstoneCtaHref?: string;
};

function TierDetailSection({
  title,
  items,
  dotClass,
  headingLevel = 'h3',
}: {
  title: string;
  items: string[];
  dotClass: string;
  headingLevel?: 'h3' | 'h4';
}) {
  const Heading = headingLevel;
  const headingClass =
    headingLevel === 'h3'
      ? 'text-lg font-semibold text-primary-black'
      : 'text-base font-semibold text-primary-black';

  return (
    <div className="space-y-2">
      <Heading className={headingClass}>{title}</Heading>
      <ul className="space-y-1.5 text-gray-700">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${dotClass}`} aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TierCard({
  tier,
  systemsColumnTitle,
  className = '',
  wide = false,
}: {
  tier: SolutionTier;
  systemsColumnTitle: string;
  className?: string;
  wide?: boolean;
}) {
  const header = (
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
  );

  const details = (
    <>
      <TierDetailSection title="Analytics & Data" items={tier.analyticsData} dotClass="bg-primary-blue" />
      <TierDetailSection title={systemsColumnTitle} items={tier.revOpsSystems} dotClass="bg-primary-blue" />
      {tier.customBuild && (
        <TierDetailSection
          title="Custom Build & Automation"
          items={tier.customBuild}
          dotClass="bg-accent-yellowgold"
          headingLevel="h4"
        />
      )}
      {tier.supportModel && (
        <TierDetailSection
          title="Support Model"
          items={tier.supportModel}
          dotClass="bg-primary-black"
          headingLevel="h4"
        />
      )}
      <TierDetailSection
        title="Best For"
        items={tier.bestFor}
        dotClass="bg-gray-400"
        headingLevel="h4"
      />
    </>
  );

  if (wide) {
    return (
      <div
        className={`bg-white border rounded-2xl shadow-sm p-6 md:p-8 transition-transform duration-200 hover:-translate-y-1 ${
          tier.recommended ? 'border-primary-blue shadow-md' : 'border-gray-200'
        } ${className}`}
      >
        <div className="flex flex-col tier:grid tier:grid-cols-12 tier:gap-6 tier:items-start">
          <div className="tier:col-span-4">{header}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 tier:col-span-8 tier:grid-cols-3 tier:gap-4">
            {details}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white border rounded-2xl shadow-sm p-8 md:p-10 flex flex-col gap-6 transition-transform duration-200 hover:-translate-y-1 ${
        tier.recommended ? 'border-primary-blue shadow-md' : 'border-gray-200'
      } ${className}`}
    >
      {header}
      <div className="flex flex-col gap-6">{details}</div>
    </div>
  );
}

function CapstoneSection({
  tier,
  capstoneHighlights,
  systemsColumnTitle,
  capstoneCtaLabel,
  capstoneCtaHref,
}: {
  tier: SolutionTier;
  capstoneHighlights: string[];
  systemsColumnTitle: string;
  capstoneCtaLabel: string;
  capstoneCtaHref: string;
}) {
  const capabilityColumns = [
    {
      title: 'Analytics & Data',
      items: tier.analyticsData,
      dotClass: 'bg-primary-blue',
    },
    {
      title: systemsColumnTitle,
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
              <CTAButton href={capstoneCtaHref} variant="primary">
                {capstoneCtaLabel}
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

export default function TierCards({
  gridTiers,
  capstoneTier,
  capstoneHighlights,
  systemsColumnTitle = 'Operations & Systems',
  capstoneCtaLabel = 'Discuss Full Ownership',
  capstoneCtaHref = '/contact/',
}: TierCardsProps) {
  return (
    <>
      <div className="grid grid-cols-1 tier:grid-cols-2 gap-8 tier:gap-10">
        {gridTiers.map((tier, index) => {
          const isWide = gridTiers.length % 2 === 1 && index === gridTiers.length - 1;
          return (
            <TierCard
              key={tier.name}
              tier={tier}
              systemsColumnTitle={systemsColumnTitle}
              wide={isWide}
              className={isWide ? 'tier:col-span-2' : ''}
            />
          );
        })}
      </div>
      <CapstoneSection
        tier={capstoneTier}
        capstoneHighlights={capstoneHighlights}
        systemsColumnTitle={systemsColumnTitle}
        capstoneCtaLabel={capstoneCtaLabel}
        capstoneCtaHref={capstoneCtaHref}
      />
    </>
  );
}
