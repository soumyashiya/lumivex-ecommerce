'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { type Product } from '@/lib/data';
import { useCart } from '@/components/providers/CartProvider';
import { Check, Plus } from './Icons';

type Props = {
  product: Product;
  /** Corner flag — 'Bestseller', 'New', 'Limited'. */
  badge?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Catalogue card. A soft tinted well holds a transparent product cut-out
 * (with the pen shot fading in on hover where one exists); beneath it sit
 * the name, research line and price — nothing else competes with the product.
 *
 * Purity comes from `product.janoshik`, the published third-party assay.
 */
export default function ProductCard({
  product,
  badge,
  sizes = '(max-width: 767px) 72vw, (max-width: 1023px) 40vw, 25vw',
  priority = false,
}: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const front = product.tile?.src ?? product.image;
  const hover = product.tile?.hover;
  const isCutout = Boolean(product.tile);
  const purity = product.janoshik?.purity;

  const quickAdd = () => {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <article className="group relative flex h-full flex-col rounded-card-round bg-cool-50 transition-colors duration-200 ease-ag hover:bg-cool-100">
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-card-round">
        {/* The whole card is clickable via the title link's ::after. */}
        <Image
          src={front}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          className={[
            'transition-opacity duration-200 ease-ag',
            isCutout ? 'object-contain px-md pb-sm pt-2xl tablet:px-lg' : 'object-cover',
            hover ? 'group-hover:opacity-0' : '',
          ].join(' ')}
        />
        {hover && (
          <Image
            src={hover}
            alt=""
            fill
            sizes={sizes}
            className="object-contain px-md pb-sm pt-2xl opacity-0 transition-opacity duration-200 ease-ag group-hover:opacity-100 tablet:px-lg"
          />
        )}

        {badge && (
          <span className="pointer-events-none absolute left-md top-md rounded-sm bg-cool-300 px-sm py-xxs text-xs uppercase text-white">
            {badge}
          </span>
        )}

        <button
          type="button"
          onClick={quickAdd}
          aria-label={`Add ${product.name} to cart`}
          data-touch-target
          className="absolute right-md top-md z-10 flex size-[36px] items-center justify-center rounded-pill bg-white text-black transition-colors duration-200 ease-ag hover:bg-black hover:text-white"
        >
          {added ? <Check size={16} /> : <Plus size={16} />}
        </button>
        <span aria-live="polite" className="sr-only">
          {added ? `${product.name} added to cart` : ''}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-mdl pb-mdl pt-sm tablet:px-lg tablet:pb-lg">
        <h3 className="text-lg text-black">
          <Link
            href={`/product/${product.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-xxs text-sm text-cool-600">{product.category}</p>

        <div className="mt-auto flex items-baseline justify-between gap-sm pt-smd">
          <span className="text-sm text-black">{product.price}</span>
          {purity && (
            <span className="text-xs text-cool-400">
              {purity} assayed
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
