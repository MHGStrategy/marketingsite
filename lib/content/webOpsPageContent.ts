export const webOpsPageContent = {
  hero: {
    eyebrow: 'WebOps',
    headline: 'Digital Infrastructure for Serious Businesses',
    subhead:
      'Managed website operations — from build through ongoing support. Your site runs without you.',
    ctaLabel: 'Get a Free Site Assessment',
    ctaHref: '#contact',
  },
  tiersSection: {
    eyebrow: 'Engagement Tiers',
    headline: 'Managed website operations',
  },
  process: {
    eyebrow: 'How We Engage',
    steps: [
      {
        title: 'Assessment',
        description:
          "We evaluate your current digital presence and identify what's working and what isn't.",
      },
      {
        title: 'Build',
        description:
          'We design and develop your site as part of the engagement, on your content.',
      },
      {
        title: 'Launch',
        description:
          'Your site goes live under our management. Hosting, monitoring, and support are active from day one.',
      },
      {
        title: 'Operate',
        description:
          'Ongoing updates, monthly reporting, and continuous oversight. You never touch it.',
      },
    ],
  },
  nonprofitFootnote:
    '50% off for nonprofits, churches, and community organizations.',
  secondaryCta: {
    label: 'Already know what you need? Book a call directly →',
    href: '/book/webops/',
  },
} as const;
