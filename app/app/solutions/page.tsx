import CTAButton from '@/components/CTAButton';
import Section from '@/components/Section';

type Tier = {
  name: string;
  tag?: string;
  overview: string;
  analyticsData: string[];
  revOpsSystems: string[];
  customBuild?: string[];
  supportModel?: string[];
  bestFor: string[];
  recommended?: boolean;
};

const tiers: Tier[] = [
  {
    name: 'Consult',
    tag: 'Strategic guidance where your team executes',
    overview:
      'Advisory engagement focused on defining what to measure, how to govern data, and how your operating model should run—while your team owns execution.',
    analyticsData: [
      'KPI definition and reporting requirements',
      'Governance recommendations',
    ],
    revOpsSystems: [
      'Lifecycle design and process mapping',
      'Operating model guidance',
    ],
    supportModel: ['Response within 48 hours'],
    bestFor: ['Strategic guidance while keeping execution in-house'],
  },
  {
    name: 'RevOps',
    tag: 'Ongoing RevOps execution with governance',
    overview:
      'Hands-on RevOps support to keep systems clean, documented, and governed while your team drives day-to-day execution.',
    analyticsData: [
      'Dashboard QA and documentation',
      'Access and permissions management',
      'Change control and release management',
    ],
    revOpsSystems: [
      'Lifecycle implementation with routing and SLAs',
      'Required fields and data hygiene',
    ],
    supportModel: ['Standard business-hours response'],
    bestFor: ['Teams that want governed RevOps execution without full outsourcing'],
  },
  {
    name: 'Automation',
    tag: 'Scaling automation and system integrations',
    overview:
      'Build-and-scale engagement to deepen automation, integrations, and performance tuning across your RevOps stack.',
    analyticsData: [
      'Proactive monitoring and performance tuning',
      'Certified metrics and reporting accuracy',
    ],
    revOpsSystems: [
      'Advanced routing and process controls',
      'Broader system integrations across tools',
    ],
    customBuild: ['1-2 workflows built or enhanced per month'],
    supportModel: ['Priority business-hours response'],
    bestFor: ['Scaling automation and system integrations'],
    recommended: true,
  },
  {
    name: 'Managed RevOps',
    tag: 'Full outsourcing of RevOps & systems ownership',
    overview:
      'Fully managed RevOps and systems ownership—including automation, monitoring, governance, and continuous improvement.',
    analyticsData: [
      'Deep monitoring and incident handling',
      'Continuous enhancements',
    ],
    revOpsSystems: [
      'Forecasting operations and governance enforcement',
      'Vendor and tool administration',
    ],
    customBuild: ['2-4 workflows built or enhanced per month'],
    supportModel: ['Priority response with faster turnaround'],
    bestFor: ['Organizations that want RevOps fully outsourced'],
  },
];

export default function Solutions() {
  return (
    <>
      <Section className="pt-8 md:pt-12">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <p className="text-sm md:text-base uppercase tracking-[0.2em] text-primary-blue font-semibold">
            Solutions
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-black">
            Flexible RevOps &amp; Systems Services
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Engagement options to match where you are now—from advisory to fully managed RevOps and automation—without listing prices on this page.
          </p>
        </div>
      </Section>

      <Section bgColor="gray" className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`bg-white border rounded-2xl shadow-sm p-8 md:p-10 flex flex-col gap-6 transition-transform duration-200 hover:-translate-y-1 ${
                tier.recommended ? 'border-primary-blue shadow-md' : 'border-gray-200'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl md:text-3xl font-bold text-primary-black">
                    {tier.name}
                  </h2>
                  {tier.recommended && (
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary-blue text-white">
                      Most popular
                    </span>
                  )}
                </div>
                {tier.tag && (
                  <p className="text-sm uppercase tracking-wide text-primary-blue font-semibold">
                    {tier.tag}
                  </p>
                )}
                <p className="text-gray-600 leading-relaxed">{tier.overview}</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-primary-black">Analytics &amp; Data</h3>
                <ul className="space-y-2 text-gray-700">
                  {tier.analyticsData.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary-blue" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-primary-black">RevOps &amp; Systems</h3>
                <ul className="space-y-2 text-gray-700">
                  {tier.revOpsSystems.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary-blue" aria-hidden />
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
                        <span className="mt-1 h-2 w-2 rounded-full bg-accent-yellowgold" aria-hidden />
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
                        <span className="mt-1 h-2 w-2 rounded-full bg-primary-black" aria-hidden />
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
                      <span className="mt-1 h-2 w-2 rounded-full bg-gray-400" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-black">
            Ready to choose the right tier?
          </h2>
          <p className="text-lg text-gray-600">
            Tell us about your goals and current RevOps stack. We&apos;ll recommend the best fit and tailor the engagement—without publishing prices here.
          </p>
          <div className="pt-2">
            <CTAButton href="/contact" variant="primary">
              Talk with our team
            </CTAButton>
          </div>
        </div>
      </Section>
    </>
  );
}
