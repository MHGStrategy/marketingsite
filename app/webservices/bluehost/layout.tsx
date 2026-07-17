import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bluehost Setup Guide | MHG Strategy',
  description:
    'Step-by-step instructions to sign up for Bluehost Shared hosting and add MHG Strategy as an admin so we can build your website.',
};

export default function BluehostGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
