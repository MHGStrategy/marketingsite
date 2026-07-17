import type { InsightArticleContent } from '@/lib/insights/types';

export const whyYourSalesPipelineLeaksContent: InsightArticleContent = {
  slug: 'why-your-sales-pipeline-leaks',
  lede:
    'Deals stall in the same place every quarter. Good leads go quiet and nobody can tell you why. The forecast you take to the board is really just a feeling with a number attached. And every time you ask what\'s wrong, sales blames marketing, marketing blames sales, and you\'re left staring at a pipeline that looks full but doesn\'t convert. Your first instinct is probably to push the sales team harder or hire another rep. Hold off. In most companies, a leaking pipeline isn\'t a selling problem at all.',
  sections: [
    {
      heading: 'The reframe: it\'s an operations problem, not an effort problem',
      paragraphs: [
        'Here\'s the uncomfortable truth. When a pipeline leaks, the reps are usually working fine. What\'s broken is the system underneath them — the handoffs, the stage definitions, the data, the routing. Deals aren\'t dying because your team isn\'t trying hard enough. They\'re dying in the gaps between steps that nobody owns.',
        'That distinction matters, because it changes the fix entirely. If it were an effort problem, more reps or more activity would solve it. It\'s an operations problem, so adding people just pushes more deals through the same broken machine. You get more leaks, not fewer.',
        'Before you spend on headcount, find out where your pipeline is actually leaking. There are five usual suspects.',
      ],
    },
    {
      heading: 'The five places pipelines leak',
      paragraphs: [
        'These five gaps show up in almost every leaking pipeline — and none of them respond to more selling activity.',
        'Notice that not one of these is a "the reps need to sell harder" problem. They\'re all structural.',
      ],
      bullets: [
        'Lead routing delays. A prospect fills out a form on Tuesday. Because of how leads get assigned, an SDR doesn\'t reach out until Friday. By then the prospect has moved on or gone cold. Speed-to-lead is one of the most reliable predictors of conversion, and it\'s almost always a routing problem, not a motivation problem.',
        'Stage definitions nobody agrees on. Ask three reps what "qualified" means and you\'ll get three answers. When every rep works deals by their own definition, your pipeline stages stop meaning anything. A deal marked "proposal sent" by one rep is "just kicking tires" to another. You can\'t forecast on stages that don\'t have shared definitions.',
        [
          'CRM data you can\'t trust. If the number in your CRM doesn\'t match the number in your board deck, you don\'t have a reporting tool — you have a liability. Bad data hides where deals are actually stuck, and it makes every forecast a guess. This is usually the deepest leak, because everything downstream depends on it. ',
          { text: 'Reliable data is the foundation the whole pipeline sits on', href: '/insights/ai-ready-data/' },
          '; when it\'s shaky, nothing built on top of it holds.',
        ],
        'Handoffs with no context. A lead moves from marketing to an SDR to an AE to customer success. At each handoff, context gets lost. The AE doesn\'t know what the prospect downloaded. CS has no idea what was promised during the sale. Every uncontexted handoff is a place where momentum — and trust — quietly drains out.',
        'A forecast built on all of the above. If your stages are undefined, your data is unreliable, and your handoffs lose context, then your forecast is stacked on sand. It\'s not that your team can\'t forecast. It\'s that the inputs are broken.',
      ],
    },
    {
      heading: 'How to find your specific leak',
      paragraphs: [
        'You don\'t need a consultant to locate the biggest hole. You need to look at three things.',
        'Do this for one quarter of pipeline data and the pattern will be obvious. The leak is rarely where founders assume it is.',
      ],
      bullets: [
        'Conversion rate between stages, not overall. Most founders look at top-of-funnel to closed-won and see one blended number. Instead, look at the conversion rate from each stage to the next. The stage-to-stage drop that\'s steepest is where your pipeline is bleeding. That\'s your leak.',
        'Time-in-stage. How long do deals sit in each stage before moving? A stage where deals pile up and go stale is a bottleneck. It\'s telling you something in that step is broken — routing, follow-up, or a handoff.',
        'The point where deals go dark. Track where deals stop having activity logged against them. Deals don\'t usually die at the moment they\'re marked lost. They die earlier, quietly, at the point where someone stopped moving them. Find that point and you\'ve found the leak.',
      ],
    },
    {
      heading: 'Why more reps won\'t fix it',
      callout:
        'Adding salespeople to a leaky pipeline doesn\'t fix the leak — it just pours more water through the same holes, at a higher cost.',
      paragraphs: [
        'This is worth saying plainly, because it\'s the most expensive mistake in the sequence.',
        'If your stage-to-stage conversion is broken, every new rep inherits the same broken stages. If your routing is slow, every new lead they\'re assigned arrives just as cold. You\'ll spend six figures on headcount and watch your conversion rate stay exactly where it was, because you scaled the volume without fixing the machine. Fix the system first. Then add people to a pipeline that actually converts.',
      ],
    },
    {
      heading: 'What actually fixes it',
      paragraphs: [
        'Repairing a leaking pipeline means going into the operations layer: defining your stages so everyone works deals the same way, fixing routing so leads get worked in minutes not days, cleaning up the data so your forecast means something, and building handoffs that carry context instead of dropping it.',
        [
          'That work is what revenue operations solves. ',
          { text: 'Revenue operations', href: '/revops/' },
          ' is the function that owns the systems underneath your pipeline — the routing, the definitions, the data, the reporting — so that your sales team can actually sell instead of fighting the machine.',
        ],
        [
          'And here\'s the part most founders don\'t realize: fixing this doesn\'t require a $200,000 full-time hire. If your pipeline is leaking but your operational load doesn\'t yet justify a full-time leader, ',
          { text: 'you may not need a full-time hire to fix it', href: '/insights/fractional-revenue-operations/' },
          '. The fix is about ownership and judgment, not headcount.',
        ],
      ],
    },
    {
      heading: 'The bottom line',
      paragraphs: [
        'A leaking pipeline feels like a sales problem, which is why so many founders try to solve it with more selling. It\'s almost always an operations problem — broken handoffs, undefined stages, and data you can\'t trust. Find the leak by looking at stage-to-stage conversion, time-in-stage, and where deals go dark. Then fix the system before you scale the team.',
      ],
    },
  ],
  cta: {
    body:
      'Want to know where your pipeline is actually leaking? We\'ll map your stages, routing, and data in one call, show you exactly where deals are dying, and tell you what it would take to fix it — no prep required.',
    label: 'Book a Revenue Ops Review',
    href: '/book/revops/',
  },
};
