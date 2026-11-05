'use client';

import { useEffect, useState } from 'react';
import { ANNOUNCEMENTS } from '@/lib/data';

/**
 * Notice strip above the header. Metrics match the reference site: a 52px
 * band on mobile and 34px at desktop, one centred line in the monospace
 * face on the saturated green field, rotating rather than scrolling.
 */
export default function AnnounceBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (ANNOUNCEMENTS.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % ANNOUNCEMENTS.length),
      5000
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="safe-pt fixed inset-x-0 top-0 z-[60] bg-bright">
      <p
        aria-live="polite"
        className="mx-auto flex h-[var(--bar-h)] max-w-[1568px] items-center justify-center px-md text-center font-mono text-xs font-medium leading-4 text-black desktop:text-sm desktop:leading-[18px]"
      >
        {ANNOUNCEMENTS[index]}
      </p>
    </div>
  );
}
