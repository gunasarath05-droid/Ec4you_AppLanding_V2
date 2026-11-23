# EC4YOU — App Development Landing Page (Next.js)

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Lenis smooth scroll.

```bash
npm install      # exact pinned versions
npm run dev      # http://localhost:3000
npm run build    # type-checks and builds; must be clean
```

## Design

Built from the Figma file **Workpace EC4U → page "EC4YOU — Light v3" → "Desktop — 1440 International" / "Mobile — 390 International"**.

- **International light theme:** white `#FFFFFF`, neutral grey sections `#F6F6F7`, near-black ink `#0B0B0C`, zinc greys for text, borders `#E4E4E7`. Brand orange `#FF6633` is an accent only: CTAs, key words, numbers, badges. One dark contrast section (The Difference) and a dark CTA panel.
- **Type:** Poppins SemiBold headings (the wordmark's typeface), Inter text.
- **Motif:** the logo's dot-dash grid (`src/components/Logo.tsx` is an exact SVG of the official icon; originals in `public/brand/`).
- All styles live in `src/app/globals.css`, organised by section.

## Page structure

Nav → Hero → Trusted by → Problems → Services (bento) → Our work (2 cases) → Approach (4 steps) → Testimonials → The difference (dark) → Tech stack → Engagement models → FAQ → CTA + lead form + footer. Mobile: swipe rows (problems, work, testimonials, plans), vertical process stepper, comparison toggle, sticky "Let’s Talk" + WhatsApp bar.

Components: `src/components/site/*` (one file per section). All copy: `src/i18n/<locale>.ts`. Contact details and client logos: `src/brand.ts`.

## Languages

| Language | URL | Audience | Copy |
|---|---|---|---|
| English | `/` | India and everywhere (default) | `src/i18n/en.ts` |
| Arabic (right-to-left) | `/ar` | UAE | `src/i18n/ar.ts` |
| French | `/fr` | Canada | `src/i18n/fr.ts` |

- Pages live once under `src/app/[lang]`; `src/middleware.ts` serves English at `/` (and redirects `/en/...` to the clean URL).
- `ar.ts` and `fr.ts` are typed against `en.ts`, so a missing or extra key fails the build. Add a string to all three.
- The nav has a language switcher (in the menu sheet on phones). Every page carries `hreflang` alternates; the sitemap lists all three.
- Arabic sets `dir="rtl"`, loads IBM Plex Sans Arabic, removes letter-spacing and mirrors arrow icons. The decorative app mock-ups keep `dir="ltr"` and English UI text on purpose.
- Contact-form dropdowns show translated labels but submit the English values from `src/i18n/options.ts`; each lead also records the site language.
- Privacy Policy and Terms are English-only (`/ar/privacy` and `/fr/privacy` return 404); every language links to the English versions.
- **Before launch:** have a native speaker review the Arabic and French copy.

Motion is deliberately light: one-time fade-ups (`useReveals`), gently floating hero cards, and the Approach step that follows the reader through the section (no pinned scroll). The page is ~10.5 screens on desktop.

## Lead capture, conversions and tracking

| Piece | Where | Notes |
|---|---|---|
| Lead API | `src/app/api/lead/route.ts` | Validates, blocks spam (honeypot + "submitted faster than a human" check), then delivers to `LEAD_WEBHOOK_URL` and/or email via Resend. Not configured → 503 and the form drafts the email in the visitor's mail app instead. |
| Attribution | `src/lib/attribution.ts` | First page view stores UTM tags, `gclid`, `fbclid`, `li_fat_id`, landing page and referrer for the session; every lead carries them. |
| Thank-you page | `src/app/[lang]/thank-you` | `noindex`. Fires the `lead` conversion **once** per submission (session flag), never on refresh. |
| Conversion events | `src/lib/track.ts` | dataLayer `generate_lead` (GTM/GA4/Google Ads), Meta `Lead`, LinkedIn conversion; also `whatsapp_click`, `cta_click`, `form_start`. |
| Consent | `src/components/SiteScripts.tsx` | GTM loads in Consent Mode v2 with everything denied until Accept; Meta Pixel and LinkedIn Insight load only after Accept. Reject is as prominent as Accept. "Cookie Settings" in the footer reopens it. |

Copy `.env.example` to `.env.local` (or set the variables on your host). In GTM, create a Custom Event trigger for `generate_lead` and attach your Google Ads conversion tag to it.

**Test before running ads:** submit the form once with `?utm_source=test&gclid=TEST` in the URL and confirm the lead arrives with its attribution, the thank-you page loads, and the conversion shows in GTM Preview / Meta Events Manager.

## Replace before launch

Copy is in `src/i18n/*.ts`; contact details and logos are in `src/brand.ts`.

- **Testimonials** (`reviews`) and **Our work** (`work`) are sample content and say so on the page — replace with verified reviews and real case studies, then remove the "sample" notes.
- **Contact details** in `src/brand.ts` come from www.ec4you.in (info@ec4you.in, +91 70109 42474, Chennai). Confirm the WhatsApp number (it uses the same line) and set `legalName` / `address` to the registered entity.
- **Trust strip logos** — the 27 client logos from www.ec4you.in, in `public/clients` and listed in `brand.ts` (`clients`). Confirm each client is happy to be shown.
- **Privacy Policy and Terms** (`src/app/[lang]/privacy`, `src/app/[lang]/terms`) are **draft templates** matched to what this site collects. Have them reviewed by a legal professional, fill the `[date]`, `[retention period]` and `[jurisdiction]` blanks, then remove the draft notice.
- **Fonts** are linked from Google Fonts in `src/app/[lang]/layout.tsx`. Switch to `next/font/google` if you prefer self-hosting.
- **Imagery.** All visuals are built in code. Real layered renders (e.g. a 3D phone cut into layers, desktop and mobile cuts) can replace the `.phone`/`.float` markup in `Hero.tsx` without touching the timeline.

## Structure

```
src/
  app/          [lang]/ (layout, page, thank-you, privacy, terms), api/lead, globals.css, robots.ts, sitemap.ts
  i18n/         en.ts, ar.ts, fr.ts (every word on the page), config.ts, I18nProvider.tsx, options.ts
  brand.ts      contact details, social links, client logos
  middleware.ts serves English at / and the [lang] routes
  lib/          scroll.ts (the loop, Lenis, scrollTo helpers), math.ts (pinProgress, easing)
  hooks/        useReducedMotion, useReveals, useFitBox
  components/   one file per section, plus Header (pill nav), Dock, PointerFX
                (specular buttons + border glow), DarkVeil (WebGL), Icon
```
