/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // `turbopack.root` used to be widened two directories to reach the VPS's
  // shared-email/, which sat outside this repo. That module now lives in
  // lib/email/, so the default root resolves it — and the override is gone
  // with it, which also clears the "Both `outputFileTracingRoot` and
  // `turbopack.root` are set" build warning: on Vercel the widened path
  // escaped the project directory entirely.

  // nodemailer does dynamic requires that do not survive bundling. It is the
  // SMTP fallback in lib/email/helpers/mailer.js (Resend's HTTP API is tried
  // first), so it has to stay a real runtime require.
  serverExternalPackages: ['nodemailer'],
  // Trim production bundles by dropping console.* (keeps warnings/errors)
  compiler: {
    removeConsole: { exclude: ['error', 'warn'] },
  },
  images: {
    // Optimize on demand: resize to the requested size and serve modern
    // formats. Quality stays high (set per-image where clarity matters).
    formats: ['image/avif', 'image/webp'],
    // Next 16 only generates the quality levels listed here. 90 is used by the
    // product gallery, where label text has to stay legible when zoomed; 100
    // by the hero stills, which fill the viewport and show carton print at
    // close to 1:1 — anything lossy is visible in the packaging artwork.
    qualities: [75, 90, 100],
    // Cache optimized variants aggressively (1 year).
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
