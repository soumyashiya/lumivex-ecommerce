'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from './Icons';

type Props = {
  children: ReactNode;
  /** Shown above the rail, opposite the heading. */
  header?: ReactNode;
  className?: string;
  /** Tailwind classes applied to every direct child (card width rules). */
  itemClassName?: string;
  /**
   * Arrow placement — the reference site puts them below, right-aligned.
   * `header` sits round arrow buttons and a position counter at the end of
   * the header row instead, so paging lives next to the section title.
   */
  controls?: 'below' | 'header' | 'none';
  label: string;
  /**
   * Marks the rail for the site-wide scroll reveal (globals.css +
   * `providers/Reveal.tsx`). A prop rather than a passed-through
   * `data-reveal`, so the attribute lands on the rail's own root.
   */
  reveal?: boolean;
};

/**
 * Horizontal snap rail with scroll-position-aware arrows. Scrolling by one
 * card width keeps the paging predictable regardless of how many cards fit.
 * Touch devices just swipe; the arrows are a pointer affordance.
 */
export default function Rail({
  children,
  header,
  className = '',
  itemClassName = '',
  controls = 'below',
  label,
  reveal = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [current, setCurrent] = useState(0);

  const count = Array.isArray(children) ? children.length : 1;

  const stepWidth = (el: HTMLDivElement) => {
    const first = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 16;
    return first ? first.offsetWidth + gap : el.clientWidth * 0.8;
  };

  const sync = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(end);
    setCurrent(
      end ? count - 1 : Math.round(el.scrollLeft / stepWidth(el)),
    );
  }, [count]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    sync();
    el.addEventListener('scroll', sync, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', sync);
      ro.disconnect();
    };
  }, [sync]);

  const page = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: stepWidth(el) * dir, behavior: 'smooth' });
  };

  const scrollable = !(atStart && atEnd);
  const showControls = controls === 'below' && scrollable;
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className={className} data-reveal={reveal || undefined}>
      {controls === 'header' ? (
        <div className="mb-lg flex flex-wrap items-end justify-between gap-lg tablet:mb-xl">
          {header}
          {/* Touch users swipe; arrows are a pointer affordance. */}
          <div className="hidden items-center gap-md tablet:flex">
            <span
              aria-hidden
              className="hidden font-mono text-xs uppercase tracking-label text-grey-500 tablet:inline"
            >
              <span className="text-black">{pad(current + 1)}</span> / {pad(count)}
            </span>
            <div className="flex gap-sm">
              {([-1, 1] as const).map((dir) => (
                <button
                  key={dir}
                  type="button"
                  onClick={() => page(dir)}
                  disabled={dir === -1 ? atStart : atEnd}
                  aria-label={`${dir === -1 ? 'Previous' : 'Next'} — ${label}`}
                  data-touch-target
                  className="flex size-[48px] items-center justify-center rounded-pill bg-cool-50 text-black transition-colors duration-200 ease-ag hover:bg-black hover:text-white disabled:pointer-events-none disabled:text-cool-300"
                >
                  {dir === -1 ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        header
      )}

      {/* Negative gutter so cards bleed to the viewport edge while the rail
          still starts aligned with the container's content. scroll-padding
          has to match the inline padding, or the first snap point lands at
          the padding edge and the browser nudges the rail on load. */}
      <div
        ref={ref}
        role="group"
        aria-label={label}
        className="rail -mx-lg scroll-pl-lg gap-md px-lg tablet:-mx-[56px] tablet:scroll-pl-[56px] tablet:gap-xl tablet:px-[56px] min-[1680px]:-mx-[120px] min-[1680px]:scroll-pl-[120px] min-[1680px]:px-[120px]"
      >
        {Array.isArray(children)
          ? children.map((child, i) => (
              <div key={i} className={itemClassName}>
                {child}
              </div>
            ))
          : children}
      </div>

      {showControls && (
        <div className="mt-lg flex items-center justify-end gap-3xl tablet:mt-2xl">
          <button
            type="button"
            onClick={() => page(-1)}
            disabled={atStart}
            aria-label={`Previous — ${label}`}
            className="text-green transition-colors duration-200 ease-ag hover:text-green-light disabled:text-grey-100"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            onClick={() => page(1)}
            disabled={atEnd}
            aria-label={`Next — ${label}`}
            className="text-green transition-colors duration-200 ease-ag hover:text-green-light disabled:text-grey-100"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
