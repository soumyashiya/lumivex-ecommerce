import ShopHeader from '@/components/shop/ShopHeader';
import Footer from '@/components/sections/Footer';

export type PolicySection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  note?: string;
};

type Props = {
  /** Small category label above the title — "Legal", "Media". */
  eyebrow: string;
  title: string;
  intro?: string[];
  updated?: string;
  sections: PolicySection[];
};

/**
 * Shared shell for the policy and press pages: a deep-green masthead over a
 * single measured column. Body copy is held under ~68 characters so long
 * legal text stays readable on wide screens.
 */
export default function PolicyLayout({
  eyebrow,
  title,
  intro,
  updated,
  sections,
}: Props) {
  return (
    <>
      <ShopHeader />
      <main className="bg-white">
        <section className="bg-green-deep section-y text-white">
          <div className="container-ag">
            <p className="font-mono text-xs uppercase tracking-label text-white/70">
              {eyebrow}
            </p>
            <h1 className="mt-smd max-w-[20ch] text-h2">{title}</h1>
            {updated && (
              <p className="mt-lg font-mono text-xs uppercase tracking-label text-white/70">
                Last updated {updated}
              </p>
            )}
          </div>
        </section>

        <section className="section-y">
          <div className="container-ag">
            {intro && intro.length > 0 && (
              <div className="max-w-prose space-y-md">
                {intro.map((p, i) => (
                  <p key={i} className="text-base text-grey-700 tablet:text-md">
                    {p}
                  </p>
                ))}
              </div>
            )}

            <div className="mt-xl max-w-prose space-y-xl">
              {sections.map((s) => (
                <section key={s.heading}>
                  <h2 className="text-h3 text-black">{s.heading}</h2>
                  {s.paragraphs?.map((p, i) => (
                    <p key={i} className="mt-smd text-base text-grey-700">
                      {p}
                    </p>
                  ))}
                  {s.list && (
                    <ul className="mt-smd space-y-xs pl-mdl">
                      {s.list.map((item, i) => (
                        <li
                          key={i}
                          className="list-disc text-base text-grey-700 marker:text-green"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.note && (
                    <p className="mt-smd rounded-card bg-grey-25 p-md text-base text-grey-700">
                      <strong className="font-medium text-black">Note: </strong>
                      {s.note}
                    </p>
                  )}
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
