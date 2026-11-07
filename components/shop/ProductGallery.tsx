'use client';

import { useState } from 'react';
import Image from 'next/image';

/**
 * Supplementary shots used when a product doesn't define its own gallery.
 * Swap these for real product angles/packaging photos when available.
 */
const CONTEXT_SHOTS = [
  '/images/inhouse-image1-seo.webp',
  '/images/inhouse-image2-seo.webp',
  '/images/whyus11-seo.webp',
];

export default function ProductGallery({
  image,
  alt,
  gallery,
}: {
  image: string;
  alt: string;
  gallery?: string[];
}) {
  const images =
    gallery && gallery.length > 0 ? gallery : [image, ...CONTEXT_SHOTS];
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* Product sits contained on a white field, as on the reference
          product pages — never cropped to fill. */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-white">
        <Image
          key={images[active]}
          src={images[active]}
          alt={alt}
          fill
          sizes="(max-width: 1023px) 100vw, 50vw"
          priority
          quality={90}
          className="animate-[fade-up_0.3s_cubic-bezier(0,0,0.2,1)] object-contain"
        />
      </div>

      <ul className="mt-smd flex flex-wrap gap-sm">
        {images.map((src, i) => (
          <li key={src + i}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1} of ${images.length}`}
              aria-current={active === i}
              className={`relative aspect-square w-[72px] shrink-0 overflow-hidden rounded-smd bg-white transition-colors duration-200 ease-ag ${
                active === i
                  ? 'ring-2 ring-green'
                  : 'ring-1 ring-[color:var(--border-soft)] hover:ring-grey-100'
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="72px"
                className="object-cover"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
