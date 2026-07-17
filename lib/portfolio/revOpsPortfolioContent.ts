export const revOpsPortfolioContent = {
  eyebrow: 'RevOps',
  title: 'Lead pipelines and forecasting',
  subtitle:
    'Interactive samples of how we design revenue operations infrastructure — from automated lead lifecycle to weighted pipeline forecasting.',
  disclaimer:
    'Sample fictitious data for portfolio demonstration. Interact with each demo to see the architecture in motion.',
  ctaLabel: 'See how we run RevOps',
  ctaHref: '/revops/',
  demos: [
    {
      id: 'lead-pipeline',
      title: 'Lead lifecycle pipeline',
      description:
        'Submit a sample lead and watch it move through capture, enrichment, routing, and CRM sync.',
      href: '/portfolio/revops/lead-pipeline.html',
      embedHref: '/portfolio/revops/lead-pipeline.html?embed=1',
      minHeightClass: 'min-h-[720px] md:min-h-[900px]',
    },
    {
      id: 'forecast-dashboard',
      title: 'Pipeline & forecasting',
      description:
        'Adjust close-rate and slip assumptions to see a weighted forecast recompute against quota.',
      href: '/portfolio/revops/forecast-dashboard.html',
      embedHref: '/portfolio/revops/forecast-dashboard.html?embed=1',
      minHeightClass: 'min-h-[640px] md:min-h-[820px]',
    },
  ],
} as const;
