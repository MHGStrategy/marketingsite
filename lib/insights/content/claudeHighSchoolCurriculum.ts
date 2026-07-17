export type CurriculumPhase = {
  id: string;
  number: number;
  title: string;
  timeline: string;
  tagline: string;
  note?: string;
  learnItems: string[];
  courses: { label: string; href: string }[];
  certificates: string[];
  capstone: string;
};

export type ResourceLink = {
  title: string;
  description: string;
  href: string;
};

export const claudeHighSchoolMetadata = {
  title: 'Learn Claude AI for High School Students | MHG Strategy',
  description:
    'A free 6–12 month AI training plan for high school students and teachers. Learn Claude, earn certificates, and build real skills before graduation.',
  canonical: 'https://mhgstrategy.com/insights/learn-claude-ai-high-school/',
  ogUrl: 'https://mhgstrategy.com/insights/learn-claude-ai-high-school/',
} as const;

export const claudeHighSchoolHero = {
  eyebrow: 'Education · AI Literacy',
  headline: 'Your AI Head Start Starts Here',
  subheadline:
    'Learn how to use Claude AI before most adults do — and show up to college and your first job already ahead.',
  ctaCurriculum: 'See the Plan',
  ctaEducators: "I'm a Teacher",
} as const;

export const whyCareItems = [
  {
    title: 'AI is already in the workplace',
    body: 'Companies are hiring people who know how to use it — not just people who know about it.',
  },
  {
    title: 'Free to learn now',
    body: 'Anthropic Academy courses are free and self-paced. No experience needed to start.',
  },
  {
    title: 'Certificates you can put on a resume',
    body: 'Earn real credentials before graduation and stand out on college and internship applications.',
  },
] as const;

export const whatIsClaude = {
  paragraphs: [
    'Claude is an AI assistant made by a company called Anthropic. Think of it like a super-powered study partner that can write, research, code, analyze documents, and help you solve hard problems — without making things up as much as other AI tools.',
    "It's used by professionals at major companies, but anyone can start for free at claude.ai — no coding required.",
    'Unlike a search engine, Claude has a conversation with you. The better you get at asking it questions (called "prompting"), the more useful it becomes.',
  ],
  link: { label: 'Try Claude free →', href: 'https://claude.ai' },
} as const;

