import Image from 'next/image';
import { QUALITY_CHECKS } from '@/lib/data';
import Accordion from '@/components/ui/Accordion';

const IMAGE = '/images/quality-pipette.jpg';

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
            <h2 className="text-h2 text-black">
              Independently tested. Documented to the batch.
            </h2>
            <p className="mt-lg text-base text-black tablet:text-md">
              Purity, concentration, cold chain and custody are recorded for
              every batch we release. Where a figure appears on a label, there
              is a measurement behind it and a certificate you can check.
            </p>

            <Accordion
              items={QUALITY_CHECKS.map((c) => ({ title: c.title, body: c.text }))}
              checkmarks
              className="mt-xl"
            />
          </div>
        </div>

        {/* Mobile / tablet: ordinary stacked image */}
        <div className="relative aspect-[4/5] bg-stone desktop:hidden">
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
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
