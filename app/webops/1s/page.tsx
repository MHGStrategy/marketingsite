import type { Metadata } from 'next';
import WebOps1sSalesPage from '@/components/webops/WebOps1sSalesPage';

export const metadata: Metadata = {
  title: 'MHG Strategy | WebOps',
  description:
    'MHG Strategy operates your digital presence — website, Google listing, lead capture, and monthly reporting. $600/month, site included.',
  robots: { index: false, follow: false },
};

export default function WebOps1sPage() {
  return <WebOps1sSalesPage />;
}
