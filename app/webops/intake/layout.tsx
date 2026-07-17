import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Client Discovery Intake | MHG Strategy',
  description: 'Private discovery questionnaire for MHG Strategy web services clients.',
  robots: { index: false, follow: false },
};

export default function IntakeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
