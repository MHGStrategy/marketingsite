import type { Metadata } from 'next';
import Link from 'next/link';
import CTAButton from '@/components/CTAButton';
import Section from '@/components/Section';
import { solutionsHubContent as content } from '@/lib/content/solutionsHubContent';
import { buildPageMetadata } from '@/lib/seo/siteMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: content.metadata.title,
  description: content.metadata.description,
  path: '/solutions/',
});

const primaryCardClassName =
  'bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-lg shadow-gray-200/60 text-center flex flex-col gap-4 md:grid md:h-full md:grid-rows-[4.5rem_1fr_3rem] md:gap-4 md:items-center';

export default function SolutionsPage() {
  return (
    <>
      <Section className="!pt-8 md:!pt-12 !pb-6 md:!pb-8 lg:!pb-10">
        <div className="max-w-5xl mx-auto text-center space-y-4 md:space-y-6">
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

      <Section bgColor="gray" className="!pt-6 md:!pt-8 lg:!pt-10 !pb-8 md:!pb-10 lg:!pb-16">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 md:items-stretch">
            <Link href={content.webOps.cta.href} className={primaryCardClassName}>
              <h2 className="text-2xl font-bold text-primary-black flex items-center justify-center px-1">
                {content.webOps.headline}
              </h2>
              <p className="text-gray-600 leading-relaxed md:self-center">{content.webOps.body}</p>
              <span className="text-primary-blue font-semibold flex items-center justify-center min-h-[3rem]">
                {content.webOps.cta.text}
              </span>
            </Link>
            <Link href={content.revOps.cta.href} className={primaryCardClassName}>
              <h2 className="text-2xl font-bold text-primary-black flex items-center justify-center px-1">
                {content.revOps.headline}
              </h2>
              <p className="text-gray-600 leading-relaxed md:self-center">{content.revOps.body}</p>
              <span className="text-primary-blue font-semibold flex items-center justify-center min-h-[3rem]">
                {content.revOps.cta.text}
              </span>
            </Link>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white/70 border border-gray-200 rounded-xl p-6 md:p-8 text-center space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                {content.managedOps.eyebrow}
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-primary-black">{content.managedOps.headline}</h2>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">{content.managedOps.body}</p>
              <Link
                href={content.managedOps.cta.href}
                className="inline-block text-sm md:text-base font-semibold text-primary-blue hover:text-primary-blue/80 transition-colors"
              >
                {content.managedOps.cta.text}
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-primary-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wider text-gray-300">Service</th>
                <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wider text-gray-300">How it starts</th>
                <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wider text-gray-300">Typical need</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary-blue/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                      </svg>
                    </div>
                    <span className="font-semibold text-primary-black">WebOps</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-gray-400">
                  Free site assessment <span className="text-gray-300 mx-1">→</span> project or retainer
                </td>
                <td className="px-6 py-5 text-gray-400 italic">
                  &ldquo;Run my website like a system&rdquo;
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary-blue/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                      </svg>
                    </div>
                    <span className="font-semibold text-primary-black">RevOps</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-gray-400">
                  Revenue ops review <span className="text-gray-300 mx-1">→</span> advisory or managed
                </td>
                <td className="px-6 py-5 text-gray-400 italic">
                  &ldquo;Fix my reporting and revenue leaks&rdquo;
                </td>
              </tr>
              <tr>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary-blue/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    </div>
                    <span className="font-semibold text-primary-black">Managed Ops</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-gray-400">
                  Expansion from WebOps or RevOps
                </td>
                <td className="px-6 py-5 text-gray-400 italic">
                  &ldquo;Run my operations for me&rdquo;
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Section bgColor="gray">
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
