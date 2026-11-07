import Image from 'next/image';
import { PROCESS, PROCESS_STEPS } from '@/lib/data';
import { revealDelay } from '@/components/ui/reveal';

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Bench-to-pen process as a single connected track.
 *
 * Desktop: three open columns (no boxed cards). A hairline runs across all
 * three between the photographs and the copy, with a numbered node at the
 * start of each column — the line is what says "sequence".
 * Below desktop the same track turns vertical: the line runs down the left
 * edge and each step hangs off its node.
 *
 * Each step ends with the record it leaves behind, so the section answers
 * "what can I check?" rather than just describing the process.
 */
export default function Process() {
  return (
    <section id="process" className="section-y-lg bg-off-white">
      <div className="container-ag">
        <header className="grid gap-md desktop:grid-cols-2 desktop:items-end desktop:gap-4xl">
          <div data-reveal>
            <p className="label-mono">{PROCESS.eyebrow}</p>
            <h2 className="mt-smd max-w-[14ch] text-h2 text-black">
              {PROCESS.heading}
            </h2>
          </div>
          <p
            data-reveal
            className={`max-w-[48ch] text-base text-grey-700 tablet:text-md desktop:justify-self-end ${revealDelay(1)}`}
          >
            {PROCESS.intro}
          </p>
        </header>

        <ol className="relative mt-2xl grid gap-2xl desktop:mt-4xl desktop:grid-cols-3 desktop:gap-xl">
          {/* Vertical track (mobile/tablet) */}
          <span
            aria-hidden
            className="absolute bottom-0 left-[15px] top-0 w-px bg-[color:var(--border-hair)] desktop:hidden"
          />

          {PROCESS_STEPS.map((step, i) => (
            <li
              key={step.title}
              data-reveal
              className={`relative pl-3xl desktop:flex desktop:flex-col desktop:pl-0 ${revealDelay(i)}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-card-round bg-stone">
                <Image
                  src={step.image}
                  alt=""
                  fill
                  sizes="(max-width: 1023px) 90vw, 30vw"
                  className="object-cover"
                />
              </div>

              {/* Node + horizontal track segment (desktop). The segment
                  reaches across the column gap so the three join up; the
                  last one stops at its node. */}
              <div className="absolute left-0 top-0 desktop:relative desktop:mt-xl desktop:flex desktop:items-center">
                <span className="relative z-10 flex size-[32px] items-center justify-center rounded-pill border border-green bg-off-white font-mono text-xs text-green">
                  {pad(i + 1)}
                </span>
                {i < PROCESS_STEPS.length - 1 && (
                  <span
                    aria-hidden
                    className="hidden h-px flex-1 bg-[color:var(--border-hair)] desktop:-mr-xl desktop:block"
                  />
                )}
              </div>

              <div className="mt-lg desktop:mt-lg desktop:pr-xl">
                <h3 className="text-h3 text-black">{step.title}</h3>
                <p className="mt-sm max-w-[40ch] text-base text-grey-700">
                  {step.text}
                </p>
                <p className="mt-lg inline-flex flex-wrap items-baseline gap-x-sm gap-y-xxs border-t border-[color:var(--border-hair)] pt-smd font-mono text-xs uppercase tracking-label text-grey-500">
                  <span className="whitespace-nowrap">Leaves on file</span>
                  <span className="text-green">{step.record}</span>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