export const curriculumPhases: CurriculumPhase[] = [
  {
    id: 'phase-1',
    number: 1,
    title: 'Getting Started with AI',
    timeline: 'Months 1–2',
    tagline: 'No experience needed. Just curiosity.',
    learnItems: [
      'How to have a real conversation with Claude and get useful answers',
      "What AI can and can't do — so you don't rely on it for the wrong things",
      'How to write better prompts (the instructions you give Claude) to get better results',
    ],
    courses: [
      { label: 'Claude 101', href: 'https://anthropic.skilljar.com/claude-101' },
      {
        label: 'AI Fluency for Educators (great for students too)',
        href: 'https://anthropic.skilljar.com/ai-fluency-for-educators',
      },
      { label: 'Prompt Engineering Tutorial', href: 'https://github.com/anthropics/courses' },
    ],
    certificates: ['Claude 101', 'AI Fluency'],
    capstone:
      'Use Claude to build something you actually need — a study guide for a hard class, a plan for a school project, or a draft college essay outline. Write one page about what worked and what didn\'t.',
  },
  {
    id: 'phase-2',
    number: 2,
    title: 'Claude at Work',
    timeline: 'Months 3–4',
    tagline: 'Use Claude like a professional, not just a student.',
    learnItems: [
      "How to organize big projects using Claude's Projects feature",
      'How to create Artifacts — shareable documents, summaries, and reports Claude helps you build',
      'How to connect Claude to tools like Google Docs and GitHub',
      'How to use Claude Cowork to work with Claude on real files on your computer',
    ],
    courses: [
      {
        label: 'Introduction to Claude Cowork',
        href: 'https://anthropic.skilljar.com/introduction-to-claude-cowork',
      },
    ],
    certificates: ['Cowork Introduction'],
    capstone:
      'Pick a real-world scenario — a mock internship report, a research summary, or a presentation for class — and build it using Claude\'s Projects and Artifacts features.',
  },
  {
    id: 'phase-3',
    number: 3,
    title: 'Getting Really Good at Prompting',
    timeline: 'Months 5–6',
    tagline: 'The difference between okay results and great ones is how you ask.',
    learnItems: [
      'Advanced techniques for writing prompts that get exactly what you need',
      "How to test your prompts and figure out why they're not working",
      "How to use Claude's vision features to analyze images, charts, and PDFs — useful for science, history, and business classes",
    ],
    courses: [
      { label: 'Real-World Prompting', href: 'https://github.com/anthropics/courses' },
      { label: 'Prompt Evaluations', href: 'https://github.com/anthropics/courses' },
    ],
    certificates: [],
    capstone:
      'Write 10 different versions of the same prompt, test them all, pick the best one, and write a short explanation of why it worked better than the others.',
  },
  {
    id: 'phase-4',
    number: 4,
    title: 'Building with Claude',
    timeline: 'Months 7–9',
    tagline: 'For students who want to go further — no CS degree required.',
    note: 'This phase involves some coding. If you\'ve taken a programming class or are curious about coding, this is where things get really interesting. If not, you can skip to Phase 5 or come back to this later.',
    learnItems: [
      'How to use the Anthropic API to build your own Claude-powered apps with Python or JavaScript',
      'How to connect Claude to outside tools and websites',
      'What MCP (Model Context Protocol) is — how developers give Claude new abilities',
      'How to build a RAG system — where Claude answers questions using your own documents or data',
    ],
    courses: [
      {
        label: 'Building with the Anthropic API',
        href: 'https://anthropic.skilljar.com/claude-with-the-anthropic-api',
      },
      {
        label: 'Introduction to MCP',
        href: 'https://anthropic.skilljar.com/introduction-to-model-context-protocol',
      },
      {
        label: 'Advanced MCP',
        href: 'https://anthropic.skilljar.com/model-context-protocol-advanced-topics',
      },
    ],
    certificates: ['Anthropic API', 'MCP Intro', 'MCP Advanced'],
    capstone:
      'Build a simple Claude-powered tool — a chatbot that answers questions about your school, a study quiz generator, or an app that summarizes articles. Share it on GitHub.',
  },
  {
    id: 'phase-5',
    number: 5,
    title: 'AI Agent & Code',
    timeline: 'Months 10–12',
    tagline: 'Build AI that does things on its own.',
    learnItems: [
      'How to use Claude Code — an AI tool that writes and edits code alongside you inside your code editor',
      'How to build AI agents — programs that can plan, make decisions, and complete multi-step tasks without you doing everything',
      'How to create reusable AI "skills" that make Claude better at specific tasks',
      'How to build a portfolio project that shows colleges and employers what you can do',
    ],
    courses: [
      {
        label: 'Claude Code in Action',
        href: 'https://anthropic.skilljar.com/claude-code-in-action',
      },
      {
        label: 'Introduction to Subagents',
        href: 'https://anthropic.skilljar.com/introduction-to-subagents',
      },
      {
        label: 'Introduction to Agent Skills',
        href: 'https://anthropic.skilljar.com/introduction-to-agent-skills',
      },
    ],
    certificates: ['Claude Code', 'Agent Skills'],
    capstone:
      'Design and build an end-to-end AI project that solves a real problem — in your school, your community, or your future career. Document it and put it on GitHub or a portfolio site. This is resume gold.',
  },
];

export const trackOptions = {
  fast: {
    id: 'fast' as const,
    label: 'The 6-Month Fast Track',
    subtitle: 'Phases 1–3',
    bestFor: 'Students who want to be AI-fluent before graduation without learning to code. Great for any career path.',
    outcome:
      "You'll know how to use Claude confidently, write strong prompts, create professional outputs, and earn 3 certificates.",
    activePhases: [1, 2, 3],
  },
  full: {
    id: 'full' as const,
    label: 'The Full 12-Month Track',
    subtitle: 'All 5 Phases',
    bestFor:
      'Students interested in tech, engineering, business, or any field where building AI tools gives you an edge.',
    outcome:
      "You'll be able to build real Claude-powered applications, earn 8 certificates, and have a technical portfolio ready for college applications or internships.",
    activePhases: [1, 2, 3, 4, 5],
  },
};

