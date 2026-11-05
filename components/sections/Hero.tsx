import { ButtonLink } from '@/components/ui/Button';
import HeroVideo from '@/components/sections/HeroVideo';

/**
 * Full-bleed video hero: footage fills the frame below the header, with the
 * copy anchored left. The scrim is kept deliberately light — a soft left-hand
 * shade behind the copy and a gentle floor — so the footage itself stays the
 * focus. On mobile a bottom-weighted shade carries the copy instead.
 */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-[calc(100svh-var(--chrome-h))] min-h-[560px] overflow-hidden bg-green-deep desktop:max-h-[860px] desktop:min-h-[640px]"
    >
      <HeroVideo className="absolute inset-0 h-full w-full object-cover" />

      {/* Mobile: shade rises from the bottom where the copy sits. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.28)_45%,rgba(0,0,0,0)_75%)] desktop:hidden"
      />
      {/* Desktop: soft shade on the copy side only, clear on the right. */}
      <div
        aria-hidden
        className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.22)_35%,rgba(0,0,0,0)_60%)] desktop:block"
      />

      <div className="container-header relative flex h-full items-end pb-3xl desktop:items-center desktop:pb-0">
        {/* Type and column measured off drinkag1.com: title 32 → 44 → 72px
            at 0.95 line height, normal tracking, weight 400, 16px below;
            subtitle 16/24 → 20/30; copy column 444px on desktop, 628px wide. */}
        <div className="max-w-full desktop:max-w-[444px] min-[1440px]:max-w-[628px]">
          <h1 className="pb-md font-serif text-[32px] font-normal leading-[0.95] tracking-normal text-white [text-shadow:0_1px_24px_rgba(0,0,0,0.18)] tablet:text-[44px] desktop:text-[72px]">
            <span className="block">Every batch tested.</span>
            <span className="block">Every result published.</span>
          </h1>
          <p className="mb-md text-[16px] leading-[24px] text-white desktop:mb-lg desktop:text-[20px] desktop:leading-[30px]">
            Research-grade peptides for UK and EU laboratories, independently
            assayed and shipped cold with the certificate for your batch.
          </p>

          <div className="flex flex-wrap items-center gap-smd">
            <ButtonLink
              href="/shop"
              variant="bright"
              size="lg"
              arrow
            >
              Shop now
            </ButtonLink>
            <ButtonLink href="/#standards" variant="outline-light" size="lg">
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
