'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useCart } from '@/components/providers/CartProvider';
import { Cart } from '@/components/ui/Icons';

/**
 * Cart icon with a live item-count badge. Clicking it navigates to /cart —
 * the badge briefly pops when an item is added so the action is acknowledged.
 */
export default function CartButton({ dark = false }: { dark?: boolean }) {
  const { count, lastAdded } = useCart();
  const [pop, setPop] = useState(false);
  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    setPop(true);
    const t = setTimeout(() => setPop(false), 450);
    return () => clearTimeout(t);
  }, [lastAdded]);

  return (
    <Link
      href="/cart"
      data-touch-target
      aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`}
      className={`relative inline-flex h-10 w-10 items-center justify-center rounded-pill transition-colors duration-200 ease-ag ${
        dark ? 'text-white hover:text-white/70' : 'text-black hover:text-green'
      }`}
    >
      <Cart size={22} />
      {count > 0 && (
        <span
          className={`absolute right-0 top-0 flex h-[18px] min-w-[18px] items-center justify-center rounded-pill bg-green px-xs text-xxs font-medium leading-none text-white transition-transform duration-200 ease-ag ${
            pop ? 'scale-125' : 'scale-100'
          }`}
        >
          {count}
        </span>
      )}
    </Link>
  );
}
