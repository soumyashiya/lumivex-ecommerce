'use client';

import { useId, useState, type ReactNode } from 'react';
import { Check, Minus, Plus } from './Icons';

export type AccordionItem = {
  title: string;
  body: ReactNode;
};

type Props = {
  items: AccordionItem[];
  /** Leading tick before each title, as in the quality checklist. */
  checkmarks?: boolean;
  /** Question size — the FAQ list sets titles a step larger. */
  size?: 'base' | 'lg';
  /** Index open on first render. */
  defaultOpen?: number;
  className?: string;
};

/**
 * Single-open accordion. Rows are separated by hairlines only — no cards, no
 * shadows — and the body height animates via a 0fr→1fr grid row so the
 * content never needs a hard-coded max-height.
 */
export default function Accordion({
  items,
  checkmarks = false,
  size = 'base',
  defaultOpen = -1,
  className = '',
}: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const uid = useId();

  return (
    <div className={`border-t border-[color:var(--border-hair)] ${className}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.title} className="border-b border-[color:var(--border-hair)]">
            <h3>
              <button
                type="button"
                data-touch-target
                aria-expanded={isOpen}
                aria-controls={`${uid}-panel-${i}`}
                id={`${uid}-trigger-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center gap-smd py-md text-left tablet:py-mdl"
              >
                {checkmarks && (
                  <Check size={20} className="shrink-0 text-green" />
                )}
                <span
                  className={`flex-1 ${
                    size === 'lg'
                      ? 'text-base tablet:text-lg'
                      : 'text-base font-medium'
                  } tracking-tight text-black`}
                >
                  {item.title}
                </span>
                <span className="shrink-0 text-green">
                  {isOpen ? <Minus /> : <Plus />}
                </span>
              </button>
            </h3>

            <div
              id={`${uid}-panel-${i}`}
              role="region"
              aria-labelledby={`${uid}-trigger-${i}`}
              className="collapse-grid"
              data-open={isOpen}
            >
              <div>
                <div
                  className={`max-w-prose pb-md text-base text-grey-700 ${
                    checkmarks ? 'pl-[32px]' : ''
                  }`}
                >
                  {item.body}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