export const ongoingHabits = [
  "Check Anthropic's announcements at anthropic.com/news — AI moves fast, staying current is a skill",
  'Keep a prompt journal — write down prompts that worked well and why, so you build your own playbook',
  'Join the Anthropic community to see how other people are using Claude in creative ways',
  "Try a Claude hackathon when you're ready — they're a great way to practice under pressure and meet other builders",
  'Subscribe to the AI Fluency newsletter at anthropic.com/learn',
] as const;

export const certificateItems = [
  { name: 'Claude 101', description: 'proves you understand the basics' },
  { name: 'AI Fluency', description: "shows you understand AI's role in society and work" },
  { name: 'Cowork Introduction', description: 'shows you can use Claude on real tasks' },
  { name: 'Anthropic API', description: "proves you can build with Claude's developer tools" },
  { name: 'MCP Intro & Advanced', description: 'shows you understand how AI connects to the real world' },
  { name: 'Claude Code', description: 'proves you can use AI to write and manage code' },
  { name: 'Agent Skills', description: 'shows you can create reusable AI workflows' },
] as const;

export const certificateUses = [
  'Add to your LinkedIn profile (yes, make one before senior year)',
  'List under "Certifications" on your college resume',
  'Mention them in college essays or interview answers',
  'Use them as conversation starters with internship recruiters',
] as const;

export const educatorsContent = {
  intro: "Want to bring this into your classroom? Here's how.",
  semesterPlan:
    'Phases 1–2 fit neatly into a single semester as a supplementary unit or elective module.',
  fullYearPlan:
    'All 5 phases work as a standalone AI literacy course or career/tech elective.',
  classroomIdeas: [
    'Use Phase 1 capstones as a writing + reflection assignment',
    'Use Phase 2 Projects feature for group research projects',
    'Phase 3 evals teach critical thinking and scientific method',
    'Phase 4–5 pair well with CS, engineering, or business classes',
  ],
  resources: [
    { label: 'Claude for Work', href: 'https://anthropic.com/learn/claude-for-work' },
    { label: 'Claude for Education', href: 'https://claude.com/solutions/education' },
    {
      label: 'AI Fluency for Educators cert (free, earns your own credential)',
      href: 'https://anthropic.skilljar.com/ai-fluency-for-educators',
    },
  ],
} as const;

export const resourceHubLinks: ResourceLink[] = [
  { title: 'Start Here', description: 'Create a free Claude account', href: 'https://claude.ai' },
  { title: 'All Courses', description: 'Anthropic Skilljar course catalog', href: 'https://anthropic.skilljar.com' },
  { title: 'Anthropic Academy', description: 'Learning hub and resources', href: 'https://anthropic.com/learn' },
  { title: 'Developer Docs', description: 'Technical documentation', href: 'https://docs.anthropic.com' },
  {
    title: 'Prompt Engineering Guide',
    description: 'Official prompting best practices',
    href: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview',
  },
  {
    title: 'Anthropic Cookbook',
    description: 'Code examples and recipes',
    href: 'https://github.com/anthropics/anthropic-cookbook',
  },
  { title: 'AI Fluency Newsletter', description: 'Stay current on AI literacy', href: 'https://anthropic.com/learn' },
  { title: 'MHG Strategy', description: 'Digital transformation & AI operations', href: 'https://mhgstrategy.com' },
];

export const inPageNavLinks = [
  { label: 'Why Care', href: '#why-care' },
  { label: 'What is Claude?', href: '#what-is-claude' },
  { label: 'Curriculum', href: '#curriculum' },
  { label: 'Tracks', href: '#tracks' },
  { label: 'Habits', href: '#habits' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Educators', href: '#educators' },
  { label: 'Resources', href: '#resources' },
] as const;

export const claudeHighSchoolJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOccupationalProgram',
  name: 'Learn Claude AI for High School Students',
  description: claudeHighSchoolMetadata.description,
  url: claudeHighSchoolMetadata.canonical,
  provider: {
    '@type': 'Organization',
    name: 'MHG Strategy',
    url: 'https://mhgstrategy.com',
  },
  educationalLevel: 'High school',
  timeToComplete: 'P6M',
  occupationalCategory: 'Artificial Intelligence',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};
