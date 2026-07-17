export type VerticalCapability = {
  title: string;
  items: string[];
};

export type VerticalLeadFormContent = {
  heroCtaLabel: string;
  sectionDescription: string;
  formSource: string;
  sheetName: string;
  submitLabel: string;
  fieldIdPrefix: string;
  reviewLabel: string;
};

export type VerticalContent = {
  id: 'webops' | 'revops' | 'managed-ops';
  name: string;
  slug: string;
  heroEyebrow?: string;
  promise: string;
  intro: string;
  capabilities: VerticalCapability[];
  bestFor: string;
  primaryMotion: string;
  typicalClientNeed: string;
  metadata: {
    title: string;
    description: string;
  };
  links?: { label: string; href: string }[];
  leadForm?: VerticalLeadFormContent;
};

export const sharedFraming =
  'Every vertical is built on the same operating philosophy: governed systems, autonomous execution, and continuous improvement. Each follows Assess → Design → Deploy → Operate.';

export const webOpsVertical: VerticalContent = {
  id: 'webops',
  name: 'WebOps',
  slug: '/webops',
  promise: 'Digital Infrastructure for Serious Businesses',
  intro:
    'Managed website operations — from build through ongoing support. Your site runs without you.',
  capabilities: [
    {
      title: 'WebOps',
      items: [
        '$600/month — website built and included, hosting, monitoring, and ongoing support',
        'One site per retainer with unlimited change requests, one at a time',
      ],
    },
    {
      title: 'WebOps + Automation',
      items: [
        '$1,200/month — everything in WebOps plus lead conversion and review management',
        'Lead routing, booking flows, Google Business Profile optimization',
      ],
    },
    {
      title: 'Managed Ops',
      items: [
        'Full digital-side ownership beyond Automation — scoped per engagement',
        'Email marketing, seasonal campaigns, and additional digital operations',
      ],
    },
  ],
  bestFor:
    'Businesses that need a managed website operation — from a single storefront to full digital-side ownership.',
  primaryMotion: 'WebOps → Automation → Managed Ops',
  typicalClientNeed: 'Run my website like a system',
  metadata: {
    title: 'WebOps | MHG Strategy',
    description:
      'Managed website operations — build, hosting, and ongoing support. WebOps tiers from $600/month with automation and managed digital operations.',
  },
  links: [
    { label: 'Industry Intake', href: '/webops/intake/' },
    { label: 'WebOps Lifecycle', href: '/webops/lifecycle/' },
  ],
};

export const revOpsLeadForm: VerticalLeadFormContent = {
  heroCtaLabel: 'Book My RevOps Review',
  sectionDescription:
    "Tell us about your revenue operations landscape. We'll follow up with a review call and tailored next steps.",
  formSource: 'revops-review',
  sheetName: 'revops',
  submitLabel: 'Book My RevOps Review',
  fieldIdPrefix: 'revops',
  reviewLabel: 'RevOps Review',
};

export const revOpsVertical: VerticalContent = {
  id: 'revops',
  name: 'RevOps',
  slug: '/revops',
  promise: 'Govern and scale your revenue engine.',
  intro:
    'RevOps covers the systems and workflows that drive pipeline, CRM integrity, and go-to-market execution — where revenue leaks through manual handoffs, dirty data, and disconnected marketing tools.',
  capabilities: [],
  bestFor: '',
  primaryMotion: 'Advisory → automation → managed',
  typicalClientNeed: 'Fix my pipeline and CRM',
  metadata: {
    title: 'Fractional Revenue Operations | MHG Strategy',
    description:
      'Pipeline broken? CRM unreliable? We fix revenue operations for founders — pipeline, forecasting, and CRM that run without you. Starts with a 30-day audit.',
  },
  leadForm: revOpsLeadForm,
};

export const managedOpsLeadForm: VerticalLeadFormContent = {
  heroCtaLabel: 'Talk to us about Managed Ops',
  sectionDescription:
    "Share your objectives and current systems landscape. We'll follow up with a review call and tailored next steps.",
  formSource: 'managed-ops-review',
  sheetName: 'revops',
  submitLabel: 'Book My Managed Ops Review',
  fieldIdPrefix: 'managedops',
  reviewLabel: 'Managed Ops Review',
};

export const managedOpsVertical: VerticalContent = {
  id: 'managed-ops',
  name: 'Managed Ops',
  slug: '/managed-ops',
  heroEyebrow: 'Managed Ops · The Expansion Path',
  promise: 'One team. Your whole operation.',
  intro:
    'We take over the systems that run your business — web, revenue, back-office, and the workflows in between — so you can stop managing operations and start growing.',
  capabilities: [],
  bestFor: '',
  primaryMotion: 'Assessment → sprints → full ownership',
  typicalClientNeed: 'Run my operations for me',
  metadata: {
    title: 'Managed Ops | MHG Strategy',
    description:
      'Transform and run your operations end-to-end — AI readiness assessment, transformation execution, managed AI operations, and full ownership packages.',
  },
  leadForm: managedOpsLeadForm,
};

export const allVerticals: VerticalContent[] = [
  webOpsVertical,
  revOpsVertical,
  managedOpsVertical,
];

export const verticalSummaries = allVerticals.map((v) => ({
  id: v.id,
  name: v.name,
  href: v.slug,
  promise: v.promise,
  intro: v.intro,
  linkLabel: `Explore ${v.name} →`,
}));

export const relationshipTable = allVerticals.map((v) => ({
  vertical: v.name,
  primaryMotion: v.primaryMotion,
  typicalClientNeed: v.typicalClientNeed,
}));
