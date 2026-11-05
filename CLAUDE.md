# Lumivex — project guide

Next.js 16 (App Router, Turbopack) storefront for Lumivex, a UK/EU supplier of
research-grade peptides and reference compounds. Everything is supplied **for
in vitro laboratory research only** — never for human or veterinary use. That
constraint drives copy, imagery and compliance notices throughout.

```bash
npm run dev     # http://localhost:4100
npm run build
npm run lint
```

---

## Design system

The UI is a deliberate reimplementation of the **AG1 (drinkag1.com)** design
system. Values below were measured off the live reference site at 390px and
1440px — they are not approximations. When adding UI, match these rather than
inventing new steps.

### Typefaces

Licensed originals are substituted with the closest free equivalents:

| Role | Reference | Used here | Token |
|---|---|---|---|
| UI + section headings | ABC Diatype | **Switzer** (Fontshare) | `font-sans` |
| Hero display only | AG Items | **Instrument Serif** | `font-serif` |
| Small uppercase labels | ABC Diatype Mono | **DM Mono** | `font-mono` |

**Every heading is weight 400.** Size carries hierarchy, never weight. This is
enforced in `globals.css` (`h1–h4 { font-weight: 400 }`). Do not add
`font-bold` / `font-semibold` to headings.

### Type scale

| Token | 390px | 1440px | Tracking |
|---|---|---|---|
| `text-display-serif` (hero h1) | 32px / lh .95 | 72px / lh .95 | −0.005em |
| `text-h2` (section headings) | 32px / lh 1 | 56px / lh 1 | −0.03em |
| `text-h3` | 20px | 30px | −0.025em |
| `text-statement` | 24px | 36px | −0.02em |
| `text-base` (body) | 16px / lh 24px | same | normal |
| `text-md` | 18px / lh 27px | same | normal |
| `text-lg` (nav) | 20px / lh 28px | same | normal |
| `.label-mono` | 12px uppercase | same | `tracking-label` |

`.label-mono` is the **only** place letter-spacing is applied to small text.
Don't add tracked-out uppercase labels in the sans face.

### Colour

Brand greens: `green` `#023d3d` · `green-light` `#105c5c` · `green-deep`
`#0f2e2f` (footer, dark panels) · `green-hover` `#001c0f`.
Accents: `earth` `#806b47` (inactive tabs, small meta), `sage` `#5a9d71`,
`bright` `#46de46` (notice bar, table ticks only).
Surfaces: `white` · `off-white` `#f6f5f1` · `cream` `#f4f1ea` · `stone`
`#edebe4` (image wells) · `mint` `#f0f9f3`.
Text: `black`, `grey-700`, `grey-500`. Borders: `var(--border-soft)` and
`var(--border-hair)`.

### Layout

| | 390px | 768px | 1440px |
|---|---|---|---|
| Gutter (`.container-ag`) | 24px | 56px | 64px |
| Header gutter (`.container-header`) | 24px | 40px | 56px |
| `.section-y` | 24px | 40px | 60px |
| `.section-y-lg` | 40px | 60px | 100px |
| Notice bar `--bar-h` | 52px | 52px | 34px |
| Header `--header-h` | 64px | 64px | 90px |

Content caps at 1568px. Fixed chrome height is exposed as `--chrome-h`; use it
for sticky offsets and `scroll-margin` rather than hard-coding pixels.

### Cards and rails

Horizontal rails (`components/ui/Rail.tsx`) are the primary way collections are
shown — not grids. Card width **288px** mobile → **400px** desktop, height
403px → 560px, radius **8px**, gap **16px → 32px**. Rails bleed to the viewport
edge via negative margin plus matching padding **and** `scroll-pl-*` (without
the scroll padding the browser nudges the rail on load).

Grids use a **16px** gutter. Cards carry a hairline border and **no drop
shadow** — separation comes from borders and background tint.

### Buttons

Radius **32px** everywhere, weight 400, and **colour-only** transitions at
`0.2s cubic-bezier(.4,0,.2,1)`. Never animate transform or shadow on hover.

| Class | Padding | Size | Height |
|---|---|---|---|
| `.btn` | 10px 20px | 16px | 44px |
| `.btn-lg` | 10px 20px → 16px 24px | 16px → 20px | 44 → 60px |
| `.btn-outline` | 14px 20px | 18px | 54px (all widths) |
| `.btn-sm` | 8px 16px | 14px | 36px |

Use `components/ui/Button.tsx` (`Button`, `ButtonLink`) rather than hand-rolling.

### Motion

