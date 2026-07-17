/**
 * Web Services Lifecycle SOP v2 — June 2026
 * Canonical structured content for mhgstrategy.com and mhgsync.com pages.
 * Markdown source: docs/processes/WEB_SERVICES_LIFECYCLE.md
 * Sync copy: MHG SYNC/apps/web/src/lib/content/webServicesLifecycleContent.ts
 */

export const webServicesLifecycleContent = {
  version: 'v2',
  updated: 'June 2026',
  entity: 'Mikel Hunt Group Inc. DBA MHG Strategy',
  metadata: {
    title: 'Web Services Lifecycle | MHG Strategy',
    description:
      'How MHG Strategy engages Web Services clients — from intro call through delivery, agreement, invoicing, and ongoing maintenance.',
  },
  hero: {
    eyebrow: 'Process',
    headline: 'Web Services Lifecycle',
    subheadline:
      'Optimized SOP v2 — sales, legal, delivery, and maintenance for Mikel Hunt Group Inc. DBA MHG Strategy.',
  },
  v2Changes: [
    {
      label: 'Entity name',
      detail:
        'MHG Media Group is retired. All agreements use Mikel Hunt Group Inc. DBA MHG Strategy.',
    },
    {
      label: 'A1.5 — NDA (optional)',
      detail:
        'Between intro call and intake when the client shares sensitive data before a signed agreement.',
    },
    {
      label: 'A3 — Agreement signing',
      detail: 'Engagement agreement countersigned before invoice. No payment chased until agreement is executed.',
    },
    {
      label: 'Agreement templates',
      detail:
        'Roller Land (Digital Services) and Pyramid Logistics (Engagement + NDA) on file as style references.',
    },
    {
      label: 'MHGSYNC scope automation',
      detail: 'Scope draft auto-generated from intake; separate scoping meeting eliminated for most engagements.',
    },
    {
      label: 'Invoicing (A3.5)',
      detail: 'Still the #1 bottleneck — highest-priority open item.',
    },
  ],
  phaseASequence: [
    'A1 — Intro call (~5 min)',
    'A1.5 — NDA (optional)',
    'A2 — Intake meeting + MHGSYNC scope generation',
    'A3 — Agreement drafted and countersigned',
    'A3.5 — Send invoice',
    'A4 — Payment received (hard gate)',
    'A5 — Project kickoff',
  ],
  intakeVerticals: [
    { label: 'Ministry', path: '/webops/intake/ministry/' },
    { label: 'Ecommerce / Online Retail', path: '/webops/intake/ecommerce/' },
    { label: 'Real Estate & Property', path: '/webops/intake/real-estate/' },
    { label: 'Logistics', path: '/webops/intake/logistics/' },
    { label: 'Storefront Entertainment', path: '/webops/intake/storefront-entertainment/' },
    { label: 'Junk Removal', path: '/webops/intake/junk-removal/' },
    { label: 'Warehousing', path: '/webops/intake/warehousing/' },
    { label: 'Insurance', path: '/webops/intake/insurance/' },
    { label: 'Restaurant', path: '/webops/intake/restaurant/' },
    { label: 'Catering', path: '/webops/intake/catering/' },
    { label: 'Consulting & Coaching', path: '/webops/intake/consulting/' },
    { label: 'Beauty & Wellness', path: '/webops/intake/beauty-wellness/' },
    { label: 'Accounting & Bookkeeping', path: '/webops/intake/accounting/' },
    { label: 'Home Services', path: '/webops/intake/home-services/' },
    { label: 'General Business (default)', path: '/webops/intake/general-business/' },
  ],
  agreementSections: [
    'Project Specifications — deliverables, phases, completion targets',
    'Revisions — typically 2 rounds; overages toward monthly resource hours',
    'Price and Payment — fee, billing structure, ACH/check to Mikel Hunt Group Inc.',
    'Duties of the Client — materials and credentials with phase deadlines',
    'Definitions — Deliverables, Services, IP, Revisions, Confidential Information',
    'Confidentiality — mutual; survives termination',
    'Intellectual Property — transfers to client on full payment',
    'Acceptance — deemed accepted after 10 business days without written objection',
    'Governing Law — Connecticut (default)',
    'Alternative Dispute Resolution — mediation first',
    'Amendments, Representations, Disclaimer, Limitation of Liability',
    'Termination — 15-day cure, IP on termination, no refund once work commenced',
    'Force Majeure and Signature Page (Shaun Daniels + client signatory)',
  ],
  agreementReferences: [
    {
      name: 'Roller Land Digital Services Agreement (Sep 2025)',
      use: 'Web/design projects — flat fee, prose phases, 2-revision policy.',
    },
    {
      name: 'Pyramid Logistics Engagement Agreement (Nov 2025)',
      use: 'Data/analytics/RevOps — milestone table, maintenance fee, AI token clause.',
    },
    {
      name: 'Pyramid Logistics NDA (Oct 2025)',
      use: 'Pre-engagement NDAs — Connecticut default, 2-year term, 3-year confidentiality survival.',
    },
  ],
  openItems: [
    'Invoicing tool, template, deposit amount, and payment terms (A3.5) — HIGHEST PRIORITY',
    'GoDaddy and other host admin access guides (B1)',
    'Standard definition of a build phase (B3)',
    'MHGSYNC discovery dashboard workflow documentation',
    'Maintenance retainer scope, SLA, and billing (C)',
  ],
  links: {
    intake: 'https://mhgstrategy.com/webops/intake/',
    bluehost: 'https://mhgstrategy.com/webops/bluehost/',
    mhgsync: 'https://mhgsync.com/',
    publicLifecycle: 'https://mhgstrategy.com/webops/lifecycle/',
    teamLifecycle: 'https://mhgsync.com/sales/lifecycle/',
  },
} as const;

