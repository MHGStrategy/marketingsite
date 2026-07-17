
export const servicePathways = [
  {
    id: 'webops',
    label: 'Web Operations',
    headline: 'Your website needs to run without you.',
    subheadline:
      'We take over your web operations so you can focus on your business — not your site.',
    image: '/uploads/mhgstrategy_win_more_clients.png',
    imageAlt: 'Win more clients illustration',
    cta: {
      text: 'Get a Free Site Assessment',
      href: '/webops/',
    },
  },
  {
    id: 'revops',
    label: 'Revenue Operations',
    headline: 'Your pipeline deserves better than spreadsheets and guesswork.',
    subheadline:
      'We fix your revenue operations — pipeline, reporting, and handoffs — so your sales team closes more.',
    image: '/uploads/mhgstrategy_visualize_what_matters.png',
    imageAlt: 'Visualize what matters illustration',
    cta: {
      text: 'Book a Revenue Ops Review',
      href: '/revops/',
    },
  },
] as const;

export const homePageContent = {
  metadata: {
    title: 'Managed Website & Revenue Operations | MHG Strategy',
    description:
      'MHG Strategy runs your website and revenue engine — managed operations, AI-powered workflows, and systems that work without constant intervention.',
  },
  hero: {
    eyebrow: 'MHG Strategy',
    headline: 'Most Businesses Are Running on Manual.',
    headlineAccent: 'We Fix That.',
    subheadline:
      'AI-powered operations for your website and revenue engine — so you can stop firefighting and start scaling.',
  },
  problem: {
    eyebrow: 'The problem',
    headline: "Your Operations Are Capable of More Than They're Delivering",
    subheadline:
      "Most organizations aren't held back by strategy. They're held back by the manual, disconnected, and human-dependent processes underneath it.",
    cards: [
      {
        title: 'Capacity is the ceiling',
        body: 'Your team is spending the majority of their time on tasks a governed AI agent could handle — leaving no bandwidth for strategic execution.',
      },
      {
        title: "Systems don't connect",
        body: 'Your tools operate in silos. Your data does too. Every report requires manual assembly and every handoff creates a new point of failure.',
      },
      {
        title: 'AI is still theoretical',
        body: "You've seen what AI can do. You haven't seen it applied to your actual workflows — governed, deployed, and running without constant intervention.",
      },
    ],
  },
  finalCta: {
    headline: 'Is Your Business Built to Operate Without You in Every Process?',
    body: "Whether your priority is digital infrastructure, revenue systems, governed finance, or full operational ownership — we architect, deploy, and run the systems. With autonomous AI agents at the core, your business doesn't just scale. It operates.",
    button: 'Request a Consultation',
    href: '/contact',
  },
} as const;
