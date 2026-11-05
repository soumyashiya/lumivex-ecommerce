/**
 * Line icons at the reference system's weight: 1.5px strokes on a 24px grid,
 * round caps, sized by the `size` prop and coloured by `currentColor`.
 */
type IconProps = {
  size?: number;
  className?: string;
  strokeWidth?: number;
};

const base = (size: number, className?: string) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': true as const,
  focusable: 'false' as const,
  className,
});

export function ArrowRight({ size = 20, className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path
        d="M4 12h15m0 0-6-6m6 6-6 6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronLeft({ size = 24, className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path
        d="M15 5l-7 7 7 7"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronRight({ size = 24, className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path
        d="M9 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronDown({ size = 20, className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path
        d="M5 9l7 7 7-7"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Check({ size = 20, className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path
        d="M4 12.5l5 5L20 6.5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Filled check used in the comparison table — bright green disc, white tick. */
export function CheckDisc({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <circle cx="12" cy="12" r="11" fill="currentColor" />
      <path
        d="M7 12.3l3.3 3.2L17 8.8"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Plus({ size = 20, className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Minus({ size = 20, className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M5 12h14" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

export function Close({ size = 24, className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Cart({ size = 24, className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path
        d="M3 4h2.2l2.1 10.6a1.6 1.6 0 0 0 1.6 1.3h7.9a1.6 1.6 0 0 0 1.6-1.3L20 7.5H6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="19.5" r="1.4" fill="currentColor" />
      <circle cx="16.5" cy="19.5" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function User({ size = 24, className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <circle cx="12" cy="8" r="3.6" stroke="currentColor" strokeWidth={strokeWidth} />
      <path
        d="M4.5 20a7.5 7.5 0 0 1 15 0"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Menu({ size = 24, className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
