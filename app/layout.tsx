import type { Metadata, Viewport } from 'next';
import './globals.css';
import SmoothScroll from '@/components/providers/SmoothScroll';
import Reveal from '@/components/providers/Reveal';
import CartProvider from '@/components/providers/CartProvider';
import AuthProvider from '@/components/providers/AuthProvider';
import ChatWidget from '@/components/ui/ChatWidget';

export const metadata: Metadata = {
  metadataBase: new URL('https://lumivex.store'),
  title: 'Lumivex — Research Compounds for Laboratory Use | UK & EU Supplier',
  description:
    'Lumivex supplies laboratories with high-purity, batch-tested research peptides and reference compounds — manufactured in-house, third-party analysed, fully traceable. Research use only — not for human or veterinary use.',
  keywords: [
    'research peptides',
    'research reference materials',
    'laboratory research compounds',
    'certificate of analysis',
    'third-party tested peptides',
    'R&D compounds',
    'in vitro research materials',
  ],
  openGraph: {
    title: 'Lumivex — Research Compounds for Laboratory Use',
    description:
      'High-purity, batch-tested research peptides and reference compounds for laboratory R&D across the UK & EU. Research use only — not for human or veterinary use.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  // Draw edge-to-edge under notches; safe-area insets are handled in CSS.
  viewportFit: 'cover',
  themeColor: '#023d3d',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // `suppressHydrationWarning`: the reveal script in <head> stamps
  // `data-reveal-ready` on <html> before React hydrates, which React would
  // otherwise report as a server/client attribute mismatch.
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="preconnect"
          href="https://cdn.fontshare.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Switzer stands in for ABC Diatype — the grotesque carrying all UI
            and section headings at weight 400. */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700&display=swap"
          rel="stylesheet"
        />
        {/* Instrument Serif ↔ AG Items (hero display);
            DM Mono ↔ ABC Diatype Mono (uppercase labels and meta). */}
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* Arms the scroll-reveal hidden state before first paint, so nothing
            flashes in and then jumps back out. Deliberately inline and
            synchronous: if scripting is off this never runs, the hidden state
            never applies, and the page renders fully visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.setAttribute('data-reveal-ready','')",
          }}
        />
      </head>
      <body>
        <AuthProvider>
          <CartProvider>
            <SmoothScroll>{children}</SmoothScroll>
            <Reveal />
            <ChatWidget />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
