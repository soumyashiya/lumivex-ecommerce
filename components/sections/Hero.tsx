'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { HERO_SLIDES } from '@/lib/data';
import { ButtonLink } from '@/components/ui/Button';
import HeroVideo from '@/components/sections/HeroVideo';
import { ChevronLeft, ChevronRight } from '@/components/ui/Icons';

/** Long, soft ease — the crossfade is the only motion the hero adds. */
const EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)]';

/**
 * Full-bleed hero carousel: the footage first, then the product stills.
 * Slides crossfade rather than slide, so the copy column never moves and the
 * headline keeps its position between slides.
 *
 * Advancing is automatic on the per-slide `hold`, and pauses while a pointer
 * or keyboard focus is inside the hero. Reduced-motion visitors get no
 * automatic advance at all — the arrows still work.
 *
 * The scrim is deliberately light: a soft shade on the copy side only, clear
 * on the right, so the imagery stays the focus. On mobile the shade rises
 * from the bottom, where the copy sits.
 */
export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const regionRef = useRef<HTMLElement>(null);

  const count = HERO_SLIDES.length;
  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(query.matches);
    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (reduced || paused || count < 2) return;
    const id = window.setTimeout(() => go(1), HERO_SLIDES[index].hold * 1000);
    return () => window.clearTimeout(id);
  }, [index, paused, reduced, count, go]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  };

  const slide = HERO_SLIDES[index];
  const heavy = slide.scrim === 'heavy';

  return (
    <section
      ref={regionRef}
      id="home"
      aria-roledescription="carousel"
      aria-label="Lumivex highlights"
      onKeyDown={onKeyDown}
      // Only keyboard focus holds the carousel. Hover would too, but the hero
      // fills the viewport — the pointer rests inside it on nearly every
      // visit, so a hover pause means it never advances at all.
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="relative h-[calc(100svh-var(--chrome-h))] min-h-[560px] overflow-hidden bg-green-deep desktop:max-h-[860px] desktop:min-h-[640px]"
    >
      {HERO_SLIDES.map((s, i) => (
        <div
          key={s.src}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-700 ${EASE} ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {s.kind === 'video' ? (
            <HeroVideo
              src={s.src}
              active={i === index}
              className="h-full w-full object-cover"
            />
          ) : (
            <Image
              src={s.src}
              alt=""
              fill
              priority={i === 1}
              sizes="100vw"
              // Full-bleed packaging artwork: carton print and the dust
              // particles both fall apart under default compression.
              quality={100}
              style={
                {
                  '--focus-mobile': s.positionMobile,
                  '--focus-desktop': s.position,
                } as React.CSSProperties
              }
              className="hero-still object-cover"
            />
          )}
        </div>
      ))}

      {/* Mobile: shade rises from the bottom where the copy sits. */}
      <div
        aria-hidden
        className={`absolute inset-0 transition-opacity duration-700 ${EASE} desktop:hidden ${
          heavy
            ? 'bg-[linear-gradient(0deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.52)_45%,rgba(0,0,0,0.12)_80%)]'
            : 'bg-[linear-gradient(0deg,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.28)_45%,rgba(0,0,0,0)_75%)]'
        }`}
      />
      {/* Desktop: shade on the copy side only, clear on the right. The stills
          are bright and busy under the headline, so they take more cover. */}
      <div
        aria-hidden
        className={`absolute inset-0 hidden transition-opacity duration-700 ${EASE} desktop:block ${
          heavy
            ? 'bg-[linear-gradient(90deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.58)_30%,rgba(0,0,0,0.20)_55%,rgba(0,0,0,0)_75%)]'
            : 'bg-[linear-gradient(90deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.22)_35%,rgba(0,0,0,0)_60%)]'
        }`}
      />

      <div className="container-header relative flex h-full items-end pb-3xl desktop:items-center desktop:pb-0">
        {/* Type and column measured off drinkag1.com: title 32 → 44 → 72px
            at 0.95 line height, normal tracking, weight 400, 16px below;
            subtitle 16/24 → 20/30; copy column 444px on desktop, 628px wide. */}
        <div
          className="max-w-full desktop:max-w-[444px] min-[1440px]:max-w-[628px]"
          aria-live="polite"
        >
          {/* Keyed so the copy re-enters with its slide rather than swapping
              mid-fade, which reads as a glitch when the lines differ in length. */}
          <div key={index} className={`animate-fade-up ${reduced ? 'animate-none' : ''}`}>
            <h1 className="pb-md font-serif text-[32px] font-normal leading-[0.95] tracking-normal text-white [text-shadow:0_1px_24px_rgba(0,0,0,0.18)] tablet:text-[44px] desktop:text-[72px]">
              {slide.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mb-md text-[16px] leading-[24px] text-white desktop:mb-lg desktop:text-[20px] desktop:leading-[30px]">
              {slide.body}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-smd">
            <ButtonLink href="/shop" variant="bright" size="lg" arrow>
              Shop now
            </ButtonLink>
            <ButtonLink href="/#why-us" variant="outline-light" size="lg">
              How we test
            </ButtonLink>
          </div>

          <p className="mt-lg font-mono text-xs uppercase tracking-label text-white/75">
            For research use only — not for human or veterinary use
          </p>
        </div>
      </div>

      {count > 1 && (
        <>
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => go(dir)}
              aria-label={dir === -1 ? 'Previous slide' : 'Next slide'}
              data-touch-target
              className={`absolute top-1/2 hidden size-[44px] -translate-y-1/2 items-center justify-center rounded-pill bg-white/85 text-green-deep transition-colors duration-200 ease-ag hover:bg-white tablet:flex ${
                dir === -1 ? 'left-md' : 'right-md'
              }`}
            >
              {dir === -1 ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          ))}

          <div className="absolute inset-x-0 bottom-lg flex justify-center gap-sm">
            {HERO_SLIDES.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Slide ${i + 1} of ${count}`}
                aria-current={i === index}
                data-touch-target
                className="group flex h-[20px] w-[32px] items-center justify-center"
              >
                <span
                  className={`block h-[3px] w-full rounded-pill transition-colors duration-200 ease-ag ${
                    i === index
                      ? 'bg-white'
                      : 'bg-white/40 group-hover:bg-white/70'
                  }`}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
