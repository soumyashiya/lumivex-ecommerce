import AnnounceBar from '@/components/sections/AnnounceBar';
import Navigation from '@/components/sections/Navigation';

/**
 * Site chrome for every page outside the homepage. The reference site uses
 * one header throughout rather than a reduced checkout variant, so this
 * renders the same notice strip and navigation, plus the spacer that clears
 * their fixed height.
 */
export default function ShopHeader() {
  return (
    <>
      <AnnounceBar />
      <Navigation />
      <div
        aria-hidden
        className="h-[calc(var(--bar-h)+var(--header-h)+env(safe-area-inset-top))]"
      />
    </>
  );
}
