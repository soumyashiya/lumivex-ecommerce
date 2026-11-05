import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PRODUCTS, RESEARCH_DISCLAIMER } from '@/lib/data';
import ShopHeader from '@/components/shop/ShopHeader';
import ShopGrid from '@/components/shop/ShopGrid';
import Footer from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'Shop — Research Compounds | Lumivex',
  description:
    'Browse the full Lumivex catalogue of high-purity, batch-tested research peptides and reference compounds. Filter by category, sort by price, and view full certificates of analysis. Research use only.',
  openGraph: {
    title: 'Shop — Research Compounds | Lumivex',
    description:
      'Browse the full Lumivex catalogue of high-purity, batch-tested research peptides and reference compounds. Research use only.',
    type: 'website',
  },
};

export default function ShopPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Lumivex Research Compound Catalogue',
    itemListElement: PRODUCTS.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://lumivex.store/product/${p.slug}`,
      name: p.name,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ShopHeader />
      <main className="bg-white">
        <section className="section-y">
          <div className="container-ag">
            <h1 className="max-w-[16ch] text-h2 text-black">
              The catalogue
            </h1>
            <p className="mt-lg max-w-[62ch] text-base text-grey-700 tablet:text-md">
              Six research formulations, each supplied in a sealed fixed-volume
              device with the assay report for its own batch.
            </p>

            <div className="mt-lg tablet:mt-xl">
              <Suspense
                fallback={
                  <p className="label-mono">Loading the catalogue…</p>
                }
              >
                <ShopGrid />
              </Suspense>
            </div>
          </div>
        </section>

        <section className="border-t border-[color:var(--border-soft)] bg-off-white section-y-sm">
          <div className="container-ag">
            <p className="max-w-prose font-mono text-xs uppercase leading-5 tracking-label text-grey-500">
              {RESEARCH_DISCLAIMER}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
