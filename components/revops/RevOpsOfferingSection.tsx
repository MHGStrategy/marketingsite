import Link from 'next/link';
import Section from '@/components/Section';
import {
  revOpsAutomatedTier,
  revOpsOfferingFootnote,
} from '@/lib/content/revOpsTiers';

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

export default function RevOpsOfferingSection() {
  const tier = revOpsAutomatedTier;

  return (
    <Section>
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-blue">
            Engagement Model
          </p>
        </div>

        <div className="bg-white border border-primary-blue rounded-2xl shadow-md p-8 md:p-10 flex flex-col gap-6">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TierDetailSection title="Analytics & Data" items={tier.analyticsData} dotClass="bg-primary-blue" />
            <TierDetailSection title="RevOps & Systems" items={tier.revOpsSystems} dotClass="bg-primary-blue" />
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
          </div>
        </div>

        <p className="text-center text-gray-600 leading-relaxed mt-8 max-w-3xl mx-auto">
          {revOpsOfferingFootnote}{' '}
          <Link href="/insights/ai-ready-data/" className="text-primary-blue font-semibold hover:underline">
            Is your data ready for AI?
          </Link>{' '}
          ·{' '}
          <Link href="/insights/define-the-workload/" className="text-primary-blue font-semibold hover:underline">
            Define the workload before picking tools
          </Link>
        </p>
      </div>
    </Section>
  );
}
