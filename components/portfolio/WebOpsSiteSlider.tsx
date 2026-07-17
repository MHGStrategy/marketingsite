'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { PhoneFrame } from '@/components/PhoneFrame';
import type { PortfolioSite } from '@/data/portfolio';

type WebOpsSiteSliderProps = {
  sites: PortfolioSite[];
};

const LOOP_COPIES = 3;
const AUTO_SCROLL_PX_PER_SEC = 36;
const AUTO_SCROLL_RESUME_MS = 5000;

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5">
      <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5">
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type SiteCardProps = {
  site: PortfolioSite;
  onCardHoverStart: () => void;
  onCardHoverEnd: () => void;
  onCardActivate: () => void;
};

function SiteCard({ site, onCardHoverStart, onCardHoverEnd, onCardActivate }: SiteCardProps) {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const stopTrackInteraction = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    onCardActivate();
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    onCardHoverEnd();

    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) return;

    const touch = e.changedTouches[0];
    const moved =
      Math.abs(touch.clientX - start.x) > 12 || Math.abs(touch.clientY - start.y) > 12;
    if (moved) return;

    window.open(site.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      data-slider-card
      onMouseEnter={onCardHoverStart}
      onMouseLeave={onCardHoverEnd}
      onFocus={onCardHoverStart}
      onBlur={onCardHoverEnd}
      onPointerDown={stopTrackInteraction}
      onPointerUp={(e) => e.stopPropagation()}
      onTouchStart={(e) => {
        stopTrackInteraction(e);
        const touch = e.touches[0];
        touchStartRef.current = { x: touch.clientX, y: touch.clientY };
      }}
      onTouchEnd={handleTouchEnd}
      className="group relative flex-shrink-0 snap-center w-[60vw] sm:w-[300px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2 focus-visible:ring-offset-gray-700 rounded-lg"
      aria-label={`Visit ${site.name} at ${site.domain}`}
    >
      <div className="flex flex-col items-center gap-3 px-1 py-2 transition duration-300 group-hover:scale-[1.02]">
        <PhoneFrame src={site.screenshot} alt={site.name} fallbackLabel={site.domain} />
        <div className="w-full max-w-[260px] text-center space-y-0.5">
          <p className="truncate text-sm font-semibold text-white">{site.name}</p>
          <p className="truncate text-xs text-gray-300">{site.domain}</p>
          <p className="text-[10px] uppercase tracking-wider text-primary-blue">{site.category}</p>
          <p className="pt-1 text-[11px] font-medium text-gray-400 group-hover:text-white transition-colors">
            Visit live site ↗
          </p>
        </div>
      </div>
    </a>
  );
}

