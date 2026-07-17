export type IntakeFormStatus = 'live' | 'coming-soon';

export type IntakeFormCard = {
  id: string;
  title: string;
  description: string;
  href?: string;
  status: IntakeFormStatus;
};

export const INTAKE_FORMS: IntakeFormCard[] = [
  {
    id: 'ministry',
    title: 'Ministry',
    description:
      'Churches, faith communities, and ministry organizations — digital presence, engagement, giving, and content strategy.',
    href: '/webops/intake/ministry/',
    status: 'live',
  },
  {
    id: 'ecommerce',
    title: 'Ecommerce / Online Retail',
    description:
      'Online stores and DTC brands looking to grow conversions, streamline operations, and retain customers.',
    href: '/webops/intake/ecommerce/',
    status: 'live',
  },
  {
    id: 'real-estate',
    title: 'Real Estate & Property',
    description: 'Agents, teams, and brokerages building credibility, capturing leads, and automating follow-up.',
    href: '/webops/intake/real-estate/',
    status: 'live',
  },
  {
    id: 'logistics',
    title: 'Logistics',
    description: 'Freight, shipping, and supply chain operations looking to modernize client-facing tools and workflows.',
    href: '/webops/intake/logistics/',
    status: 'live',
  },
  {
    id: 'storefront-entertainment',
    title: 'Storefront Entertainment',
    description: 'Indoor playgrounds, arcades, trampoline parks, laser tag, escape rooms, and other experience-based venues growing through bookings, memberships, and digital presence.',
    href: '/webops/intake/storefront-entertainment/',
    status: 'live',
  },
  {
    id: 'junk-removal',
    title: 'Junk Removal',
    description: 'Residential and commercial junk removal operators looking to capture more leads, streamline bookings, and build a stronger local digital presence.',
    href: '/webops/intake/junk-removal/',
    status: 'live',
  },
  {
    id: 'warehousing',
    title: 'Warehousing',
    description: 'Storage, fulfillment, and inventory operations needing better visibility, booking, and customer communication.',
    href: '/webops/intake/warehousing/',
    status: 'live',
  },
  {
    id: 'insurance',
    title: 'Insurance',
    description: 'Agencies and brokers focused on lead capture, client portals, and compliant digital experiences.',
    href: '/webops/intake/insurance/',
    status: 'live',
  },
  {
    id: 'restaurant',
    title: 'Restaurant',
    description: 'Dining brands upgrading menus, reservations, online ordering, and local search presence.',
    href: '/webops/intake/restaurant/',
    status: 'live',
  },
  {
    id: 'catering',
    title: 'Catering',
    description: 'Event and catering businesses streamlining quotes, menus, bookings, and follow-up workflows.',
    href: '/webops/intake/catering/',
    status: 'live',
  },
  {
    id: 'consulting',
    title: 'Consulting & Coaching',
    description: 'Independent consultants and coaches packaging expertise with lead gen and client onboarding.',
    href: '/webops/intake/consulting/',
    status: 'live',
  },
  {
    id: 'beauty-wellness',
    title: 'Beauty & Wellness',
    description: 'Salons, spas, and wellness providers improving booking, branding, and repeat client engagement.',
    href: '/webops/intake/beauty-wellness/',
    status: 'live',
  },
  {
    id: 'accounting',
    title: 'Accounting & Bookkeeping',
    description: 'Financial service firms modernizing trust signals, intake flows, and client communication.',
    href: '/webops/intake/accounting/',
    status: 'live',
  },
  {
    id: 'home-services',
    title: 'Home Services',
    description: 'Cleaning, landscaping, trades, and other home-based operators growing through digital referrals.',
    href: '/webops/intake/home-services/',
    status: 'live',
  },
  {
    id: 'general-business',
    title: 'General Business',
    description: "Don't see your industry above? This questionnaire works for any business looking to improve its digital presence, generate more leads, or streamline operations.",
    href: '/webops/intake/general-business/',
    status: 'live',
  },
];
