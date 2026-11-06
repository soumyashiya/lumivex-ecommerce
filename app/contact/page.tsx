import type { Metadata } from 'next';
import ShopHeader from '@/components/shop/ShopHeader';
import Footer from '@/components/sections/Footer';
import {
  ContactIntro,
  ContactMain,
  ContactNewsletter,
} from '@/components/contact/ContactSections';

export const metadata: Metadata = {
  title: 'Contact | Lumivex',
  description:
    'Talk to someone who knows the Lumivex catalogue: sourcing questions, order help and batch documentation. Research use only.',
};

export default function ContactPage() {
  return (
    <>
      <ShopHeader />
      <main className="bg-white">
        <ContactIntro />
        <ContactMain />
        <ContactNewsletter />
      </main>
      <Footer />
    </>
  );
}