export type ProcessStep = {
  id: string;
  title: string;
  optional?: boolean;
  highlight?: 'new' | 'optimized' | 'priority' | 'gate';
  meta: { purpose: string; owner: string; exitCriteria: string; duration?: string };
  bullets?: string[];
  note?: string;
};

export const phaseASteps: ProcessStep[] = [
  {
    id: 'A1',
    title: 'Initial 5-minute phone call',
    meta: {
      purpose: 'Qualify fit, schedule intake, capture preliminary tech context',
      owner: 'Sales / account lead',
      duration: '~5 minutes',
      exitCriteria: 'Intake scheduled; tech stack noted; NDA need assessed',
    },
    bullets: [
      'Confirm fit for Web Services vs. RevOps or referral',
      'Schedule intake meeting',
      'Assess NDA need if credentials, financial data, ERP/Salesforce, or confidentiality requested',
      'Capture hosting, registrar, CMS, reason, meeting date, NDA: Yes/No/TBD',
    ],
  },
  {
    id: 'A1.5',
    title: 'NDA (optional)',
    optional: true,
    highlight: 'new',
    meta: {
      purpose: 'Protect confidential information during pre-engagement discovery',
      owner: 'Account lead',
      exitCriteria: 'NDA countersigned before intake proceeds',
    },
    note: 'Skip for straightforward web projects with no sensitive data exchanged pre-agreement. Template: Pyramid Logistics NDA (Oct 2025). Entity: Mikel Hunt Group Inc. DBA MHG Strategy, 712 Congress Ave, New Haven, CT 06519.',
    bullets: [
      'Connecticut governing law (default); 2-year term, 3-year confidentiality survival',
      'Cover credentials, financial records, trade secrets, exported system materials',
      'Purpose limitation, need-to-know, secure access, breach notification',
    ],
  },
  {
    id: 'A2',
    title: 'Intake meeting + MHGSYNC scope generation',
    highlight: 'optimized',
    meta: {
      purpose: 'Discovery walkthrough; MHGSYNC generates scope from intake responses',
      owner: 'Account lead',
      duration: '30–60 minutes',
      exitCriteria: 'Intake complete; scope draft reviewed internally',
    },
    bullets: [
      'Guide client to industry intake form at mhgstrategy.com/webops/intake',
      'MHGSYNC auto-generates scope draft in discovery dashboard',
      'Account + delivery lead review before client presentation',
      'Confirm deliverables, timeline, dependencies, out-of-scope, tech stack changes',
    ],
  },
  {
    id: 'A3',
    title: 'Agreement drafted and countersigned',
    highlight: 'new',
    meta: {
      purpose: 'Bind scope, timeline, payment, and IP terms before work begins',
      owner: 'Account lead (draft); both parties (signature)',
      exitCriteria: 'Agreement countersigned; copy filed',
    },
    note: 'No invoice until agreement is fully executed. Templates: Roller Land + Pyramid Logistics on file.',
  },
  {
    id: 'A3.5',
    title: 'Send invoice',
    highlight: 'priority',
    meta: {
      purpose: 'Issue invoice after agreement countersigned',
      owner: 'Account lead / finance',
      exitCriteria: 'Invoice sent to client',
    },
    note: 'TBD: invoicing tool, template, deposit, payment terms, unpaid follow-up cadence.',
  },
  {
    id: 'A4',
    title: 'Payment received',
    highlight: 'gate',
    meta: {
      purpose: 'Confirm funds before delivery',
      owner: 'Finance / account lead',
      exitCriteria: 'Payment confirmed; project marked active',
    },
    note: 'Hard gate. Agreement (A3) and invoice (A3.5) must be executed first. No build work until payment clears.',
  },
  {
    id: 'A5',
    title: 'Project kickoff',
    meta: {
      purpose: 'Transition from sales to delivery',
      owner: 'Delivery lead',
      exitCriteria: 'Client notified; Phase B begins',
    },
    bullets: [
      'Confirm scope with client',
      'Set communication expectations and cadence',
      'Move into delivery',
    ],
  },
];

