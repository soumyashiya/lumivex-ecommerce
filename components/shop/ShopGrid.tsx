'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS, PRODUCT_LINES, PRODUCT_LINE_MAP } from '@/lib/data';
import ProductCard from '@/components/ui/ProductCard';
import Button from '@/components/ui/Button';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name';

const SORT_LABELS: Record<SortKey, string> = {
  featured: 'Featured',
  'price-asc': 'Price: low to high',
  'price-desc': 'Price: high to low',
  name: 'Name: A–Z',
};

/**
 * Catalogue listing. Lines run as pill filters above a four-up grid at the
 * widest breakpoint, with a 16px gutter — the same metrics as the reference
 * site's ingredient grid.
 *
 * The `category` query parameter seeds the active line so the header and
 * footer links land on a pre-filtered view.
 */
export default function ShopGrid() {
  const params = useSearchParams();
  const initialLine = params.get('category') ?? 'all';
  const initialSort = params.get('sort') === 'new' ? 'featured' : 'featured';

  const [line, setLine] = useState(initialLine);
  const [sort, setSort] = useState<SortKey>(initialSort);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      const inLine =
        line === 'all' || (PRODUCT_LINE_MAP[p.slug] ?? []).includes(line);
      const matches =
        q.length === 0 ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return inLine && matches;
    });

    list = [...list];
    if (sort === 'price-asc') list.sort((a, b) => a.priceValue - b.priceValue);
    if (sort === 'price-desc') list.sort((a, b) => b.priceValue - a.priceValue);
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [line, sort, query]);

  const lines = [{ label: 'All compounds', slug: 'all' }, ...PRODUCT_LINES];

  return (
    <div>
      {/* Line filters */}
      <div className="rail -mx-lg gap-sm px-lg tablet:-mx-[56px] tablet:px-[56px] min-[1680px]:-mx-[120px] min-[1680px]:px-[120px]">
        {lines.map((l) => (
          <button
            key={l.slug}
            type="button"
            onClick={() => setLine(l.slug)}
            aria-pressed={line === l.slug}
            className={`shrink-0 whitespace-nowrap rounded-round border px-md py-sm text-base transition-colors duration-200 ease-ag ${
              line === l.slug
                ? 'border-green bg-green text-white'
                : 'border-grey-100 bg-white text-grey-700 hover:border-green hover:text-green'
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* Search + sort */}
      <div className="mt-lg flex flex-col gap-smd tablet:flex-row tablet:items-center tablet:justify-between">
        <div className="w-full tablet:max-w-[320px]">
          <label htmlFor="shop-search" className="sr-only">
            Search the catalogue
          </label>
          <input
            id="shop-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="search"
            placeholder="Search the catalogue"
            className="field"
          />
        </div>

        <div className="flex items-center gap-smd">
          <label htmlFor="shop-sort" className="label-mono shrink-0">
            Sort
          </label>
          <select
            id="shop-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="field w-auto"
          >
            {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
              <option key={key} value={key}>
                {SORT_LABELS[key]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p aria-live="polite" className="mt-smd label-mono">
        {filtered.length} {filtered.length === 1 ? 'compound' : 'compounds'}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="mt-lg rounded-card border border-[color:var(--border-soft)] bg-grey-25 px-md py-2xl text-center">
          <p className="text-md text-black">
            Nothing in the catalogue matches that.
          </p>
          <p className="mt-xs text-base text-grey-500">
            Try a different line, or clear the search to see all six compounds.
          </p>
          <Button
            variant="outline"
            className="mt-md"
            onClick={() => {
              setQuery('');
              setLine('all');
            }}
          >
            Show all compounds
          </Button>
        </div>
      ) : (
        <ul className="mt-lg grid grid-cols-1 gap-md sm:grid-cols-2 desktop:grid-cols-4">
          {filtered.map((product, i) => (
            <li key={product.id}>
              <ProductCard
                product={product}
                priority={i < 4}
                sizes="(max-width: 479px) 100vw, (max-width: 1023px) 50vw, 25vw"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
