import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/Section';
import VerticalPage from '@/components/verticals/VerticalPage';
import { managedOpsVertical } from '@/lib/content/verticalsContent';
import { buildPageMetadata } from '@/lib/seo/siteMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: managedOpsVertical.metadata.title,
  description: managedOpsVertical.metadata.description,
  path: '/managed-ops/',
});

const HOW_IT_WORKS = [
  {
    icon: (
      <svg className="w-5 h-5 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    ),
    title: 'Assess',
    body: 'We map your stack and processes to find what to take over.',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
      </svg>
    ),
    title: 'Build & deploy',
    body: 'We put the systems, automation, and AI agents into your real tools.',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
    title: 'Run it for you',
    body: 'We monitor, maintain, and improve it month over month.',
  },
];

const WHAT_IS_INCLUDED = [
  {
    title: 'Operations assessment',
    body: 'A focused review of your stack and processes to map what we take over.',
  },
  {
    title: 'Systems & automation',
    body: 'Workflow automation, integrations, and AI agents built into your real tools.',
  },
  {
    title: 'Ongoing management',
    body: 'We run it — monitoring, maintenance, new automations, and monthly reporting.',
  },
];

export default function ManagedOpsPage() {
  return (
    <VerticalPage vertical={managedOpsVertical} showLeadForm>
      <Section bgColor="gray">
        <div className="max-w-5xl mx-auto space-y-10">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400 mb-6">How it works</h2>
            <p className="text-gray-600 leading-relaxed mb-6 max-w-3xl">
              Before we take over, we assess whether your data and systems can support what you want to build —{' '}
              <Link href="/insights/ai-ready-data/" className="text-primary-blue font-semibold hover:underline">
                What AI-ready data actually means
              </Link>
              .
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {HOW_IT_WORKS.map((step) => (
                <div key={step.title} className="bg-white border border-gray-200 rounded-2xl p-6 space-y-3 shadow-sm">
                  <div className="w-9 h-9 rounded-lg bg-primary-blue/10 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <p className="font-bold text-primary-black text-lg">{step.title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400 mb-4">What&apos;s included</h2>
            <div className="bg-white border border-gray-200 rounded-2xl divide-y divide-gray-100 shadow-sm overflow-hidden">
              {WHAT_IS_INCLUDED.map((item) => (
                <div key={item.title} className="px-6 py-5">
                  <p className="font-bold text-primary-black mb-1">{item.title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </VerticalPage>
  );
}
