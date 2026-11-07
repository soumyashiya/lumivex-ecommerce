import { TRUST_POINTS } from '@/lib/data';
import { Check } from '@/components/ui/Icons';
import { revealDelay } from '@/components/ui/reveal';

/**
 * Four reassurance points directly under the hero. Hairline dividers run
 * between cells rather than around them, so the strip reads as one
 * continuous band rather than four competing boxes.
 */
export default function TrustStrip() {
  return (
    <section
      aria-label="Why laboratories order from Lumivex"
      className="border-b border-[color:var(--border-soft)] bg-white"
    >
      <div className="container-ag">
        <ul
          className="grid grid-cols-1 divide-y divide-[color:var(--border-soft)]
                     sm:grid-cols-2 sm:divide-x
                     desktop:grid-cols-4 desktop:divide-y-0"
        >
          {TRUST_POINTS.map((point, i) => (
            <li
              key={point.title}
              data-reveal
              className={`flex gap-smd py-md sm:px-lg sm:py-mdl sm:first:pl-0 desktop:py-lg desktop:first:pl-0 desktop:last:pr-0 ${revealDelay(i)}`}
            >
              <Check size={20} className="mt-xxs shrink-0 text-green" />
              <div>
                <h3 className="text-base font-medium tracking-tight text-black">
                  {point.title}
                </h3>
                <p className="mt-xxs max-w-[36ch] text-sm text-grey-500">
                  {point.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
