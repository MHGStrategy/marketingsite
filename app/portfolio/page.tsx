import type { Metadata } from 'next';
import { Suspense } from 'react';
import CTAButton from '@/components/CTAButton';
import FpaIndustrySwitcher from '@/components/portfolio/FpaIndustrySwitcher';
import RevOpsPortfolioSection from '@/components/portfolio/RevOpsPortfolioSection';
import WebOpsSiteSlider from '@/components/portfolio/WebOpsSiteSlider';
import Section from '@/components/Section';
import { PORTFOLIO, PORTFOLIO_SLIDER } from '@/data/portfolio';
import { fpaPageContent, fpaVisibleIndustries } from '@/lib/portfolio/multiEntityFpaContent';
import { buildPageMetadata } from '@/lib/seo/siteMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Portfolio | WebOps, RevOps & FinOps Work | MHG Strategy',
  description:
    'Portfolio showcase: WebOps client sites, RevOps lead pipeline and forecasting demos, and multi-industry GL reporting models.',
  path: '/portfolio/',
});

export default function PortfolioPage() {
  const content = fpaPageContent;
  const slider = PORTFOLIO_SLIDER;

  return (
    <>
      <Section className="pt-8 md:pt-12">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <p className="text-sm md:text-base uppercase tracking-[0.2em] text-primary-blue font-semibold">
            Portfolio
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-black">
            Work that speaks for itself
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Custom operations infrastructure we design and manage — websites, revenue pipelines, and
            financial workflows built to run without adding in-house headcount. Explore our{' '}
            <a href="/webops/" className="text-primary-blue font-semibold hover:underline">
              WebOps
            </a>{' '}
            and{' '}
            <a href="/revops/" className="text-primary-blue font-semibold hover:underline">
              RevOps
            </a>{' '}
            verticals.
          </p>
        </div>
      </Section>

      <Section bgColor="black" fullWidth className="!py-10 md:!py-14">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl space-y-8">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <p className="text-sm uppercase tracking-[0.2em] text-primary-blue font-semibold">
              {slider.eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">{slider.title}</h2>
            <p className="text-lg text-gray-200">{slider.subtitle}</p>
            <p className="text-sm text-gray-400 max-w-2xl mx-auto">
              You are on the MHG Strategy portfolio — phone previews scroll automatically. Tap a card
              to open the client&apos;s live website.
            </p>
          </div>
          <WebOpsSiteSlider sites={PORTFOLIO} />
          <div className="text-center pt-2">
            <CTAButton href={slider.ctaHref} variant="primary">
              {slider.ctaLabel}
            </CTAButton>
          </div>
        </div>
      </Section>

      <RevOpsPortfolioSection />

      <Section className="!pb-0">
        <div className="max-w-5xl mx-auto text-center space-y-4 pb-4">
          <p className="text-sm md:text-base uppercase tracking-[0.2em] text-primary-blue font-semibold">
            FinOps
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-black">{content.title}</h2>
          <p className="text-lg text-gray-600 leading-relaxed">{content.subtitle}</p>
          <p className="text-sm text-gray-500 max-w-3xl mx-auto">{content.disclaimer}</p>
        </div>
      </Section>

      <Suspense
        fallback={
          <Section bgColor="gray">
            <div className="max-w-6xl mx-auto text-center text-gray-600">
              Loading industry models...
            </div>
          </Section>
        }
      >
        <FpaIndustrySwitcher industries={fpaVisibleIndustries} />
      </Suspense>

      <Section>
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-black">
            Need a website or model like this?
          </h2>
          <p className="text-lg text-gray-600">
            Tell us about your business, industry, and goals. We will scope the right WebOps build or
            RevOps engagement.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CTAButton href="/webops/" variant="outline">
              Explore WebOps
            </CTAButton>
            <CTAButton href="/revops/" variant="outline">
              Explore RevOps
            </CTAButton>
            <CTAButton href="/contact" variant="primary">
              Talk with our team
            </CTAButton>
          </div>
        </div>
      </Section>
    </>
  );
}
