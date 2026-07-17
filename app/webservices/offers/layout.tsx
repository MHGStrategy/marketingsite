import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Current Offer – Free Custom Website | MHG Strategy',
  description:
    'Get a free custom-coded website (up to 3 pages). You own your hosting from $1.99/mo. Request a callback and we’ll walk you through the process.',
};

export default function OffersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
