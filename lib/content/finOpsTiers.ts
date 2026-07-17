import type { SolutionTier } from '@/lib/content/revOpsTiers';

export type { SolutionTier };

export const finOpsGridTiers: SolutionTier[] = [
  {
    name: 'Consult',
    tag: 'Executive Advisory with Internal Execution Ownership',
    overview:
      'A structured advisory engagement focused on establishing measurement frameworks, data governance protocols, and finance operating model design—with your internal team retaining full execution authority.',
    analyticsData: [
      'KPI framework design, reporting architecture, and forecasting requirements definition',
      'Data governance standards and financial close process advisory',
    ],
    revOpsSystems: [
      'Finance workflow architecture and end-to-end process mapping',
      'Finance operating model design and optimization guidance',
    ],
    supportModel: ['48-hour SLA response commitment'],
    bestFor: ['Organizations seeking strategic operating model design while retaining internal execution control'],
  },
  {
    name: 'Finance Ops',
    tag: 'Governed Finance Operations Execution Support',
    overview:
      'An embedded operations engagement delivering structured finance process execution—maintaining system integrity, documentation standards, and governance controls while your internal team drives day-to-day operations.',
    analyticsData: [
      'Dashboard quality assurance, validation, and technical documentation',
      'Role-based access control and permissions governance',
      'Change control protocols and structured release management',
    ],
    revOpsSystems: [
      'Financial close and reporting workflow implementation with embedded controls and defined SLAs',
      'Data integrity enforcement and required-field governance',
    ],
    supportModel: ['Standard business-hours SLA response'],
    bestFor: ['Organizations seeking governed execution support without full operational outsourcing'],
  },
  {
    name: 'Automation',
    tag: 'Intelligent Automation Scaling & Systems Integration',
    overview:
      'A build-and-scale engagement designed to extend automation coverage, deepen cross-system integrations, and optimize performance across your enterprise finance technology stack.',
    analyticsData: [
      'Proactive system monitoring and continuous performance optimization',
      'Certified metric governance and reporting accuracy validation',
    ],
    revOpsSystems: [
      'Advanced workflow orchestration and structured process controls',
      'Cross-platform system integrations across the finance technology ecosystem',
    ],
    customBuild: ['1–2 net-new or enhanced workflow deployments per month'],
    supportModel: ['Priority business-hours SLA with dedicated response routing'],
    bestFor: ['Organizations prioritizing automation depth and systems integration at scale'],
    recommended: true,
    badgeLabel: 'Recommended for Growth-Stage Organizations',
  },
  {
    name: 'Agentic AI',
    tag: 'Autonomous Agents Running Real Finance Workflows',
    overview:
      'Deploy purpose-built AI agents that independently execute, monitor, and adapt finance workflows—from close coordination and variance flagging to vendor communications and reporting delivery—with human oversight reserved for exceptions only.',
    analyticsData: [
      'Autonomous anomaly detection and variance analysis',
      'Agent-driven reporting delivery and distribution',
    ],
    revOpsSystems: [
      'End-to-end workflow execution without manual handoffs',
      'Autonomous close coordination and real-time status tracking',
    ],
    customBuild: ['1–2 agent deployments or enhancements per month'],
    supportModel: ['Dedicated agent monitoring with structured incident escalation'],
    bestFor: ['Organizations ready to move beyond automation into autonomous finance operations'],
  },
];

export const finOpsCapstoneTier: SolutionTier = {
  name: 'Finance That Runs Itself',
  tag: 'Full-Scope Finance Operations & Systems Ownership',
  overview:
    'A comprehensive managed services engagement transferring full finance operations and systems ownership—encompassing intelligent automation, autonomous AI agents, proactive monitoring, governance enforcement, and a structured continuous improvement program.',
  analyticsData: [
    'Enterprise-grade system monitoring with structured incident management',
    'Ongoing platform enhancements and iterative capability development',
  ],
  revOpsSystems: [
    'Forecasting operations management with governance policy enforcement',
    'Third-party vendor management and finance tool administration',
  ],
  customBuild: ['2–4 net-new or enhanced workflow deployments per month'],
  supportModel: ['Priority SLA with expedited turnaround and escalation protocols'],
  bestFor: ['Enterprises seeking a fully managed finance operations partner with end-to-end ownership'],
};

export const finOpsCapstoneHighlights = [
  '2–4 workflows / month',
  'Priority SLA',
  'Full systems ownership',
];
