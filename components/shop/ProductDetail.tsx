'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  PROGRAMME,
  RESEARCH_DISCLAIMER,
  type Product,
} from '@/lib/data';
import { useCart } from '@/components/providers/CartProvider';
import ProductGallery from '@/components/shop/ProductGallery';
import CertificateModal from '@/components/shop/CertificateModal';
import LabAnalysisModal from '@/components/shop/LabAnalysisModal';
import ProductCard from '@/components/ui/ProductCard';
import Button from '@/components/ui/Button';
import Accordion from '@/components/ui/Accordion';
import { ArrowRight, Check, Minus, Plus } from '@/components/ui/Icons';

export default function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [certOpen, setCertOpen] = useState(false);
  const [labOpen, setLabOpen] = useState(false);

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const hasCertificate =
    !!product.janoshik &&
    ((product.janoshik.certificateImages?.length ?? 0) > 0 ||
      !!product.janoshik.verifyUrl);

  const perDelivery =
    product.priceValue * (1 - PROGRAMME.discountPercent / 100);

  // Surface each product's own lab analysis when its page opens — once per
  // product per browser session, so browsing back to it isn't a nag.
  useEffect(() => {
    if (!hasCertificate) return;
    const key = `lab-analysis-seen:${product.slug}`;
    if (sessionStorage.getItem(key)) return;
    const t = setTimeout(() => {
      sessionStorage.setItem(key, '1');
      setLabOpen(true);
    }, 700);
    return () => clearTimeout(t);
  }, [hasCertificate, product.slug]);

  const detailItems = [
    product.details?.contents && {
      title: 'What is in the kit',
      body: (
        <p className="whitespace-pre-line">{product.details.contents}</p>
      ),
    },
    product.details?.storage && {
      title: 'Storage and handling',
      body: <p className="whitespace-pre-line">{product.details.storage}</p>,
    },
    {
      title: 'Research specifications',
      body: (
        <dl className="grid grid-cols-1 gap-x-lg gap-y-sm sm:grid-cols-2">
          {product.specs.map((s) => (
            <div key={s.label} className="flex justify-between gap-sm">
              <dt className="label-mono">{s.label}</dt>
              <dd className="text-right text-base text-black">{s.value}</dd>
            </div>
          ))}
        </dl>
      ),
    },
    {
      title: 'Shipping and cold chain',
      body: (
        <p>
          Dispatched at 2–8°C in validated insulated packaging rated for 48
          hours in transit. Refrigerate on arrival and do not freeze. Shipped
          across the UK and EU with customs documentation where required.
        </p>
      ),
    },
  ].filter(Boolean) as { title: string; body: React.ReactNode }[];

  return (
    <div className="bg-white">
      <div className="container-ag section-y">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-xs font-mono text-xs uppercase tracking-label text-grey-500">
            <li>
              <Link
                href="/"
                className="transition-colors duration-200 ease-ag hover:text-green"
              >
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link
                href="/shop"
                className="transition-colors duration-200 ease-ag hover:text-green"
              >
                Catalogue
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-black">{product.name}</li>
          </ol>
        </nav>

        <div className="mt-lg grid grid-cols-1 gap-xl desktop:mt-xl desktop:grid-cols-2 desktop:gap-4xl">
          {/* Gallery */}
          <div className="desktop:sticky desktop:top-[calc(var(--bar-h)+var(--header-h)+24px)] desktop:self-start">
            <ProductGallery
              image={product.image}
              alt={product.name}
              gallery={product.gallery}
            />
          </div>

          {/* Buy column */}
          <div>
            <p className="label-mono">{product.category}</p>
            <h1 className="mt-sm text-h2 text-black">{product.name}</h1>

            <div className="mt-md flex flex-wrap items-baseline gap-smd">
              <span className="text-[clamp(1.75rem,3vw,2.25rem)] leading-none tracking-tighter text-black">
                {product.price}
              </span>
              <span className="label-mono">USD</span>
              {product.purity && (
                <span className="rounded-sm bg-success-bg px-sm py-xxs font-mono text-xxs uppercase tracking-label text-success">
                  {product.purity} assayed
                </span>
              )}
            </div>

            <p className="mt-lg max-w-prose text-base text-grey-700">
              {product.longDescription}
            </p>

            {/* Quantity + add */}
            <div className="mt-lg flex flex-wrap items-center gap-smd">
              <div className="flex items-center rounded-round border border-grey-100">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-11 w-11 items-center justify-center rounded-l-round text-green transition-colors duration-200 ease-ag hover:bg-grey-25 disabled:text-grey-100"
                  disabled={qty <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus size={18} />
                </button>
                <span
                  aria-live="polite"
                  className="w-10 text-center text-base text-black"
                >
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="flex h-11 w-11 items-center justify-center rounded-r-round text-green transition-colors duration-200 ease-ag hover:bg-grey-25"
                  aria-label="Increase quantity"
                >
                  <Plus size={18} />
                </button>
              </div>

              <Button size="lg" onClick={handleAdd} arrow={!added}>
                {added ? (
                  <>
                    <Check size={18} /> Added to cart
                  </>
                ) : (
                  'Add to cart'
                )}
              </Button>
            </div>

            {/* Standing order offer */}
            <div className="mt-lg rounded-card bg-mint p-md">
              <p className="text-base font-medium text-green-deep">
                ${perDelivery.toFixed(2)} per delivery on a standing order
              </p>
              <p className="mt-xxs text-sm text-grey-700">
                {PROGRAMME.discountPercent}% off each of{' '}
                {PROGRAMME.deliveries} monthly deliveries, cold-chain shipping
                included, cancel any time.
              </p>
              <Link
                href="/#programme"
                className="mt-sm inline-flex items-center gap-xs font-mono text-xs uppercase tracking-label text-green transition-colors duration-200 ease-ag hover:text-green-light"
              >
                How the programme works
                <ArrowRight size={16} />
              </Link>
            </div>

            <p className="mt-md font-mono text-xs uppercase tracking-label text-grey-500">
              Research use only — not for human or veterinary use
            </p>

            {/* Assay summary */}
            {hasCertificate && (
              <AssayPanel
                purity={product.janoshik?.purity ?? product.purity}
                batchNumber={product.janoshik?.batchNumber}
                fillVolume={product.janoshik?.fillVolume}
                compounds={product.janoshik?.compounds}
                onOpen={() => setCertOpen(true)}
              />
            )}

            <Accordion items={detailItems} className="mt-xl" />
          </div>
        </div>

        {hasCertificate && product.janoshik && (
          <>
            <LabAnalysisModal
              open={labOpen}
              onClose={() => setLabOpen(false)}
              onViewReport={() => {
                setLabOpen(false);
                setCertOpen(true);
              }}
              data={{
                purity: product.janoshik.purity,
                batchNumber: product.janoshik.batchNumber,
                fillVolume: product.janoshik.fillVolume,
                compounds: product.janoshik.compounds,
              }}
            />
            <CertificateModal
              open={certOpen}
              onClose={() => setCertOpen(false)}
              data={{
                productName: product.name,
                verifyUrl: product.janoshik.verifyUrl,
                certificateImages: product.janoshik.certificateImages,
              }}
            />
          </>
        )}

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-2xl border-t border-[color:var(--border-hair)] pt-xl desktop:mt-5xl">
            <div className="flex flex-wrap items-end justify-between gap-md">
              <h2 className="text-h2 text-black">Related compounds</h2>
              <Link
                href="/shop"
                className="inline-flex items-center gap-xs font-mono text-xs uppercase tracking-label text-green transition-colors duration-200 ease-ag hover:text-green-light"
              >
                View all
                <ArrowRight size={16} />
              </Link>
            </div>

            <ul className="mt-lg grid grid-cols-1 gap-md sm:grid-cols-2 desktop:grid-cols-3">
              {related.map((p) => (
                <li key={p.id}>
                  <ProductCard
                    product={p}
                    sizes="(max-width: 479px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-2xl border-t border-[color:var(--border-hair)] pt-xl">
          <p className="max-w-prose font-mono text-xs uppercase leading-5 tracking-label text-grey-500">
            {RESEARCH_DISCLAIMER}
          </p>
        </section>
      </div>
    </div>
  );
}

function AssayPanel({
  purity,
  batchNumber,
  fillVolume,
  compounds,
  onOpen,
}: {
  purity?: string;
  batchNumber?: string;
  fillVolume?: string;
  compounds?: { name: string; concentration: string; content: string }[];
  onOpen: () => void;
}) {
  const facts = [
    { label: 'Batch number', value: batchNumber },
    { label: 'Fill volume', value: fillVolume },
    { label: 'Purity', value: purity },
  ].filter((f) => !!f.value);

  if (facts.length === 0 && !compounds?.length) return null;

  return (
    <section className="mt-lg rounded-card border border-[color:var(--border-soft)] p-md">
      <h2 className="text-base font-medium text-black">
        Third-party assay, this batch
      </h2>
      <p className="mt-xxs text-sm text-grey-500">
        Measured by Janoshik Analytical and published as issued.
      </p>

      {facts.length > 0 && (
        <dl className="mt-md grid grid-cols-1 gap-sm sm:grid-cols-3">
          {facts.map((f) => (
            <div
              key={f.label}
              className="rounded-sm bg-grey-25 px-smd py-sm"
            >
              <dt className="label-mono">{f.label}</dt>
              <dd className="mt-xxs text-base font-medium text-black">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {compounds && compounds.length > 0 && (
        <table className="mt-md w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-[color:var(--border-hair)]">
              <th scope="col" className="py-sm pr-sm label-mono">
                Compound
              </th>
              <th scope="col" className="py-sm pr-sm label-mono">
                Concentration
              </th>
              <th scope="col" className="py-sm text-right label-mono">
                Measured content
              </th>
            </tr>
          </thead>
          <tbody>
            {compounds.map((c) => (
              <tr key={c.name}>
                <td className="py-sm pr-sm text-sm font-medium text-black">
                  {c.name}
                </td>
                <td className="py-sm pr-sm text-sm text-grey-700">
                  {c.concentration}
                </td>
                <td className="py-sm text-right text-sm text-grey-700">
                  {c.content}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button
        type="button"
        onClick={onOpen}
        className="mt-md inline-flex items-center gap-xs font-mono text-xs uppercase tracking-label text-green transition-colors duration-200 ease-ag hover:text-green-light"
      >
        Open the full report
        <ArrowRight size={16} />
      </button>
    </section>
  );
}
