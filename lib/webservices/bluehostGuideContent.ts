export const BLUEHOST_AFFILIATE_URL = 'https://bluehost.sjv.io/mhgstrategy';
export const BLUEHOST_PRICING_NOTE =
  '$1.99/mo is on the 36-month plan (about $72 up front) and includes a 30-day money-back guarantee.';
export const MHG_ADMIN_EMAIL = 'shaun@mhgstrategy.com';
export const MHG_ADMIN_NAME = 'Shaun / MHG Strategy';
export const BLUEHOST_ACCOUNT_MANAGER_URL = 'https://www.bluehost.com/my-account/home';
export const BLUEHOST_LOGIN_URL = 'https://www.bluehost.com/my-account/login';
export const BLUEHOST_SIGNUP_HELP_URL =
  'https://www.bluehost.com/help/article/how-to-sign-up-for-an-account';
export const BLUEHOST_USERS_ROLES_HELP_URL =
  'https://www.bluehost.com/help/article/am-users-roles';

export type GuideStepContent = {
  stepNumber: number;
  title: string;
  description: string;
  /**
   * Either a full https:// URL (Bluehost CDN or otherwise)
   * or a local basename — file must exist at /public/webops/bluehost/<basename>.png
   * Leave empty string to render text-only (no image slot).
   */
  imageSrc: string;
  imageAlt?: string;
  tips?: string[];
  link?: { href: string; label: string };
};

/** What clients get with Bluehost Shared hosting — framed around MHG custom builds. */
export const hostingIncludedFeatures = [
  'Free domain for the first year — your address on the web',
  'Free SSL certificate — secure, trusted connection for visitors',
  'Unmetered bandwidth — no traffic limits as your site grows',
  'Reliable hosting infrastructure — MHG builds directly on your account',
  '24/7 Bluehost support for hosting issues',
];

export const optionalAddons = [
  { name: 'CodeGuard', desc: 'Daily backups for your site data' },
  { name: 'eCommerce', desc: 'Tools to set up and manage an online store' },
  { name: 'Yoast', desc: 'SEO plugin to help improve search visibility' },
];

// ---------------------------------------------------------------------------
// Signup steps — imageSrc uses Bluehost CDN URLs where available.
// To fill gaps: open https://www.bluehost.com/help/article/how-to-sign-up-for-an-account
// in your browser, right-click each screenshot → Copy Image Address, paste below.
// ---------------------------------------------------------------------------
const signupSteps: GuideStepContent[] = [
  {
    stepNumber: 1,
    title: 'Visit Bluehost',
    description:
      'Click the button below to open Bluehost. You\'ll land on a page showing the $1.99/mo plan — click Get Started to begin.',
    imageSrc: 'signup-step-01-visit',
    imageAlt: 'Bluehost homepage showing the $1.99/mo Shared hosting offer and Get Started button',
    link: { href: BLUEHOST_AFFILIATE_URL, label: 'BLUEHOST' },
  },
  {
    stepNumber: 2,
    title: 'Choose your Shared hosting plan',
    description:
      'Choose the basic plan — it\'s all a one-page business site needs. (Pick Business only if you plan to host multiple sites later.)',
    imageSrc: 'signup-step-02-choose-plan',
    imageAlt: 'Bluehost plan comparison with the basic One Site tier and other Shared hosting options',
  },
  {
    stepNumber: 3,
    title: 'Register or use an existing domain',
    description:
      'Choose a domain name for your website. You can register a new domain, use one you already own, or select your domain later. Shared hosting includes a free domain for the first year. Domain Privacy + Protection is optional.',
    imageSrc: 'signup-step-03-domain',
    imageAlt: 'Bluehost domain search with register, use existing, or choose later options',
    tips: ['Prefer a .com if available — it tends to rank better in search results.'],
  },
  {
    stepNumber: 4,
    title: 'Create your Bluehost account',
    description:
      'Create your account with an email address and a secure password. You can also sign up with Google, Apple, or GitHub if you prefer. Save your login details — you will need them to access your portal.',
    imageSrc: 'signup-step-04-create-account',
    imageAlt: 'Bluehost checkout — create account with email, password, or social sign-in',
  },
  {
    stepNumber: 5,
    title: 'Review recommended add-ons',
    description:
      'Bluehost may suggest optional add-ons such as CodeGuard (backups), eCommerce tools, or Yoast (SEO). These are not required for a standard business site — skip or uncheck any you do not need.',
    imageSrc: 'signup-step-05-addons',
    imageAlt: 'Recommended add-ons with optional Website Security, SEO, and backup checkboxes',
    tips: optionalAddons.map((a) => `${a.name}: ${a.desc}`),
  },
  {
    stepNumber: 6,
    title: 'Enter your billing information',
    description:
      'In the Billing Information section, enter your payment details and choose your preferred method: credit card, debit card, Google Pay, or PayPal.',
    imageSrc: 'signup-step-06-billing',
    imageAlt: 'Billing information with Credit Card, Google Pay, and PayPal payment options',
  },
  {
    stepNumber: 7,
    title: 'Select your billing term',
    description:
      'Choose your billing term from the dropdown. Bluehost offers flexible term lengths — a longer term often provides better savings.',
    imageSrc: 'signup-step-07-billing-term',
    imageAlt: 'Choose Your Term with 3 Years selected as best value at $1.99/mo',
  },
  {
    stepNumber: 8,
    title: 'Choose your data center location',
    description:
      'Select the data center closest to your primary audience. This improves load times for your visitors. For most U.S. businesses, USA Virginia or USA Arizona is a good choice.',
    imageSrc: 'signup-step-08-data-center',
    imageAlt: 'Data Center dropdown showing USA Arizona selected',
    tips: [
      'Other locations include UK (London), Canada (Toronto), Germany (Frankfurt), and Australia (Sydney).',
    ],
  },
  {
    stepNumber: 9,
    title: 'Review your cart and submit payment',
    description:
      'Review everything in your Shopping Cart — hosting plan, domain, data center, add-ons, and billing term. When it looks correct, click Submit Payment to complete your purchase.',
    imageSrc: 'signup-step-09-cart',
    imageAlt: 'Shopping cart summary with plan details, total, and Submit Payment button',
  },
  {
    stepNumber: 10,
    title: 'Access your Bluehost Portal',
    description:
      'After payment, you will receive an order confirmation email from Bluehost. Log in to the Bluehost Portal to manage your account — then continue to the next section to add MHG Strategy as an admin.',
    imageSrc: 'signup-step-10-portal',
    imageAlt: 'Bluehost Account Manager dashboard after logging in',
    link: { href: BLUEHOST_LOGIN_URL, label: 'Log in to Bluehost' },
  },
];

