import ShopHeader from '@/components/shop/ShopHeader';
import Footer from '@/components/sections/Footer';

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ShopHeader />
      <main className="bg-white">{children}</main>
      <Footer />
    </>
  );
}
