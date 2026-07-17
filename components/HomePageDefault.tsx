'use client';

import Link from 'next/link';
import Section from '@/components/Section';
import { homePageContent as content, servicePathways } from '@/lib/content/homePageContent';
import { mediaAssets } from '@/lib/media/assets';

export default function HomePageDefault() {
  return (
    <>
      <Section
        id="hero"
        fullWidth
        className="relative !pt-0 !pb-0 w-screen max-w-none min-h-[70vh] overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url('${mediaAssets.hero}')` }}
      >
        <div className="relative z-10 flex h-[70vh] items-end justify-center px-4 sm:px-6 md:px-8 lg:px-12 pb-10 md:pb-12 lg:pb-14">
          <div className="w-full max-w-5xl text-center space-y-8">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary-blue drop-shadow">
              {content.hero.eyebrow}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow">
              <span className="md:hidden">
                Most Businesses Are
                <br />
                Running on Manual.
                <br />
                <span className="text-primary-blue">We Fix That.</span>
              </span>
              <span className="hidden md:inline">
                {content.hero.headline}
                <span className="text-primary-blue"> {content.hero.headlineAccent}</span>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-100 md:text-gray-200 leading-relaxed max-w-4xl mx-auto drop-shadow">
              <span className="md:hidden">
                AI-powered operations for your
                <br />
                website and revenue engine.
                <br />
                <span className="font-semibold text-white">Stop firefighting. Start scaling.</span>
              </span>
              <span className="hidden md:inline">
                AI-powered operations for your website and revenue engine.
                <br />
                <span className="font-semibold text-white">Stop firefighting. Start scaling.</span>
              </span>
            </p>
          </div>
        </div>
      </Section>

      <Section id="problem">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-blue">
              {content.problem.eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-black">{content.problem.headline}</h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {content.problem.subheadline}{' '}
              <Link href="/insights/" className="text-primary-blue font-semibold hover:underline">
                Read our latest ops guides
              </Link>
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {content.problem.cards.map((card) => (
              <div
                key={card.title}
                className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-lg shadow-gray-200/60"
              >
                <h4 className="text-xl font-bold text-primary-black mb-3 text-center">{card.title}</h4>
                <p className="text-gray-600 leading-relaxed text-center">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="pathways" className="bg-gradient-to-b from-white to-gray-100">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-black">How can we help?</h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Pick the challenge that sounds like yours.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 md:items-stretch">
            {servicePathways.map((path) => (
              <div
                key={path.id}
                className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-lg shadow-gray-200/60 flex flex-col text-center items-center gap-4 md:grid md:h-full md:grid-rows-[auto_4.5rem_13rem_1fr_auto] md:gap-4 md:items-center"
              >
                <span className="text-sm font-semibold text-primary-blue uppercase tracking-wide">
                  {path.label}
                </span>
                <h3 className="text-2xl font-bold text-primary-black flex items-center justify-center px-1">
                  {path.headline}
                </h3>
                <div className="flex justify-center w-full md:h-[13rem]">
                  <img
                    src={path.image}
                    alt={path.imageAlt}
                    className="max-w-md w-full h-48 md:h-full rounded-xl shadow-lg shadow-gray-300/60 border border-gray-100 object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="text-gray-600 leading-relaxed md:self-center">{path.subheadline}</p>
                <Link
                  href={path.cta.href}
                  className="inline-block text-center bg-primary-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors md:mt-0"
                >
                  {path.cta.text}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="final-cta" className="bg-gradient-to-b from-white to-gray-100">
        <div className="text-center space-y-6 max-w-4xl mx-auto py-4">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-black">Not sure which path is right?</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Tell us about your business and we&apos;ll point you in the right direction.
          </p>
          <div>
            <Link
              href="/contact/"
              className="inline-block bg-primary-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
