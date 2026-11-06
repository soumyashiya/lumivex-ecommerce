'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { ORDER_CTA } from '@/lib/data';
import { ButtonLink } from '@/components/ui/Button';

/**
 * Closing call to action — a pinned, scroll-scrubbed "burst", matched frame
 * by frame to the about page on ledup.pt:
 *
 *  1. Pin. Six square photo tiles sit stacked in the centre, on top of a
 *     small heading — only the top tile is visible.
 *  2. As you scroll the stack fans straight out (no rotation), each tile
 *     along its own fixed direction, overlapping the heading as it goes.
 *  3. The tiles keep travelling to a loose ring around the copy, then on
 *     past the viewport edges…
 *  4. …until only the heading is left, now at full size. The pin releases.
 *
 * One scroll-progress value (0 → 1) drives everything, written straight to
 * element transforms inside requestAnimationFrame — no React state per
 * frame, and only transform/opacity change.
 *
 * Phones and reduced-motion users get a static frame (tiles part-way out)
 * with no pin.
 */

/**
 * End positions, as offsets from centre in vw / vh — the six directions
 * measured off the reference at the end of its run (all off-screen).
 */
const TILES = [
  { src: '/images/story/make.jpg', dx: -46, dy: -94 },
  { src: '/images/story/check.jpg', dx: 77, dy: -30 },
  { src: '/images/reviews/documentation.jpg', dx: -77, dy: 0 },
  { src: '/images/reviews/analytical.jpg', dx: -10, dy: 94 },
  { src: '/images/process/synthesise.jpg', dx: 30, dy: 94 },
  { src: '/images/process/verify.jpg', dx: 77, dy: 20 },
] as const;

/** Share of the run the stack holds still in the centre before spreading. */
const HOLD = 0.06;
/** Frame used where the burst doesn't play. */
const STATIC_TRAVEL = 0.42;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

export default function OrderCta() {
  const outerRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const motion = window.matchMedia(
      '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
    );

    // Layout is measured once (and on resize), never inside the frame loop.
    let docTop = 0;
    let runway = 1;
    let chrome = 0;
    const measure = () => {
      const sticky = outer.firstElementChild as HTMLElement | null;
      docTop = outer.getBoundingClientRect().top + window.scrollY;
      runway = Math.max(1, outer.offsetHeight - (sticky?.offsetHeight ?? window.innerHeight));
      chrome =
        parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--chrome-h')) ||
        0;
    };
    const targetProgress = () => clamp((window.scrollY + chrome - docTop) / runway);

    const place = (travel: number, headingScale: number) => {
      TILES.forEach((t, i) => {
        const el = tileRefs.current[i];
        if (!el) return;
        const x = (t.dx * travel).toFixed(3);
        const y = (t.dy * travel).toFixed(3);
        el.style.transform = `translate3d(-50%, -50%, 0) translate3d(${x}vw, ${y}vh, 0)`;
        el.style.opacity = '1';
      });
      if (copyRef.current) {
        copyRef.current.style.transform = `scale3d(${headingScale}, ${headingScale}, 1)`;
      }
    };

    const render = (p: number) => {
      // The stack is already sitting in the centre when the pin starts
      // (frame 1 of the reference), holds briefly, then spreads.
      const spread = easeInOut(clamp((p - HOLD) / (1 - HOLD)));
      // Heading: small under the stack, full size once the tiles have gone.
      place(spread, 0.62 + 0.38 * easeOut(clamp(p / 0.85)));
    };

    /*
     * Inertial scrub: the drawn progress chases the scroll progress with an
     * exponential ease (time constant TAU), so wheel steps and flicks glide
     * instead of snapping — the same feel as GSAP's `scrub: 1`. The loop
     * only runs while there is distance left to cover.
     */
    const TAU = 140; // ms
    let current = 0;
    let target = 0;
    let frame = 0;
    let last = 0;

    const tick = (now: number) => {
      const dt = last ? Math.min(64, now - last) : 16;
      last = now;
      current += (target - current) * (1 - Math.exp(-dt / TAU));
      if (Math.abs(target - current) < 0.0005) current = target;
      render(current);
      frame = current === target ? 0 : requestAnimationFrame(tick);
      if (!frame) last = 0;
    };

    const onScroll = () => {
      target = targetProgress();
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    const stop = () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      // Drop any frame queued under the old mode, or it would overwrite the
      // static layout (e.g. leave the heading scaled down on phones).
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
    };

    const apply = () => {
      stop();
      if (motion.matches) {
        measure();
        // Start exactly where the page is — no glide on first paint.
        current = target = targetProgress();
        render(current);
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize);
      } else {
        place(STATIC_TRAVEL, 1);
      }
    };

    apply();
    motion.addEventListener('change', apply);
    // Images and fonts above can shift the section after mount.
    const ro = new ResizeObserver(() => motion.matches && onResize());
    ro.observe(document.body);
    return () => {
      motion.removeEventListener('change', apply);
      ro.disconnect();
      stop();
    };
  }, []);

  return (
    <section id="order" className="relative bg-off-white">
      {/* Runway: ~2 viewports of scroll while pinned, where the burst plays. */}
      <div ref={outerRef} className="relative motion-safe:tablet:h-[300vh]">
        <div className="relative flex min-h-[560px] items-center justify-center overflow-hidden motion-safe:tablet:sticky motion-safe:tablet:top-[var(--chrome-h)] motion-safe:tablet:h-[calc(100svh-var(--chrome-h))] tablet:min-h-[640px]">
          {/* Copy — beneath the tiles, as in the reference */}
          <div
            ref={copyRef}
            className="relative flex origin-center flex-col items-center px-lg text-center"
          >
            <p className="label-mono">{ORDER_CTA.eyebrow}</p>
            {/* Site section-heading style: Switzer, text-h2, weight 400 */}
            <h2 className="mt-smd max-w-[18ch] text-h2 text-black">
              {ORDER_CTA.heading}
            </h2>
            <p className="mt-md max-w-[46ch] text-base text-grey-700 tablet:text-md">
              {ORDER_CTA.body}
            </p>
            <ButtonLink href={ORDER_CTA.href} size="lg" arrow className="mt-xl">
              {ORDER_CTA.cta}
            </ButtonLink>
          </div>

          {/* Square tiles, stacked dead-centre; they never intercept clicks */}
          {TILES.map((tile, i) => (
            <div
              key={tile.src}
              ref={(el) => {
                tileRefs.current[i] = el;
              }}
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden aspect-square w-[17vw] min-w-[150px] max-w-[260px] overflow-hidden rounded-[20px] bg-stone opacity-0 shadow-lift will-change-transform [backface-visibility:hidden] tablet:block"
            >
              <Image src={tile.src} alt="" fill sizes="260px" loading="eager" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
