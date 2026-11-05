import { PROCESS_STEPS, STATS } from '@/lib/data';

/**
 * Who we are, followed by the three stages between synthesis and dispatch.
 * The steps are numbered because they genuinely are a sequence — each one
 * has to complete before the next can start.
 *
 * `stack-over` is what lets this ride up over the parked section above — see
 * `.stack-pin` in globals.css. The top radius is the tell that one surface is
 * sliding over another; without it the overlap is invisible and the effect
 * just reads as a stall.
 */
export default function About() {
  return (
    <section
      id="about"
      className="stack-over section-y bg-off-white desktop:rounded-t-2xl"
    >
      <div className="container-ag">
        <div className="grid grid-cols-1 gap-lg desktop:grid-cols-2 desktop:gap-4xl">
          <h2 className="max-w-[16ch] text-h2 text-green-deep">
            Purity verified. Paperwork included.
          </h2>
          <div className="space-y-md">
            <p className="max-w-prose text-base text-grey-700">
              Lumivex supplies laboratories across the UK and EU with
              research-grade peptides and reference compounds. We built the
              company around being unremarkable about the basics: synthesise
              in-house, test independently, document everything, and answer
              the phone.
            </p>
            <p className="max-w-prose text-base text-grey-700">
              Every compound is produced under controlled clean-room
              conditions, assayed by a third-party laboratory, and released
              with a certificate tied to its own batch number. Supplied
              strictly for in vitro research.
            </p>
          </div>
        </div>

        {/* Measures */}
        <dl className="mt-2xl grid grid-cols-1 gap-lg border-t border-[color:var(--border-hair)] pt-xl sm:grid-cols-3 desktop:mt-5xl">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-[clamp(2.5rem,5vw,3.75rem)] leading-none tracking-tighter text-green-deep">
                  {stat.value}
                  <span className="text-earth">{stat.suffix}</span>
                </span>
                <span className="mt-sm block max-w-[26ch] text-sm text-grey-500">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        {/* Sequence */}
        <ol className="mt-2xl grid grid-cols-1 gap-lg border-t border-[color:var(--border-hair)] pt-xl tablet:grid-cols-3 desktop:mt-5xl">
          {PROCESS_STEPS.map((step, i) => (
            <li key={step.title}>
              <span className="font-mono text-xs uppercase tracking-label text-earth">
                Step {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-sm text-h3 text-green-deep">{step.title}</h3>
              <p className="mt-sm max-w-[40ch] text-base text-grey-700">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
