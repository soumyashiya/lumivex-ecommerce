'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PRODUCT_LINES } from '@/lib/data';
import Rail from '@/components/ui/Rail';
import { ButtonLink } from '@/components/ui/Button';
import { ArrowRight } from '@/components/ui/Icons';

/**
 * Catalogue lines: heading, intro and outlined CTA, then a rail of tall photo
 * cards with a frosted glass foot. Each card links to the shop filtered to
 * that line.
 */
export default function ShopByLine() {
  return (
    <section className="section-y bg-off-white">
      <div className="container-ag">
        <h2 className="max-w-[18ch] text-h2 text-black">
          Every line on the bench
        </h2>

        <div className="mt-lg flex flex-col gap-md tablet:flex-row tablet:items-start tablet:justify-between tablet:gap-xl">
          <p className="max-w-[62ch] text-base text-grey-700 tablet:text-md">
            Browse the catalogue by research line — every compound in a line
            ships sealed, cold and with the assay report for its own batch.
          </p>
          <ButtonLink href="/shop" variant="outline" size="lg" className="shrink-0">
            View all lines
          </ButtonLink>
        </div>

        {/* Reference rail card metrics: 288px wide on mobile, 400×560 from
            desktop, 8px radius. */}
        <Rail
          label="Catalogue lines"
          className="mt-lg tablet:mt-xl"
          itemClassName="w-[288px] tablet:w-[344px] desktop:w-[400px]"
        >
          {PRODUCT_LINES.map((line) => (
            <Link
              key={line.slug}
              href={`/shop?category=${line.slug}`}
              className="group relative flex h-[403px] flex-col overflow-hidden rounded-card bg-stone shadow-[0_18px_40px_-22px_rgba(15,46,47,0.45)] desktop:h-[560px]"
            >
              {/* The line photos are 2:3 with the kit and pen in the lower
                  half. Laid edge to edge under the frosted foot, the pen was
                  hidden behind it — so the photo now fills only the space
                  above the foot, framed on the kit, and a heavily blurred
                  copy sits behind the foot to keep its glass tint. */}
              <Image
                src={line.image}
                alt=""
                aria-hidden
                fill
                sizes="96px"
                className="scale-125 object-cover object-bottom blur-2xl"
              />
              <div className="relative min-h-0 flex-1 overflow-hidden">
                <Image
                  src={line.image}
                  alt=""
                  fill
                  sizes="(max-width: 767px) 288px, (max-width: 1023px) 344px, 400px"
                  className="object-cover object-[center_40%] transition-transform duration-700 ease-ag group-hover:scale-[1.04]"
                />
              </div>
              <div className="relative border-t border-white/10 bg-[rgba(20,32,38,0.42)] px-md pb-md pt-md backdrop-blur-xl backdrop-saturate-150 desktop:px-lg desktop:pb-lg desktop:pt-lg">
                <h3 className="text-[1.75rem] leading-[1.1] tracking-[-0.02em] text-white desktop:text-[2.25rem]">
                  {line.label}
                </h3>
                <p className="mt-sm flex items-center justify-between gap-sm text-sm leading-relaxed text-white/90 desktop:text-base">
                  <span>
                    {line.count} {line.count === 1 ? 'compound' : 'compounds'}
                  </span>
                  <span className="inline-flex items-center gap-xs transition-transform duration-300 ease-ag group-hover:translate-x-1">
                    Shop the line
                    <ArrowRight size={16} />
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </Rail>
      </div>
    </section>
  );
}
