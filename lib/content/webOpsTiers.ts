export type WebOpsTierSection = {
  title: string;
  items: string[];
};

export type WebOpsTierPricing =
  | { display: string; gated?: false }
  | { display: 'By qualification'; gated: true }
  | { hidden: true };

export type WebOpsTier = {
  name: string;
  tag: string;
  overview?: string;
  pricing: WebOpsTierPricing;
  sections: WebOpsTierSection[];
  inheritsFrom?: string;
  bestFor?: string;
  footnote?: string;
  recommended?: boolean;
  badgeLabel?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export const webOpsGridTiers: WebOpsTier[] = [
  {
    name: 'WebOps — $600/month',
    tag: 'Your digital storefront, handled.',
    overview:
      'We build your website, host it, and manage the entire operation. The site is included — no setup fee, no build charge.',
    pricing: { hidden: true },
    sections: [
      {
        title: "What's included",
        items: [
          'Website built and included at no additional cost',
          'Hosting, domain, DNS, and SSL management',
          'Daily backups with restore capability',
          'Uptime monitoring with alerting',
          'Security patching and software updates',
          'Lead-capture verification (tested monthly)',
          'Google Business Profile kept accurate',
          'Photos kept current on site and Google (client-supplied)',
          'Unlimited change requests, one at a time, 2-day turnaround',
          'Monthly storefront health report',
        ],
      },
    ],
    ctaLabel: 'Get a Free Site Assessment',
    ctaHref: '#contact',
  },
  {
    name: 'WebOps + Automation — $1,200/month',
    tag: 'Your storefront works for you.',
    overview:
      'Everything in WebOps, plus active lead conversion, review management, and Google optimization.',
    pricing: { hidden: true },
    sections: [
      {
        title: 'What Automation adds',
        items: [
          'Lead routing to your phone in 60 seconds',
          'Missed-call text-back',
          'Online booking and quote-request flows',
          'Automated review requests',
          'Review monitoring and response management',
          'Google Business Profile optimization',
          'Expanded monthly report with response times, reviews, and ranking changes',
        ],
      },
    ],
    ctaLabel: 'Book a Call',
    ctaHref: '/book/webops/',
  },
];

export const webOpsCapstoneTier: WebOpsTier = {
  name: 'Managed Ops',
  tag: 'Your fractional digital director.',
  overview:
    'Everything in WebOps + Automation, plus the strategic and execution layer that replaces the need for a full-time digital hire.',
  pricing: { hidden: true },
  sections: [
    {
      title: 'Digital Strategy & Oversight',
      items: [
        'Quarterly business review — 60 minutes, your numbers, what\'s working, what\'s next',
        'Annual digital roadmap — a written 12-month plan',
        'Competitive monitoring — we watch your named competitors so you know when they move',
      ],
    },
    {
      title: 'Expanded Execution',
      items: [
        'Paid advertising management (Google Local Services, Meta — ad spend billed separately at cost)',
        'Content production — blog posts, service pages, and seasonal landing pages',
        'Light CRM management and hygiene',
      ],
    },
    {
      title: 'Elevated Access',
      items: [
        'Direct line — dedicated channel to reach us, not a queue',
        '24-hour response on urgent items',
        'Monthly standing call in addition to the monthly report',
      ],
    },
  ],
  bestFor:
    'Established owner-operators who want to hand off the entire digital side to someone accountable for the outcome.',
  footnote: 'Engagements are scoped per organization. Book a call to discuss.',
  ctaLabel: 'Book a Call',
  ctaHref: '/book/webops/',
};

export const webOpsCapstoneHighlights: string[] = [];
