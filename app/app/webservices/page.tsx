'use client';

import ClientRedirect from '@/components/ClientRedirect';

export default function LegacyAppWebServicesRedirect() {
  return <ClientRedirect to="/webops" preserveHash />;
}
