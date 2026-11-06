import AnnounceBar from '@/components/sections/AnnounceBar';
import Navigation from '@/components/sections/Navigation';
import Hero from '@/components/sections/Hero';
import TrustStrip from '@/components/sections/TrustStrip';
import ShopByLine from '@/components/sections/ShopByLine';
import Products from '@/components/sections/Products';
import Programme from '@/components/sections/Programme';
import Comparison from '@/components/sections/Comparison';
import WhyUs from '@/components/sections/WhyUs';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import OrderCta from '@/components/sections/OrderCta';
import Faq from '@/components/sections/Faq';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <AnnounceBar />
      <Navigation />
      {/* Clears the fixed notice strip + header */}
      <main className="pt-[calc(var(--bar-h)+var(--header-h)+env(safe-area-inset-top))]">
        <Hero />
        <TrustStrip />
        <ShopByLine />
        <Products />
        <Programme />
        <Comparison />
        <WhyUs />
        <Process />
        <Testimonials />
        <OrderCta />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
