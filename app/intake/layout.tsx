import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digital Discovery Intake | MHG Strategy',
  description:
    'Discovery questionnaire for digital transformation, automation, finance & revenue ops, and web services.',
  robots: { index: false, follow: false },
};

export default function DiscoveryIntakeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
