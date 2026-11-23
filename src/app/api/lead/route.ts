import {NextResponse} from 'next/server';

/**
 * Receives the contact form. Delivery is configured with environment
 * variables (see .env.example) — set one or both:
 *
 *   LEAD_WEBHOOK_URL   POSTs the lead as JSON (Zapier, Make, n8n, HubSpot,
 *                      Slack, a Google Sheets script…)
 *   RESEND_API_KEY     emails the lead via Resend, with LEAD_TO_EMAIL and
 *                      LEAD_FROM_EMAIL (a sender on your verified domain)
 *
 * If neither is set the route answers 503 and the form falls back to drafting
 * the enquiry in the visitor's mail app, so no lead is silently lost.
 */

export const runtime = 'nodejs';

const MAX = {name: 120, phone: 30, code: 8, service: 80, industry: 80, description: 3000};
const ATTR = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid', 'li_fat_id', 'landing_page', 'referrer'];

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ok: false, reason: 'bad_request'}, {status: 400});
  }

  // Spam traps: hidden honeypot field, and forms submitted faster than a human could.
  const elapsed = Number(body.elapsed_ms);
  if (str(body.company_site, 200) || (Number.isFinite(elapsed) && elapsed < 2500)) {
    return NextResponse.json({ok: true}); // look successful to bots, deliver nothing
  }

  const lead = {
    name: str(body.name, MAX.name),
    phone: `${str(body.code, MAX.code)} ${str(body.phone, MAX.phone)}`.trim(),
    service: str(body.service, MAX.service),
    industry: str(body.industry, MAX.industry),
    description: str(body.description, MAX.description),
    consent: body.consent === true,
    submitted_at: new Date().toISOString(),
    attribution: Object.fromEntries(ATTR.map((k) => [k, str((body.attribution as Record<string, unknown> | undefined)?.[k], 300)]).filter(([, v]) => v)),
  };

  if (lead.name.length < 2 || !/^[+\d\s()-]{6,40}$/.test(lead.phone) || !lead.consent) {
    return NextResponse.json({ok: false, reason: 'invalid'}, {status: 422});
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  if (!webhook && !resendKey) {
    return NextResponse.json({ok: false, reason: 'not_configured'}, {status: 503});
  }

  const jobs: Promise<Response>[] = [];
  if (webhook) {
    jobs.push(fetch(webhook, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(lead)}));
  }
  if (resendKey && process.env.LEAD_TO_EMAIL && process.env.LEAD_FROM_EMAIL) {
    const a = lead.attribution as Record<string, string>;
    const text = [
      `Name: ${lead.name}`,
      `Phone: ${lead.phone}`,
      `Looking for: ${lead.service || '—'}`,
      `Industry: ${lead.industry || '—'}`,
      '',
      lead.description || '(no description)',
      '',
      `Source: ${a.utm_source || '—'} / ${a.utm_medium || '—'} / ${a.utm_campaign || '—'}`,
      `Click IDs: ${[a.gclid && `gclid=${a.gclid}`, a.fbclid && `fbclid=${a.fbclid}`].filter(Boolean).join(', ') || '—'}`,
      `Landing page: ${a.landing_page || '—'}`,
    ].join('\n');
    jobs.push(
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json'},
        body: JSON.stringify({
          from: process.env.LEAD_FROM_EMAIL,
          to: process.env.LEAD_TO_EMAIL.split(',').map((e) => e.trim()),
          subject: `New app enquiry: ${lead.name}${lead.service ? ` — ${lead.service}` : ''}`,
          text,
        }),
      }),
    );
  }

  const results = await Promise.allSettled(jobs);
  const delivered = results.some((r) => r.status === 'fulfilled' && r.value.ok);
  if (!delivered) {
    console.error('Lead delivery failed', results.map((r) => (r.status === 'fulfilled' ? r.value.status : String(r.reason))));
    return NextResponse.json({ok: false, reason: 'delivery_failed'}, {status: 502});
  }
  return NextResponse.json({ok: true});
}
