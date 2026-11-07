'use client';

import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type RefObject,
} from 'react';
import { STORY } from '@/lib/data';
import { ArrowRight, ChevronLeft, ChevronRight } from '@/components/ui/Icons';

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * "Our story": copy on the left, a draggable rail of chapters on the right
 * that bleeds off the viewport edge. Each photograph carries hotspots naming
 * what is in frame; hover or focus a dot to read its label.
 *
 * Dragging: mouse/pen users can grab the rail and pull it; touch users get
 * native horizontal scrolling. Snap is suspended while dragging so the rail
 * follows the pointer, and a click that ends a drag is swallowed so it
 * doesn't trigger a hotspot.
 *
 * Rendered inside the "Most ordered" section, directly under the
 * "Documented from fill to bench" spotlight, so it has no section wrapper or
 * container of its own.
 */
export default function Story({ className = '' }: { className?: string }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = railRef.current;
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

  /** Chapters differ in width, so page to the next/previous card edge. */
  const page = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const start =
      el.getBoundingClientRect().left +
      (parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0);
    const offsets = [...el.children].map(
      (c) => c.getBoundingClientRect().left - start,
    );
    const target =
      dir === 1
        ? offsets.find((o) => o > 4)
        : [...offsets].reverse().find((o) => o < -4);
    if (target !== undefined) el.scrollBy({ left: target, behavior: 'smooth' });
  };

  return (
    <div id="story" className={`grid gap-2xl desktop:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] desktop:gap-4xl ${className}`}>
        {/* Copy column — badge top-right, text pinned to the bottom */}
        <div className="flex flex-col justify-between gap-2xl">
          <DragBadge label={STORY.dragHint} className="hidden self-end desktop:block" />

          <div data-reveal>
            <p className="label-mono">{STORY.eyebrow}</p>
            <h2 className="mt-smd max-w-[16ch] text-h2 text-black">
              {STORY.heading}
            </h2>
            <p className="mt-lg max-w-[48ch] text-base text-grey-700">
              {STORY.intro}
            </p>

            <div className="mt-xl flex gap-sm">
              {([-1, 1] as const).map((dir) => (
                <button
                  key={dir}
                  type="button"
                  onClick={() => page(dir)}
                  disabled={dir === -1 ? atStart : atEnd}
                  aria-label={dir === -1 ? 'Previous chapter' : 'Next chapter'}
                  data-touch-target
                  className="flex size-[48px] items-center justify-center rounded-pill bg-cool-50 text-black transition-colors duration-200 ease-ag hover:bg-black hover:text-white disabled:pointer-events-none disabled:text-cool-300"
                >
                  {dir === -1 ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
              ))}
            </div>
          </div>
        </div>

        <StoryRail railRef={railRef} />
    </div>
  );
}

function StoryRail({ railRef: ref }: { railRef: RefObject<HTMLDivElement | null> }) {
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const [dragging, setDragging] = useState(false);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch' || !ref.current) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: ref.current.scrollLeft,
      moved: false,
    };
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.active || !ref.current) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) > 4) {
      d.moved = true;
      setDragging(true);
      ref.current.setPointerCapture(e.pointerId);
    }
    if (d.moved) ref.current.scrollLeft = d.startScroll - dx;
  };

  const endDrag = () => {
    drag.current.active = false;
    // Let the swallowed click land before re-enabling snap.
    window.setTimeout(() => setDragging(false), 0);
  };

  return (
    <div
      ref={ref}
      role="group"
      aria-label="Our story"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={(e) => {
        if (drag.current.moved) {
          e.preventDefault();
          e.stopPropagation();
          drag.current.moved = false;
        }
      }}
      className={[
        'no-scrollbar flex gap-md overflow-x-auto',
        '-mx-lg px-lg scroll-pl-lg',
        'tablet:-mx-[56px] tablet:px-[56px] tablet:scroll-pl-[56px] tablet:gap-xl',
        'desktop:ml-0 desktop:pl-0 desktop:scroll-pl-0',
        'min-[1680px]:-mr-[120px] min-[1680px]:pr-[120px]',
        dragging
          ? 'cursor-grabbing select-none'
          : 'snap-x snap-mandatory cursor-grab',
      ].join(' ')}
    >
      {STORY.chapters.map((chapter, i) => (
        <figure
          key={chapter.title}
          className={`shrink-0 snap-start ${
            chapter.size === 'wide'
              ? 'w-[300px] tablet:w-[460px] desktop:w-[600px]'
              : 'w-[220px] tablet:w-[300px] desktop:w-[340px]'
          }`}
        >
          <div className="relative h-[300px] overflow-hidden rounded-card-round bg-stone tablet:h-[380px] desktop:h-[460px]">
            <Image
              src={chapter.image}
              alt=""
              fill
              draggable={false}
              sizes="(max-width: 767px) 300px, (max-width: 1023px) 460px, 600px"
              className="pointer-events-none object-cover"
            />
            {chapter.hotspots.map((spot) => (
              <Hotspot key={spot.label} {...spot} />
            ))}
          </div>

          <figcaption className="mt-md flex gap-smd">
            <span className="pt-xxs font-mono text-xs text-grey-500">
              {pad(i + 1)}
            </span>
            <div>
              <h3 className="text-lg text-black">{chapter.title}</h3>
              <p className="mt-xxs max-w-[44ch] text-sm text-grey-500">
                {chapter.text}
              </p>
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/**
 * White dot with a dark ring (as in the reference), a soft halo pulse for
 * motion-allowed users, and a label pill that rises in on hover / focus.
 */
function Hotspot({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="group/spot absolute z-10 -translate-x-1/2 -translate-y-1/2 p-sm"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <span
        aria-hidden
        className="absolute inset-sm rounded-pill bg-white/60 motion-safe:animate-ping"
      />
      <span
        aria-hidden
        className="relative block size-[22px] rounded-pill bg-white ring-[6px] ring-black/55 transition-colors duration-200 ease-ag group-hover/spot:ring-green group-focus-visible/spot:ring-green"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-full left-1/2 mb-xs -translate-x-1/2 translate-y-xs whitespace-nowrap rounded-pill bg-white px-smd py-xs text-xs text-black opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/spot:translate-y-0 group-hover/spot:opacity-100 group-focus-visible/spot:translate-y-0 group-focus-visible/spot:opacity-100"
      >
        {label}
      </span>
    </button>
  );
}

/** Circular "drag" badge: text on a circle path, slowly turning, arrow still. */
function DragBadge({ label, className = '' }: { label: string; className?: string }) {
  const text = `${label} · ${label} · `;
  return (
    <div aria-hidden className={`relative size-[150px] ${className}`}>
      <svg
        viewBox="0 0 150 150"
        className="absolute inset-0 size-full motion-safe:animate-spin-slow"
      >
        <defs>
          <path
            id="story-badge-circle"
            d="M75,75 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0"
          />
        </defs>
        <text className="fill-grey-500 font-mono text-[9.5px] uppercase tracking-[0.2em]">
          <textPath href="#story-badge-circle" textLength="364">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-grey-500">
        <ArrowRight size={44} strokeWidth={1} />
      </span>
    </div>
  );
}
