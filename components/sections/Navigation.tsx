'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { MENU } from '@/lib/data';
import Logo from '@/components/ui/Logo';
import CartButton from '@/components/cart/CartButton';
import AccountMenu from '@/components/ui/AccountMenu';
import { ButtonLink } from '@/components/ui/Button';
import { ChevronDown, Close, Menu as MenuIcon } from '@/components/ui/Icons';

/**
 * Header: an opaque white bar pinned below the notice strip, with three
 * mega-menu groups on desktop and a full-screen panel on small screens.
 * Unlike the previous translucent treatment it never changes colour on
 * scroll — the reference system keeps the chrome constant so the page
 * underneath is the only thing that moves.
 */
export default function Navigation() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Close the desktop panel on outside click or Escape.
  useEffect(() => {
    if (!openGroup) return;
    const onDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenGroup(null);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenGroup(null);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [openGroup]);

  // Lock the page behind the mobile panel.
  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [mobileOpen]);

  const closeAll = () => {
    setOpenGroup(null);
    setMobileOpen(false);
    setMobileGroup(null);
  };

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-[calc(var(--bar-h)+env(safe-area-inset-top))] z-50 border-b border-[color:var(--border-soft)] bg-white"
    >
      {/* 64px tall with 24px gutters on mobile, 90px with 56px gutters from
          desktop — the reference header's own metrics. */}
      <nav
        aria-label="Primary"
        className="container-header flex h-[var(--header-h)] items-center justify-between gap-md"
      >
        {/* Left: menu toggle (below desktop), the brand, then menu groups */}
        <div className="flex items-center gap-sm desktop:gap-xl">
          <button
            type="button"
            data-touch-target
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="-ml-sm inline-flex h-9 w-9 items-center justify-center text-black desktop:hidden"
          >
            {mobileOpen ? <MenuIconClose /> : <MenuIcon />}
          </button>

          <Link
            href="/"
            onClick={closeAll}
            className="text-green"
            aria-label="Lumivex — home"
          >
            <Logo />
          </Link>

          {/* Desktop groups — 20px labels, 12px inner padding, 8px apart */}
          <ul className="hidden items-center gap-sm desktop:flex">
            {MENU.map((group) => (
              <li key={group.label}>
                <button
                  type="button"
                  onClick={() =>
                    setOpenGroup((g) => (g === group.label ? null : group.label))
                  }
                  aria-expanded={openGroup === group.label}
                  className={`inline-flex items-center gap-xs px-smd text-lg leading-7 transition-colors duration-200 ease-ag ${
                    openGroup === group.label
                      ? 'text-green'
                      : 'text-black hover:text-green'
                  }`}
                >
                  {group.label}
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ease-ag ${
                      openGroup === group.label ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: cart and account */}
        <div className="flex items-center gap-smd desktop:gap-lg">
          <CartButton />
          <div className="hidden desktop:block">
            <AccountMenu />
          </div>
        </div>
      </nav>

      {/* Desktop mega panel */}
      {openGroup && (
        <div className="absolute inset-x-0 top-full hidden border-b border-[color:var(--border-soft)] bg-white shadow-menu desktop:block">
          <div className="container-header grid grid-cols-3 gap-x-xl gap-y-lg py-xl">
            {MENU.find((g) => g.label === openGroup)?.items.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                onClick={closeAll}
                className="group rounded-card p-smd transition-colors duration-200 ease-ag hover:bg-grey-25"
              >
                <span className="block text-md text-black transition-colors duration-200 ease-ag group-hover:text-green">
                  {item.label}
                </span>
                <span className="mt-xxs block max-w-[34ch] text-sm text-grey-500">
                  {item.description}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="safe-pb fixed inset-x-0 bottom-0 top-[calc(var(--bar-h)+var(--header-h)+env(safe-area-inset-top))] z-40 overflow-y-auto bg-white desktop:hidden">
          <div className="container-header py-lg">
            <ul className="border-t border-[color:var(--border-hair)]">
              {MENU.map((group) => {
                const isOpen = mobileGroup === group.label;
                return (
                  <li
                    key={group.label}
                    className="border-b border-[color:var(--border-hair)]"
                  >
                    <button
                      type="button"
                      data-touch-target
                      onClick={() => setMobileGroup(isOpen ? null : group.label)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between py-md text-left text-lg text-black"
                    >
                      {group.label}
                      <ChevronDown
                        className={`text-green transition-transform duration-200 ease-ag ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <div className="collapse-grid" data-open={isOpen}>
                      <div>
                        <ul className="pb-md">
                          {group.items.map((item) => (
                            <li key={item.href + item.label}>
                              <Link
                                href={item.href}
                                data-touch-target
                                onClick={closeAll}
                                className="flex flex-col py-sm"
                              >
                                <span className="text-base text-black">
                                  {item.label}
                                </span>
                                <span className="text-sm text-grey-500">
                                  {item.description}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-lg flex flex-col gap-sm">
              <ButtonLink href="/shop" full onClick={closeAll} arrow>
                Shop now
              </ButtonLink>
              <ButtonLink href="/cart" variant="outline" full onClick={closeAll}>
                View cart
              </ButtonLink>
              <ButtonLink
                href="/account/track"
                variant="ghost"
                full
                onClick={closeAll}
              >
                Track an order
              </ButtonLink>
            </div>

            <div className="mt-lg border-t border-[color:var(--border-hair)] pt-lg">
              <AccountMenu />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function MenuIconClose() {
  return <Close />;
}
