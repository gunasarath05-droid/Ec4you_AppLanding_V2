/**
 * Captures where a visitor came from on their first page view (UTM tags and
 * ad click IDs) and keeps it for the session, so every lead can be traced
 * back to the campaign that produced it — even after in-page navigation.
 */
const KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid', 'li_fat_id'] as const;
const STORE = 'ec_attribution';

export type Attribution = Partial<Record<(typeof KEYS)[number] | 'landing_page' | 'referrer', string>>;

export function captureAttribution() {
  try {
    if (sessionStorage.getItem(STORE)) return;
    const q = new URLSearchParams(location.search);
    const a: Attribution = {landing_page: location.pathname + location.search, referrer: document.referrer || ''};
    KEYS.forEach((k) => {
      const v = q.get(k);
      if (v) a[k] = v.slice(0, 200);
    });
    sessionStorage.setItem(STORE, JSON.stringify(a));
  } catch {
    /* storage unavailable: attribution is best-effort */
  }
}

export function readAttribution(): Attribution {
  try {
    return JSON.parse(sessionStorage.getItem(STORE) || '{}');
  } catch {
    return {};
  }
}

export const whatsappUrl = (number: string, text: string) => `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
