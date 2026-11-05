'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { User } from '@/components/ui/Icons';

/**
 * Account entry point in the header. Signed out it offers a sign-in link;
 * signed in it exposes order history, tracking and sign-out. Matches
 * CartButton's icon-button footprint so the two sit level.
 */
export default function AccountMenu({ dark = false }: { dark?: boolean }) {
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        data-touch-target
        onClick={() => {
          // Hold off until a stored token has been verified — otherwise the
          // menu flashes "Sign in" before flipping to the signed-in items.
          if (loading) return;
          setOpen((v) => !v);
        }}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Account menu"
        aria-busy={loading}
        className={`inline-flex h-10 items-center gap-xs rounded-pill px-sm transition-colors duration-200 ease-ag ${
          dark ? 'text-white hover:text-white/70' : 'text-black hover:text-green'
        } ${loading ? 'cursor-wait opacity-60' : ''}`}
      >
        <User size={22} />
        <span className="text-base">{user ? 'Account' : 'Sign in'}</span>
      </button>

      {open && !loading && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-sm w-56 animate-fade-up overflow-hidden rounded-card border border-[color:var(--border-soft)] bg-white p-xs text-black shadow-menu"
        >
          {user ? (
            <>
              <p className="truncate px-smd pb-sm pt-sm text-xs text-grey-500">
                {user.email}
              </p>
              <div className="border-t border-[color:var(--border-soft)] pt-xs">
                <MenuLink href="/account/orders" onNavigate={() => setOpen(false)}>
                  My orders
                </MenuLink>
                <MenuLink href="/account/track" onNavigate={() => setOpen(false)}>
                  Track an order
                </MenuLink>
                <MenuLink href="/account/wallet" onNavigate={() => setOpen(false)}>
                  Wallet
                </MenuLink>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setOpen(false);
                    logout();
                  }}
                  className="block w-full rounded-smd px-smd py-sm text-left text-base text-grey-700 transition-colors duration-200 ease-ag hover:bg-grey-25 hover:text-black"
                >
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <>
              <MenuLink href="/login" onNavigate={() => setOpen(false)}>
                Sign in
              </MenuLink>
              <MenuLink href="/register" onNavigate={() => setOpen(false)}>
                Create an account
              </MenuLink>
              <MenuLink href="/account/track" onNavigate={() => setOpen(false)}>
                Track an order
              </MenuLink>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function MenuLink({
  href,
  onNavigate,
  children,
}: {
  href: string;
  onNavigate: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      role="menuitem"
      onClick={onNavigate}
      className="block rounded-smd px-smd py-sm text-base text-grey-700 transition-colors duration-200 ease-ag hover:bg-grey-25 hover:text-black"
    >
      {children}
    </Link>
  );
}
