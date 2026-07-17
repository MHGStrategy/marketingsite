export const BLUEHOST_AFFILIATE_URL = 'https://bluehost.sjv.io/mhgstrategy';
export const BLUEHOST_PRICING_NOTE =
  '$1.99/mo is on the 36-month plan (about $72 up front) and includes a 30-day money-back guarantee.';
export const MHG_ADMIN_EMAIL = 'shaun@mhgstrategy.com';
export const MHG_ADMIN_NAME = 'Shaun / MHG Strategy';
export const BLUEHOST_ACCOUNT_MANAGER_URL = 'https://www.bluehost.com/my-account/home';
export const BLUEHOST_LOGIN_URL = 'https://www.bluehost.com/my-account/login';
export const BLUEHOST_SIGNUP_HELP_URL =
  'https://www.bluehost.com/help/article/how-to-sign-up-for-an-account';

// Bluehost CDN base — images from help.bluehost.com articles
const BH_CDN = 'https://content.bluehost.com/bluehost/img/bluehost';

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
    // TODO: right-click the Step 1 screenshot on the Bluehost help article and paste the URL here
    imageSrc: '',
    link: { href: BLUEHOST_AFFILIATE_URL, label: 'BLUEHOST' },
  },
  {
    stepNumber: 2,
    title: 'Choose your Shared hosting plan',
    description:
      'Choose the Starter plan — it\'s all a one-page business site needs. (Pick Business only if you plan to host multiple sites later.)',
    imageSrc: '',
  },
  {
    stepNumber: 3,
    title: 'Register or use an existing domain',
    description:
      'Choose a domain name for your website. You can register a new domain, use one you already own, or select your domain later. Shared hosting includes a free domain for the first year. Domain Privacy + Protection is optional.',
    imageSrc: '',
    tips: ['Prefer a .com if available — it tends to rank better in search results.'],
  },
  {
    stepNumber: 4,
    title: 'Create your Bluehost account',
    description:
      'Create your account with an email address and a secure password. You can also sign up with Google, Apple, or GitHub if you prefer. Save your login details — you will need them to access your portal.',
    // Google sign-in screen — confirmed working from Bluehost CDN
    imageSrc: `${BH_CDN}/account/am-signin-google.png`,
    imageAlt: 'Bluehost account sign-in with Google option',
  },
  {
    stepNumber: 5,
    title: 'Review recommended add-ons',
    description:
      'Bluehost may suggest optional add-ons such as CodeGuard (backups), eCommerce tools, or Yoast (SEO). These are not required for a standard business site — skip or uncheck any you do not need.',
    imageSrc: '',
    tips: optionalAddons.map((a) => `${a.name}: ${a.desc}`),
  },
  {
    stepNumber: 6,
    title: 'Enter your billing information',
    description:
      'In the Billing Information section, enter your payment details and choose your preferred method: credit card, debit card, Google Pay, or PayPal.',
    imageSrc: '',
  },
  {
    stepNumber: 7,
    title: 'Select your billing term',
    description:
      'Choose your billing term from the dropdown. Bluehost offers flexible term lengths — a longer term often provides better savings.',
    imageSrc: '',
  },
  {
    stepNumber: 8,
    title: 'Choose your data center location',
    description:
      'Select the data center closest to your primary audience. This improves load times for your visitors. For most U.S. businesses, USA Virginia or USA Arizona is a good choice.',
    imageSrc: '',
    tips: [
      'Other locations include UK (London), Canada (Toronto), Germany (Frankfurt), and Australia (Sydney).',
    ],
  },
  {
    stepNumber: 9,
    title: 'Review your cart and submit payment',
    description:
      'Review everything in your Shopping Cart — hosting plan, domain, data center, add-ons, and billing term. When it looks correct, click Submit Payment to complete your purchase.',
    imageSrc: '',
  },
  {
    stepNumber: 10,
    title: 'Access your Bluehost Portal',
    description:
      'After payment, you will receive an order confirmation email from Bluehost. Log in to the Bluehost Portal to manage your account — then continue to the next section to add MHG Strategy as an admin.',
    // My Profile / profile icon — confirmed working from Bluehost CDN
    imageSrc: `${BH_CDN}/account/am-account-my-profile.png`,
    imageAlt: 'Bluehost Account Manager — profile icon',
    link: { href: BLUEHOST_LOGIN_URL, label: 'Log in to Bluehost' },
  },
];

// ---------------------------------------------------------------------------
// Admin steps — imageSrc uses Bluehost CDN URLs where available.
// To fill gaps: open https://www.bluehost.com/help/article/am-users-roles
// in your browser, right-click each screenshot → Copy Image Address, paste below.
// ---------------------------------------------------------------------------
const adminSteps: GuideStepContent[] = [
  {
    stepNumber: 1,
    title: 'Log in to the Bluehost Portal',
    description:
      'Go to the Bluehost login page and sign in with the email and password you created during signup.',
    // Google sign-in / login screen — confirmed working from Bluehost CDN
    imageSrc: `${BH_CDN}/account/am-signin-google.png`,
    imageAlt: 'Bluehost Portal login screen',
    link: { href: BLUEHOST_LOGIN_URL, label: 'Log in to Bluehost' },
  },
  {
    stepNumber: 2,
    title: 'Open Users & Roles',
    description:
      'Click the profile icon in the top-right corner, then select Users & Roles (or Accounts & Users) from the dropdown menu.',
    // Profile icon dropdown — confirmed working from Bluehost CDN
    imageSrc: `${BH_CDN}/account/am-account-my-profile.png`,
    imageAlt: 'Bluehost profile icon and dropdown menu',
  },
  {
    stepNumber: 3,
    title: 'Manage your account',
    description:
      'Find your account in the list and click the Manage button next to it.',
    // TODO: right-click the Step 3 screenshot on the Bluehost Users & Roles article and paste the URL here
    imageSrc: '',
  },
  {
    stepNumber: 4,
    title: 'Add a new user',
    description:
      'Scroll down to the User Roles & Permissions section and click the + Add User button.',
    imageSrc: '',
  },
  {
    stepNumber: 5,
    title: 'Invite MHG Strategy as Admin',
    description: `Enter the following details, then click Invite:\n\n• Name: ${MHG_ADMIN_NAME}\n• Email: ${MHG_ADMIN_EMAIL}\n• Role: Admin`,
    imageSrc: '',
    tips: ['Shaun will receive an email to set up his own login — you never need to share your password.'],
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
