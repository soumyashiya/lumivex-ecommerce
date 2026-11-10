'use client';

import { useState, type KeyboardEvent } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from '@/components/ui/Icons';

/**
 * Supplementary shots used when a product doesn't define its own gallery.
 * Swap these for real product angles/packaging photos when available.
 */
const CONTEXT_SHOTS = [
  '/images/inhouse-image1-seo.webp',
  '/images/inhouse-image2-seo.webp',
  '/images/whyus11-seo.webp',
];

/**
 * The product shots are full-bleed studio photographs on a dark emerald sweep
 * — they carry their own lighting and floor reflection, so they fill the frame
 * edge to edge rather than floating on a stage. The colour below only shows
 * while an image loads, and is matched to the darkest corner of those shots so
 * there is no flash of pale ground.
 */
const STAGE = 'bg-green-deep';

export default function ProductGallery({
  image,
  alt,
  gallery,
  badge,
}: {
  image: string;
  alt: string;
  gallery?: string[];
  /** Short documented fact shown on the stage, e.g. the assayed batch. */
  badge?: string;
}) {
  const images =
    gallery && gallery.length > 0 ? gallery : [image, ...CONTEXT_SHOTS];
  const [active, setActive] = useState(0);
  const count = images.length;
  const go = (i: number) => setActive((i + count) % count);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') go(active - 1);
    if (e.key === 'ArrowRight') go(active + 1);
  };

  return (
    <div>
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={`${alt} images`}
        tabIndex={0}
        onKeyDown={onKey}
        className={`group relative aspect-[4/3] overflow-hidden rounded-card border border-[color:var(--border-hair)] ${STAGE}`}
      >
        <Image
          key={images[active]}
          src={images[active]}
          alt={`${alt} — image ${active + 1} of ${count}`}
          fill
          sizes="(max-width: 1023px) 100vw, 50vw"
          priority={active === 0}
          quality={90}
          className="animate-[fade-up_0.3s_cubic-bezier(0,0,0.2,1)] object-cover"
        />

        {badge && (
          <span className="absolute left-sm top-sm rounded-pill border border-[color:var(--border-soft)] bg-white/85 px-smd py-xs font-mono text-xxs uppercase tracking-label text-green backdrop-blur-sm tablet:left-md tablet:top-md">
            {badge}
          </span>
        )}

        {count > 1 && (
          <>
            {/* Sits on the photograph now, not a pale stage — hence white. */}
            <span className="absolute bottom-sm left-sm font-mono text-xxs uppercase tracking-label text-white/80 tablet:bottom-md tablet:left-md">
              {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </span>
            <div className="absolute bottom-sm right-sm flex gap-xs tablet:bottom-md tablet:right-md">
              <button
                type="button"
                onClick={() => go(active - 1)}
                aria-label="Previous image"
                data-touch-target
                className="flex size-[40px] items-center justify-center rounded-pill border border-[color:var(--border-soft)] bg-white text-green transition-colors duration-200 ease-ag hover:bg-green hover:text-white"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => go(active + 1)}
                aria-label="Next image"
                data-touch-target
                className="flex size-[40px] items-center justify-center rounded-pill border border-[color:var(--border-soft)] bg-white text-green transition-colors duration-200 ease-ag hover:bg-green hover:text-white"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </>
        )}
      </div>

      {count > 1 && (
        <ul className="mt-smd grid grid-cols-4 gap-sm tablet:flex tablet:flex-wrap">
          {images.map((src, i) => (
            <li key={src + i}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1} of ${count}`}
                aria-current={active === i}
                className={`relative block aspect-[4/3] w-full overflow-hidden rounded-smd border transition-colors duration-200 ease-ag tablet:w-[104px] ${STAGE} ${
                  active === i
                    ? 'border-green'
                    : 'border-[color:var(--border-hair)] hover:border-grey-500'
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="104px"
                  className={`object-cover transition-opacity duration-200 ease-ag ${
                    active === i ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
