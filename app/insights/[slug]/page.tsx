import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/seo/JsonLd';
import ClaudeHighSchoolPost from '@/components/insights/ClaudeHighSchoolPost';
import InsightProsePost from '@/components/insights/InsightProsePost';
import {
  claudeHighSchoolJsonLd,
  claudeHighSchoolMetadata,
} from '@/lib/insights/content/claudeHighSchoolCurriculum';
import { getProsePostContent } from '@/lib/insights/prosePosts';
import { getInsightPost, getInsightPostSlugs } from '@/lib/insights/posts';
import { buildArticleJsonLd } from '@/lib/seo/jsonLd';
import { buildPageMetadata } from '@/lib/seo/siteMetadata';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getInsightPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsightPost(slug);

  if (!post) {
    return { title: 'Insight Not Found | MHG Strategy' };
  }

  if (slug === 'learn-claude-ai-high-school') {
    return buildPageMetadata({
      title: claudeHighSchoolMetadata.title,
      description: claudeHighSchoolMetadata.description,
      path: `/insights/${slug}/`,
      ogType: 'article',
      publishedTime: post.publishedAt,
    });
  }

  return buildPageMetadata({
    title: `${post.title} | MHG Strategy`,
    description: post.excerpt,
    path: `/insights/${slug}/`,
    ogType: 'article',
    publishedTime: post.publishedAt,
  });
}

function PostContent({ slug }: { slug: string }) {
  const proseContent = getProsePostContent(slug);
  const post = getInsightPost(slug);

  if (proseContent && post) {
    return <InsightProsePost content={proseContent} post={post} />;
  }

  switch (slug) {
    case 'learn-claude-ai-high-school':
      return <ClaudeHighSchoolPost />;
    default:
      return null;
  }
}

export default async function InsightPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getInsightPost(slug);

  if (!post) {
    notFound();
  }

  const jsonLd =
    slug === 'learn-claude-ai-high-school' ? claudeHighSchoolJsonLd : buildArticleJsonLd(post);

  return (
    <>
      <JsonLd data={jsonLd} />
      <PostContent slug={slug} />
    </>
  );
}
