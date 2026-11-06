import type { Metadata } from 'next';
import ShopHeader from '@/components/shop/ShopHeader';
import Footer from '@/components/sections/Footer';
import Faq from '@/components/sections/Faq';
import {
  AboutCompare,
  AboutDocumented,
  AboutIntro,
  AboutKit,
  AboutNot,
  AboutStart,
} from '@/components/about/AboutSections';

export const metadata: Metadata = {
  title: 'What is Lumivex? | Research-grade peptides, documented',
  description:
    'Lumivex makes research-grade peptides in its own facility, has every batch assayed by Janoshik Analytical, and ships the certificate with the kit. For laboratory research only.',
};

export default function AboutPage() {
  return (
    <>
      <ShopHeader />
      <main className="bg-white">
        <AboutIntro />
        <AboutDocumented />
        <AboutKit />
        <AboutNot />
        <AboutCompare />
        <AboutStart />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
