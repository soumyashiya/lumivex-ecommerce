'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MENU, type MenuGroup, type MenuItem } from '@/lib/data';
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

  // Hover: open at once, close after a short grace period so the pointer can
  // cross the gap between label and panel (or pass over a neighbour) without
  // the panel flickering shut.
  const closeTimer = useRef<number | undefined>(undefined);
  const hoverOpen = (label: string) => {
    window.clearTimeout(closeTimer.current);
    setOpenGroup(label);
  };
  const hoverClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenGroup(null), 160);
  };
  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const closeAll = () => {
    window.clearTimeout(closeTimer.current);
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

          {/* Desktop groups — 20px labels, 12px inner padding, 8px apart.
              Mouse users open a group by hovering it; a click (or Enter /
              Space) toggles it for keyboard and touch. Each group's panel
              drops from under its own label, as on the reference. */}
          <ul className="hidden items-stretch gap-sm desktop:flex">
            {MENU.map((group) => {
              const isOpen = openGroup === group.label;
              const panelId = `menu-${group.label.toLowerCase()}`;
              return (
                <li
                  key={group.label}
                  className="relative flex h-[var(--header-h)] items-center"
                  onPointerEnter={(e) => e.pointerType === 'mouse' && hoverOpen(group.label)}
                  onPointerLeave={(e) => e.pointerType === 'mouse' && hoverClose()}
                >
                  <button
                    type="button"
                    onClick={() => setOpenGroup((g) => (g === group.label ? null : group.label))}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className={`inline-flex items-center gap-xs px-smd text-lg leading-7 transition-colors duration-200 ease-ag ${
                      isOpen ? 'text-green' : 'text-black hover:text-green'
                    }`}
                  >
                    {group.label}
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ease-ag ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Active marker: a short bar sitting on the header's edge */}
                  <span
                    aria-hidden
                    className={`absolute inset-x-smd bottom-0 h-[4px] rounded-pill bg-green transition-opacity duration-200 ease-ag ${
                      isOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                  />

                  <MenuPanel
                    id={panelId}
                    group={group}
                    open={isOpen}
                    onNavigate={closeAll}
                  />
                </li>
              );
            })}
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
                                className="flex items-center gap-smd py-sm"
                              >
                                <MenuThumb item={item} className="size-[52px]" />
                                <span className="flex min-w-0 flex-col">
                                  <span className="flex flex-wrap items-center gap-sm text-base text-black">
                                    {item.label}
                                    {item.badge && <MenuBadge label={item.badge} />}
                                  </span>
                                  <span className="text-sm text-grey-500">
                                    {item.description}
                                  </span>
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

/**
 * Desktop dropdown: a white card hanging from the header's lower edge under
 * its own label — mono eyebrow, then one row per link with a thumbnail on a
 * stone well, the title (plus an optional badge) and a one-line description.
 * Always mounted so it can fade; `invisible` takes the closed panel's links
 * out of the tab order.
 */
function MenuPanel({
  id,
  group,
  open,
  onNavigate,
}: {
  id: string;
  group: MenuGroup;
  open: boolean;
  onNavigate: () => void;
}) {
  return (
    <div
      id={id}
      className={`absolute -left-lg top-[calc(100%+1px)] w-[480px] rounded-b-xl border-x border-b border-[color:var(--border-soft)] bg-white px-lg pb-lg pt-xl shadow-menu transition-[opacity,visibility] duration-200 ease-ag ${
        open ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      <p className="label-mono">{group.eyebrow}</p>
      <ul className="mt-md flex flex-col gap-xs">
        {group.items.map((item) => (
          <li key={item.href + item.label}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className="group/item -mx-smd flex items-center gap-md rounded-card px-smd py-sm transition-colors duration-200 ease-ag hover:bg-grey-25"
            >
              <MenuThumb item={item} className="size-[64px]" />
              <span className="min-w-0">
                <span className="flex flex-wrap items-center gap-sm text-md text-black transition-colors duration-200 ease-ag group-hover/item:text-green">
                  {item.label}
                  {item.badge && <MenuBadge label={item.badge} />}
                </span>
                <span className="mt-xxs block text-sm text-grey-700">
                  {item.description}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MenuThumb({ item, className }: { item: MenuItem; className: string }) {
  return (
    <span className={`relative shrink-0 overflow-hidden rounded-card bg-stone ${className}`}>
      <Image
        src={item.image}
        alt=""
        fill
        sizes="64px"
        className={item.contain ? 'object-contain' : 'object-cover'}
      />
    </span>
  );
}

function MenuBadge({ label }: { label: string }) {
  return (
    <span className="rounded-xs bg-green px-xs py-xxs font-mono text-xxs uppercase tracking-label text-white">
      {label}
    </span>
  );
}
