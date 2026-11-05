'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart, formatPrice } from '@/components/providers/CartProvider';
import { CHECKOUT_ACKNOWLEDGEMENT } from '@/lib/data';

export default function CartView() {
  const { items, subtotal, count, updateQty, removeItem, clear } = useCart();

  if (count === 0) {
    return (
      <div className="container-ag flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <svg
          viewBox="0 0 24 24"
          className="h-14 w-14 text-black/20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M5 8h14l-1 12H6L5 8Z" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        </svg>
        <h1 className="mt-8 text-h2 tracking-tighter text-black">
          Your cart is empty
        </h1>
        <p className="mt-4 max-w-sm text-base text-grey-500">
          Explore our catalogue of high-purity research compounds, each supplied
          with full documentation.
        </p>
        <Link
          href="/#products"
          className="mt-9 rounded-pill bg-green px-8 py-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-green-hover"
        >
          Browse the catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="container-ag section-y">
      <div className="mb-lg flex items-end justify-between gap-md tablet:mb-xl">
        <h1 className="text-h2 text-black">Your cart</h1>
        <button
          onClick={clear}
          className="shrink-0 font-mono text-xs uppercase tracking-label text-grey-500 transition-colors duration-200 ease-ag hover:text-green"
        >
          Clear cart
        </button>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Items */}
        <div className="lg:col-span-7">
          <div className="border-t border-[color:var(--border-soft)]">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-5 border-b border-[color:var(--border-soft)] py-6"
                >
                  <Link
                    href={`/product/${item.slug}`}
                    className="relative h-28 w-28 shrink-0 overflow-hidden rounded-card bg-stone"
                  >
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="112px"
                      className="object-contain p-sm"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-grey-500">
                          {item.category}
                        </span>
                        <h3 className="mt-1 text-lg text-black">
                          <Link
                            href={`/product/${item.slug}`}
                            className="transition-colors hover:text-green"
                          >
                            {item.name}
                          </Link>
                        </h3>
                      </div>
                      <span className="text-lg text-black">
                        {formatPrice(item.price * item.qty)}
                      </span>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-4">
                      <div className="flex items-center rounded-pill border border-[color:var(--border-soft)]">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="flex h-9 w-9 items-center justify-center text-lg text-grey-700 transition-colors hover:text-black"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm text-black">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="flex h-9 w-9 items-center justify-center text-lg text-grey-700 transition-colors hover:text-black"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="underline-offset-4 hover:underline text-[12px] font-medium text-grey-500 hover:text-black"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <Link
            href="/#products"
            className="underline-offset-4 hover:underline mt-8 inline-block text-[13px] font-medium text-grey-700 hover:text-black"
          >
            ← Continue shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="lg:col-span-5">
          <div className="rounded-smd bg-off-white p-8 lg:sticky lg:top-24 md:p-10">
            <h2 className="text-[11px] uppercase tracking-label text-grey-500">
              Order Summary
            </h2>

            <div className="mt-7 space-y-4">
              <Row label={`Subtotal (${count} item${count === 1 ? '' : 's'})`}>
                {formatPrice(subtotal)}
              </Row>
              <div className="border-t border-[color:var(--border-soft)] pt-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-base font-medium text-black">
                    Total
                  </span>
                  <span className="text-2xl text-black">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="mt-1 text-right text-[11px] uppercase tracking-wider text-grey-500">
                  USD · tax included
                </p>
              </div>
            </div>

            <p className="mt-6 rounded-sm border-l-2 border-green bg-white px-4 py-3 text-[11.5px] leading-relaxed text-grey-700">
              {CHECKOUT_ACKNOWLEDGEMENT}
            </p>

            <Link
              href="/checkout"
              className="mt-6 block w-full rounded-pill bg-green py-4 text-center text-sm font-medium text-white transition-colors duration-200 hover:bg-green-hover"
            >
              Proceed to checkout
            </Link>

            <p className="mt-5 flex items-center justify-center gap-2 text-[12px] text-grey-500">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 text-green"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <rect x="5" y="11" width="14" height="9" rx="1.5" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" />
              </svg>
              Secure, encrypted checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-sm text-grey-500">{label}</span>
      <span className="text-sm font-medium text-black">{children}</span>
    </div>
  );
}
