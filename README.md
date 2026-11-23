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

Components: `src/components/site/*` (one file per section). All copy: `src/content.ts`.

Motion is deliberately light: one-time fade-ups (`useReveals`), gently floating hero cards, and the Approach step that follows the reader through the section (no pinned scroll). The page is ~10.5 screens on desktop.

## Lead capture, conversions and tracking

| Piece | Where | Notes |
|---|---|---|
| Lead API | `src/app/api/lead/route.ts` | Validates, blocks spam (honeypot + "submitted faster than a human" check), then delivers to `LEAD_WEBHOOK_URL` and/or email via Resend. Not configured → 503 and the form drafts the email in the visitor's mail app instead. |
| Attribution | `src/lib/attribution.ts` | First page view stores UTM tags, `gclid`, `fbclid`, `li_fat_id`, landing page and referrer for the session; every lead carries them. |
| Thank-you page | `src/app/thank-you` | `noindex`. Fires the `lead` conversion **once** per submission (session flag), never on refresh. |
| Conversion events | `src/lib/track.ts` | dataLayer `generate_lead` (GTM/GA4/Google Ads), Meta `Lead`, LinkedIn conversion; also `whatsapp_click`, `cta_click`, `form_start`. |
| Consent | `src/components/SiteScripts.tsx` | GTM loads in Consent Mode v2 with everything denied until Accept; Meta Pixel and LinkedIn Insight load only after Accept. Reject is as prominent as Accept. "Cookie Settings" in the footer reopens it. |

Copy `.env.example` to `.env.local` (or set the variables on your host). In GTM, create a Custom Event trigger for `generate_lead` and attach your Google Ads conversion tag to it.

**Test before running ads:** submit the form once with `?utm_source=test&gclid=TEST` in the URL and confirm the lead arrives with its attribution, the thank-you page loads, and the conversion shows in GTM Preview / Meta Events Manager.

## Replace before launch

All copy is in `src/content.ts`.

- **Testimonials** (`reviews`) and **Our work** (`work`) are sample content and say so on the page — replace with verified reviews and real case studies, then remove the "sample" notes.
- **Contact details** (`brand.email`, `brand.phone`, `brand.whatsapp`, `brand.legalName`, `brand.address`).
- **Trust strip logos** (`trust.logos`) — the slots are placeholders; add real client logos with permission, or remove the strip.
- **Privacy Policy and Terms** (`src/app/privacy`, `src/app/terms`) are **draft templates** matched to what this site collects. Have them reviewed by a legal professional, fill the `[date]`, `[retention period]` and `[jurisdiction]` blanks, then remove the draft notice.
- **Fonts** are linked from Google Fonts in `layout.tsx`. Switch to `next/font/google` if you prefer self-hosting.
- **Imagery.** All visuals are built in code. Real layered renders (e.g. a 3D phone cut into layers, desktop and mobile cuts) can replace the `.phone`/`.float` markup in `Hero.tsx` without touching the timeline.

## Structure

```
src/
  app/          layout.tsx, page.tsx, globals.css; api/lead, thank-you, privacy, terms, robots.ts, sitemap.ts
  content.ts    every word on the page
  lib/          scroll.ts (the loop, Lenis, scrollTo helpers), math.ts (pinProgress, easing)
  hooks/        useReducedMotion, useReveals, useFitBox
  components/   one file per section, plus Header (pill nav), Dock, PointerFX
                (specular buttons + border glow), DarkVeil (WebGL), Icon
```
