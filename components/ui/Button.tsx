import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { ArrowRight } from './Icons';

type Variant = 'primary' | 'bright' | 'light' | 'outline' | 'outline-light' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const VARIANT: Record<Variant, string> = {
  primary: 'btn-primary',
  bright: 'btn-bright',
  light: 'btn-light',
  outline: 'btn-outline',
  'outline-light': 'btn-outline-light',
  ghost: 'btn-ghost',
};

const SIZE: Record<Size, string> = {
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
};

type Common = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Trailing arrow, as on the reference site's primary calls to action. */
  arrow?: boolean;
  full?: boolean;
  className?: string;
};

export function buttonClass({
  variant = 'primary',
  size = 'md',
  full,
  className = '',
}: Omit<Common, 'children'>) {
  return [
    'btn',
    VARIANT[variant],
    SIZE[size],
    full ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

type ButtonProps = Common &
  Omit<ComponentProps<'button'>, 'className' | 'children'>;

export default function Button({
  children,
  variant,
  size,
  arrow,
  full,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      data-touch-target
      className={buttonClass({ variant, size, full, className })}
      {...rest}
    >
      {children}
      {arrow && <ArrowRight size={18} />}
    </button>
  );
}

type LinkButtonProps = Common &
  Omit<ComponentProps<typeof Link>, 'className' | 'children'>;

export function ButtonLink({
  children,
  variant,
  size,
  arrow,
  full,
  className,
  ...rest
}: LinkButtonProps) {
  return (
    <Link
      data-touch-target
      className={buttonClass({ variant, size, full, className })}
      {...rest}
    >
      {children}
      {arrow && <ArrowRight size={18} />}
    </Link>
  );
}
