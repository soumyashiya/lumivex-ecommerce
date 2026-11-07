import { FAQS } from '@/lib/data';
import Accordion from '@/components/ui/Accordion';
import { ButtonLink } from '@/components/ui/Button';
import { revealDelay } from '@/components/ui/reveal';

/**
 * Questions, with the heading held in a sticky left column while the list
 * scrolls past it — the reference system's two-column FAQ.
 */
export default function Faq() {
  return (
    <section id="faq" className="section-y bg-white">
      <div className="container-ag grid grid-cols-1 gap-xl desktop:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] desktop:gap-4xl">
        <div data-reveal className="desktop:sticky desktop:top-[140px] desktop:self-start">
          <h2 className="max-w-[12ch] text-h2 text-black">
            Questions, answered
          </h2>
          <p className="mt-lg max-w-[40ch] text-base text-grey-700">
            Can’t find what you need? Our catalogue team usually replies
            within the working day.
          </p>
          <ButtonLink
            href="/contact"
            variant="outline"
            size="lg"
            className="mt-lg"
          >
            Contact us
          </ButtonLink>
        </div>

        {/* Wrapper takes the reveal and stays the grid item, so the accordion
            keeps its own open/close animation untouched. */}
        <div data-reveal className={revealDelay(1)}>
          <Accordion
            items={FAQS.map((f) => ({ title: f.q, body: f.a }))}
            size="lg"
            defaultOpen={0}
          />
        </div>
      </div>
    </section>
  );
}
