'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const linkStyles =
    'text-white hover:text-primary-blue transition-colors font-medium';

  return (
    <nav className="sticky top-0 z-50 bg-black shadow-md">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Desktop Navigation */}
        <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center h-24 gap-0">
          <div className="flex items-center justify-end space-x-6 mr-12">
            <Link href="/" className={linkStyles}>
              Home
            </Link>
            <Link href="/solutions" className={linkStyles}>
              Solutions
            </Link>
          </div>

          <Link href="/" className="flex-shrink-0 flex items-center justify-center">
            <img
              src="/mhg-logo.png"
              alt="MHG Strategy logo"
              className="h-20 w-auto md:h-24"
            />
          </Link>

          <div className="flex items-center justify-start space-x-6 ml-12">
            <Link href="/webops" className={linkStyles}>
              Web Services
            </Link>
            <Link href="/contact" className={linkStyles}>
              Contact
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center justify-between h-20 md:hidden">
          <button
            className="w-10 h-10 flex items-center justify-center text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
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
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <Link href="/" className="flex flex-1 justify-center">
            <img
              src="/mhg-logo.png"
              alt="MHG Strategy logo"
              className="h-20 w-auto"
            />
          </Link>

          <span className="w-10" aria-hidden="true" />
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-4">
            <Link
              href="/"
              className={linkStyles}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/solutions"
              className={linkStyles}
              onClick={() => setIsOpen(false)}
            >
              Solutions
            </Link>
            <Link
              href="/webops"
              className={linkStyles}
              onClick={() => setIsOpen(false)}
            >
              Web Services
            </Link>
            <Link
              href="/contact"
              className={linkStyles}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
