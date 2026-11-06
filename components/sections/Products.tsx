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
  const feature = getProduct(BESTSELLERS.feature.slug);

  return (
    <section id="products" className="section-y bg-white">
      <div className="container-ag">
        <Rail
          label="Best-selling compounds"
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

        {feature && <FeaturePanel product={feature} />}
      </div>
    </section>
  );
}

function FeaturePanel({
  product,
}: {
  product: NonNullable<ReturnType<typeof getProduct>>;
}) {
  const { badge, eyebrow, body } = BESTSELLERS.feature;
  const report = product.janoshik;
  const stats = [
    { label: 'Purity', value: report?.purity },
    { label: 'Fill volume', value: report?.fillVolume },
    { label: 'Batch', value: report?.batchNumber },
  ].filter((s) => s.value);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group relative mt-md grid overflow-hidden rounded-card-round bg-cool-800 text-white tablet:mt-xl desktop:grid-cols-[1.1fr_1fr]"
    >
      {/* Desaturated, softened bench photograph: the glassware reads as a
          cool grey field behind the kit rather than as a scene. */}
      <Image
        src="/images/inhouse-image1-seo.webp"
        alt=""
        fill
        sizes="100vw"
        className="scale-110 object-cover object-[center_45%] opacity-70 blur-[3px] grayscale"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cool-800/85 via-cool-800/45 to-cool-800/10"
      />

      <div className="relative z-10 flex flex-col justify-between gap-lg p-lg pt-0 tablet:gap-2xl tablet:p-2xl tablet:pt-0 desktop:p-2xl">
        <span className="self-start rounded-sm bg-cool-600/80 px-sm py-xxs text-xs uppercase">
          {badge}
        </span>

        <div>
          <p className="text-xs uppercase text-white">{eyebrow}</p>
          <p className="mt-smd max-w-[34ch] text-lg text-white">
            {product.name} — {body}
          </p>

          {stats.length > 0 && (
            <dl className="mt-lg flex flex-wrap gap-x-xl gap-y-sm">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-xs uppercase text-white/65">{s.label}</dt>
                  <dd className="mt-xxs text-base">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <span className="mt-lg inline-flex items-center gap-smd text-xs uppercase text-white">
            Shop {product.name}
            <span
              aria-hidden
              className="size-[10px] rounded-pill bg-white transition-colors duration-200 ease-ag group-hover:bg-cool-300"
            />
          </span>
        </div>
      </div>

      <div className="relative order-first min-h-[200px] tablet:min-h-[320px] desktop:order-none">
        {product.tile && (
          <Image
            src={product.tile.src}
            alt=""
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-contain p-xl desktop:p-3xl"
          />
        )}
      </div>
    </Link>
  );
}