Restrained by design. The only motion is: 200ms colour fades, rail scrolling,
tab switches, and accordion height via a `0fr → 1fr` grid row
(`.collapse-grid`). There are **no** scroll-triggered reveals, split-text
intros, parallax, or custom cursors — these were removed. `prefers-reduced-motion`
is respected globally.

---

## Structure

```
app/
  page.tsx                 homepage section order
  layout.tsx               fonts, providers, metadata
  globals.css              tokens, container/section/button/field classes
  shop/ product/[slug]/ cart/ checkout/
  login/ register/ account/{orders,track,wallet,affiliate}/   (each has a layout.tsx for chrome)
  payment-capture/[token]/
  api/send-order-confirmation/
components/
  sections/   homepage sections + AnnounceBar, Navigation, Footer
  shop/       ShopHeader (shared chrome), ShopGrid, ProductDetail, Cart/Checkout, modals
  ui/         Button, Rail, Accordion, ProductCard, Icons, Logo, AccountMenu, ChatWidget
  providers/  Auth, Cart, SmoothScroll
lib/
  data.ts     ALL page content + product catalogue (edit copy here, not in JSX)
  api.ts      backend client — do not restyle or restructure
```

Homepage order: Hero → TrustStrip → Capabilities → ShopByLine → Products →
Programme → Standards → Comparison → WhyUs → About → Testimonials → Faq →
Contact → Footer.

`ShopHeader` renders `AnnounceBar + Navigation + spacer` and is used by every
non-homepage route, so the site has one header everywhere.

---

## Content

All copy lives in `lib/data.ts`: `MENU`, `ANNOUNCEMENTS`, `TRUST_POINTS`,
`CAPABILITIES`, `PRODUCT_LINES`, `PRODUCT_LINE_MAP`, `PROGRAMME`,
`STANDARDS_TABS`, `QUALITY_CHECKS`, `COMPARISON`, `EXPERTS`, `TESTIMONIALS`,
`PROCESS_STEPS`, `FAQS`, `FOOTER_COLUMNS`, `PRODUCTS`.

Voice: plain, specific, sentence case. Say what is measured and who measured
it. Avoid marketing superlatives — the differentiator is documentation.

### Compliance rules

- `RESEARCH_DISCLAIMER` and `CHECKOUT_ACKNOWLEDGEMENT` are single sources of
  truth. Never duplicate or reword them inline.
- Customer feedback may reference **documentation, packaging, presentation and
  service only** — never outcomes, effects or use.
- Imagery must not imply consumption. The hero deliberately uses a bench
  photograph; the previous lifestyle shot (a person at a table with a meal) was
  replaced for this reason.
- Product figures (purity, fill volume, batch number) must come from
  `product.janoshik` — the published third-party assay — not be written by hand.

---

## Backend — do not change

`lib/api.ts` is the contract with the Lumivex backend and was not touched
during the UI work. Keep it that way unless the task is explicitly about the
API.

- Auth: `auth.*` + `AuthProvider` (token in localStorage, verified on mount).
- Orders: `orders.create` / `orders.byNumber`. **Order totals always come from
  the API** — prices rendered in the UI (including standing-order savings) are
  presentational only.
- Also: `promos.validate`, `wallet`, `affiliate`, `paymentCapture`,
  `paymentVerification`, `aiChat`, `newsletter.subscribe`.

The standing-order discount (`PROGRAMME.discountPercent`) is display copy. It
is not applied to any total.

---

## Conventions

- Tailwind only; no inline styles or CSS modules. Shared patterns belong in
  `@layer components` in `globals.css`.
- Use the named spacing scale (`gap-md`, `py-xl`, `mt-lg`) rather than numeric
  Tailwind steps, so spacing stays on the 4px system.
- Every image needs real `sizes`; decorative images take `alt=""`.
- Interactive controls need a visible focus ring (handled globally by
  `:focus-visible`) and `data-touch-target` where the hit area could fall below
  48px on touch.
- Accordions/tabs follow the ARIA patterns in `ui/Accordion.tsx` and
  `sections/Standards.tsx` — copy those rather than writing new ones.

### Known loose ends

- `components/animations/*` (CurtainImage, RevealText, FadeIn, Parallax,
  CountUp), `components/ui/{Cursor,Magnetic,MagneticButton}.tsx` and
  `components/sections/{Collage,Marquee}.tsx` belong to the replaced design and
  are no longer imported. Safe to delete, along with the `gsap` and
  `split-type` dependencies.
- `app/api/send-order-confirmation/route.ts` imports `shared-email/` from
  outside the repo; it fails local typecheck but resolves in the deploy layout.
