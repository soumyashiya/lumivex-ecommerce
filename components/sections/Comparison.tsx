import Image from 'next/image';
import { PRODUCTS } from '@/lib/data';
import { CheckDisc } from '@/components/ui/Icons';
import Logo from '@/components/ui/Logo';

/**
 * The catalogue as one table, laid out like the reference "Replace up to 9
 * supplements" block: heading, a borderless table whose green ticks do the
 * visual work, ruled only under the header and above the total, and a single
 * product shot opposite.
 *
 * Every figure is read from PRODUCTS — the tick and the verified content come
 * from each product's Janoshik report, so a line without a published report
 * shows a dash rather than a claim.
 */

// Total assayed mass across every compound in the device, from the report.
const verifiedMg = (p: (typeof PRODUCTS)[number]) => {
  const compounds = p.janoshik?.compounds ?? [];
  if (!compounds.length) return null;
  const total = compounds.reduce((sum, c) => sum + parseFloat(c.content), 0);
  return `${Number(total.toFixed(2))} mg`;
};

export default function Comparison() {
  const assayed = PRODUCTS.filter((p) => verifiedMg(p)).length;
  const from = Math.min(...PRODUCTS.map((p) => p.priceValue));

  return (
    <section className="section-y bg-white">
      <div className="container-ag">
        <div className="grid grid-cols-1 items-center gap-xl desktop:grid-cols-2 desktop:gap-4xl">
          <div>
            <h2 className="max-w-[16ch] text-h2 text-black">
              {PRODUCTS.length} research lines, one verified source
            </h2>

            <table className="mt-xl w-full border-collapse text-left desktop:mt-2xl">
              <caption className="sr-only">
                Every Lumivex line, whether its batch carries a published
                Janoshik report, the content that report verified, and the
                price.
              </caption>
              <thead>
                <tr className="border-b border-black">
                  <th scope="col" className="py-smd pr-sm text-sm font-medium text-black tablet:text-base">
                    Research line
                  </th>
                  <th scope="col" className="w-[88px] py-smd text-center tablet:w-[104px]">
                    <Logo size="sm" className="text-black" />
                    <span className="sr-only">Janoshik assayed</span>
                  </th>
                  <th scope="col" className="w-[96px] py-smd text-center text-sm font-medium leading-tight text-black tablet:w-[120px] tablet:text-base">
                    Verified
                    <br />
                    content
                  </th>
                  <th scope="col" className="w-[64px] py-smd text-right text-sm font-medium text-black tablet:w-[80px] tablet:text-base">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {PRODUCTS.map((p) => {
                  const mg = verifiedMg(p);
                  return (
                    <tr key={p.id}>
                      <td className="py-smd pr-sm text-sm font-medium text-black tablet:text-base">
                        {p.name}
                      </td>
                      <td className="py-smd text-center">
                        {mg ? (
                          <CheckDisc size={22} className="mx-auto text-bright" />
                        ) : (
                          <span className="text-grey-500" aria-label="No published report">
                            —
                          </span>
                        )}
                      </td>
                      <td className="py-smd text-center text-sm text-black tablet:text-base">
                        {mg ?? <span className="text-grey-500">—</span>}
                      </td>
                      <td className="py-smd text-right text-sm text-black tablet:text-base">
                        {p.price}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t border-black">
                  <th scope="row" className="py-smd pr-sm text-left text-sm font-medium text-black tablet:text-base">
                    Lines with a published report
                  </th>
                  <td className="py-smd text-center text-sm font-medium text-black tablet:text-base">
                    {assayed} of {PRODUCTS.length}
                  </td>
                  <td />
                  <td className="whitespace-nowrap py-smd text-right text-sm font-medium text-black tablet:text-base">
                    From ${from}
                  </td>
                </tr>
              </tfoot>
            </table>

            <p className="mt-lg max-w-prose font-mono text-xs uppercase leading-5 tracking-label text-grey-500">
              Verified content is the total assayed mass reported by Janoshik
              Analytical for the listed batch. For research use only.
            </p>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-stone shadow-[0_30px_60px_-30px_rgba(15,46,47,0.45)]">
            <Image
              src="/images/shop/retatrutide-20.webp"
              alt="Sealed ALLUVI Retatrutide 20 mg carton with its pre-filled research pen"
              fill
              sizes="(max-width: 1023px) 100vw, 46vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
