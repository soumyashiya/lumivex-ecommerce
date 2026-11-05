import Link from 'next/link';
import { FOOTER_COLUMNS, RESEARCH_DISCLAIMER } from '@/lib/data';
import Newsletter from '@/components/sections/Newsletter';
import Logo from '@/components/ui/Logo';

/**
 * Footer on the deepest green in the palette. Link columns first, then the
 * oversized wordmark set against the legal copy — the reference system's
 * closing arrangement, where the compliance text is given real space rather
 * than shrunk into a single line.
 */
export default function Footer() {
  return (
    <footer className="bg-green-deep text-white" data-dark>
      <div className="container-ag py-2xl tablet:py-5xl">
        <div className="grid grid-cols-2 gap-x-lg gap-y-xl tablet:grid-cols-3 desktop:grid-cols-6">
          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="text-md font-medium text-white">{col.heading}</h2>
              <ul className="mt-smd space-y-sm">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-base text-white/80 transition-colors duration-200 ease-ag hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 tablet:col-span-3 desktop:col-span-1">
            <h2 className="text-md font-medium text-white">Newsletter</h2>
            <p className="mt-smd text-base text-white/80">
              New batches and certificates, as they publish.
            </p>
            <div className="mt-smd">
              <Newsletter tone="dark" source="footer" />
            </div>
          </div>
        </div>

        {/* Wordmark beside the compliance copy */}
        <div className="mt-2xl grid grid-cols-1 gap-xl border-t border-white/20 pt-xl desktop:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] desktop:gap-4xl desktop:pt-2xl">
          <div className="text-white/90">
            <Logo size="lg" />
          </div>

          <div className="space-y-md">
            <p className="rounded-sm border border-white/35 p-md text-sm leading-5 text-white/90">
              {RESEARCH_DISCLAIMER}
            </p>
            <p className="text-sm leading-5 text-white/70">
              Lumivex has never operated on any social media platform. Our only
              official site is lumivex.store — treat any other seller using this
              name as unauthorised.
            </p>
            <p className="text-sm leading-5 text-white/70">
              Certificates of analysis are issued by Janoshik Analytical and
              are verifiable on the issuing laboratory’s own domain. Figures
              quoted on product pages refer to the batch stated on the label.
            </p>
          </div>
        </div>

        <div className="mt-xl flex flex-col gap-sm border-t border-white/20 pt-md text-sm text-white/60 tablet:flex-row tablet:items-center tablet:justify-between">
          <p>© 2026 Lumivex. All rights reserved.</p>
          <p className="font-mono text-xs uppercase tracking-label">
            Research use only — not for human or veterinary use
          </p>
        </div>
      </div>
    </footer>
  );
}