export default function WebOpsSiteSlider({ sites }: WebOpsSiteSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const setWidthRef = useRef(0);
  const isAdjustingRef = useRef(false);
  const isPausedRef = useRef(false);
  const isCardHoveredRef = useRef(false);
  const isUserInteractingRef = useRef(false);
  const lastFrameTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const pauseTimerRef = useRef<number>(0);

  const loopedItems = useMemo(
    () =>
      Array.from({ length: LOOP_COPIES }, (_, copyIndex) =>
        sites.map((site) => ({
          site,
          key: `${site.slug}-${copyIndex}`,
        }))
      ).flat(),
    [sites]
  );

  const setScrollSnapEnabled = useCallback((enabled: boolean) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.scrollSnapType = enabled ? 'x mandatory' : 'none';
  }, []);

  const measureSetWidth = useCallback(() => {
    const track = trackRef.current;
    if (!track || sites.length === 0) return 0;

    const width = track.scrollWidth / LOOP_COPIES;
    setWidthRef.current = width;
    return width;
  }, [sites.length]);

  const normalizeScroll = useCallback(() => {
    const track = trackRef.current;
    const setWidth = setWidthRef.current;
    if (!track || setWidth <= 0 || isAdjustingRef.current) return;

    const { scrollLeft } = track;
    let next = scrollLeft;

    if (scrollLeft >= setWidth * 2) {
      next = scrollLeft - setWidth;
    } else if (scrollLeft < setWidth) {
      next = scrollLeft + setWidth;
    }

    if (next === scrollLeft) return;

    isAdjustingRef.current = true;
    track.scrollLeft = next;
    isAdjustingRef.current = false;
  }, []);

  const scrollToMiddle = useCallback(() => {
    const track = trackRef.current;
    const setWidth = measureSetWidth();
    if (!track || setWidth <= 0) return;
    track.scrollLeft = setWidth;
  }, [measureSetWidth]);

  const shouldAutoScroll = useCallback(() => {
    return !isPausedRef.current && !isCardHoveredRef.current && !isUserInteractingRef.current;
  }, []);

  const resumeAutoScroll = useCallback(() => {
    isPausedRef.current = false;
    lastFrameTimeRef.current = null;
  }, []);

  const pauseAutoScroll = useCallback(() => {
    isPausedRef.current = true;
    lastFrameTimeRef.current = null;
  }, []);

  const pauseAutoScrollTemporarily = useCallback(
    (ms = AUTO_SCROLL_RESUME_MS) => {
      pauseAutoScroll();
      window.clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = window.setTimeout(resumeAutoScroll, ms);
    },
    [pauseAutoScroll, resumeAutoScroll]
  );

  const getCards = useCallback(() => {
    const track = trackRef.current;
    if (!track) return [];
    return Array.from(track.querySelectorAll<HTMLElement>('[data-slider-card]'));
  }, []);

  const getCenteredCardIndex = useCallback(() => {
    const track = trackRef.current;
    const cards = getCards();
    if (!track || cards.length === 0) return 0;

    const trackCenter = track.getBoundingClientRect().left + track.clientWidth / 2;
    let bestIdx = 0;
    let bestDist = Infinity;

    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const dist = Math.abs(cardCenter - trackCenter);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    });

    return bestIdx;
  }, [getCards]);

  const handleCardHoverStart = useCallback(() => {
    isCardHoveredRef.current = true;
  }, []);

  const handleCardHoverEnd = useCallback(() => {
    isCardHoveredRef.current = false;
  }, []);

  const handleCardActivate = useCallback(() => {
    isCardHoveredRef.current = true;
    pauseAutoScrollTemporarily(AUTO_SCROLL_RESUME_MS * 2);
  }, [pauseAutoScrollTemporarily]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    scrollToMiddle();

    const onScroll = () => {
      if (!isAdjustingRef.current) {
        normalizeScroll();
      }
    };

    const onScrollEnd = () => {
      normalizeScroll();
      if (!isUserInteractingRef.current) {
        setScrollSnapEnabled(false);
      }
    };

    const observer = new ResizeObserver(() => {
      measureSetWidth();
      normalizeScroll();
    });

    observer.observe(track);
    track.addEventListener('scroll', onScroll, { passive: true });
    track.addEventListener('scrollend', onScrollEnd);

    return () => {
      observer.disconnect();
      track.removeEventListener('scroll', onScroll);
      track.removeEventListener('scrollend', onScrollEnd);
    };
  }, [loopedItems.length, measureSetWidth, normalizeScroll, scrollToMiddle, setScrollSnapEnabled]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    setScrollSnapEnabled(false);

    const tick = (time: number) => {
      if (shouldAutoScroll() && !isAdjustingRef.current) {
        setScrollSnapEnabled(false);
        const last = lastFrameTimeRef.current ?? time;
        lastFrameTimeRef.current = time;
        const deltaMs = Math.min(time - last, 50);
        track.scrollLeft += (AUTO_SCROLL_PX_PER_SEC * deltaMs) / 1000;
        normalizeScroll();
      } else {
        lastFrameTimeRef.current = time;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const onVisibilityChange = () => {
      if (document.hidden) {
        pauseAutoScroll();
      } else {
        resumeAutoScroll();
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.clearTimeout(pauseTimerRef.current);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [
    normalizeScroll,
    pauseAutoScroll,
    resumeAutoScroll,
    setScrollSnapEnabled,
    shouldAutoScroll,
  ]);

  const scroll = (direction: 'left' | 'right') => {
    const track = trackRef.current;
    if (!track) return;

    isUserInteractingRef.current = true;
    setScrollSnapEnabled(true);
    pauseAutoScrollTemporarily();

    const cards = getCards();
    const currentIdx = getCenteredCardIndex();
    const nextIdx = direction === 'right' ? currentIdx + 1 : currentIdx - 1;

    if (nextIdx < 0 || nextIdx >= cards.length) {
      isUserInteractingRef.current = false;
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    cards[nextIdx].scrollIntoView({
      inline: 'center',
      block: 'nearest',
      behavior: prefersReducedMotion ? 'instant' : 'smooth',
    });

    window.setTimeout(() => {
      isUserInteractingRef.current = false;
      setScrollSnapEnabled(false);
    }, prefersReducedMotion ? 0 : 450);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('[data-slider-card]')) return;

    isUserInteractingRef.current = true;
    setScrollSnapEnabled(true);
    pauseAutoScrollTemporarily(AUTO_SCROLL_RESUME_MS * 2);
  };

  const handlePointerUp = () => {
    isUserInteractingRef.current = false;
    window.setTimeout(() => setScrollSnapEnabled(false), 300);
  };

  if (sites.length === 0) {
    return null;
  }

  return (
    <div className="relative group/slider">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-12 items-center justify-start bg-gradient-to-r from-gray-700/90 to-transparent sm:w-16">
        <button
          type="button"
          onClick={() => scroll('left')}
          className="pointer-events-auto ml-1 flex h-10 w-8 items-center justify-center rounded bg-black/60 text-white transition hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue sm:ml-2 sm:h-12 sm:w-10"
          aria-label="Scroll sites left"
        >
          <ChevronLeftIcon />
        </button>
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 flex w-12 items-center justify-end bg-gradient-to-l from-gray-700/90 to-transparent sm:w-16">
        <button
          type="button"
          onClick={() => scroll('right')}
          className="pointer-events-auto mr-1 flex h-10 w-8 items-center justify-center rounded bg-black/60 text-white transition hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue sm:mr-2 sm:h-12 sm:w-10"
          aria-label="Scroll sites right"
        >
          <ChevronRightIcon />
        </button>
      </div>

      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="flex gap-4 overflow-x-auto overscroll-x-contain snap-x snap-mandatory touch-pan-x pb-2 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-[calc(50%-30vw)] sm:px-[calc(50%-150px)] [scroll-padding-inline:calc(50%-30vw)] sm:[scroll-padding-inline:calc(50%-150px)]"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {loopedItems.map(({ site, key }) => (
          <SiteCard
            key={key}
            site={site}
            onCardHoverStart={handleCardHoverStart}
            onCardHoverEnd={handleCardHoverEnd}
            onCardActivate={handleCardActivate}
          />
        ))}
      </div>
    </div>
  );
}
