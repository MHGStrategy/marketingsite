'use client';

import Link from 'next/link';
import { useState } from 'react';
import { aboutLinks, insightsHref, solutionLinks } from '@/lib/navigationLinks';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const linkStyles =
    'text-white hover:text-primary-blue transition-colors font-medium text-xs sm:text-sm md:text-base';

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setIsMobileServicesOpen(false);
    setIsMobileAboutOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-black shadow-md">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Desktop Navigation */}
        <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center h-20 md:h-24 gap-0">
          <div className="flex items-center justify-end space-x-4 sm:space-x-5 md:space-x-6 mr-4 sm:mr-6 md:mr-12">
            <Link href="/" className={linkStyles}>
              Home
            </Link>
            <div
              className="relative px-3 py-2 -mx-3 -my-1"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <Link href="/solutions" className={`${linkStyles} flex items-center gap-1`}>
                Solutions
                <span aria-hidden className="text-xs">▾</span>
              </Link>
              {isServicesOpen && (
                <div className="absolute top-full right-0 mt-0 w-72 bg-black border border-gray-800 rounded-lg shadow-lg py-2 z-50">
                  {solutionLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-white hover:bg-gray-900 hover:text-primary-blue transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Link href="/" className="flex-shrink-0 flex items-center justify-center">
            <img
              src="/mhg-logo.png"
              alt="MHG Strategy logo"
              className="h-16 sm:h-20 w-auto md:h-24"
            />
          </Link>

          <div className="flex items-center justify-start space-x-4 sm:space-x-5 md:space-x-6 ml-4 sm:ml-6 md:ml-12">
            <div
              className="relative px-3 py-2 -mx-3 -my-1"
              onMouseEnter={() => setIsAboutOpen(true)}
              onMouseLeave={() => setIsAboutOpen(false)}
            >
              <Link href="/about" className={`${linkStyles} flex items-center gap-1`}>
                About Us
                <span aria-hidden className="text-xs">▾</span>
              </Link>
              {isAboutOpen && (
                <div className="absolute top-full left-0 mt-0 w-48 bg-black border border-gray-800 rounded-lg shadow-lg py-2 z-50">
                  {aboutLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-white hover:bg-gray-900 hover:text-primary-blue transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href={insightsHref} className={linkStyles}>
              Insights
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center justify-between h-20 md:hidden">
          <button
            type="button"
            className="w-10 h-10 flex items-center justify-center text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <Link href="/" className="flex flex-1 justify-center" onClick={closeMobileMenu}>
            <img
              src="/mhg-logo.png"
              alt="MHG Strategy logo"
              className="h-16 w-auto"
            />
          </Link>

          <span className="w-10" aria-hidden="true" />
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link href="/" className={`block ${linkStyles}`} onClick={closeMobileMenu}>
              Home
            </Link>
            <button
              type="button"
              className={`flex items-center gap-1 ${linkStyles}`}
              onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
              aria-expanded={isMobileServicesOpen}
            >
              Solutions
              <span aria-hidden className="text-xs">{isMobileServicesOpen ? '▴' : '▾'}</span>
            </button>
            {isMobileServicesOpen && (
              <div className="pl-4 space-y-3 border-l border-gray-800 ml-1">
                {solutionLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block ${linkStyles} text-sm`}
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
            <button
              type="button"
              className={`flex items-center gap-1 ${linkStyles}`}
              onClick={() => setIsMobileAboutOpen(!isMobileAboutOpen)}
              aria-expanded={isMobileAboutOpen}
            >
              About Us
              <span aria-hidden className="text-xs">{isMobileAboutOpen ? '▴' : '▾'}</span>
            </button>
            {isMobileAboutOpen && (
              <div className="pl-4 space-y-3 border-l border-gray-800 ml-1">
                <Link href="/about" className={`block ${linkStyles} text-sm`} onClick={closeMobileMenu}>
                  About Us
                </Link>
                {aboutLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block ${linkStyles} text-sm`}
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
            <Link href={insightsHref} className={`block ${linkStyles}`} onClick={closeMobileMenu}>
              Insights
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
