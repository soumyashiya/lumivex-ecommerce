/**
 * Lumivex wordmark. Like the reference system's own logo it is type, not a
 * symbol: the grotesque set tight with a superscript registered mark, taking
 * its colour from `currentColor` so it works on light and dark chrome alike.
 */
export default function Logo({
  className = '',
  size = 'md',
}: {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  // md is the header wordmark. Sized against the header's own height —
  // 64px on mobile, 90px at desktop — so it reads large without crowding
  // the bar.
  const scale = {
    sm: 'text-lg',
    md: 'text-[26px] desktop:text-[44px]',
    lg: 'text-[clamp(3rem,10vw,7rem)]',
  }[size];

  return (
    <span
      className={`inline-flex items-start font-medium leading-none tracking-tightest ${scale} ${className}`}
    >
      Lumivex
      <span aria-hidden className="mt-[0.15em] text-[0.42em] leading-none">
        ®
      </span>
    </span>
  );
}
