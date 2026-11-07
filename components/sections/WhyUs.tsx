import Image from 'next/image';
import { QUALITY_CHECKS } from '@/lib/data';
import Accordion from '@/components/ui/Accordion';
import { revealDelay } from '@/components/ui/reveal';

const IMAGE = '/images/testfirst.png';

/**
 * Quality commitments: a ticked accordion on the left, a full-bleed image
 * panel on the right half of the viewport.
 *
 * Desktop scroll effect (as on the reference site): the photograph is
 * `position: fixed` to the viewport, and its panel carries
 * `clip-path: inset(0)`. Clip-path clips fixed descendants too, so the panel
 * acts as a window — the section scrolls normally while the image holds
 * still behind it and is revealed / covered as the window passes over.
 * No JavaScript, and nothing moves for reduced-motion users beyond normal
 * scrolling.
 *
 * Below desktop the image simply stacks under the copy.
 */
export default function WhyUs() {
  return (
    <section id="why-us" className="bg-white">
      <div className="flex flex-col desktop:min-h-[calc(100svh-var(--chrome-h))] desktop:flex-row">
        <div className="container-ag flex items-center py-3xl desktop:w-1/2 desktop:py-6xl desktop:pr-4xl">
          <div className="w-full max-w-[620px]">
            <h2 data-reveal className="text-h2 text-black">
              Tested first. Then it goes on sale.
            </h2>
            <p
              data-reveal
              className={`mt-lg text-base text-black tablet:text-md ${revealDelay(1)}`}
            >
              Nothing is listed until an independent lab has tested it. Purity,
              content, cold chain and custody are recorded for every batch, so
              every figure on a label has a certificate you can check.
            </p>

            {/* Wrapper carries the reveal so the accordion keeps owning its
                own open/close animation. The top margin moves here too — left
                on the accordion it would collapse through the wrapper. */}
            <div data-reveal className={`mt-xl ${revealDelay(2)}`}>
              <Accordion
                items={QUALITY_CHECKS.map((c) => ({ title: c.title, body: c.text }))}
                checkmarks
              />
            </div>
          </div>
        </div>

        {/* Mobile / tablet: ordinary stacked image */}
        <div data-reveal className="relative aspect-[4/5] bg-stone desktop:hidden">
          <Image
            src={IMAGE}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Desktop: clipped window over a viewport-fixed image */}
        <div
          aria-hidden
          className="relative hidden bg-stone [clip-path:inset(0)] desktop:block desktop:w-1/2"
        >
          <div className="fixed bottom-0 right-0 top-[var(--chrome-h)] w-1/2">
            <Image
              src={IMAGE}
              alt=""
              fill
              sizes="50vw"
              className="object-cover object-[center_40%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
