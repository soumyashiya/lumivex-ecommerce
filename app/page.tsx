import AnnounceBar from '@/components/sections/AnnounceBar';
import Navigation from '@/components/sections/Navigation';
import Hero from '@/components/sections/Hero';
import TrustStrip from '@/components/sections/TrustStrip';
import ShopByLine from '@/components/sections/ShopByLine';
import Products from '@/components/sections/Products';
import Programme from '@/components/sections/Programme';
import Standards from '@/components/sections/Standards';
import Comparison from '@/components/sections/Comparison';
import WhyUs from '@/components/sections/WhyUs';
import Testimonials from '@/components/sections/Testimonials';
import Faq from '@/components/sections/Faq';
import Contact from '@/components/sections/Contact';
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
        <Standards />
        <Comparison />
        <WhyUs />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
