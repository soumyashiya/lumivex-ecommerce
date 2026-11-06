'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { CONTACT } from '@/lib/data';
import Button from '@/components/ui/Button';
import Newsletter from '@/components/sections/Newsletter';
import { ArrowRight } from '@/components/ui/Icons';

/**
 * /contact, in the same frame as /about: serif title and intro, then the
 * details on a stone panel beside the enquiry form, then the batch list.
 *
 * There is no enquiry endpoint in the backend, so the form does not pretend
 * to send anything: it composes the enquiry into the visitor's own email
 * client, addressed to the research inbox, ready to send.
 */

export function ContactIntro() {
  return (
    <section className="container-ag pb-3xl pt-3xl desktop:pb-5xl desktop:pt-8xl">
      <h1 className="font-serif text-[40px] font-normal leading-[0.95] text-black tablet:text-[56px] desktop:text-[72px]">
        {CONTACT.title}
      </h1>
      <p className="mt-lg max-w-[62ch] text-md text-black desktop:text-lg">{CONTACT.intro}</p>
    </section>
  );
}

export function ContactMain() {
  return (
    <section className="container-ag pb-3xl desktop:pb-8xl">
      <div className="grid gap-xl desktop:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] desktop:gap-4xl">
        <ContactDetails />
        <EnquiryForm />
      </div>
    </section>
  );
}

function ContactDetails() {
  return (
    <aside className="flex flex-col justify-between gap-2xl rounded-card bg-stone p-lg tablet:p-2xl">
      <div>
        <p className="label-mono">Email</p>
        <a
          href={`mailto:${CONTACT.email}`}
          className="mt-xs inline-block text-xl text-green underline decoration-transparent underline-offset-4 transition-colors duration-200 ease-ag hover:decoration-green tablet:text-2xl"
        >
          {CONTACT.email}
        </a>

        <dl className="mt-xl">
          {CONTACT.details.map((d) => (
            <div key={d.label} className="border-t border-[color:var(--border-soft)] py-md">
              <dt className="label-mono">{d.label}</dt>
              <dd className="mt-xxs text-base text-black">{d.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <nav aria-label="Help with an order">
        <p className="label-mono">Looking for something else?</p>
        <ul className="mt-sm">
          {CONTACT.shortcuts.map((s) => (
            <li key={s.href} className="border-b border-[color:var(--border-soft)]">
              <Link
                href={s.href}
                data-touch-target
                className="group flex items-center justify-between py-smd text-base text-black transition-colors duration-200 ease-ag hover:text-green"
              >
                {s.label}
                <ArrowRight size={16} />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

function EnquiryForm() {
  const [opened, setOpened] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? '').trim();
    const order = get('order');
    const body = [
      get('message'),
      '',
      '—',
      `Name: ${get('name')}`,
      `Institution: ${get('institution')}`,
      `Reply to: ${get('email')}`,
      order && `Order number: ${order}`,
    ]
      .filter((l) => l !== '')
      .join('\n');
    const subject = `${get('topic')} — ${get('institution')}`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-md">
      <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
        <Field id="name" label="Full name" autoComplete="name" required />
        <Field id="institution" label="Institution" autoComplete="organization" required />
      </div>
      <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
        <Field id="email" label="Email address" type="email" autoComplete="email" required />
        <div>
          <label htmlFor="topic" className="label-mono">
            Topic
          </label>
          <select id="topic" name="topic" className="field mt-xs" defaultValue={CONTACT.topics[0]}>
            {CONTACT.topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
      <Field id="order" label="Order number (optional)" />
      <div>
        <label htmlFor="message" className="label-mono">
          Your enquiry
        </label>
        <textarea id="message" name="message" rows={6} required className="field mt-xs resize-y" />
      </div>

      <Button type="submit" size="lg" arrow>
        Write the email
      </Button>

      <p role="status" aria-live="polite" className="min-h-[20px] text-sm text-grey-700">
        {opened ? (
          <>
            Your email app should now be open with the enquiry filled in — press send there. If
            nothing opened, write to{' '}
            <a href={`mailto:${CONTACT.email}`} className="text-green underline underline-offset-4">
              {CONTACT.email}
            </a>
            .
          </>
        ) : (
          'This opens your own email app with the enquiry filled in, ready to send.'
        )}
      </p>
    </form>
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

/** The batch-list signup that used to sit on the homepage contact block. */
export function ContactNewsletter() {
  const { eyebrow, heading, body } = CONTACT.newsletter;
  return (
    <section className="bg-off-white py-3xl desktop:py-7xl">
      <div className="container-ag grid grid-cols-1 items-center gap-lg desktop:grid-cols-2 desktop:gap-4xl">
        <div>
          <p className="label-mono">{eyebrow}</p>
          <h2 className="mt-smd max-w-[20ch] text-h3 text-black">{heading}</h2>
          <p className="mt-smd max-w-[48ch] text-base text-grey-700">{body}</p>
        </div>
        <Newsletter tone="band" source="contact" />
      </div>
    </section>
  );
}
