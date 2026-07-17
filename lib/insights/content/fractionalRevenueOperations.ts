import type { InsightArticleContent } from '@/lib/insights/types';

export const fractionalRevenueOperationsContent: InsightArticleContent = {
  slug: 'fractional-revenue-operations',
  lede:
    'Your sales team says marketing sends garbage leads. Marketing says sales doesn\'t follow up. The forecast changes depending on who pulls the report. Deals close, and nobody can explain why the ones that didn\'t close dropped off. You already know the pipeline is broken. What you don\'t know is who\'s supposed to fix it — and whether you can afford them.',
  sections: [
    {
      heading: 'The three options — and the one nobody names',
      paragraphs: [
        [
          'That\'s the real decision in front of most founders when ',
          { text: 'revenue operations', href: '/revops/' },
          ' finally becomes urgent. It\'s not "do we need RevOps." It\'s "which kind of RevOps, and can we justify the cost right now." There are three answers, and most founders pick the wrong one.',
        ],
        'You can make a full-time hire. You can bring in a fractional operator. Or you can keep doing nothing and hope it resolves itself.',
        'That third option is a decision too, even though it never feels like one. Every month the forecast stays unreliable, you\'re making hiring, spending, and board-reporting decisions on numbers you don\'t trust. The cost of doing nothing is real — it\'s just invisible until a quarter blows up.',
        'So the honest comparison is between a full-time hire and a fractional one. Here\'s where the math gets uncomfortable.',
      ],
    },
    {
      heading: 'The math founders underestimate',
      paragraphs: [
        'A full-time Director of Revenue Operations runs roughly $160,000–$210,000 in base salary. A VP-level hire runs $200,000–$260,000. That\'s before benefits, equity, or the cost of getting it wrong.',
        'Then there\'s time. Senior RevOps searches take 60–120 days to fill — Director-level around 90 days, VP-level closer to 120. Your revenue engine doesn\'t pause while you recruit, interview, and onboard. That\'s three to four months of the pipeline staying broken while you look for the person who\'s supposed to fix it.',
        'Fractional revenue operations restructures that cost. Instead of a six-figure salary and a four-month timeline, you get senior RevOps capacity for a fraction of the monthly outlay, live in days rather than months. You\'re paying for the judgment of someone who has built and run the function before — just not for 40 hours a week.',
        'The tradeoff is capacity and daily availability. And that tradeoff is exactly why fractional is wrong for some companies.',
      ],
    },
    {
      heading: 'When fractional is not the right answer',
      paragraphs: [
        'This is where most articles get vague, so here\'s the blunt version.',
        'Fractional revenue operations does not work if your operational load genuinely requires someone full-time. If you have 25-plus reps, multiple product lines, and a mature go-to-market motion that generates cross-functional coordination every single day, a fractional operator at part-time hours will create gaps that compound. At that complexity, you need someone embedded full-time who can sit in daily standups, field ad-hoc requests, and own annual planning end to end.',
        'Fractional is also the wrong fit if what you actually need is raw execution capacity — a lot of hands doing a high volume of well-defined tasks. That\'s a capacity problem, and fractional leadership solves direction problems. Throwing a senior fractional operator at a pure throughput bottleneck wastes what you\'re paying for.',
        'If either of those describes you, stop reading and start recruiting. Fractional won\'t hold.',
      ],
    },
    {
      heading: 'The three signals you\'re actually ready',
      paragraphs: [
        'For most founders — especially those earlier in the scaling curve — fractional is the higher-fit choice, not the budget compromise. Here are the signals that mean you\'re ready now:',
      ],
      bullets: [
        'Your pipeline exists but leaks between stages. You\'re generating deals, but prospects sit in queues, handoffs drop context, and you can\'t see where momentum dies. The problem isn\'t demand. It\'s the system underneath it.',
        [
          'Your CRM data can\'t be trusted for forecasting. When the number in your CRM doesn\'t match the number in your board deck, the underlying issue is usually definitions and hygiene, not the tool. If your reporting changes depending on who runs it, you have a ',
          { text: 'data-reliability problem', href: '/insights/ai-ready-data/' },
          ' that no CRM swap will fix on its own.',
        ],
        'You\'re still personally owning RevOps. If the founder is the one reconciling the pipeline every Friday night, that\'s the clearest signal of all. Your time is the most expensive resource in the company, and it\'s being spent on operational cleanup instead of the decisions only you can make.',
      ],
    },
    {
      heading: 'The trap: the consultant who delivers a deck and disappears',
      callout: 'A good recommendation that nobody implements is worse than a decent one that somebody actually runs.',
      paragraphs: [
        'Here\'s the failure mode you\'re right to be afraid of. A company hires a RevOps consulting firm. Three months and $45,000 later, they get a 90-slide deck, a few reorganized CRM fields, and a handshake. Within six weeks, the exact same forecasting problems come back — because the consultant re-categorized properties without ever reconciling how reps actually work deals.',
        'The engagement didn\'t fail on skill. It failed because nobody defined what "fixed" meant, and nobody stayed to own it. A good recommendation that nobody implements is worse than a decent one that somebody actually runs.',
        'That\'s the difference worth protecting when you evaluate any fractional operator: are they accountable for a deliverable, or for an outcome? A slide deck is a deliverable. A forecast you can trust is an outcome. Don\'t pay for the first when you need the second.',
        [
          'The same discipline applies before anyone touches your systems: ',
          { text: 'define the workload before picking the platform', href: '/insights/define-the-workload/' },
          '. The most expensive stack is the one you rebuild because the work was never named first.',
        ],
      ],
    },
    {
      heading: 'What the first 30 days should actually look like',
      paragraphs: [
        'A fractional engagement worth paying for doesn\'t open with configuration. It opens with diagnosis.',
        'The first phase should be an audit: map your lead-to-revenue process end to end, document where your lifecycle stages break down, and produce a prioritized backlog of what\'s actually costing you deals — ranked by impact, not by what\'s easy to fix. You should come out of the first 30 days knowing exactly what\'s broken, what it\'s costing you, and what order it gets fixed in.',
        'Only then does the building start. And when it does, it\'s built to be owned by your team, documented as it goes — not locked in a consultant\'s head so you\'re dependent on them forever.',
        'If forecasting still hasn\'t improved by month four, something went wrong. Hold whoever you hire to that standard.',
      ],
    },
    {
      heading: 'The bottom line',
      paragraphs: [
        'If your pipeline is leaking, your forecast is a guess, and you can\'t yet justify a $200,000 full-time hire, fractional revenue operations is probably the right call — as long as your daily operational load doesn\'t genuinely demand someone full-time.',
        'The cost of six months without anyone owning the problem is almost always higher than the cost of bringing in the right person now.',
      ],
    },
  ],
  cta: {
    body:
      'Not sure which model fits your stage? We\'ll map your pipeline, CRM, and reporting gaps in one call — no prep required — and tell you honestly whether fractional is the right fit or you\'d be better served by a full-time hire.',
    label: 'Book a Revenue Ops Review',
    href: '/book/revops/',
  },
};
