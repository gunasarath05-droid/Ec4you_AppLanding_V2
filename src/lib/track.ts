/**
 * Thin wrapper over the ad/analytics tags. Every call is a no-op until the
 * tag exists (i.e. until the visitor has consented and the script has loaded),
 * so components can call it freely.
 */
type W = Window & {
  dataLayer?: unknown[];
  fbq?: (...a: unknown[]) => void;
  lintrk?: (...a: unknown[]) => void;
};

export function track(event: 'lead' | 'whatsapp_click' | 'cta_click' | 'form_start', data: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  const w = window as W;
  // Google Tag Manager / GA4: pick these up with a Custom Event trigger in GTM.
  const gaName = event === 'lead' ? 'generate_lead' : event;
  w.dataLayer?.push({event: gaName, ...data});
  if (event === 'lead') {
    w.fbq?.('track', 'Lead', data);
    const conv = process.env.NEXT_PUBLIC_LINKEDIN_CONVERSION_ID;
    if (conv) w.lintrk?.('track', {conversion_id: Number(conv)});
  } else if (event === 'whatsapp_click') {
    w.fbq?.('track', 'Contact', data);
  }
}
