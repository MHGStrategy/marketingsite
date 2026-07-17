export type CalBookingType = 'webops' | 'revops' | 'managed-ops';

type CalBookingConfig = {
  label: string;
  shortLabel: string;
  description: string;
  envKey:
    | 'NEXT_PUBLIC_CAL_WEBOPS_URL'
    | 'NEXT_PUBLIC_CAL_REVOPS_URL'
    | 'NEXT_PUBLIC_CAL_MANAGEDOPS_URL';
  siteBookPath: string;
  fallbackAnchor: string;
};

export const CAL_BOOKING_CONFIG: Record<CalBookingType, CalBookingConfig> = {
  webops: {
    label: 'WebOps Discovery Call',
    shortLabel: 'WebOps',
    description: 'Website management, redesign, hosting, SEO, or ongoing web operations.',
    envKey: 'NEXT_PUBLIC_CAL_WEBOPS_URL',
    siteBookPath: '/book/webops/',
    fallbackAnchor: '/webops/#contact',
  },
  revops: {
    label: 'RevOps Review',
    shortLabel: 'RevOps',
    description: 'Sales tracking, revenue reporting, system integrations, and growth workflows.',
    envKey: 'NEXT_PUBLIC_CAL_REVOPS_URL',
    siteBookPath: '/book/revops/',
    fallbackAnchor: '/revops/#lead-form',
  },
  'managed-ops': {
    label: 'Managed Ops Review',
    shortLabel: 'Managed Ops',
    description: 'End-to-end revenue and operations support for growing teams.',
    envKey: 'NEXT_PUBLIC_CAL_MANAGEDOPS_URL',
    siteBookPath: '/book/revops/',
    fallbackAnchor: '/managed-ops/#lead-form',
  },
};

const CAL_ENV_VALUES: Record<CalBookingConfig['envKey'], string | undefined> = {
  NEXT_PUBLIC_CAL_WEBOPS_URL: process.env.NEXT_PUBLIC_CAL_WEBOPS_URL,
  NEXT_PUBLIC_CAL_REVOPS_URL: process.env.NEXT_PUBLIC_CAL_REVOPS_URL,
  NEXT_PUBLIC_CAL_MANAGEDOPS_URL: process.env.NEXT_PUBLIC_CAL_MANAGEDOPS_URL,
};

/** Full Cal.com booking URL from env, or null when unset. */
export function getCalBookingUrl(type: CalBookingType): string | null {
  const raw = CAL_ENV_VALUES[CAL_BOOKING_CONFIG[type].envKey]?.trim();
  return raw || null;
}

/** Cal.com `calLink` slug (`username/event`) for embeds. */
export function getCalLink(type: CalBookingType): string | null {
  const url = getCalBookingUrl(type);
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const path = parsed.pathname.replace(/^\/+|\/+$/g, '');
    return path || null;
  } catch {
    const slug = url.replace(/^https?:\/\/[^/]+\/?/i, '').replace(/\/$/, '');
    return slug || null;
  }
}

export function isCalConfigured(type: CalBookingType): boolean {
  return Boolean(getCalLink(type));
}

/** URL used in lead emails and form payloads — prefers Cal.com when configured. */
export function getCalBookUrlForLead(type: CalBookingType): string {
  const configured = getCalBookingUrl(type);
  if (configured) return configured;

  const { siteBookPath, fallbackAnchor } = CAL_BOOKING_CONFIG[type];
  return `https://www.mhgstrategy.com${siteBookPath || fallbackAnchor}`;
}

/** Client-safe booking link for on-site CTAs. */
export function getCalCtaHref(type: CalBookingType): string {
  if (isCalConfigured(type)) {
    return CAL_BOOKING_CONFIG[type].siteBookPath;
  }
  return CAL_BOOKING_CONFIG[type].fallbackAnchor;
}

export function isCalBookingType(value: string): value is CalBookingType {
  return value in CAL_BOOKING_CONFIG;
}
