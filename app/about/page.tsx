import type { Metadata } from 'next';
import Link from 'next/link';
import CTAButton from '@/components/CTAButton';
import Section from '@/components/Section';
import { aboutPageContent as content } from '@/lib/content/aboutPageContent';
import { buildPageMetadata } from '@/lib/seo/siteMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: content.metadata.title,
  description: content.metadata.description,
  path: '/about/',
});

function BeliefCard({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-lg shadow-gray-200/60 space-y-4">
      <div className="w-12 h-12 bg-primary-blue rounded-full flex items-center justify-center shadow-md shadow-primary-blue/30">
        <span className="text-white font-bold text-xl">{number}</span>
      </div>
      <h3 className="text-xl font-bold text-primary-black">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{body}</p>
    </div>
  );
}

function PrincipleRow({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex gap-5 items-start">
      <div className="w-10 h-10 flex-shrink-0 bg-primary-blue rounded-full flex items-center justify-center shadow-md shadow-primary-blue/30 mt-1">
        <span className="text-white font-bold text-sm">↗</span>
      </div>
      <div>
        <h4 className="text-lg font-bold text-primary-black mb-2">{title}</h4>
        <p className="text-gray-600 leading-relaxed text-base">{body}</p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <Section id="about-hero" bgColor="black">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-blue">
            {content.hero.eyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {content.hero.headline}
            <br />
            <span className="text-primary-blue">{content.hero.headlineAccent}</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            {content.hero.subheadline}
          </p>
        </div>
      </Section>

      <Section id="origin">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 px-8 py-10 md:px-12 md:py-12 space-y-6">
            <div className="text-center space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-blue">
                {content.origin.eyebrow}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-black">{content.origin.headline}</h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-5">
              {content.origin.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-lg text-gray-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="beliefs" className="bg-gradient-to-b from-white to-gray-100">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-blue">
              {content.beliefs.eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-black">{content.beliefs.headline}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {content.beliefs.items.map((item) => (
              <BeliefCard key={item.number} number={item.number} title={item.title} body={item.body} />
            ))}
          </div>
        </div>
      </Section>

      <Section id="gap" bgColor="blue">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            {content.gap.headline}
            <br />
            <span className="text-accent-yellowgold">{content.gap.headlineAccent}</span>
          </h2>
          <p className="text-lg md:text-xl text-blue-100 leading-relaxed">{content.gap.body}</p>
        </div>
      </Section>

      <Section bgColor="gray" id="how-we-work">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 px-8 py-10 md:px-12 md:py-12 space-y-8">
            <div className="text-center space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-blue">
                {content.howWeWork.eyebrow}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-black">{content.howWeWork.headline}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
              {content.howWeWork.principles.map((principle) => (
                <PrincipleRow key={principle.title} title={principle.title} body={principle.body} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="what-we-do">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-blue">
              {content.whatWeDo.eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-black">{content.whatWeDo.headline}</h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {content.whatWeDo.subheadline}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {content.whatWeDo.practices.map((practice) => (
              <div
                key={practice.title}
                className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-lg shadow-gray-200/60 space-y-4 flex flex-col"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary-blue">
                  {practice.label}
                </p>
                <h3 className="text-xl font-bold text-primary-black">{practice.title}</h3>
                <p className="text-gray-600 leading-relaxed flex-1">{practice.body}</p>
                <Link
                  href={practice.href}
                  className="inline-block font-semibold text-primary-blue hover:text-primary-blue/80 transition-colors"
                >
                  {practice.linkLabel}
                </Link>
              </div>
            ))}
          </div>
          <div className="max-w-3xl mx-auto">
            <p className="text-center text-gray-600 leading-relaxed mb-4">{content.whatWeDo.managedOpsIntro}</p>
            <div className="bg-white/70 border border-gray-200 rounded-xl p-6 md:p-8 text-center space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary-blue">
                {content.whatWeDo.managedOps.label}
              </p>
              <h3 className="text-xl font-bold text-primary-black">{content.whatWeDo.managedOps.title}</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {content.whatWeDo.managedOps.body}
              </p>
              <Link
                href={content.whatWeDo.managedOps.href}
                className="inline-block text-sm md:text-base font-semibold text-primary-blue hover:text-primary-blue/80 transition-colors"
              >
                {content.whatWeDo.managedOps.linkLabel}
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section bgColor="gray" id="who-we-serve">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 px-8 py-10 md:px-12 md:py-12 space-y-6">
            <div className="text-center space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-blue">
                {content.whoWeServe.eyebrow}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-black">{content.whoWeServe.headline}</h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-5">
              {content.whoWeServe.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-lg text-gray-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="closing-statement">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-[22px] p-[1.5px] bg-gradient-to-br from-gray-200 via-gray-50 to-gray-400 shadow-xl">
            <div className="bg-primary-black rounded-[20px] px-8 py-10 md:px-12 md:py-14 space-y-6 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-blue">
                {content.closing.eyebrow}
              </p>
              <blockquote className="text-2xl md:text-3xl font-bold text-white leading-snug max-w-3xl mx-auto">
                &ldquo;{content.closing.quote}&rdquo;
              </blockquote>
              <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">{content.closing.body}</p>
              <p className="text-primary-blue font-semibold text-base uppercase tracking-widest">
                {content.closing.attribution}
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section bgColor="blue" id="about-cta" className="bg-gradient-to-b from-primary-blue to-primary-blue/90">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-[22px] p-[1.5px] bg-gradient-to-br from-gray-200 via-gray-50 to-gray-400 shadow-xl shadow-blue-900/25">
            <div className="bg-white rounded-[20px] border border-blue-100 px-6 py-8 md:px-10 md:py-12 text-center space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-blue">
                {content.finalCta.eyebrow}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-black">{content.finalCta.headline}</h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {content.finalCta.body}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <CTAButton href={content.finalCta.primaryHref} variant="primary">
                  {content.finalCta.primaryButton}
                </CTAButton>
                <CTAButton href={content.finalCta.secondaryHref} variant="outline">
                  {content.finalCta.secondaryButton}
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
