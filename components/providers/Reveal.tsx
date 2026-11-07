'use client';

import { useEffect } from 'react';

/**
 * Scroll reveal, site-wide. Renders nothing — it only watches for elements
 * marked `data-reveal` and sets `data-reveal-in` on each the first time it
 * enters the viewport. The fade and 16px rise themselves live in globals.css,
 * so this never touches style properties and never forces a layout.
 *
 * Mounted once in the root layout, so it covers every route. A MutationObserver
 * picks up elements added by client navigation or by sections that mount later
 * (rails, modals, accordions), which an IntersectionObserver alone would miss.
 *
 * Reduced-motion users are skipped entirely: the CSS leaves their content in
 * the finished state, so there is nothing to reveal.
 */
export default function Reveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute('data-reveal-in', '');
          io.unobserve(entry.target);
        }
      },
      // Fire a little before the element is fully on screen, so the motion
      // reads as "already settling" rather than starting at the fold.
      { rootMargin: '0px 0px -10% 0px', threshold: 0.01 },
    );

    const observe = (root: ParentNode) => {
      for (const el of root.querySelectorAll('[data-reveal]:not([data-reveal-in])')) {
        io.observe(el);
      }
    };

    observe(document);

    const mo = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof Element)) continue;
          if (node.matches('[data-reveal]:not([data-reveal-in])')) io.observe(node);
          observe(node);
        }
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  return null;
}
