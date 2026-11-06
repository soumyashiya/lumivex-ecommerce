import Image from 'next/image';
import { ABOUT, getProduct } from '@/lib/data';
import { ButtonLink } from '@/components/ui/Button';
import { Check, CheckDisc } from '@/components/ui/Icons';
import Logo from '@/components/ui/Logo';

/**
 * Sections of /about, laid out on drinkag1.com/what-is-ag1: serif title and
 * intro, a stone panel (heading · product · checklist), a spec table beside
 * the kit, a "what we are not" band, a comparison table with the brand column
 * filled green, and a split closing panel.
 */

export function AboutIntro() {
  return (
    <section className="container-ag pb-3xl pt-3xl desktop:pb-8xl desktop:pt-8xl">
      <h1 className="font-serif text-[40px] font-normal leading-[0.95] text-black tablet:text-[56px] desktop:text-[72px]">
        {ABOUT.title}
      </h1>
      <p className="mt-lg max-w-[62ch] text-md text-black desktop:text-lg">{ABOUT.intro}</p>
    </section>
  );
}

/** Stone panel: heading left, the pen standing upright centre, checklist right. */
export function AboutDocumented() {
  const { heading, body, checks, image } = ABOUT.documented;
  return (
    <section className="container-ag">
      <div className="grid items-center gap-xl overflow-hidden rounded-card bg-stone px-lg py-2xl tablet:px-2xl desktop:grid-cols-[1fr_minmax(0,1fr)_1fr] desktop:gap-lg desktop:px-7xl desktop:py-8xl">
        <div>
          <h2 className="text-h2 text-black">
            {heading.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-lg max-w-[34ch] text-md text-black">{body}</p>
        </div>

        <div className="relative mx-auto aspect-[3/5] w-[200px] tablet:w-[240px] desktop:w-full desktop:max-w-[300px]">
          {/* The cut-out lies diagonally; stood upright it reads like the
              reference's bottle. Multiply drops any white matte into the stone. */}
          <Image
            src={encodeURI(image)}
            alt="A sealed Lumivex research pen"
            fill
            sizes="(max-width: 1023px) 240px, 300px"
            className="rotate-[-62deg] scale-[1.65] object-contain mix-blend-multiply"
          />
        </div>

        <ul className="desktop:justify-self-end">
          {checks.map((c) => (
            <li
              key={c}
              className="flex items-center gap-smd border-b border-[color:var(--border-soft)] py-lg desktop:min-w-[300px]"
            >
              <CheckDisc size={24} className="shrink-0 text-bright" />
              <span className="label-mono text-black">{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** "What's in a kit?" — every value read from the product's Janoshik report. */
export function AboutKit() {
  const product = getProduct(ABOUT.kit.slug);
  if (!product?.janoshik) return null;
  const report = product.janoshik;
  const compound = report.compounds?.[0];
  const storage = product.specs.find((s) => s.label === 'Storage')?.value;

  const rows = [
    { label: 'Compound', value: compound?.name },
    { label: 'Assayed content', value: compound?.content },
    { label: 'Concentration', value: compound?.concentration },
    { label: 'Fill volume', value: report.fillVolume },
    { label: 'Purity', value: report.purity },
    { label: 'Batch number', value: report.batchNumber },
    { label: 'Tested by', value: 'Janoshik Analytical' },
    { label: 'Storage', value: storage },
  ].filter((r): r is { label: string; value: string } => Boolean(r.value));

  return (
    <section className="container-ag py-3xl desktop:py-8xl">
      <div className="grid items-center gap-2xl desktop:grid-cols-2 desktop:gap-4xl">
        <div>
          <h2 className="text-h2 text-black">{ABOUT.kit.heading}</h2>
          <p className="mt-lg max-w-[46ch] text-md text-black">
            {ABOUT.kit.body}{' '}
            <span className="text-grey-500">{product.name}.</span>
          </p>

          <dl className="mt-xl desktop:mt-2xl">
            {rows.map((r) => (
              <div
                key={r.label}
                className="flex items-baseline justify-between gap-lg border-b border-[color:var(--border-soft)] py-md"
              >
                <dt className="text-sm uppercase text-black">{r.label}</dt>
                <dd className="text-right text-sm text-black">{r.value}</dd>
              </div>
            ))}
          </dl>

          {report.verifyUrl && (
            <a
              href={report.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-lg inline-block text-sm text-black underline decoration-cool-300 underline-offset-4 transition-colors duration-200 ease-ag hover:decoration-black"
            >
              Verify this report on janoshik.com
            </a>
          )}
        </div>

        {product.tile && (
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={product.tile.src}
              alt={`${product.name} kit`}
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-contain"
            />
          </div>
        )}
      </div>
    </section>
  );
}

/** Three "not" statements on an off-white band, each under a struck circle. */
export function AboutNot() {
  return (
    <section className="bg-off-white py-3xl desktop:py-8xl">
      <div className="container-ag">
        <h2 className="text-h2 text-black">{ABOUT.not.heading}</h2>
        <ul className="mt-xl grid gap-xl tablet:grid-cols-3 desktop:mt-3xl desktop:gap-4xl">
          {ABOUT.not.items.map((item) => (
            <li key={item.title}>
              <NotIcon />
              <h3 className="mt-lg text-xl text-black">{item.title}</h3>
              <p className="mt-sm max-w-[38ch] text-base text-grey-700">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function NotIcon() {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" aria-hidden className="text-green">
      <circle cx="23" cy="23" r="21.5" stroke="currentColor" strokeWidth="2" />
      <path d="M8 38 38 8" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

/** Comparison table — the Lumivex column is a solid green band, rounded on top. */
export function AboutCompare() {
  const { heading, columns, rows, note } = ABOUT.compare;
  return (
    <section className="container-ag py-3xl desktop:py-8xl">
      <h2 className="text-h2 text-black">{heading}</h2>

      <div className="relative -mx-lg mt-xl overflow-x-auto px-lg tablet:mx-0 tablet:px-0 desktop:mt-3xl">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <caption className="sr-only">
            What Lumivex documents for every batch, against other kinds of listing
          </caption>
          <thead>
            <tr>
              <th scope="col" className="w-[28%]">
                <span className="sr-only">Item</span>
              </th>
              <th scope="col" className="w-[18%] rounded-t-xl bg-green py-xl text-center">
                <Logo size="sm" className="text-white" />
              </th>
              {columns.map((c) => (
                <th key={c} scope="col" className="w-[18%] py-xl text-center text-base font-normal text-black">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.label} className="border-t border-[color:var(--border-soft)]">
                <th scope="row" className="py-lg pr-md text-base font-normal text-black">
                  {row.label}
                </th>
                <td
                  className={`border-t border-white/15 bg-green py-lg text-center ${
                    i === rows.length - 1 ? 'rounded-b-xl' : ''
                  }`}
                >
                  <CheckDisc size={28} className="inline-block text-bright" />
                  <span className="sr-only">Yes</span>
                </td>
                {row.marks.map((m, j) => (
                  <td key={columns[j]} className="py-lg text-center">
                    {m ? (
                      <CheckDisc size={28} className="inline-block text-bright" />
                    ) : (
                      <span className="inline-block size-[28px] rounded-pill border border-grey-200 align-middle" />
                    )}
                    <span className="sr-only">{m ? 'Yes' : 'Not routinely documented'}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-lg max-w-[60ch] text-sm text-grey-500">{note}</p>
    </section>
  );
}

/** Split close: product still on stone left, deep-green order panel right. */
export function AboutStart() {
  const { heading, eyebrow, image, included, cta, href, ticks } = ABOUT.start;
  return (
    <section className="grid bg-green-deep desktop:grid-cols-2">
      <div className="relative min-h-[320px] bg-stone tablet:min-h-[440px]">
        <Image
          src={image}
          alt="Lumivex retatrutide and tirzepatide research kits"
          fill
          sizes="(max-width: 1023px) 100vw, 50vw"
          className="object-contain p-xl [filter:drop-shadow(0_28px_32px_rgba(15,46,47,0.28))_drop-shadow(0_6px_8px_rgba(15,46,47,0.18))] desktop:p-4xl"
        />
      </div>

      <div className="flex flex-col justify-center px-lg py-3xl text-white tablet:px-[56px] desktop:px-8xl desktop:py-8xl">
        <h2 className="max-w-[14ch] text-h2">{heading}</h2>

        <p className="label-mono mt-xl border-t border-white/40 pt-lg text-white">{eyebrow}</p>
        <ul className="mt-sm">
          {included.map((item) => (
            <li key={item.title} className="flex items-baseline justify-between gap-lg py-smd">
              <span>
                <span className="block text-lg">{item.title}</span>
                <span className="block text-sm text-white/75">{item.text}</span>
              </span>
              <span className="shrink-0 text-lg">Included</span>
            </li>
          ))}
        </ul>

        <ButtonLink href={href} variant="light" size="lg" arrow full className="mt-xl">
          {cta}
        </ButtonLink>

        <ul className="mt-lg flex flex-wrap justify-center gap-x-lg gap-y-xs text-sm">
          {ticks.map((t) => (
            <li key={t} className="flex items-center gap-xs">
              <Check size={14} />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
