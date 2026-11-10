import Image from 'next/image';
import { PRODUCTS, PROGRAMME } from '@/lib/data';
import { ButtonLink } from '@/components/ui/Button';
import { Check } from '@/components/ui/Icons';

/**
 * The offer block: a stone panel holding the product shot beside a deep
 * green panel carrying the itemised terms. This is the reference system's
 * signature layout — two full-bleed halves with no gutter between them, the
 * line items separated by hairlines, and a single full-width light button.
 *
 * Figures here are presentational. Order totals always come from the
 * checkout API.
 */
export default function Programme() {
  const { heading, body, scope, cta, href, ticks, deliveries, discountPercent } = PROGRAMME;

  return (
    <section id="programme" className="bg-green-deep">
      <div className="desktop:grid desktop:grid-cols-2">
        {/* Product side — the studio photograph (NAD+, Glow and Retatrutide
            kits with their pens on a cream sweep), full bleed to the panel's
            edges like the reference offer block. The background colour is the
            photograph's own backdrop, so the panel never flashes a colour the
            image doesn't carry. */}
        <div
          data-reveal
          className="relative aspect-square overflow-hidden bg-[#eae5dc] desktop:aspect-auto"
        >
          {/* Phones/tablets: a square version. Desktop: the half is taller
              than it is wide (713×1080, so 2:3), hence a tall version — the
              same photo with its flat cream backdrop grown above and below,
              so nothing is cropped and the products sit with room around them. */}
          <Image
            src="/images/subscribe-new-square.webp"
            alt="NAD+, Glow GHK-Cu and Retatrutide research kits with their pre-filled pens"
            fill
            sizes="100vw"
            className="object-cover desktop:hidden"
          />
          <Image
            src="/images/subscribe-new-tall.webp"
            alt="NAD+, Glow GHK-Cu and Retatrutide research kits with their pre-filled pens"
            fill
            sizes="50vw"
            className="hidden object-cover desktop:block"
          />
        </div>

        {/* Terms side */}
        <div
          data-reveal
          className="px-lg py-2xl [--reveal-delay:120ms] tablet:px-[56px] tablet:py-5xl desktop:px-7xl desktop:py-7xl"
        >
          <h2 className="max-w-[16ch] text-h2 text-white">{heading}</h2>
          <p className="mt-lg max-w-[52ch] text-base text-white/75">{body}</p>

          <dl className="mt-xl border-t border-white/20">
            {/* Scope first: the offer covers the catalogue, not one product. */}
            <div className="flex items-center justify-between gap-md border-b border-white/20 py-md">
              <div>
                <dt className="text-base font-medium text-white">{scope.title}</dt>
                <dd className="mt-xxs text-sm text-white/70">
                  {PRODUCTS.length} research lines eligible · {scope.text.toLowerCase()}
                </dd>
              </div>
              <dd className="shrink-0 text-xl text-white">{discountPercent}% off</dd>
            </div>

            <p className="pt-md font-mono text-xs uppercase tracking-label text-white/60">
              Every standing order includes
            </p>

            {PROGRAMME.perks.map((perk) => (
              <div key={perk.title} className="border-b border-white/20 py-smd">
                <dt className="text-base font-medium text-white">{perk.title}</dt>
                <dd className="mt-xxs max-w-[46ch] text-sm text-white/70">{perk.text}</dd>
              </div>
            ))}

            <div className="flex items-baseline justify-between gap-md py-md">
              <dt className="text-base font-medium text-white">Deliveries</dt>
              <dd className="text-base font-medium text-white">{deliveries} monthly</dd>
            </div>
          </dl>

          <ButtonLink href={href} variant="light" size="lg" full arrow className="mt-lg">
            {cta}
          </ButtonLink>

          <ul className="mt-md flex flex-wrap items-center gap-x-lg gap-y-sm">
            {ticks.map((item) => (
              <li key={item} className="flex items-center gap-xs text-sm text-white/85">
                <Check size={16} className="shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
