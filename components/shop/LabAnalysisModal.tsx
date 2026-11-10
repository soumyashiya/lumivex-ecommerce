'use client';

import { useEffect, useId, useRef, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, Close } from '@/components/ui/Icons';

export type LabAnalysisData = {
  purity?: string;
  batchNumber?: string;
  fillVolume?: string;
  compounds?: { name: string; concentration: string; content: string }[];
};

/**
 * The batch's third-party assay, shown over the product page.
 *
 * A wide, frosted mint card: a decorative flask illustration on the left
 * (desktop only), then the header (badge · title · "Verified report" pill ·
 * close), three stat cards with small icons, one compound card per compound
 * with an accent edge, and a footer pairing the note with the report action.
 * Phones get a bottom sheet without the illustration. Figures come from
 * `product.janoshik`.
 */
export default function LabAnalysisModal({
  open,
  onClose,
  onViewReport,
  data,
}: {
  open: boolean;
  onClose: () => void;
  onViewReport: () => void;
  productName?: string;
  data: LabAnalysisData;
}) {
  const reduce = useReducedMotion();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  // Escape to close, scroll lock, focus in on open / back out on close, and
  // Tab kept inside the dialog.
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => panelRef.current?.focus(), 50);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose();
      if (e.key !== 'Tab' || !panelRef.current) return;
      const items = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])',
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);

    return () => {
      window.clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      previous?.focus?.();
    };
  }, [open, onClose]);

  const compounds = data.compounds ?? [];

  const facts: { label: string; value?: string; icon: ReactNode; accent?: boolean }[] = [
    { label: 'Batch Number', value: data.batchNumber, icon: <CubeIcon /> },
    { label: 'Fill Volume', value: data.fillVolume, icon: <DropIcon /> },
    { label: 'Purity', value: data.purity, icon: null, accent: true },
  ];
  const shown = facts.filter((f) => !!f.value);

  const panelMotion = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 28 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 20 },
      };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="lab-analysis"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[110] flex items-end justify-center bg-[rgba(10,18,18,0.5)] backdrop-blur-md tablet:items-center tablet:p-lg"
          onClick={onClose}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            {...panelMotion}
            transition={{ duration: reduce ? 0.15 : 0.34, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[94svh] w-full flex-col overflow-hidden rounded-t-[28px] border border-white bg-[linear-gradient(140deg,#ffffff_0%,#f4faf6_40%,#e4f2ea_100%)] shadow-[0_60px_120px_-40px_rgba(15,46,47,0.65),inset_0_1px_0_rgba(255,255,255,0.9)] outline-none tablet:max-w-[700px] tablet:rounded-[28px]"
          >
            {/* Soft background glows and the bottom wave */}
            <span
              aria-hidden
              className="pointer-events-none absolute -left-[120px] top-[80px] size-[380px] rounded-full bg-[radial-gradient(closest-side,rgba(90,157,113,0.22),transparent)]"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-[140px] right-[10%] size-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(70,222,70,0.14),transparent)]"
            />
            <Wave />

            <div className="relative overflow-y-auto">
              <div className="grid tablet:grid-cols-[130px_1fr]">
                {/* Illustration column (tablet and up) */}
                <div className="relative hidden tablet:block">
                  <FlaskIllustration />
                </div>

                <div className="px-md pb-md pt-md tablet:px-lg tablet:pb-lg tablet:pr-xl tablet:pt-xl">
                  {/* Header */}
                  <div className="flex items-start gap-md">
                    <span className="flex size-[56px] shrink-0 items-center justify-center rounded-[16px] bg-[linear-gradient(145deg,#1a6b5f_0%,#023d3d_70%)] text-white shadow-[0_14px_28px_-14px_rgba(2,61,61,0.8),inset_0_1px_0_rgba(255,255,255,0.2)] tablet:size-[60px] tablet:rounded-[18px]">
                      <FlaskIcon />
                    </span>
                    <span
                      aria-hidden
                      className="hidden w-px self-stretch bg-[rgba(2,61,61,0.15)] tablet:block"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-sm">
                        <span className="inline-flex items-center gap-xs rounded-pill bg-white/90 px-smd py-xxs font-mono text-xxs uppercase tracking-label text-green shadow-[0_4px_12px_-8px_rgba(2,61,61,0.4)] ring-1 ring-[rgba(90,157,113,0.35)]">
                          <span className="flex size-[16px] items-center justify-center rounded-pill bg-[linear-gradient(145deg,#5a9d71,#1f7a4d)] text-white">
                            <Check size={12} strokeWidth={2.5} />
                          </span>
                          Verified Report
                        </span>
                      </div>
                      <h2
                        id={titleId}
                        className="mt-sm font-serif text-[30px] leading-[1] text-green-deep tablet:text-[36px]"
                      >
                        Janoshik Third-Party Lab Analysis
                      </h2>
                      <p className="mt-xs text-sm text-grey-700 tablet:text-base">
                        Independently tested and verified by Janoshik Analytical.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={onClose}
                      aria-label="Close lab analysis"
                      data-touch-target
                      className="flex size-[44px] shrink-0 items-center justify-center rounded-pill bg-white/80 text-green shadow-[0_4px_12px_-8px_rgba(2,61,61,0.4)] ring-1 ring-[rgba(2,61,61,0.08)] transition-colors duration-200 ease-ag hover:bg-white"
                    >
                      <Close size={20} />
                    </button>
                  </div>

                  {/* Stat cards */}
                  {shown.length > 0 && (
                    <dl
                      className={`mt-lg grid gap-sm ${
                        shown.length >= 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2'
                      }`}
                    >
                      {shown.map((f) => (
                        <div
                          key={f.label}
                          className="rounded-[18px] px-md py-md bg-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_10px_28px_-18px_rgba(15,46,47,0.35)] ring-1 ring-[rgba(2,61,61,0.06)]"
                        >
                          <dt className="font-mono text-xxs uppercase tracking-label text-grey-500">
                            {f.label}
                          </dt>
                          <dd className="mt-xs flex items-center justify-between gap-sm text-lg leading-tight text-black tabular-nums tablet:text-[20px]">
                            <span className="flex items-center gap-sm">
                              {f.accent && (
                                <span className="flex size-[24px] shrink-0 items-center justify-center rounded-pill bg-[linear-gradient(145deg,#5a9d71,#1f7a4d)] text-white">
                                  <Check size={15} strokeWidth={2.5} />
                                </span>
                              )}
                              <span className="min-w-0 break-words">{f.value}</span>
                            </span>
                            {f.icon && (
                              <span className="shrink-0 text-sage">{f.icon}</span>
                            )}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {/* Compound cards */}
                  {compounds.length > 0 && (
                    <ul className="mt-sm space-y-sm">
                      {compounds.map((c) => (
                        <li
                          key={c.name}
                          className="relative grid grid-cols-2 gap-x-md gap-y-sm rounded-[18px] py-md pl-xl pr-md bg-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_10px_28px_-18px_rgba(15,46,47,0.35)] ring-1 ring-[rgba(2,61,61,0.06)] sm:grid-cols-[1.1fr_1fr_1fr]"
                        >
                          <span
                            aria-hidden
                            className="absolute bottom-md left-md top-md w-[3px] rounded-pill bg-[linear-gradient(180deg,#023d3d,#5a9d71)]"
                          />
                          <div className="col-span-2 sm:col-span-1">
                            <p className="font-mono text-xxs uppercase tracking-label text-grey-500">
                              Compound
                            </p>
                            <p className="mt-xs text-[20px] leading-tight text-black">
                              {c.name}
                            </p>
                          </div>
                          <div className="sm:border-l sm:border-[rgba(2,61,61,0.1)] sm:pl-md">
                            <p className="font-mono text-xxs uppercase tracking-label text-grey-500">
                              Concentration
                            </p>
                            <p className="mt-xs whitespace-nowrap text-lg text-black tabular-nums">{c.concentration}</p>
                          </div>
                          <div className="sm:border-l sm:border-[rgba(2,61,61,0.1)] sm:pl-md">
                            <p className="font-mono text-xxs uppercase tracking-label text-grey-500">
                              Verified Content
                            </p>
                            <p className="mt-xs inline-block whitespace-nowrap rounded-pill bg-[linear-gradient(145deg,#e6f6ea,#d3efdb)] px-smd py-xxs text-lg text-green tabular-nums ring-1 ring-[rgba(90,157,113,0.25)]">
                              {c.content}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Footer: note + action */}
              <div className="relative mx-md mb-md flex flex-col gap-md rounded-[20px] p-md backdrop-blur-sm bg-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_10px_28px_-18px_rgba(15,46,47,0.35)] ring-1 ring-[rgba(2,61,61,0.06)] tablet:mx-xl tablet:mb-xl tablet:flex-row tablet:items-center">
                {compounds.length > 0 && (
                  <div className="flex flex-1 items-center gap-md">
                    <ShieldIcon />
                    <p className="text-sm leading-relaxed text-grey-700">
                      Concentration is measured per mL; verified content reflects
                      the total assayed mass across the stated fill volume.
                    </p>
                  </div>
                )}
                <span
                  aria-hidden
                  className="hidden h-[48px] w-px bg-[rgba(2,61,61,0.12)] tablet:block"
                />
                <button
                  type="button"
                  onClick={onViewReport}
                  className="flex shrink-0 items-center justify-between gap-md rounded-pill bg-[linear-gradient(135deg,#1a6b5f_0%,#023d3d_55%,#0f2e2f_100%)] py-sm pl-lg pr-sm text-base text-white shadow-[0_16px_30px_-16px_rgba(2,61,61,0.9),inset_0_1px_0_rgba(255,255,255,0.18)] transition-[filter] duration-200 ease-ag hover:brightness-110"
                >
                  View Full Janoshik Report
                  <span className="flex size-[36px] items-center justify-center rounded-pill bg-white text-green">
                    <ArrowRight size={18} />
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ——— Icons and illustration (decorative) ——— */

function FlaskIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 3h6M10 3v5.2L4.6 18.1A2 2 0 0 0 6.4 21h11.2a2 2 0 0 0 1.8-2.9L14 8.2V3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6.5 15h11l1.6 3.1a1.3 1.3 0 0 1-1.2 1.9H6.1a1.3 1.3 0 0 1-1.2-1.9L6.5 15Z" fill="currentColor" opacity=".9" />
    </svg>
  );
}

function CubeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Zm0 0v0M4 7.5l8 4.5 8-4.5M12 12v9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DropIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3.5s-6 6.6-6 11a6 6 0 0 0 12 0c0-4.4-6-11-6-11Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden className="shrink-0">
      <defs>
        <linearGradient id="lab-shield" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5a9d71" />
          <stop offset="1" stopColor="#023d3d" />
        </linearGradient>
      </defs>
      <path d="M22 4 7 10v11c0 9.5 6.4 16.6 15 19 8.6-2.4 15-9.5 15-19V10L22 4Z" fill="url(#lab-shield)" />
      <path d="m15.5 22.5 4.5 4.5 9-9.5" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Wave() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 960 120"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[90px] w-full"
    >
      <path d="M0 70C180 20 330 110 520 70S820 20 960 50V120H0Z" fill="rgba(90,157,113,0.12)" />
      <path d="M0 95C200 60 360 120 560 90S840 60 960 80V120H0Z" fill="rgba(2,61,61,0.08)" />
    </svg>
  );
}

/** Glass Erlenmeyer flask with green liquid, bubbles and molecule nodes. */
function FlaskIllustration() {
  return (
    <svg aria-hidden viewBox="0 0 220 420" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="lab-liquid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7fd38f" />
          <stop offset="1" stopColor="#1f7a4d" />
        </linearGradient>
        <linearGradient id="lab-glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".9" />
          <stop offset=".5" stopColor="#ffffff" stopOpacity=".35" />
          <stop offset="1" stopColor="#ffffff" stopOpacity=".85" />
        </linearGradient>
        <radialGradient id="lab-node" cx=".35" cy=".35" r=".7">
          <stop offset="0" stopColor="#c9ecd3" />
          <stop offset="1" stopColor="#5a9d71" />
        </radialGradient>
      </defs>

      {/* molecules */}
      <g stroke="#9fd0ae" strokeWidth="3">
        <line x1="18" y1="120" x2="48" y2="96" />
        <line x1="48" y1="96" x2="40" y2="62" />
        <line x1="48" y1="96" x2="80" y2="110" />
        <line x1="170" y1="300" x2="200" y2="282" />
        <line x1="200" y1="282" x2="212" y2="318" />
        <line x1="20" y1="372" x2="52" y2="356" />
        <line x1="52" y1="356" x2="60" y2="392" />
      </g>
      {[
        [18, 120, 9],
        [48, 96, 11],
        [40, 62, 7],
        [80, 110, 7],
        [170, 300, 8],
        [200, 282, 10],
        [212, 318, 6],
        [20, 372, 8],
        [52, 356, 10],
        [60, 392, 6],
      ].map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="url(#lab-node)" />
      ))}

      {/* flask */}
      <ellipse cx="110" cy="352" rx="78" ry="10" fill="rgba(2,61,61,0.12)" />
      <path
        d="M92 120h36v58l52 132c6 16-6 36-24 36H64c-18 0-30-20-24-36l52-132v-58Z"
        fill="url(#lab-glass)"
        stroke="rgba(2,61,61,0.25)"
        strokeWidth="2"
      />
      <path
        d="M64 248h92l23 60c5 14-5 30-21 30H62c-16 0-26-16-21-30l23-60Z"
        fill="url(#lab-liquid)"
        opacity=".9"
      />
      <ellipse cx="110" cy="248" rx="46" ry="6" fill="#a8e6b6" opacity=".9" />
      <rect x="86" y="112" width="48" height="12" rx="6" fill="#ffffff" stroke="rgba(2,61,61,0.25)" strokeWidth="2" />
      {/* bubbles */}
      {[
        [96, 290, 5],
        [120, 276, 4],
        [132, 306, 6],
        [104, 318, 3],
        [114, 230, 3],
        [104, 210, 2.5],
      ].map(([cx, cy, r]) => (
        <circle key={`b-${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="#ffffff" opacity=".7" />
      ))}
      {/* highlight */}
      <path d="M98 132v50l-40 104" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" opacity=".8" fill="none" />
    </svg>
  );
}
