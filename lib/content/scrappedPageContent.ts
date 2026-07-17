/** Archived homepage sections — rendered at /scrapped (local/dev only; excluded from deploy). */
export const scrappedPageContent = {
  metadata: {
    title: 'Scrapped Homepage Sections — MHG Strategy',
    description: 'Archived homepage content kept for reference. Not published to production.',
  },
  modernCustomers: {
    eyebrow: 'Enterprise standard',
    headline: 'Modern Enterprise Clients Expect More',
    body: "Today's clients demand speed, accuracy, and frictionless engagement. We meet that standard by embedding governed workflows, intelligent automation, and real-time operational visibility into a cohesive operating system — across finance, reporting, and business operations.",
  },
  features: [
    {
      title: 'Visualize What Matters. Optimize What Grows.',
      imageAlt: 'Visualize what matters illustration',
      body: 'Deliver board-ready financial intelligence without the overhead of complex BI infrastructure — underpinned by governed metrics, validated data, and a reporting layer designed for executive decision-making.',
    },
    {
      title: 'Win More Clients. Keep Them Growing.',
      imageAlt: 'Win more clients illustration',
      body: 'Blend autonomous AI agents with finance operations intelligence to eliminate manual effort, de-risk delivery, and accelerate planning, reporting, and close cycles at scale.',
    },
  ],
} as const;