export const phaseBSteps: ProcessStep[] = [
  {
    id: 'B1',
    title: 'Attain admin access',
    meta: {
      purpose: 'Secure client account access without password sharing where possible',
      owner: 'Delivery lead',
      exitCriteria: 'Admin access confirmed for all accounts in scope',
    },
    bullets: [
      'Registrar, hosting, CMS, DNS, SSL, email, analytics',
      'Salesforce/ERP/accounting for data projects (per NDA)',
      'Bluehost: mhgstrategy.com/webops/bluehost — Shaun accepts admin invite',
    ],
    note: 'TBD: GoDaddy and other host guides.',
  },
  {
    id: 'B2',
    title: 'Improve tech stack (if necessary)',
    meta: {
      purpose: 'Upgrade infrastructure only as needed for scope',
      owner: 'Delivery lead',
      exitCriteria: 'Stack supports planned build',
    },
    bullets: ['Hosting tier, DNS/SSL/CDN, CMS/plugins, staging — change only what scope requires'],
  },
  {
    id: 'B3',
    title: 'Agree on the next 3 phases',
    meta: {
      purpose: 'Scoped chunks with clear deliverables',
      owner: 'Delivery lead + client',
      exitCriteria: 'Next 3 phases documented and agreed',
    },
    note: 'TBD: consistent phase definition (feature bundle vs. pages vs. sprint).',
  },
  {
    id: 'B4',
    title: 'Build and review loop',
    meta: {
      purpose: 'Incremental delivery with client alignment',
      owner: 'Delivery lead',
      exitCriteria: 'All scoped deliverables accepted',
    },
    bullets: [
      'Build current phase(s)',
      'Client written review and feedback',
      '10 business days silence = deemed acceptance (Agreement §8)',
      'Agree next 3 phases; repeat until complete',
    ],
  },
  {
    id: 'B5',
    title: 'Completion and launch',
    meta: {
      purpose: 'Close build engagement',
      owner: 'Delivery lead',
      exitCriteria: 'Live site; sign-off; maintenance handoff if applicable',
    },
    bullets: [
      'Final review, DNS/SSL/redirects, analytics verification',
      'Handoff documentation; transition to Phase C if applicable',
    ],
  },
];

export const phaseCStep: ProcessStep = {
  id: 'C',
  title: 'Maintenance',
  meta: {
    purpose: 'Keep site or system secure, updated, and supported',
    owner: 'Delivery / support lead',
    exitCriteria: 'Ongoing retainer or ad-hoc arrangement in place',
  },
  note: 'Expectations captured at intake. TBD: scope, SLA, billing cadence, escalation.',
};
