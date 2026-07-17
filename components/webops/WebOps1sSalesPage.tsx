import FooterBrand from '@/components/FooterBrand';
import WebOps1sDiagnosticWidget from '@/components/webops/WebOps1sDiagnosticWidget';
import { CAL_LINK } from '@/lib/forms/webops1sDiagnostic';
import './webops-1s.css';

const PHONE_DISPLAY = '925.290.8604';
const PHONE_TEL = 'tel:9252908604';

const COVERAGE_ROWS: { weHandle: string; youNever: string }[] = [
  {
    weHandle: 'Hosting, domain, SSL, backups',
    youNever: 'Log into a hosting company',
  },
  {
    weHandle: 'Uptime monitoring — we know before you do',
    youNever: 'Find out from a customer',
  },
  {
    weHandle: 'Security patches and updates',
    youNever: 'Get an "your site is outdated" email',
  },
  {
    weHandle: 'Your Google listing kept accurate',
    youNever: 'Show up wrong when someone searches you',
  },
  {
    weHandle: 'Photos kept current on your site and Google',
    youNever: 'Look frozen in 2021',
  },
  {
    weHandle: 'Unlimited changes, 2-day turnaround',
    youNever: 'Wait on hold with a web guy',
  },
  {
    weHandle: 'Monthly report: uptime, leads, listing status',
    youNever: 'Wonder if it\'s working',
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="page-1s__eyebrow">{children}</span>;
}

export default function WebOps1sSalesPage() {
  return (
    <div className="page-1s">
      <header className="page-1s__nav">
        <div className="page-1s__nav-inner">
          <img src="/mhg-logo.png" alt="MHG Strategy" className="page-1s__nav-logo" />
          <a href={PHONE_TEL} className="page-1s__nav-phone">
            <span className="page-1s__nav-phone-label">Call us</span>
            <span className="page-1s__nav-phone-number">{PHONE_DISPLAY}</span>
          </a>
        </div>
      </header>

      <section className="page-1s__section page-1s__hero">
        <h1 className="page-1s__display">
          Your digital storefront is losing revenue.
          <br />
          We operate it so you don&apos;t have to.
        </h1>
        <p className="page-1s__body-secondary mt-6 max-w-[640px] mx-auto">
          MHG builds, hosts, and runs your web presence as a managed operation. You focus on the work. We own
          everything else.
        </p>
        <p className="page-1s__body-muted mt-4">$600/month · No setup fee · Site included</p>
        <WebOps1sDiagnosticWidget />
      </section>

      <hr className="page-1s__divider" />

      <section className="page-1s__section">
        <Eyebrow>WHAT WE MANAGE</Eyebrow>
        <h2 className="page-1s__h2">The whole operation. On our side.</h2>

        <div className="mt-10">
          <div className="page-1s__table-header">
            <span>We handle</span>
            <span>You never</span>
          </div>
          {COVERAGE_ROWS.map((row) => (
            <div key={row.weHandle} className="page-1s__table-row">
              <div className="page-1s__table-row-left">
                <span className="page-1s__table-row-mobile-label">We handle</span>
                {row.weHandle}
              </div>
              <div className="page-1s__table-row-right">
                <span className="page-1s__table-row-mobile-label">You never</span>
                {row.youNever}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="page-1s__divider" />

      <section className="page-1s__section">
        <Eyebrow>ENGAGEMENT MODEL</Eyebrow>
        <h2 className="page-1s__h2">We build it first. You decide after.</h2>
        <div className="mt-6 space-y-4 page-1s__body-secondary">
          <p>
            A complete site, on your content, live within the quoted window. If you don&apos;t proceed, you owe
            nothing. We retain the design.
          </p>
          <p>
            No setup fee. No long-term contract. If you leave before 24 months, a declining buyout applies. After
            24 months, the site transfers to you outright.
          </p>
        </div>
      </section>

      <hr className="page-1s__divider" />

      <section className="page-1s__section">
        <Eyebrow>WHO WE WORK WITH</Eyebrow>
        <h2 className="page-1s__h2">Built for established operators.</h2>
        <div className="mt-6 space-y-6 page-1s__body-secondary text-left">
          <p>
            We work with owner-operators and service businesses that generate revenue, have customers to serve, and
            want to remove digital operations from their plate entirely. If $600 a month against a single closed job
            is an obvious trade, this is for you.
          </p>
          <p className="page-1s__accent-border">
            We don&apos;t work with businesses that want to manage their own site, or those looking for a one-time
            build. The model is ongoing — we operate your digital presence, not deliver a project.
          </p>
        </div>
      </section>

      <hr className="page-1s__divider" />

      <section className="page-1s__section">
        <Eyebrow>PRICING</Eyebrow>
        <h2 className="page-1s__h2">Transparent pricing. No negotiation.</h2>

        <div className="mt-10">
          <div className="page-1s__pricing-row">
            <div>
              <p className="page-1s__pricing-name">WebOps</p>
              <p className="page-1s__pricing-desc">
                Complete digital storefront management. Site included.
              </p>
            </div>
            <p className="page-1s__pricing-price">$600 / month</p>
          </div>
          <div className="page-1s__pricing-row">
            <div>
              <p className="page-1s__pricing-name">WebOps + Automation</p>
              <p className="page-1s__pricing-desc">
                Everything in WebOps, plus lead routing, automated reviews, booking flows, and GBP optimization.
              </p>
            </div>
            <p className="page-1s__pricing-price">$1,200 / month</p>
          </div>
          <div className="page-1s__pricing-row">
            <div>
              <p className="page-1s__pricing-name">Managed Ops</p>
              <p className="page-1s__pricing-desc">
                Everything in WebOps + Automation, plus quarterly business reviews, competitive monitoring, paid
                advertising management, content production, and a direct line to your operator. Full digital
                ownership without a full-time hire.
              </p>
            </div>
            <a href={CAL_LINK} className="page-1s__pricing-link">
              Let&apos;s talk
            </a>
          </div>
        </div>

        <p className="page-1s__body-small mt-6 text-left">
          50% off for nonprofits, churches, and community organizations. Managed Ops available for established
          operators — pricing by engagement.
        </p>
      </section>

      <hr className="page-1s__divider" />

      <section className="page-1s__section text-center">
        <h2 className="page-1s__h2">Start with three questions.</h2>
        <p className="page-1s__body-secondary mt-4 max-w-[520px] mx-auto">
          Tell us where you are. We&apos;ll tell you where you&apos;re losing ground.
        </p>
        <div className="mt-8">
          <a href={CAL_LINK} className="page-1s__btn-primary page-1s__btn-primary--full page-1s__btn-primary--responsive">
            Start the diagnostic →
          </a>
        </div>
        <div className="mt-6">
          <p className="page-1s__body-small">Or call directly.</p>
          <a href={PHONE_TEL} className="page-1s__body-small mt-1 inline-block hover:text-[#0A0A0A]">
            {PHONE_DISPLAY}
          </a>
        </div>
      </section>

      <footer className="page-1s__footer">
        <div className="page-1s__footer-inner">
          <div className="flex flex-col items-center text-center">
            <FooterBrand
              logoClassName="h-40 w-auto md:h-48"
              linkable={false}
              taglineBottomClassName="ai-tagline"
            />
          </div>

          <div className="border-t border-[#E2E2E2] mt-12 md:mt-16 pt-5 md:pt-6">
            <div className="text-center space-y-2">
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 page-1s__footer-contact text-base md:text-lg">
                <a href={PHONE_TEL} className="page-1s__footer-contact-link">
                  {PHONE_DISPLAY}
                </a>
                <span className="text-[#8A8A8A]">•</span>
                <a href="mailto:hello@mhgstrategy.com" className="page-1s__footer-contact-link">
                  hello@mhgstrategy.com
                </a>
              </div>
              <p className="page-1s__footer-copyright font-medium text-sm md:text-base">
                © {new Date().getFullYear()} MHG Strategy. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
