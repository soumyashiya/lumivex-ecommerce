'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

/**
 * Enquiry form for procurement teams. Labels sit above their fields rather
 * than floating inside them — on a form that asks for an institution and a
 * long enquiry, a persistent label is easier to scan than a clever one.
 */
export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="section-y bg-off-white">
      <div className="container-ag grid grid-cols-1 gap-xl desktop:grid-cols-2 desktop:gap-4xl">
        <div>
          <h2 className="max-w-[14ch] text-h2 text-green-deep">
            Talk to someone who knows the catalogue
          </h2>
          <p className="mt-lg max-w-[52ch] text-base text-grey-700">
            For laboratories and institutions sourcing research-grade peptides
            with full documentation and batch traceability. We reply within one
            working day.
          </p>

          <dl className="mt-xl space-y-md border-t border-[color:var(--border-hair)] pt-xl">
            <div>
              <dt className="label-mono">Email</dt>
              <dd className="mt-xxs">
                <a
                  href="mailto:research@lumivex.store"
                  className="text-md text-green underline-offset-4 transition-colors duration-200 ease-ag hover:text-green-light hover:underline"
                >
                  research@lumivex.store
                </a>
              </dd>
            </div>
            <div>
              <dt className="label-mono">Supply region</dt>
              <dd className="mt-xxs text-base text-grey-700">
                United Kingdom and European Union
              </dd>
            </div>
            <div>
              <dt className="label-mono">Compliance</dt>
              <dd className="mt-xxs max-w-[44ch] text-base text-grey-700">
                Research use only — not for human or veterinary use.
              </dd>
            </div>
          </dl>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="space-y-md"
        >
          <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
            <Field id="name" label="Full name" autoComplete="name" required />
            <Field
              id="institution"
              label="Institution"
              autoComplete="organization"
              required
            />
          </div>
          <Field
            id="email"
            label="Email address"
            type="email"
            autoComplete="email"
            required
          />
          <div>
            <label htmlFor="message" className="label-mono">
              Your enquiry
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="field mt-xs resize-y"
            />
          </div>

          <Button type="submit" size="lg" arrow>
            Send enquiry
          </Button>

          <p role="status" aria-live="polite" className="min-h-[20px] text-sm">
            {sent && (
              <span className="text-success">
                Enquiry sent. We’ll reply within one working day.
              </span>
            )}
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  type = 'text',
  ...rest
}: {
  id: string;
  label: string;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="label-mono">
        {label}
      </label>
      <input id={id} name={id} type={type} className="field mt-xs" {...rest} />
    </div>
  );
}
