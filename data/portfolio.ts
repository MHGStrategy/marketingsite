import portfolioData from './portfolio.json';

export interface PortfolioSite {
  slug: string;
  name: string;
  domain: string;
  url: string;
  category: string;
  screenshot: string;
  captured: string;
  /** Skip in npm run shots — add PNG manually to public/portfolio/ */
  captureMode?: 'auto' | 'manual';
}

export const PORTFOLIO: PortfolioSite[] = portfolioData as PortfolioSite[];

export const PORTFOLIO_SLIDER = {
  eyebrow: 'WebOps',
  title: 'Sites we design, build, and run',
  subtitle:
    'Custom websites for real businesses — from launch to ongoing management. Tap a phone to open the client’s live site in a new tab.',
  ctaLabel: 'See how we run websites',
  ctaHref: '/webops/',
};
