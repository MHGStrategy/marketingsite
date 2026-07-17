'use client';

import { useLayoutEffect } from 'react';
import { logoMhgTopPaddingPx } from '@/lib/footerLogoMetrics';

export default function FooterSpacingSync() {
  useLayoutEffect(() => {
    const sync = () => {
      const footer = document.querySelector('footer');
      if (!footer) return;

      const tagline = [...footer.querySelectorAll('p')].find(
        (p) => p.textContent?.trim() === 'AI-Powered Ops',
      );
      const contact = footer.querySelector('a[href="tel:9252908604"]');
      const nav = footer.querySelector('nav[aria-label="Footer"]');
      const logo = footer.querySelector('img[alt="MHG Strategy logo"]');
      const mbWrapper = nav?.parentElement?.parentElement ?? null;

      if (!tagline || !contact || !nav || !logo || !mbWrapper) return;
      if (!(nav instanceof HTMLElement) || nav.offsetParent === null) return;

      const taglineRect = tagline.getBoundingClientRect();
      const contactRect = contact.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();
      const mbWrapperRect = mbWrapper.getBoundingClientRect();
      const logoRect = logo.getBoundingClientRect();

      const gapA = contactRect.top - taglineRect.bottom;
      const logoTopPad = logoMhgTopPaddingPx(logoRect.height);
      const navInternalPad = mbWrapperRect.bottom - navRect.bottom;
      const targetMb = Math.max(0, gapA - logoTopPad - navInternalPad);

      const footerStyles = getComputedStyle(footer);
      const currentMb = parseFloat(getComputedStyle(mbWrapper).marginBottom) || 0;
      const currentPt = parseFloat(footerStyles.paddingTop) || 0;
      const nextPt = currentPt + (currentMb - targetMb);

      mbWrapper.style.marginBottom = `${targetMb}px`;
      footer.style.paddingTop = `${nextPt}px`;
    };

    sync();
    window.addEventListener('resize', sync);
    const logo = document.querySelector('img[alt="MHG Strategy logo"]');
    const observer = logo ? new ResizeObserver(sync) : null;
    if (logo && observer) observer.observe(logo);

    return () => {
      window.removeEventListener('resize', sync);
      observer?.disconnect();
    };
  }, []);

  return null;
}
