'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { aiChat, type ChatMessage, ApiError } from '@/lib/api';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch suggestions once on first open.
  useEffect(() => {
    if (!open || suggestions.length) return;
    aiChat
      .suggestions()
      .then((res) => setSuggestions(res.suggestions))
      .catch(() => {/* non-fatal */});
  }, [open, suggestions.length]);

  // Auto-scroll to latest.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, sending]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    if (trimmed.length > 1000) return;

    const next = [...messages, { role: 'user', text: trimmed } as ChatMessage];
    setMessages(next);
    setInput('');
    setSending(true);

    try {
      const res = await aiChat.send(trimmed, messages);
      setMessages([...next, { role: 'assistant', text: res.reply }]);
    } catch (err) {
      const msg =
        err instanceof ApiError && err.status === 429
          ? 'Too many messages. Please wait a moment.'
          : err instanceof Error
            ? err.message
            : 'Sorry, something went wrong.';
      setMessages([...next, { role: 'assistant', text: msg }]);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close assistant' : 'Open assistant'}
        className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-pill bg-green text-white shadow-[0_20px_50px_-15px_rgba(28,26,23,0.55)] transition-colors hover:bg-green-hover"
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
          </svg>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-[60] flex h-[560px] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[12px] border border-[color:var(--border-soft)] bg-white shadow-[0_30px_80px_-20px_rgba(28,26,23,0.45)]"
          >
            <div className="border-b border-[color:var(--border-soft)] px-5 py-4">
              <p className="text-[11px] uppercase tracking-label text-grey-500">
                Research assistant
              </p>
              <p className="mt-0.5 text-[13px] font-medium text-black">
                Ask about product specifications, certificates, or orders
              </p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-grey-500">
                This assistant cannot advise on use, dosing or administration.
                All products are research materials — not for human or
                veterinary use.
              </p>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-auto px-5 py-4">
              {messages.length === 0 && suggestions.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-wider text-grey-500">
                    Try asking
                  </p>
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="block w-full rounded-smd border border-[color:var(--border-soft)] bg-off-white px-3 py-2 text-left text-[12px] text-grey-700 hover:border-grey-100"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-[10px] px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-green text-white'
                        : 'bg-off-white text-black'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {sending && (
                <div className="flex justify-start">
                  <div className="rounded-[10px] bg-off-white px-3.5 py-2.5">
                    <span className="inline-flex gap-1">
                      <Dot delay="0s" />
                      <Dot delay="0.15s" />
                      <Dot delay="0.3s" />
                    </span>
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="border-t border-[color:var(--border-soft)] p-3"
            >
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  maxLength={1000}
                  placeholder="Ask anything…"
                  className="min-w-0 flex-1 rounded-pill border border-[color:var(--border-soft)] bg-white px-4 py-2.5 text-sm text-black outline-none focus:border-green"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || sending}
                  className="shrink-0 rounded-pill bg-green px-4 text-[13px] font-medium text-white hover:bg-green-hover disabled:opacity-60"
                >
                  Send
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 animate-bounce rounded-pill bg-green-deep"
      style={{ animationDelay: delay }}
    />
  );
}