// ---------------------------------------------------------------------------
// Admin steps — account owner only (invited admins cannot access Users & Roles).
// Steps 2–5 are text-only; see Bluehost help article for visual reference.
// ---------------------------------------------------------------------------
const adminSteps: GuideStepContent[] = [
  {
    stepNumber: 1,
    title: 'Log in to the Bluehost Portal',
    description:
      'Go to the Bluehost login page and sign in with the email and password you created during signup. You must be the account owner — invited users cannot add other admins.',
    imageSrc: 'admin-step-01-login',
    imageAlt: 'Bluehost Portal login with User ID, password, and social sign-in options',
    link: { href: BLUEHOST_LOGIN_URL, label: 'Log in to Bluehost' },
  },
  {
    stepNumber: 2,
    title: 'Open Users & Roles',
    description:
      'From the portal, click your profile icon in the top-right corner (your initials), then select Users & Roles or Accounts & Users from the menu.\n\nIf you do not see this option, confirm you are logged in as the account owner — not as an invited admin.',
    imageSrc: '',
    link: { href: BLUEHOST_USERS_ROLES_HELP_URL, label: 'Bluehost Users & Roles help' },
  },
  {
    stepNumber: 3,
    title: 'Manage your account',
    description:
      'On the Users & Roles page, find your hosting account in the list and click Manage next to it.',
    imageSrc: '',
  },
  {
    stepNumber: 4,
    title: 'Add a new user',
    description:
      'Scroll to the User Roles & Permissions section and click + Add User.',
    imageSrc: '',
  },
  {
    stepNumber: 5,
    title: 'Invite MHG Strategy as Admin',
    description: `Enter the following details, then click Invite:\n\n• Name: ${MHG_ADMIN_NAME}\n• Email: ${MHG_ADMIN_EMAIL}\n• Role: Admin`,
    imageSrc: '',
    tips: [
      'Shaun will receive an email to set up his own login — you never need to share your password.',
      'If anything in the menu looks different, use the Bluehost help link in Step 2 — the flow is the same even if labels vary slightly.',
    ],
  },
];

/**
 * Resolve an imageSrc to a displayable URL.
 * Full URLs (https://) are returned as-is.
 * Short basenames fall back to the local /public/webops/bluehost/ folder.
 * Empty strings return null (no image rendered).
 */
export function resolveImageSrc(imageSrc: string): string | null {
  if (!imageSrc) return null;
  if (imageSrc.startsWith('http')) return imageSrc;
  return `/webops/bluehost/${imageSrc}.png`;
}

export const bluehostGuideSections = {
  signup: {
    id: 'create-account',
    title: 'Create Your Account',
    subtitle:
      'Follow these steps to purchase Shared hosting through our affiliate link. You own the account.',
    steps: signupSteps,
  },
  admin: {
    id: 'add-admin',
    title: 'Add MHG Strategy as Admin',
    subtitle: 'Grant us admin access so we can build your site — no password sharing required.',
    steps: adminSteps,
  },
} as const;

export const beforeYouStartItems = [
  'Have a credit or debit card, Google Pay, or PayPal ready',
  'Think of a few domain name ideas (.com preferred)',
  'Know where most of your website visitors will be located (for data center selection)',
  'Set aside about 15 minutes to complete both sections',
];
