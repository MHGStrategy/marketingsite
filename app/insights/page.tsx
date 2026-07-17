import type { Metadata } from 'next';
import CTAButton from '@/components/CTAButton';
import Section from '@/components/Section';
import InsightPostCard from '@/components/insights/InsightPostCard';
import { insightsHubContent as content } from '@/lib/content/insightsHubContent';
import { insightPosts } from '@/lib/insights/posts';
import { buildPageMetadata } from '@/lib/seo/siteMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: content.metadata.title,
  description: content.metadata.description,
  path: '/insights/',
});

export default function InsightsPage() {
  return (
    <>
      <Section className="pt-8 md:pt-12">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <p className="text-sm md:text-base uppercase tracking-[0.2em] text-primary-blue font-semibold">
            {content.hero.eyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-black">
            {content.hero.headline}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
            {content.hero.subheadline}
          </p>
        </div>
      </Section>

      <Section bgColor="gray" className="pt-10 md:pt-0">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {insightPosts.map((post) => (
              <InsightPostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-black">{content.cta.headline}</h2>
          <p className="text-lg text-gray-600 leading-relaxed">{content.cta.body}</p>
          <div className="pt-2">
            <CTAButton href={content.cta.href} variant="primary">
              {content.cta.button}
            </CTAButton>
          </div>
        </div>
      </Section>
    </>
  );
}
