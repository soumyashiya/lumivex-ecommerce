'use client';

import { HERO_SLIDES } from '@/lib/data';
import { ButtonLink } from '@/components/ui/Button';
import HeroVideo from '@/components/sections/HeroVideo';

/**
 * Video hero. Desktop: full-bleed, screen height under the header, with the
 * copy over the clip's left side on a soft shade. Phones and tablets: the
 * clip runs full width at its own 16:9 — the whole frame, product included,
 * nothing cropped — with the copy underneath on green.
 *
 * The headline and body come from the first (video) entry in HERO_SLIDES;
 * the still slides are kept in data but no longer shown.
 */
export default function Hero() {
  const slide = HERO_SLIDES.find((s) => s.kind === 'video') ?? HERO_SLIDES[0];

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-green-deep desktop:h-[calc(100svh-var(--chrome-h))] desktop:max-h-[860px] desktop:min-h-[640px]"
    >
      <div className="relative aspect-video w-full desktop:absolute desktop:inset-0 desktop:aspect-auto">
        <HeroVideo
          src={slide.src}
          active
          tintUntil={1.958}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Desktop: shade on the copy side only, clear on the right. */}
      <div
        aria-hidden
        className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.22)_35%,rgba(0,0,0,0)_60%)] desktop:block"
      />

      <div className="container-header relative flex py-xl tablet:py-2xl desktop:h-full desktop:items-center desktop:py-0">
        {/* Type and column measured off drinkag1.com: title 32 → 44 → 72px
            at 0.95 line height, normal tracking, weight 400, 16px below;
            subtitle 16/24 → 20/30; copy column 444px on desktop, 628px wide. */}
        <div className="max-w-full desktop:max-w-[444px] min-[1440px]:max-w-[628px]">
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

          <div className="flex flex-wrap items-center gap-smd">
            <ButtonLink href="/shop" variant="bright" size="lg" arrow>
              Shop all compounds
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
    </section>
  );
}
