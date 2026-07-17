import Link from 'next/link';
import type { InsightPost } from '@/lib/insights/posts';

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function InsightPostCard({ post }: { post: InsightPost }) {
  return (
    <article className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-lg shadow-gray-200/60 flex flex-col space-y-4 hover:border-primary-blue/40 transition-colors">
      <div className="flex flex-wrap items-center gap-2">
        <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-primary-blue/10 text-primary-blue">
          {post.category}
        </span>
        <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-gray-100 text-gray-500">
          {post.audience}
        </span>
      </div>
      <h2 className="text-xl md:text-2xl font-bold text-primary-black">
        <Link
          href={`/insights/${post.slug}`}
          className="hover:text-primary-blue transition-colors"
        >
          {post.title}
        </Link>
      </h2>
      <p className="text-gray-600 leading-relaxed flex-1">{post.excerpt}</p>
      <div className="flex items-center justify-between pt-2">
        <time dateTime={post.publishedAt} className="text-sm text-gray-400">
          {formatDate(post.publishedAt)}
        </time>
        <Link
          href={`/insights/${post.slug}`}
          className="font-semibold text-primary-blue hover:text-primary-blue/80 transition-colors text-sm"
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}
