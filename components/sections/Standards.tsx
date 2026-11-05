'use client';

import Image from 'next/image';
import { useId, useRef, useState } from 'react';
import Link from 'next/link';
import { STANDARDS_TABS } from '@/lib/data';
import { ArrowRight } from '@/components/ui/Icons';

/**
 * Tabbed evidence panel. The active tab is marked by an underline rather
 * than a filled pill, and inactive labels sit in the earth accent — the one
 * place the reference system uses that colour on body-sized type.
 *
 * Arrow keys move between tabs, matching the ARIA tabs pattern.
 */
export default function Standards() {
  const [active, setActive] = useState(0);
  const uid = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const panel = STANDARDS_TABS[active];

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = STANDARDS_TABS.length - 1;
    let next = active;
    if (e.key === 'ArrowRight') next = active === last ? 0 : active + 1;
    else if (e.key === 'ArrowLeft') next = active === 0 ? last : active - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="standards" className="section-y-lg bg-white">
      <div className="container-ag">
        <h2 className="max-w-[14ch] text-h2 text-black">
          Nothing on the label we have not measured
        </h2>

        <div
          role="tablist"
          aria-label="Testing standards"
          onKeyDown={onKeyDown}
          className="mt-lg flex gap-lg overflow-x-auto pb-xs no-scrollbar tablet:mt-xl tablet:gap-xl"
        >
          {STANDARDS_TABS.map((tab, i) => (
            <button
              key={tab.label}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`${uid}-tab-${i}`}
              aria-selected={active === i}
              aria-controls={`${uid}-panel-${i}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              className={`shrink-0 whitespace-nowrap border-b pb-xs text-md transition-colors duration-200 ease-ag ${
                active === i
                  ? 'border-black text-black'
                  : 'border-transparent text-earth hover:text-green'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`${uid}-panel-${active}`}
          aria-labelledby={`${uid}-tab-${active}`}
          className="mt-xl grid grid-cols-1 gap-lg desktop:mt-2xl desktop:grid-cols-2 desktop:gap-4xl"
        >
          <div>
            <p className="max-w-[24ch] text-statement text-black">
              {panel.statement}
            </p>
            <p className="mt-lg max-w-[62ch] font-mono text-xs uppercase leading-5 tracking-label text-grey-500">
              {panel.meta}
            </p>
            <Link
              href="/shop"
              className="mt-md inline-flex items-center gap-xs font-mono text-xs uppercase tracking-label text-black transition-colors duration-200 ease-ag hover:text-green"
            >
              See every certificate
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-xs bg-stone desktop:aspect-[5/4]">
            <Image
              src={panel.image}
              alt=""
              fill
              sizes="(max-width: 1023px) 100vw, 46vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
