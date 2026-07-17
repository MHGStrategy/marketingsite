import CTAButton from '@/components/CTAButton';
import Section from '@/components/Section';
import { revOpsPortfolioContent } from '@/lib/portfolio/revOpsPortfolioContent';

export default function RevOpsPortfolioSection() {
  const content = revOpsPortfolioContent;

  return (
    <>
      <Section>
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <p className="text-sm md:text-base uppercase tracking-[0.2em] text-primary-blue font-semibold">
            {content.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-black">{content.title}</h2>
          <p className="text-lg text-gray-600 leading-relaxed">{content.subtitle}</p>
          <p className="text-sm text-gray-500 max-w-3xl mx-auto">{content.disclaimer}</p>
        </div>
      </Section>

      <Section bgColor="black" className="pt-0">
        <div className="max-w-5xl mx-auto space-y-12">
          {content.demos.map((demo) => (
            <div key={demo.id} className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-bold text-white">{demo.title}</h3>
                <p className="text-gray-300">{demo.description}</p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/10 shadow-lg bg-white">
                <iframe
                  title={demo.title}
                  src={demo.embedHref}
                  loading="lazy"
                  className={`w-full border-0 ${demo.minHeightClass}`}
                />
              </div>
              <p className="text-sm text-gray-400">
                <a
                  href={demo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-blue font-semibold hover:underline"
                >
                  Open full demo
                </a>
              </p>
            </div>
          ))}

          <div className="text-center pt-2">
            <CTAButton href={content.ctaHref} variant="primary">
              {content.ctaLabel}
            </CTAButton>
          </div>
        </div>
      </Section>
    </>
  );
}
