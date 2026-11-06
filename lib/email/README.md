# lib/email — vendored copy of `shared-email/`

This is the VPS's `shared-email/` order-confirmation service, copied into the
repository.

## Why it was copied

`shared-email/` lives *outside* this repo (`/var/www/shared-email/` on the VPS,
`git-update/shared-email/` locally) and is shared by every frontend domain.
The API route reached it with a relative path that climbed five directories:

```
import { sendOrderConfirmationEmail } from '../../../../../shared-email/order-email.js';
```

That resolves on the VPS. Vercel only clones the repository, so nothing exists
five directories up and the build failed with `Module not found`. For a Vercel
build to succeed the code has to be inside the repo — no alias or tracing
option changes that.

## What diverges from the shared copy

Three changes, all forced by running as a bundled serverless function rather
than a long-lived Node process:

| File | Shared copy | Here | Why |
|---|---|---|---|
| `templates/` | `order-confirmation.html`, read via `fs.readFile` | `order-confirmation.js`, exported as a string | `__dirname` does not survive bundling and the HTML is never traced into the lambda. The markup is byte-for-byte identical. |
| `order-email.js` | `dotenv.config()` against a sibling `.env` | no dotenv | Credentials come from Vercel project env vars in production and `.env.local` via Next's loader in development. There is no `.env` in this repo, and secrets must not be committed to one. |
| `helpers/mailer.js` | bundled normally | declared in `serverExternalPackages` | `nodemailer` uses dynamic requires that break when bundled. |

`brand-config.js` and `helpers/format.js` are unmodified.

## Keeping the two in step

This copy no longer tracks the shared module, so **a fix made to
`/var/www/shared-email/` will not reach this site.** When that module changes,
re-copy the changed file here and re-apply the divergences above. If the two
drift often enough to hurt, promote `shared-email/` to its own git repository
and depend on it from `package.json` instead.

## Required environment variables

Set these on the Vercel project (and in `.env.local` for development). The
mailer tries Resend first and falls back to SMTP, so **either** the Resend key
**or** the SMTP pair is sufficient — configuring both gives you the fallback.

```
RESEND_API_KEY=           # primary provider

SMTP_HOST=smtp.gmail.com  # fallback, used only if Resend is absent or fails
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=
EMAIL_PASS=
```

A per-domain SMTP override is also supported, which lets Lumivex send from its
own mailbox rather than the shared one — most providers, Gmail included,
require the authenticated account to match the `From` address:

```
SMTP_HOST_LUMIVEXLABS_CO=
SMTP_PORT_LUMIVEXLABS_CO=
SMTP_SECURE_LUMIVEXLABS_CO=
SMTP_USER_LUMIVEXLABS_CO=orders@lumivexlabs.co
SMTP_PASS_LUMIVEXLABS_CO=
```

Without any of these the route still returns a response, but
`sendOrderConfirmationEmail` resolves `{ success: false }` and the route
answers 502 — no confirmation email is sent.
