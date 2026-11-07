import Image from 'next/image';
import type { ReactNode } from 'react';
import { SPOTLIGHT, getProduct } from '@/lib/data';
import { ButtonLink } from '@/components/ui/Button';

type IconKey = (typeof SPOTLIGHT.points)[number]['icon'];

/** Small line icons, drawn on the same 1.5 stroke as `ui/Icons`. */
const ICONS: Record<IconKey, ReactNode> = {
  assay: (
    <>
      <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3" />
      <path d="M7.5 14h9" />
    </>
  ),
  fill: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M7 12h10M10 7h4" />
    </>
  ),
  cold: (
    <>
      <path d="M12 2v20M4 7l16 10M20 7 4 17" />
      <path d="m9 4 3 2 3-2M9 20l3-2 3 2" />
    </>
  ),
  batch: (
    <>
      <path d="M4 7V5a1 1 0 0 1 1-1h2M17 4h2a1 1 0 0 1 1 1v2M20 17v2a1 1 0 0 1-1 1h-2M7 20H5a1 1 0 0 1-1-1v-2" />
      <path d="M8 8v8M11 8v8M14 8v8M17 8v8" />
    </>
  ),
};

/**
 * Single-kit spotlight: the product sits at the centre of a soft stage with
 * four documented facts arranged around it. On mobile the facts stack under
 * the image. Figures are interpolated from the product's third-party report.
 *
 * Rendered inside the "Most ordered" section (between the card rail and the
 * feature banner), so it carries no section wrapper or container of its own.
 */
export default function Spotlight({ className = '' }: { className?: string }) {
  const product = getProduct(SPOTLIGHT.slug);
  if (!product) return null;

  const report = product.janoshik;
  const fill = (text: string) =>
    text
      .replace('{purity}', report?.purity ?? '—')
      .replace('{batch}', report?.batchNumber ?? '—')
      .replace('{fill}', report?.fillVolume ?? '—');

  const [a, b, c, d] = SPOTLIGHT.points;

  return (
    <div id="spotlight" className={className}>
      <div>
        <header className="mx-auto flex max-w-[760px] flex-col items-center text-center">
          <span className="rounded-sm bg-cool-100 px-sm py-xxs text-xs uppercase text-black">
            {SPOTLIGHT.eyebrow}
          </span>
          <h2 className="mt-md text-h2 text-black">{SPOTLIGHT.heading}</h2>
          <p className="mt-md max-w-[48ch] text-base text-cool-600">{SPOTLIGHT.intro}</p>
          {/* Shoppable: price and a direct route to the product page. */}
          <div className="mt-lg flex flex-wrap items-center justify-center gap-md">
            {product.priceValue > 0 && (
              <span className="text-lg text-black">{product.price}</span>
            )}
            <ButtonLink href={`/product/${product.slug}`} size="lg" arrow>
              Shop {product.name}
            </ButtonLink>
          </div>
        </header>

        <div className="relative mx-auto mt-xl max-w-[1200px] desktop:mt-lg">
          <Stage src={SPOTLIGHT.image} />

          {/* No negative pull below desktop: the cut-out fills its box to the
              bottom edge, so overlapping it would clip the kit itself. */}
          <div className="relative z-10 mt-md grid gap-md tablet:grid-cols-2 desktop:mt-0 desktop:min-h-[680px] desktop:grid-cols-[300px_1fr_300px] desktop:gap-0">
            <div className="contents desktop:flex desktop:flex-col desktop:justify-between desktop:pb-3xl desktop:pt-2xl">
              <Point icon={a.icon} title={a.title} body={fill(a.body)} />
              <Point
                icon={c.icon}
                title={c.title}
                body={fill(c.body)}
                className="desktop:ml-4xl"
              />
            </div>
            <div aria-hidden className="hidden desktop:block" />
            <div className="contents desktop:flex desktop:flex-col desktop:justify-between desktop:pb-xl desktop:pt-6xl">
              <Point icon={b.icon} title={b.title} body={fill(b.body)} />
              <Point
                icon={d.icon}
                title={d.title}
                body={fill(d.body)}
                className="desktop:-ml-3xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * The kit photographed on its moss bed, as a single transparent cut-out.
 *
 * The artwork carries its own ground and its own contact shadows, so the rings
 * and floor shadow the composed stage used are gone — stacked under a scene
 * that already has a base they read as a second stage beneath the first. The
 * radial wash stays: it lifts the cut-out off the white and gives the facts
 * something to blur against.
 */
function Stage({ src }: { src: string }) {
  return (
    <div
      aria-hidden
      className="stage-3d relative mx-auto aspect-[1600/901] w-full max-w-[620px] desktop:absolute desktop:left-1/2 desktop:top-1/2 desktop:w-[880px] desktop:max-w-none desktop:-translate-x-1/2 desktop:-translate-y-1/2"
    >
      {/* The wash stays put while the kit moves over it — the object reading
          as loose from its own glow is most of the depth cue. */}
      <div className="absolute inset-[-12%] rounded-full bg-[radial-gradient(closest-side,#e8e9ea_0%,#eff0f1_55%,rgba(244,244,244,0)_100%)]" />
      <div className="float-3d absolute inset-0">
        <Image
          src={src}
          alt=""
          fill
          sizes="(max-width: 1023px) 90vw, 880px"
          className="object-contain"
        />
      </div>
    </div>
  );
}

function Point({
  icon,
  title,
  body,
  className = '',
}: {
  icon: IconKey;
  title: string;
  body: string;
  className?: string;
}) {
  return (
    <article
      className={`rounded-card-round border border-white/70 bg-cool-50/75 p-md backdrop-blur-xl tablet:p-mdl ${className}`}
    >
      <span className="flex size-[36px] items-center justify-center rounded-smd bg-cool-100 text-cool-600">
        <svg
          width={18}
          height={18}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {ICONS[icon]}
        </svg>
      </span>
      <h3 className="mt-md text-lg leading-tight text-black desktop:mt-lg">
        {title}
      </h3>
      <p className="mt-sm text-sm text-cool-600">{body}</p>
    </article>
  );
}
