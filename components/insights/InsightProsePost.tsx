import Link from 'next/link';
import CTAButton from '@/components/CTAButton';
import Section from '@/components/Section';
import type { InsightArticleContent, InsightParagraph, InsightSection } from '@/lib/insights/types';
import type { InsightPost } from '@/lib/insights/posts';

function renderParagraphContent(paragraph: InsightParagraph) {
  if (typeof paragraph === 'string') return paragraph;
  return paragraph.map((segment, index) =>
    typeof segment === 'string' ? (
      segment
    ) : (
      <Link
        key={`${segment.href}-${index}`}
        href={segment.href}
        className="text-primary-blue underline decoration-primary-blue/50 underline-offset-2 hover:decoration-primary-blue transition-colors"
      >
        {segment.text}
      </Link>
    ),
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

function estimateReadTime(content: InsightArticleContent): number {
  const extractText = (p: InsightParagraph): string =>
    typeof p === 'string' ? p : p.map(s => (typeof s === 'string' ? s : s.text)).join('');
  const all = [
    content.lede,
    ...content.sections.flatMap(s => [
      s.heading,
      s.callout ?? '',
      ...s.paragraphs.map(extractText),
      ...(s.bullets ?? []).map(extractText),
    ]),
    content.cta.body,
  ].join(' ');
  return Math.max(1, Math.round(all.split(/\s+/).filter(Boolean).length / 200));
}

type InsightProsePostProps = {
  content: InsightArticleContent;
  post: InsightPost;
};

function ArticleSection({ section }: { section: InsightSection }) {
  const hasBullets = Boolean(section.bullets?.length);
  const introParagraphs = hasBullets ? section.paragraphs.slice(0, 1) : section.paragraphs;
  const closingParagraphs = hasBullets ? section.paragraphs.slice(1) : [];

  return (
    <div className="space-y-5">
      <h2 className="text-2xl md:text-[1.75rem] font-bold text-white tracking-tight leading-snug">
        {section.heading}
      </h2>

      {introParagraphs.map((paragraph, index) => (
        <p
          key={typeof paragraph === 'string' ? paragraph.slice(0, 48) : `intro-${index}`}
          className="text-[17px] text-gray-200 leading-[1.8]"
        >
          {renderParagraphContent(paragraph)}
        </p>
      ))}

      {section.callout && (
        <blockquote className="border-l-[3px] border-primary-blue pl-5 py-0.5 my-1">
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed italic font-medium">
            {section.callout}
          </p>
        </blockquote>
      )}

      {section.bullets && section.bullets.length > 0 && (
        <ul className="space-y-3.5">
          {section.bullets.map((bullet, index) => (
            <li
              key={typeof bullet === 'string' ? bullet.slice(0, 48) : `bullet-${index}`}
              className="flex items-start gap-3.5 text-[17px] text-gray-200 leading-[1.8]"
            >
              <span className="w-[5px] h-[5px] rounded-full bg-primary-blue mt-[0.65rem] shrink-0" />
              <span>{renderParagraphContent(bullet)}</span>
            </li>
          ))}
        </ul>
      )}

      {closingParagraphs.map((paragraph, index) => (
        <p
          key={typeof paragraph === 'string' ? paragraph.slice(0, 48) : `closing-${index}`}
          className="text-[17px] text-gray-200 leading-[1.8]"
        >
          {renderParagraphContent(paragraph)}
        </p>
      ))}
    </div>
  );
}

export default function InsightProsePost({ content, post }: InsightProsePostProps) {
  const readTime = estimateReadTime(content);

  return (
    <article className="bg-primary-black">
      {/* ── Masthead ─────────────────────────────── */}
      <Section id="hero" bgColor="black" className="scroll-mt-24 !pt-14 md:!pt-20 !pb-10 md:!pb-14">
        <div className="max-w-2xl mx-auto space-y-5 md:space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-blue">
            {post.category}
            <span className="mx-2 opacity-40">·</span>
            {post.audience}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
            {post.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 leading-[1.65] font-normal">
            {content.lede}
          </p>
          <div className="flex items-center gap-3 border-t border-gray-800 pt-5">
            <time dateTime={post.publishedAt} className="text-sm text-gray-300 tracking-wide">
              {formatDate(post.publishedAt)}
            </time>
            <span className="text-gray-400" aria-hidden>·</span>
            <span className="text-sm text-gray-300">{readTime} min read</span>
          </div>
        </div>
      </Section>

      {/* ── Body ─────────────────────────────────── */}
      <Section bgColor="black" className="!pt-0 !pb-20 md:!pb-28">
        <div className="max-w-2xl mx-auto">
          <hr className="border-gray-800 mb-12 md:mb-14" />

          {content.sections.map((section, index) => (
            <div key={section.heading}>
              <ArticleSection section={section} />
              {index < content.sections.length - 1 && (
                <hr className="border-gray-800 my-12 md:my-14" />
              )}
            </div>
          ))}

          {/* ── CTA card ── */}
          <div className="mt-14 md:mt-16 border border-primary-blue/25 bg-primary-blue/[0.04] rounded-2xl p-8 md:p-10 text-center space-y-6">
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              {content.cta.body}
            </p>
            <CTAButton href={content.cta.href} variant="primary">
              {content.cta.label}
            </CTAButton>
          </div>

          {/* ── Back nav ── */}
          <div className="mt-12 text-center">
            <Link
              href="/insights"
              className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-300 hover:text-primary-blue transition-colors"
            >
              ← Back to all Insights
            </Link>
          </div>
        </div>
      </Section>
    </article>
  );
}
