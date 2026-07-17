import type { Metadata } from 'next';
import ScrappedHomeSections from '@/components/scrapped/ScrappedHomeSections';
import { scrappedPageContent } from '@/lib/content/scrappedPageContent';

export const metadata: Metadata = {
  title: scrappedPageContent.metadata.title,
  description: scrappedPageContent.metadata.description,
  robots: {
    index: false,
    follow: false,
  },
};

export default function ScrappedPage() {
  return (
    <main>
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-3 text-center text-sm text-amber-900">
        Archived homepage sections — local reference only. This route is excluded from production deploy.
      </div>
      <ScrappedHomeSections />
    </main>
  );
}
