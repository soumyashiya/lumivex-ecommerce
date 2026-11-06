import { sendOrderConfirmationEmail } from '@/lib/email/order-email.js';
// Vendored from the VPS's shared-email/ because that directory lives outside
// this repository: it resolves on the VPS, but Vercel only ever clones the
// repo, so the old `../../../../../shared-email/...` import could not be
// resolved at build time and failed the deploy. See lib/email/README.md for
// what diverges from the shared copy and how to keep them in step.

type SendOrderConfirmationBody = {
  customer: { name: string; email: string };
  order: Record<string, unknown>;
};

// brand-config.js throws on an unrecognised domain rather than guessing — the
// right call for a module shared by a dozen sites, but it means every host
// this route can legitimately see has to resolve to a real brand key.
//
// Three hosts never match one. Local dev reports `localhost:4100`, and
// brand-config's "localhost" entry is a deliberately unbranded bucket shared
// by every frontend's dev server, so leaning on it would send Lumivex mail
// under whatever identity was last tested. Vercel serves preview deployments
// and the default production alias from *.vercel.app. None are brand keys.
//
// This copy only ever sends for Lumivex, so all three resolve to the real
// domain. A genuine custom domain still passes through untouched and is
// still validated against brand-config.
const LUMIVEX_DOMAIN = 'lumivexlabs.co';
const NON_PUBLIC_HOST_RE = /^(?:localhost|127\.0\.0\.1)(?::\d+)?$|\.vercel\.app$/i;

export async function POST(request: Request) {
  const { customer, order } = (await request.json()) as SendOrderConfirmationBody;

  const host = request.headers.get('host') ?? '';
  const domain = NON_PUBLIC_HOST_RE.test(host) ? LUMIVEX_DOMAIN : host;

  const result = await sendOrderConfirmationEmail({
    domain,
    customer,
    order,
  });

  return Response.json(result, { status: result.success ? 200 : 502 });
}
