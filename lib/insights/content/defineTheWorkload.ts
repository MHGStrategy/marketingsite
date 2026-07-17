import type { InsightArticleContent } from '@/lib/insights/types';

export const defineTheWorkloadContent: InsightArticleContent = {
  slug: 'define-the-workload',
  lede:
    'The most expensive stack is the one you rebuild. It rarely starts as a mistake — a platform gets chosen because it\'s the name in the room. Six months of build later, the cracks show. Nobody picked wrong on purpose. They just picked before they\'d defined what they were building for.',
  sections: [
    {
      heading: 'Vendor marketing made the platforms look interchangeable',
      paragraphs: [
        'They aren\'t, but you\'d be forgiven for thinking so. Every major platform has spent the last few years absorbing its rivals\' strengths. The warehouse added open formats and ML; the lakehouse added SQL performance and governance. On a feature grid, they read as near-identical, and for plain SQL analytics they nearly are.',
        'The convergence is real, and it\'s also a trap, because the differences didn\'t disappear. They retreated to the edges: streaming, high-concurrency customer-facing BI, distributed ML on huge datasets, GPU workloads, cross-engine access. Those edges are exactly where your hardest, highest-value workloads live, and exactly the differences a feature grid flattens. You don\'t choose a platform for the 80% it does identically. You choose it for the 20% only one of them does well, and you can\'t know which 20% matters until you\'ve named your workload.',
      ],
    },
    {
      heading: '"Define the workload" is a concrete exercise, not a vibe',
      paragraphs: [
        'It isn\'t "we do data stuff." It\'s a short, specific inventory:',
        'Answer those four and most of the platform shortlist disqualifies itself. That\'s the point. The workload should be doing the eliminating, not the sales deck.',
      ],
      bullets: [
        'Dominant workload. Internal BI? Customer-facing/embedded analytics? Heavy ETL? ML and AI features? Streaming? Rank them. One wins.',
        'Real volume. Not the number on the roadmap slide. What you actually move today, and the honest 24-month trajectory.',
        'Concurrency and latency. Ten analysts or ten thousand users? Sub-second SLAs or overnight batch?',
        'Consumers. Humans, dashboards, downstream apps, and increasingly, agents that need open, governed access.',
      ],
    },
    {
      heading: 'The rebuild math is brutal',
      callout: 'A re-platform isn\'t a swap. It\'s a parallel build — and you\'re paying for two platforms while shipping no new value.',
      paragraphs: [
        'Here\'s why getting this wrong hurts so much more than getting most decisions wrong.',
        'A re-platform isn\'t a swap. It\'s a parallel build. You stand up the new stack while the old one keeps running, migrate pipelines one at a time, reconcile every number to prove nothing broke, retrain the team, and absorb months where you\'re paying for two platforms and shipping no new value. A six-month build that targeted the wrong workload routinely becomes an eighteen-month nightmare once the migration lands on top, and that\'s before counting the features that never shipped and the trust that eroded while engineering was heads-down moving data instead of building product.',
        'Storage is never the line that hurts. Wasted time and a stalled roadmap are.',
      ],
    },
    {
      heading: 'Build it right, or move it deliberately',
      paragraphs: [
        'There are only two situations you\'re in.',
        'If you\'re greenfield, the win is obvious: define the workload first, design the target around it, and build once. No rebuild, because you aimed before you fired.',
        'If you\'re already on a stack that no longer fits, the rebuild is coming whether you plan for it or not. The only question is whether you do it deliberately or reactively, after something breaks in production. A planned migration with a clearly defined target is a project. An emergency one is a crisis.',
        'Either way, the work starts in the same place: name the workload, design the target, then move. That sequencing — workload first, platform second, migration executed cleanly — is the difference between a stack you build once and a stack you keep rebuilding.',
      ],
    },
  ],
  cta: {
    body:
      'Whether you\'re building from scratch or unwinding a stack that\'s quietly fighting your roadmap, we define the workload, design the target, and run the migration or build-out — so you only have to do it once.',
    label: 'Explore RevOps',
    href: '/revops',
  },
};
