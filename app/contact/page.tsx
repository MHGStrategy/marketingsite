import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/Section';
import { buildPageMetadata } from '@/lib/seo/siteMetadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact | MHG Strategy',
  description:
    'Get in touch with MHG Strategy for WebOps, RevOps, or a discovery call. Choose the option that best fits your needs.',
  path: '/contact/',
});

export default function Contact() {
  return (
    <>
      <Section className="pt-8 md:pt-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-black">
            What do you need help with?
          </h1>
          <p className="text-lg md:text-xl text-gray-500 leading-relaxed">
            Choose the option that best describes your situation.
          </p>
        </div>
      </Section>

      <Section bgColor="gray">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 md:items-stretch">
            <Link
              href="/webops/#contact"
              className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-lg shadow-gray-200/60 hover:border-primary-blue/50 hover:shadow-xl transition-all text-center flex flex-col gap-4 md:grid md:h-full md:grid-rows-[4.5rem_1fr_3rem] md:gap-4 md:items-center"
            >
              <h2 className="text-xl font-bold text-primary-black flex items-center justify-center px-1">
                I need help with my website
              </h2>
              <p className="text-gray-600 leading-relaxed md:self-center">
                Website management, redesign, hosting, SEO, or ongoing web operations.
              </p>
              <span className="text-primary-blue font-semibold flex items-center justify-center min-h-[3rem]">
                Get a Free Site Assessment →
              </span>
            </Link>
            <Link
              href="/revops/#lead-form"
              className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-lg shadow-gray-200/60 hover:border-primary-blue/50 hover:shadow-xl transition-all text-center flex flex-col gap-4 md:grid md:h-full md:grid-rows-[4.5rem_1fr_3rem] md:gap-4 md:items-center"
            >
              <h2 className="text-xl font-bold text-primary-black flex items-center justify-center px-1">
                I need help with revenue operations
              </h2>
              <p className="text-gray-600 leading-relaxed md:self-center">
                Sales tracking, revenue reporting, system integrations, or operational workflows that drive growth.
              </p>
              <span className="text-primary-blue font-semibold flex items-center justify-center min-h-[3rem]">
                Book a Revenue Ops Review →
              </span>
            </Link>
            <Link
              href="/book/"
              className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-lg shadow-gray-200/60 hover:border-primary-blue/50 hover:shadow-xl transition-all text-center flex flex-col gap-4 md:grid md:h-full md:grid-rows-[4.5rem_1fr_3rem] md:gap-4 md:items-center"
            >
              <h2 className="text-xl font-bold text-primary-black flex items-center justify-center px-1">
                I want to schedule a call
              </h2>
              <p className="text-gray-600 leading-relaxed md:self-center">
                Pick a time on our calendar for a WebOps or RevOps discovery call.
              </p>
              <span className="text-primary-blue font-semibold flex items-center justify-center min-h-[3rem]">
                Book a Time →
              </span>
            </Link>
          </div>
          <div className="text-center mt-12">
            <p className="text-gray-500">
              <span className="md:hidden">
                Not sure?
                <br />
                Email us at{' '}
                <a href="mailto:hello@mhgstrategy.com" className="text-primary-blue underline hover:text-primary-blue/80">
                  hello@mhgstrategy.com
                </a>
                <br />
                or call{' '}
                <a href="tel:9252908604" className="text-primary-blue underline hover:text-primary-blue/80">
                  (925) 290-8604
                </a>
              </span>
              <span className="hidden md:inline">
                Not sure? Email us at{' '}
                <a href="mailto:hello@mhgstrategy.com" className="text-primary-blue underline hover:text-primary-blue/80">
                  hello@mhgstrategy.com
                </a>{' '}
                or call{' '}
                <a href="tel:9252908604" className="text-primary-blue underline hover:text-primary-blue/80">
                  (925) 290-8604
                </a>
              </span>
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
