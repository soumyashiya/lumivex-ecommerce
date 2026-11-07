/**
 * Stagger steps for `data-reveal` groups — see the scroll-reveal block in
 * globals.css and `components/providers/Reveal.tsx`.
 *
 * The classes are written out verbatim because Tailwind's JIT only emits
 * class names it can find as literal text in the source. A computed
 * `[--reveal-delay:${i * 80}ms]` would compile to nothing.
 *
 * Past the last step the delay holds rather than growing, so a long list
 * (a 12-item footer column, a rail of products) doesn't end up with items
 * waiting most of a second after they are already on screen.
 */
const REVEAL_DELAY = [
  '',
  '[--reveal-delay:80ms]',
  '[--reveal-delay:160ms]',
  '[--reveal-delay:240ms]',
  '[--reveal-delay:320ms]',
] as const;

export const revealDelay = (i: number) =>
  REVEAL_DELAY[Math.min(i, REVEAL_DELAY.length - 1)];
