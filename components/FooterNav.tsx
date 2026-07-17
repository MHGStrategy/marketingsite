'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { aboutLinks, insightsHref, solutionLinks } from '@/lib/navigationLinks';

function useMobileFooterNav() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return isMobile;
}

export default function FooterNav() {
  const isMobile = useMobileFooterNav();
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const linkStyles =
    'text-gray-300 hover:text-primary-blue transition-colors font-medium text-sm md:text-base';
  const subLinkStyles = `${linkStyles}`;
  const menuOpen = solutionsOpen || aboutOpen;

  const closeSolutions = () => setSolutionsOpen(false);
  const closeAbout = () => setAboutOpen(false);

  return (
    <div
      className="relative w-full flex justify-center min-h-[2.75rem] items-center"
      onMouseLeave={() => {
        if (!isMobile) {
          setSolutionsOpen(false);
          setAboutOpen(false);
        }
      }}
    >
      <nav
        className={`flex flex-wrap items-center justify-center gap-x-5 md:gap-x-12 ${
          menuOpen ? 'invisible' : ''
        }`}
        aria-label="Footer"
        aria-hidden={menuOpen}
      >
        <Link href="/" className={linkStyles}>
          Home
        </Link>

        <div
          className="flex items-center gap-1 shrink-0"
          onMouseEnter={() => {
            if (!isMobile) {
              setAboutOpen(false);
              setSolutionsOpen(true);
            }
          }}
        >
          <Link href="/solutions" className={`${linkStyles} flex items-center gap-1`}>
            Solutions
          </Link>
          {isMobile ? (
            <button
              type="button"
              className={linkStyles}
              onClick={() => {
                if (solutionsOpen) {
                  closeSolutions();
                } else {
                  setAboutOpen(false);
                  setSolutionsOpen(true);
                }
              }}
              aria-expanded={solutionsOpen}
              aria-label="Toggle Solutions menu"
            >
              <span aria-hidden className="text-xs">{solutionsOpen ? '▴' : '▾'}</span>
            </button>
          ) : (
            <span aria-hidden className={`${linkStyles} text-xs pointer-events-none`}>
              ▾
            </span>
          )}
        </div>

        <div
          className="flex items-center gap-1 shrink-0"
          onMouseEnter={() => {
            if (!isMobile) {
              setSolutionsOpen(false);
              setAboutOpen(true);
            }
          }}
        >
          <Link href="/about" className={`${linkStyles} flex items-center gap-1`}>
            About Us
          </Link>
          {isMobile ? (
            <button
              type="button"
              className={linkStyles}
              onClick={() => {
                setSolutionsOpen(false);
                setAboutOpen(!aboutOpen);
              }}
              aria-expanded={aboutOpen}
              aria-label="Toggle About Us menu"
            >
              <span aria-hidden className="text-xs">{aboutOpen ? '▴' : '▾'}</span>
            </button>
          ) : (
            <span aria-hidden className={`${linkStyles} text-xs pointer-events-none`}>
              ▾
            </span>
          )}
        </div>

        <Link href={insightsHref} className={`${linkStyles} shrink-0`}>
          Insights
        </Link>
      </nav>

      {solutionsOpen && (
        <div
          className="absolute inset-0 z-30 flex flex-wrap items-center justify-center gap-x-3 md:gap-x-6 bg-primary-black px-2 md:px-4"
          onMouseEnter={() => !isMobile && setSolutionsOpen(true)}
          role="menu"
          aria-label="Solutions"
        >
          {isMobile && (
            <button
              type="button"
              role="menuitem"
              className={`${subLinkStyles} shrink-0`}
              onClick={closeSolutions}
              aria-label="Back to footer menu"
            >
              ←
            </button>
          )}
          {solutionLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              role="menuitem"
              className={`${subLinkStyles} shrink-0`}
              onClick={closeSolutions}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      {aboutOpen && (
        <div
          className="absolute inset-0 z-30 flex flex-wrap items-center justify-center gap-x-3 md:gap-x-6 bg-primary-black px-2 md:px-4"
          onMouseEnter={() => !isMobile && setAboutOpen(true)}
          role="menu"
          aria-label="About Us"
        >
          {isMobile && (
            <button
              type="button"
              role="menuitem"
              className={`${subLinkStyles} shrink-0`}
              onClick={closeAbout}
              aria-label="Back to footer menu"
            >
              ←
            </button>
          )}
          {aboutLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              role="menuitem"
              className={`${subLinkStyles} shrink-0`}
              onClick={closeAbout}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
