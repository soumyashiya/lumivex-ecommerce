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
  const anchor = PRODUCTS.find((p) => p.slug === 'retatrutide-20mg') ?? PRODUCTS[0];
  const perDelivery =
    anchor.priceValue * (1 - PROGRAMME.discountPercent / 100);
  const saving = anchor.priceValue - perDelivery;

  return (
    <section id="programme" className="bg-green-deep">
      <div className="desktop:grid desktop:grid-cols-2">
        {/* Product side */}
        <div className="relative aspect-[4/3] bg-stone desktop:aspect-auto">
          <Image
            src={anchor.gallery?.[0] ?? anchor.image}
            alt={anchor.name}
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover desktop:object-contain desktop:p-7xl"
          />
        </div>

        {/* Terms side */}
        <div className="px-lg py-2xl tablet:px-[56px] tablet:py-5xl desktop:px-7xl desktop:py-7xl">
          <h2 className="max-w-[16ch] text-h2 text-white">
            Put your supply on a standing order
          </h2>
          <p className="mt-lg max-w-[52ch] text-base text-white/75">
            Enrol any compound for {PROGRAMME.deliveries} monthly deliveries.
            Each one is allocated from a verified batch and arrives with its
            own certificate.
          </p>

          <dl className="mt-xl border-t border-white/20">
            <div className="flex items-baseline justify-between gap-md border-b border-white/20 py-smd">
              <dt className="text-base font-medium text-white">
                {anchor.name}
              </dt>
              <dd className="shrink-0 text-base text-white">
                <span className="text-white/50 line-through">
                  {anchor.price}
                </span>{' '}
                <span className="font-medium">
                  ${perDelivery.toFixed(2)}
                </span>
              </dd>
            </div>

            <p className="pt-md font-mono text-xs uppercase tracking-label text-white/60">
              Every standing order includes
            </p>

            {PROGRAMME.perks.map((perk) => (
              <div
                key={perk.title}
                className="flex items-start justify-between gap-md border-b border-white/20 py-smd"
              >
                <div>
                  <dt className="text-base font-medium text-white">
                    {perk.title}
                  </dt>
                  <dd className="mt-xxs max-w-[46ch] text-sm text-white/70">
                    {perk.text}
                  </dd>
                </div>
              </div>
            ))}

            <div className="flex items-baseline justify-between gap-md py-md">
              <dt className="text-base font-medium text-white">
                Saved per delivery
              </dt>
              <dd className="text-base font-medium text-white">
                ${saving.toFixed(2)}
              </dd>
            </div>
          </dl>

          <ButtonLink
            href={`/product/${anchor.slug}`}
            variant="light"
            size="lg"
            full
            arrow
            className="mt-lg"
          >
            Start a standing order
          </ButtonLink>

          <ul className="mt-md flex flex-wrap items-center gap-x-lg gap-y-sm">
            {[
              'Cold-chain shipping included',
              'Pause or cancel any time',
              'Certificate emailed on dispatch',
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-xs text-sm text-white/85"
              >
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
