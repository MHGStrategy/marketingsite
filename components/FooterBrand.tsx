'use client';

import Link from 'next/link';
import { useLayoutEffect, useRef } from 'react';

const TAGLINE = 'AI-Powered Ops';
/** Measured from mhg-logo.png: gap between MHG and STRATEGY text bands. */
const LOGO_INTERNAL_LINE_GAP_PX = 132;
const LOGO_IMAGE_HEIGHT_PX = 1333;
const LOGO_STRATEGY_BOTTOM_Y = 1124;
const LOGO_BOTTOM_PADDING_PX = LOGO_IMAGE_HEIGHT_PX - LOGO_STRATEGY_BOTTOM_Y - 1;

const glowStyle = {
  color: '#a7d8ff',
  textShadow:
    '0 0 6px rgba(120,196,255,0.54), 0 0 13px rgba(90,170,255,0.45), 0 0 25px rgba(70,150,255,0.33)',
};

type FooterBrandProps = {
  logoClassName: string;
  taglineBottomClassName?: string;
  linkable?: boolean;
};

/** STRATEGY band height in mhg-logo.png — tagline should read at similar scale. */
const LOGO_STRATEGY_BAND_HEIGHT_PX = 221;

function fitTaglineToLogoWidth(
  text: HTMLParagraphElement,
  targetWidth: number,
  logoHeight: number,
) {
  text.style.width = 'auto';
  text.style.letterSpacing = '0px';

  const minFontSize = Math.max(24, logoHeight * (LOGO_STRATEGY_BAND_HEIGHT_PX / LOGO_IMAGE_HEIGHT_PX) * 0.65);
  const maxFontSize = Math.min(56, logoHeight * 0.22);

  let low = minFontSize;
  let high = maxFontSize;
  let bestSize = minFontSize;

  while (low <= high) {
    const mid = (low + high) / 2;
    text.style.fontSize = `${mid}px`;

    if (text.scrollWidth < targetWidth) {
      bestSize = mid;
      low = mid + 0.25;
    } else if (text.scrollWidth > targetWidth) {
      high = mid - 0.25;
    } else {
      bestSize = mid;
      break;
    }
  }

  text.style.fontSize = `${bestSize}px`;

  const widthGap = targetWidth - text.scrollWidth;
  if (widthGap > 0 && TAGLINE.length > 1) {
    text.style.letterSpacing = `${widthGap / (TAGLINE.length - 1)}px`;
  }

  text.style.width = `${targetWidth}px`;
}

export default function FooterBrand({
  logoClassName,
  taglineBottomClassName = '',
  linkable = true,
}: FooterBrandProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const img = imgRef.current;
    const text = textRef.current;
    if (!img || !text) return;

    const syncTagline = () => {
      const { width, height } = img.getBoundingClientRect();
      if (width <= 0 || height <= 0) return;

      fitTaglineToLogoWidth(text, width, height);
      const scale = height / LOGO_IMAGE_HEIGHT_PX;
      const gapBelowStrategy = LOGO_INTERNAL_LINE_GAP_PX * scale;
      const paddingBelowStrategy = LOGO_BOTTOM_PADDING_PX * scale;
      text.style.marginTop = `${gapBelowStrategy - paddingBelowStrategy}px`;
      text.style.lineHeight = '1';
    };

    syncTagline();

    img.addEventListener('load', syncTagline);
    const observer = new ResizeObserver(syncTagline);
    observer.observe(img);

    return () => {
      img.removeEventListener('load', syncTagline);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="inline-flex flex-col items-center">
      {linkable ? (
        <Link href="/" className="flex items-center justify-center">
          <img ref={imgRef} src="/mhg-logo.png" alt="MHG Strategy logo" className={logoClassName} />
        </Link>
      ) : (
        <img ref={imgRef} src="/mhg-logo.png" alt="MHG Strategy logo" className={logoClassName} />
      )}
      <p
        ref={textRef}
        className={`m-0 p-0 leading-none text-center font-semibold whitespace-nowrap text-xl md:text-2xl ${taglineBottomClassName}`}
        style={glowStyle}
      >
        {TAGLINE}
      </p>
    </div>
  );
}
