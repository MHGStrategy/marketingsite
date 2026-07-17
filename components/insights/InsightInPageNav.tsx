'use client';

import Link from 'next/link';
import { useState } from 'react';
import { inPageNavLinks } from '@/lib/insights/content/claudeHighSchoolCurriculum';

export default function InsightInPageNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="sticky top-20 md:top-24 z-40 bg-primary-black border-b border-gray-800 shadow-sm"
      aria-label="Page sections"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="hidden md:flex items-center justify-center gap-x-4 lg:gap-x-6 py-3 overflow-x-auto">
          {inPageNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-400 hover:text-primary-blue transition-colors whitespace-nowrap shrink-0"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="md:hidden py-2">
          <button
            type="button"
            className="flex items-center justify-between w-full text-sm font-medium text-white py-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="insight-page-nav-menu"
          >
            Jump to section
            <span aria-hidden>{menuOpen ? '▴' : '▾'}</span>
          </button>
          {menuOpen && (
            <div id="insight-page-nav-menu" className="pb-3 space-y-2">
              {inPageNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-gray-400 hover:text-primary-blue transition-colors py-1"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
