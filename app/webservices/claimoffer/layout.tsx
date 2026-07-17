import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Claim Offer | MHG Strategy',
  description:
    'Claim your free website offer. Enter your Offer Code and request your eligibility call.',
};

export default function ClaimOfferLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

