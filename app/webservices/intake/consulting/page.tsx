'use client';

import ClientRedirect from '@/components/ClientRedirect';

export default function LegacyWebServicesRedirect() {
  return <ClientRedirect to="/webops/intake/consulting" preserveHash />;
}
