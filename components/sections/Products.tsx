'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BESTSELLERS, PRODUCTS, getProduct } from '@/lib/data';
import Rail from '@/components/ui/Rail';
import ProductCard from '@/components/ui/ProductCard';
import { ButtonLink } from '@/components/ui/Button';
import { ArrowRight } from '@/components/ui/Icons';
import Spotlight from './Spotlight';
import Story from './Story';

export default function Products() {
  return (
    <section id="products" className="section-y bg-white">
      <div className="container-ag">
        <Rail
          label="Best-selling compounds"
          reveal
          controls="header"
          itemClassName="w-[272px] tablet:w-[320px] desktop:w-[calc((100vw-208px)/4.2)] min-[1680px]:w-[calc((100vw-336px)/4.2)]"
          header={
            <div>
              <p className="label-mono">{BESTSELLERS.eyebrow}</p>
              <h2 className="mt-smd max-w-[16ch] text-h2 text-black">
                {BESTSELLERS.heading}
              </h2>
              <Link
                href="/shop"
                className="mt-md hidden items-center gap-sm text-base text-black underline decoration-cool-300 underline-offset-4 transition-colors duration-200 ease-ag hover:decoration-black tablet:inline-flex"
              >
                {BESTSELLERS.cta}
                <ArrowRight size={16} />
              </Link>
            </div>
          }
        >
          {PRODUCTS.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              badge={BESTSELLERS.badges[product.slug]}
              priority={i < 2}
            />
          ))}
        </Rail>

        <div className="mt-xl flex justify-center tablet:hidden">
          <ButtonLink href="/shop" variant="outline">
            {BESTSELLERS.cta}
          </ButtonLink>
        </div>

        <Spotlight className="pt-8xl tablet:pt-9xl" />

        <Story className="pt-8xl tablet:pt-9xl" />

        <FeaturePanel />
      </div>
    </section>
  );
}

function FeaturePanel() {
  const { slugs, badge, eyebrow, title, body, cta, href } = BESTSELLERS.feature;
  // Figures come only from each product's published report; a kit without
  // one is left out rather than shown with hand-written numbers.
  const kits = slugs
    .map((slug) => getProduct(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p?.janoshik));
  if (!kits.length) return null;

  return (
    <Link
      href={href}
      data-reveal
      className="group relative mt-md grid overflow-hidden rounded-card-round bg-[#2a2c2f] text-white tablet:mt-xl desktop:grid-cols-[1.1fr_1fr]"
    >
      {/* Third-party shot (Retatrutide and Tirzepatide kits with their pens
          on a grey bench). It fills the right of the panel and fades into the
          dark ground on the left, where the copy sits; on small screens it
          sits on top and fades down instead. The kits are in the photograph,
          so no separate cut-out is layered over it. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[240px] [mask-image:linear-gradient(to_bottom,black_55%,transparent)] tablet:h-[340px] desktop:inset-y-0 desktop:left-auto desktop:right-0 desktop:h-auto desktop:w-[64%] desktop:[mask-image:linear-gradient(to_right,transparent,black_36%)]">
        <Image
          src="/images/thirdparty.png"
          alt=""
          fill
          sizes="(max-width: 1023px) 100vw, 70vw"
          className="object-cover object-center desktop:object-[60%_center]"
        />
      </div>

      <div className="relative z-10 flex flex-col justify-between gap-lg p-lg pt-0 tablet:gap-2xl tablet:p-2xl tablet:pt-0 desktop:p-2xl">
        <span className="self-start rounded-sm bg-cool-600/80 px-sm py-xxs text-xs uppercase">
          {badge}
        </span>

        <div>
          <p className="text-xs uppercase text-white/70">{eyebrow}</p>
          <h3 className="mt-smd max-w-[18ch] text-2xl text-white desktop:text-3xl">{title}</h3>
          <p className="mt-smd max-w-[40ch] text-base text-white/80">{body}</p>

          {/* One row per kit: name, then purity, fill and batch from the report, then price. */}
          <table className="mt-lg w-full max-w-[440px] whitespace-nowrap text-left text-sm">
            <thead>
              <tr className="text-xs uppercase text-white/60">
                <th scope="col" className="pb-xs font-normal">Kit</th>
                <th scope="col" className="pb-xs font-normal">Purity</th>
                <th scope="col" className="pb-xs font-normal">Fill</th>
                <th scope="col" className="pb-xs pr-sm font-normal">Batch</th>
                <th scope="col" className="pb-xs text-right font-normal">Price</th>
              </tr>
            </thead>
            <tbody>
              {kits.map((k) => (
                <tr key={k.slug} className="border-t border-white/15">
                  <th scope="row" className="whitespace-normal py-sm pr-sm font-normal">{k.name}</th>
                  <td className="py-sm pr-sm">{k.janoshik?.purity ?? '—'}</td>
                  <td className="py-sm pr-sm">{k.janoshik?.fillVolume ?? '—'}</td>
                  <td className="py-sm pr-sm">{k.janoshik?.batchNumber ?? '—'}</td>
                  <td className="py-sm text-right">{k.priceValue > 0 ? k.price : 'On enquiry'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <span className="mt-lg inline-flex items-center gap-smd text-xs uppercase text-white">
            {cta}
            <span
              aria-hidden
              className="size-[10px] rounded-pill bg-white transition-colors duration-200 ease-ag group-hover:bg-cool-300"
            />
          </span>
        </div>
      </div>

      {/* Spacer: holds the photograph's side of the grid open. */}
      <div aria-hidden className="order-first min-h-[220px] tablet:min-h-[320px] desktop:order-none desktop:min-h-[460px]" />
    </Link>
  );
}
