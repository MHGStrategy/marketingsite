'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type ClientRedirectProps = {
  to: string;
  preserveHash?: boolean;
};

export default function ClientRedirect({ to, preserveHash = false }: ClientRedirectProps) {
  const router = useRouter();

  useEffect(() => {
    const hash = preserveHash && typeof window !== 'undefined' ? window.location.hash : '';
    router.replace(`${to}${hash || ''}`);
  }, [router, to, preserveHash]);

  return null;
}
