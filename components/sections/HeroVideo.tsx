'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  src: string;
  className?: string;
  /** False while the slide is off-screen, so idle slides don't decode. */
  active?: boolean;
};

/**
 * The hero's still life, as a short silent loop.
 *
 * Playback is driven from script rather than the `autoplay` attribute, so the
 * clip can never move before we've read the visitor's motion preference or
 * before its slide is the one on show. When reduced motion is preferred it
 * holds on its first frame and gains controls, so the footage is still
 * reachable without the hero animating unasked.
 */
export default function HeroVideo({ src, className, active = true }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');

    const apply = () => {
      const video = ref.current;
      setReduced(query.matches);
      if (!video) return;

      if (query.matches || !active) {
        video.pause();
        if (query.matches) video.currentTime = 0;
      } else {
        // Rejected play() just leaves the first frame showing, which is a fine
        // resting state — nothing to recover from.
        void video.play().catch(() => {});
      }
    };

    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, [active]);

  return (
    <video
      ref={ref}
      className={className}
      muted
      loop
      playsInline
      preload="metadata"
      controls={reduced && active}
      aria-hidden={reduced && active ? undefined : true}
      tabIndex={reduced && active ? undefined : -1}
    >
      {/* H.264 transcode of hero-update.mp4. The original is HEVC, which
          Firefox can't decode at all and Chrome only plays where the platform
          supplies a hardware decoder — so it must not be the source here. */}
      <source src={src} type="video/mp4" />
    </video>
  );
}
