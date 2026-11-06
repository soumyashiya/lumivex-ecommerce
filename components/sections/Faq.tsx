import { FAQS } from '@/lib/data';
import Accordion from '@/components/ui/Accordion';
import { ButtonLink } from '@/components/ui/Button';

/**
 * Questions, with the heading held in a sticky left column while the list
 * scrolls past it — the reference system's two-column FAQ.
 */
export default function Faq() {
  return (
    <section id="faq" className="section-y bg-white">
      <div className="container-ag grid grid-cols-1 gap-xl desktop:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] desktop:gap-4xl">
        <div className="desktop:sticky desktop:top-[140px] desktop:self-start">
          <h2 className="max-w-[12ch] text-h2 text-black">
            Questions, answered
          </h2>
          <p className="mt-lg max-w-[40ch] text-base text-grey-700">
            Anything not covered here, message us and a researcher will reply —
            usually within the working day.
          </p>
          <ButtonLink
            href="/contact"
            variant="outline"
            size="lg"
            className="mt-lg"
          >
            Contact the lab
          </ButtonLink>
        </div>

        <Accordion
          items={FAQS.map((f) => ({ title: f.q, body: f.a }))}
          size="lg"
          defaultOpen={0}
        />
      </div>
    </section>
  );
}
