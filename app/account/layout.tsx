import ShopHeader from '@/components/shop/ShopHeader';
import Footer from '@/components/sections/Footer';

/**
 * Account pages share the site chrome rather than rendering bare. Without
 * this the order, tracking and wallet views had no way back into the
 * catalogue.
 */
export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ShopHeader />
      <main className="min-h-[60vh] bg-white">{children}</main>
      <Footer />
    </>
  );
}
