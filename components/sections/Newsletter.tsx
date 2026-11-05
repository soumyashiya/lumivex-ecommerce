'use client';

import { useState } from 'react';
import { newsletter, ApiError } from '@/lib/api';
import { ArrowRight } from '@/components/ui/Icons';

/**
 * Newsletter sign-up. Renders against either the dark footer field or a
 * light page background; the submit control collapses into the input as an
 * arrow, as on the reference footer.
 *
 * Network behaviour is unchanged — this still posts through newsletter.subscribe.
 */
export default function Newsletter({
  tone = 'dark',
  source = 'footer',
}: {
  tone?: 'dark' | 'light';
  source?: string;
}) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'done' | 'duplicate'
  >('idle');
  const [error, setError] = useState('');

  const dark = tone === 'dark';

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    setError('');
    try {
      const res = await newsletter.subscribe({
        email,
        consent,
        website,
        source,
      });
      setStatus(res.already_subscribed ? 'duplicate' : 'done');
    } catch (err) {
      setStatus('idle');
      const msg =
        err instanceof ApiError && err.status === 429
          ? 'You’ve submitted a few times already — try again later.'
          : err instanceof Error
            ? err.message
            : 'Could not submit. Please try again.';
      setError(msg);
    }
  };

  if (status === 'done' || status === 'duplicate') {
    return (
      <p
        role="status"
        className={`rounded-card px-md py-smd text-base ${
          dark ? 'bg-white/10 text-white' : 'bg-success-bg text-success'
        }`}
      >
        {status === 'duplicate'
          ? 'You’re already on the list — thank you.'
          : 'You’re on the list. New batch documentation lands in your inbox as it publishes.'}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-smd">
      <div className="relative">
        <label htmlFor={`nl-email-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`nl-email-${source}`}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@lab.com"
          className={dark ? 'field-pill-dark pr-[52px]' : 'field pr-[52px]'}
        />
        <button
          type="submit"
          disabled={status === 'sending' || !consent}
          aria-label="Subscribe"
          className={`absolute right-xs top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-pill transition-colors duration-200 ease-ag disabled:cursor-not-allowed disabled:opacity-40 ${
            dark
              ? 'text-white hover:bg-white/15'
              : 'text-green hover:bg-grey-25'
          }`}
        >
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Honeypot — present for bots, hidden from people and assistive tech */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <label
        className={`flex items-start gap-sm text-sm ${
          dark ? 'text-white/70' : 'text-grey-500'
        }`}
      >
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-[3px] h-4 w-4 shrink-0 accent-green"
          required
        />
        <span>
          I confirm I am a research professional and consent to catalogue and
          documentation updates.
        </span>
      </label>

      {error && (
        <p role="alert" className={`text-sm ${dark ? 'text-white' : 'text-danger'}`}>
          {error}
        </p>
      )}
    </form>
  );
}
