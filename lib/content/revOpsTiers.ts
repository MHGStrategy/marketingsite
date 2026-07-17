export type SolutionTier = {
  name: string;
  tag?: string;
  overview: string;
  analyticsData: string[];
  revOpsSystems: string[];
  customBuild?: string[];
  supportModel?: string[];
  bestFor: string[];
  recommended?: boolean;
  badgeLabel?: string;
};

export const revOpsAutomatedTier: SolutionTier = {
  name: 'Automated RevOps',
  tag: 'SCALING AUTOMATION AND SYSTEM INTEGRATIONS',
  overview:
    'Build-and-scale engagement to deepen automation, integrations, and performance tuning across your RevOps stack. Every engagement starts with an assessment and is scoped to your specific operation.',
  analyticsData: [
    'Proactive monitoring and performance tuning',
    'Certified metrics and reporting accuracy',
  ],
  revOpsSystems: [
    'Advanced routing and process controls',
    'Broader system integrations across tools',
  ],
  customBuild: [
    'Workflow automation scoped to your stack',
    'Change control and release management',
  ],
  supportModel: ['Priority business-hours response'],
  bestFor: [
    'Organizations scaling automation and system integrations across their revenue operations',
  ],
  recommended: true,
  badgeLabel: 'Most popular',
};

export const revOpsOfferingFootnote =
  'Engagements are scoped per organization — no fixed deliverable counts. We build around what your operation actually needs.';
