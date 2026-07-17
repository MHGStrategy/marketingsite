'use client';

import Link from 'next/link';
import Section from '@/components/Section';
import { WebOpsAssessmentForm } from '@/components/leads/LeadCaptureForms';
import WebOpsTierCards from '@/components/webops/WebOpsTierCards';
import { webOpsPageContent } from '@/lib/content/webOpsPageContent';
import {
  webOpsCapstoneHighlights,
  webOpsCapstoneTier,
  webOpsGridTiers,
} from '@/lib/content/webOpsTiers';
import { mediaAssets } from '@/lib/media/assets';

export default function WebOpsLandingPage() {
  const { hero, tiersSection, process, nonprofitFootnote, secondaryCta } = webOpsPageContent;

  return (
    <>
      <Section
        fullWidth
        className="relative !pt-0 !pb-0 w-screen max-w-none min-h-[70vh] overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url('${mediaAssets.hero}')` }}
      >
        <div className="relative z-10 flex flex-col h-[70vh] items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-10 md:py-12 lg:py-14">
          <div className="w-full max-w-5xl text-center space-y-6">
            <div className="space-y-4">
              <p className="text-sm font-semibold tracking-[0.12em] text-primary-blue drop-shadow">
                {hero.eyebrow}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow">
                {hero.headline}
              </h1>
              <p className="text-lg md:text-xl text-gray-100 md:text-gray-200 leading-relaxed max-w-4xl mx-auto drop-shadow">
                {hero.subhead}
              </p>
              <div className="pt-4">
                <Link
                  href={hero.ctaHref}
                  className="inline-block px-6 py-2 text-sm md:text-base rounded-full bg-accent-yellowgold text-primary-black font-semibold uppercase tracking-wider transition-all duration-300 transform hover:scale-105 hover:bg-yellow-400"
                >
                  {hero.ctaLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section bgColor="black" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-center space-y-4 mb-10 md:mb-14">
            <div className="inline-block px-4 py-2 rounded-full bg-primary-blue/20 border border-primary-blue/30">
              <span className="text-sm font-bold uppercase tracking-wider text-primary-blue">
                {tiersSection.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {tiersSection.headline}
            </h2>
          </div>
          <WebOpsTierCards
            gridTiers={webOpsGridTiers}
            capstoneTier={webOpsCapstoneTier}
            capstoneHighlights={webOpsCapstoneHighlights}
            contactHref="#contact"
          />
          <p className="text-gray-500 text-sm text-center italic pt-8 md:pt-10">
            {nonprofitFootnote}{' '}
            <Link href="/insights/excel-to-saas/" className="text-primary-blue font-semibold not-italic hover:underline">
              When spreadsheets stop scaling
            </Link>
          </p>
        </div>
      </Section>

      <Section bgColor="black" className="py-12 md:py-16 border-t border-gray-800/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-center space-y-4 mb-10">
            <p className="text-sm font-bold uppercase tracking-wider text-primary-blue">{process.eyebrow}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {process.steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6 md:p-8 space-y-3"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  Step {index + 1}
                </p>
                <h3 className="text-xl font-bold text-white">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section bgColor="black" id="contact" className="!py-8 md:!py-10 pb-16 md:pb-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-900/50 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-gray-800/50 space-y-6">
              <WebOpsAssessmentForm variant="dark" />
            </div>
          </div>
          <Link
            href={secondaryCta.href}
            className="inline-block font-semibold text-primary-blue hover:text-primary-blue/80 transition-colors"
          >
            {secondaryCta.label}
          </Link>
        </div>
      </Section>
    </>
  );
}
