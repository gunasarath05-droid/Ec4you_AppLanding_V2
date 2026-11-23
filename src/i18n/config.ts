/**
 * Site languages. English is the default and lives at `/`; the others are
 * prefixed (`/ar`, `/fr`). src/middleware.ts maps `/` onto the `[lang]` route.
 *
 * - English: the default, for India and everywhere else.
 * - Arabic (UAE): right-to-left.
 * - French (Canada).
 */
export const locales = ['en', 'ar', 'fr'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeMeta: Record<Locale, {htmlLang: string; hreflang: string; dir: 'ltr' | 'rtl'; label: string; short: string; ogLocale: string}> = {
  en: {htmlLang: 'en', hreflang: 'en', dir: 'ltr', label: 'English', short: 'EN', ogLocale: 'en_IN'},
  ar: {htmlLang: 'ar-AE', hreflang: 'ar-AE', dir: 'rtl', label: 'العربية', short: 'عربي', ogLocale: 'ar_AE'},
  fr: {htmlLang: 'fr-CA', hreflang: 'fr-CA', dir: 'ltr', label: 'Français', short: 'FR', ogLocale: 'fr_CA'},
};

export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);

/** Path prefix for a locale: '' for English, '/ar' for Arabic. */
export const base = (l: Locale) => (l === defaultLocale ? '' : `/${l}`);

/** Localised path, e.g. href('ar', '/thank-you') → '/ar/thank-you'. */
export const href = (l: Locale, path = '/') => (base(l) + (path === '/' ? '' : path)) || '/';

/** Metadata `alternates` (canonical + hreflang) for one page path, e.g. '/' or '/thank-you'. */
export const alternates = (l: Locale, path = '/') => ({
  canonical: href(l, path),
  languages: {
    ...Object.fromEntries(locales.map((x) => [localeMeta[x].hreflang, href(x, path)])),
    'x-default': href(defaultLocale, path),
  },
});

/** Fills `{name}` placeholders: fmt('{n} of 5', {n: 4}). */
export const fmt = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? ''));
