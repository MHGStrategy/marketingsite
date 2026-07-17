export type InsightPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  category: string;
  audience: string;
};

export const insightPosts: InsightPost[] = [
  {
    slug: 'why-your-sales-pipeline-leaks',
    title: 'Why Your Sales Pipeline Is Broken (And It\'s Not Your Sales Team)',
    excerpt:
      'Deals stall every quarter and your forecast is a guess. A leaking pipeline isn\'t a selling problem — it\'s broken handoffs, undefined stages, and data you can\'t trust.',
    publishedAt: '2026-07-16',
    category: 'Revenue Operations',
    audience: 'Founders',
  },
  {
    slug: 'fractional-revenue-operations',
    title: 'Fractional Revenue Operations: When to Hire (and When You\'re Not Ready)',
    excerpt:
      'Your pipeline leaks and your forecast is a guess, but you can\'t justify a $200K RevOps hire. Here\'s when fractional revenue operations is the right call.',
    publishedAt: '2026-07-16',
    category: 'Revenue Operations',
    audience: 'Founders',
  },
  {
    slug: 'ai-ready-data',
    title: 'The Gap Between "We Want AI" and "Our Data Can Support It"',
    excerpt:
      'Almost every AI engagement starts with a gap — the company wants AI, but the data can\'t safely support it yet. Demos work; production doesn\'t.',
    publishedAt: '2026-06-25',
    category: 'AI & Data',
    audience: 'Mid-Market',
  },
  {
    slug: 'define-the-workload',
    title: 'Don\'t Pick the Platform Before You Define the Workload',
    excerpt:
      'The most expensive stack is the one you rebuild. Platform choices made before naming your workload lead to migrations that cost far more than the build.',
    publishedAt: '2026-06-23',
    category: 'Data Architecture',
    audience: 'Mid-Market',
  },
  {
    slug: 'excel-to-saas',
    title: 'Spreadsheets Feel Free. They\'re Costing You Speed and Good Decisions.',
    excerpt:
      'Almost every company runs something on a spreadsheet. Three people and one tab worked — now thirty people, forty tabs, and nobody knows what\'s real.',
    publishedAt: '2026-06-19',
    category: 'Operations',
    audience: 'SMB',
  },
  {
    slug: 'learn-claude-ai-high-school',
    title: 'Learn Claude AI for High School Students',
    excerpt:
      'A free 6–12 month AI training plan for high school students and teachers. Learn Claude, earn certificates, and build real skills before graduation.',
    publishedAt: '2026-06-07',
    category: 'Education',
    audience: 'High School',
  },
];

export function getInsightPost(slug: string): InsightPost | undefined {
  return insightPosts.find((post) => post.slug === slug);
}

export function getInsightPostSlugs(): string[] {
  return insightPosts.map((post) => post.slug);
}
