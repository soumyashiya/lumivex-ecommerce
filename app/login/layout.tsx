import ShopHeader from '@/components/shop/ShopHeader';
import Footer from '@/components/sections/Footer';

export default function LoginLayout({
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
