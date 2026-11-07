'use client';

import Image from 'next/image';
import { EXPERTS, TESTIMONIALS } from '@/lib/data';
import Rail from '@/components/ui/Rail';

/**
 * Supplier feedback as a single photo rail. Each card shows the reviewer's
 * name over a bench photograph; hovering (or focusing) a card lifts a frosted
 * panel with the full comment. Touch screens have no hover, so there the
 * comment is always open.
 *
 * The photographs are portraits shot against the same green wall, so the rail
 * reads as one set.
 *
 * Compliance rule: comments may reference documentation, packaging,
 * presentation and service only — never outcomes, effects or use.
 */
const REVIEWS = [
  ...TESTIMONIALS.map((t) => ({
    name: t.author,
    role: t.role,
    quote: t.quote,
    image: t.image,
  })),
  ...EXPERTS.map((e) => ({
    name: e.name,
    role: e.role,
    quote: e.quote,
    image: e.image,
  })),
];

/** Long, soft ease for the reveal — slower than the 200ms colour fades. */
const EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)]';

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative section-y bg-white"
    >
      <div className="container-ag">
        <Rail
          label="Customer feedback"
          reveal
          controls="header"
          itemClassName="w-[288px] tablet:w-[344px] desktop:w-[400px]"
          header={
            <div>
              <p className="label-mono">Reviews</p>
              <h2 className="mt-smd max-w-[22ch] text-h2 text-black">
                What labs say about ordering from us
              </h2>
            </div>
          }
        >
          {REVIEWS.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Rail>
      </div>
    </section>
  );
}

function ReviewCard({
  name,
  role,
  quote,
  image,
}: {
  name: string;
  role: string;
  quote: string;
  image: string;
}) {
  // Open by default (touch); collapsed only where a pointer can hover.
  const reveal = [
    'grid-rows-[1fr] opacity-100',
    '[@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:opacity-0',
    '[@media(hover:hover)]:group-hover:grid-rows-[1fr] [@media(hover:hover)]:group-hover:opacity-100',
    '[@media(hover:hover)]:group-focus-visible:grid-rows-[1fr] [@media(hover:hover)]:group-focus-visible:opacity-100',
  ].join(' ');

  return (
    <figure
      tabIndex={0}
      className="group relative h-[440px] overflow-hidden rounded-card-round bg-cool-800 desktop:h-[560px]"
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="(max-width: 767px) 288px, (max-width: 1023px) 344px, 400px"
        className={`object-cover transition-transform duration-700 ${EASE} group-hover:scale-[1.04]`}
      />

      {/* Top scrim keeps the name legible on bright photographs. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/45 to-transparent"
      />
      <p className="absolute left-lg top-lg font-mono text-sm uppercase tracking-label text-white">
        {name}
      </p>

      <figcaption
        className={`absolute inset-x-0 bottom-0 border-t border-white/15 bg-black/35 p-lg backdrop-blur-md transition-colors duration-500 ${EASE} group-hover:bg-black/45`}
      >
        <div className={`grid transition-[grid-template-rows,opacity] duration-500 ${EASE} ${reveal}`}>
          <div className="overflow-hidden">
            <blockquote className="pb-md text-base text-white">
              &ldquo;{quote}&rdquo;
            </blockquote>
          </div>
        </div>
        <div className="flex items-center justify-between gap-md">
          <p className="font-mono text-xs uppercase tracking-label text-white/80">
            {role}
          </p>
          <span
            aria-hidden
            className={`hidden size-[28px] shrink-0 items-center justify-center rounded-pill border border-white/40 text-white transition-[transform,opacity] duration-500 ${EASE} group-hover:rotate-45 group-hover:opacity-0 [@media(hover:hover)]:flex`}
          >
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
        </div>
      </figcaption>
    </figure>
  );
}
