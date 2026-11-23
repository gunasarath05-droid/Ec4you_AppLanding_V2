'use client';
import {useRouter} from 'next/navigation';
import {Fragment, useRef, useState, type FocusEvent, type FormEvent, type ReactNode} from 'react';
import {brand} from '@/brand';
import {href} from '@/i18n/config';
import {useI18n} from '@/i18n/I18nProvider';
import {INDUSTRIES, SERVICES} from '@/i18n/options';
import {useReveals} from '@/hooks/useReveals';
import {readAttribution, whatsappUrl} from '@/lib/attribution';
import {track} from '@/lib/track';
import {Icon, Social} from '../Icon';
import {Logo} from '../Logo';
import {WhatsAppGlyph} from '../StickyCta';

type Errors = Partial<Record<'name' | 'phone' | 'consent', string>>;

/** Splits a sentence on `{key}` placeholders and drops React nodes into them. */
function fill(s: string, parts: Record<string, ReactNode>) {
  return s.split(/(\{\w+\})/).map((chunk, i) => {
    const k = chunk.match(/^\{(\w+)\}$/)?.[1];
    return <Fragment key={i}>{k && k in parts ? parts[k] : chunk}</Fragment>;
  });
}

/**
 * Final CTA + lead form + footer. Posts to /api/lead; on success the visitor
 * goes to the thank-you page in their language (which fires the conversion once).
 * If delivery isn't configured, the enquiry is drafted in the visitor's mail app
 * instead — in English, since it goes to our team.
 */
function mailtoFallback(data: FormData) {
  const subject = encodeURIComponent(`App project enquiry: ${String(data.get('service') || 'General')}`);
  const lines = [`Name: ${data.get('name')}`, `Phone: ${data.get('code')} ${data.get('phone')}`, `Looking for: ${data.get('service') || '—'}`, `Industry: ${data.get('industry') || '—'}`, `Language: ${data.get('locale')}`, '', String(data.get('description') || '')];
  window.location.href = `mailto:${brand.email}?subject=${subject}&body=${encodeURIComponent(lines.join('\n'))}`;
}

export function Contact() {
  const ref = useReveals<HTMLElement>();
  const {locale, t} = useI18n();
  const c = t.contact;
  const f = t.footer;
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const router = useRouter();
  const startedAt = useRef<number | null>(null);
  const onFirstFocus = () => {
    if (startedAt.current === null) {
      startedAt.current = Date.now();
      track('form_start');
    }
  };

  const validate = (form: HTMLFormElement): Errors => {
    const e: Errors = {};
    const d = new FormData(form);
    if (String(d.get('name') ?? '').trim().length < 2) e.name = c.nameError;
    if (!/^[\d\s()-]{6,15}$/.test(String(d.get('phone') ?? '').trim())) e.phone = c.phoneError;
    if (!d.get('consent')) e.consent = c.consentError;
    return e;
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length) {
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }
    const d = new FormData(form);
    setState('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          ...Object.fromEntries(d.entries()),
          consent: d.get('consent') === 'on',
          elapsed_ms: startedAt.current ? Date.now() - startedAt.current : null,
          attribution: readAttribution(),
        }),
      });
      if (res.ok) {
        // The thank-you page fires the conversion only when this flag is set,
        // so refreshing or revisiting it never double-counts a lead.
        try { sessionStorage.setItem('ec_lead_pending', String(d.get('service') || '')); } catch {}
        router.push(href(locale, '/thank-you'));
        return;
      }
      const {reason} = await res.json().catch(() => ({reason: ''}));
      if (reason === 'not_configured') {
        mailtoFallback(d);
        setState('sent');
        return;
      }
      setState('failed');
    } catch {
      setState('failed');
    }
  };

  const blurCheck = (name: keyof Errors) => (ev: FocusEvent<HTMLInputElement>) => {
    if (!ev.currentTarget.value) return;
    const e = validate(ev.currentTarget.form!);
    setErrors((prev) => ({...prev, [name]: e[name]}));
  };

  const wa = whatsappUrl(brand.whatsapp, t.common.whatsappText);
  const mail = <a href={`mailto:${brand.email}`}>{brand.email}</a>;
  const privacy = <a href="/privacy" hrefLang="en">{t.common.privacy}</a>;

  return (
    <section id="contact" ref={ref} className="sec" aria-labelledby="cta-title">
      <div className="wrap">
        <div className="cta">
          <div className="cta__panel" data-reveal="left">
            <svg className="cta__dots" data-speed="-0.06" viewBox="0 0 220 160" aria-hidden="true"><g fill="#fff"><circle cx="8" cy="8" r="4" /><rect x="26" y="5" width="34" height="7" /><circle cx="80" cy="8" r="4" /><rect x="98" y="5" width="34" height="7" /><circle cx="152" cy="8" r="4" /><rect x="26" y="45" width="34" height="7" opacity=".5" /><circle cx="80" cy="48" r="4" /><circle cx="116" cy="48" r="4" /><rect x="134" y="45" width="34" height="7" /><circle cx="44" cy="88" r="4" opacity=".5" /><rect x="62" y="85" width="34" height="7" /><circle cx="116" cy="88" r="4" /><rect x="98" y="125" width="34" height="7" opacity=".5" /><circle cx="152" cy="128" r="4" /></g></svg>
            <span className="kicker">{c.kicker}</span>
            <h2 id="cta-title">{c.heading}</h2>
            <p>{c.body}</p>
            <div className="cta__lines">
              <a href={`mailto:${brand.email}`}><Icon name="mail" size={18} />{brand.email}</a>
              <a href={wa} target="_blank" rel="noopener" onClick={() => track('whatsapp_click', {location: 'contact_panel'})}><WhatsAppGlyph size={18} /><span dir="ltr">{brand.phone}</span></a>
              <a href={brand.mapUrl} target="_blank" rel="noopener"><Icon name="mapPin" size={18} />{c.location}</a>
            </div>
          </div>

          <form className="form" noValidate onSubmit={onSubmit} onFocusCapture={onFirstFocus} data-reveal="right">
            <h3>{c.formTitle}</h3>
            <input type="hidden" name="locale" value={locale} />
            <div className={`fld ${errors.name ? 'err' : ''}`}>
              <label htmlFor="f-name">{c.nameLabel}</label>
              <input id="f-name" name="name" autoComplete="name" placeholder={c.namePlaceholder} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'e-name' : undefined} onBlur={blurCheck('name')} onInput={() => errors.name && setErrors((p) => ({...p, name: undefined}))} />
              {errors.name && <span className="msg" id="e-name">{errors.name}</span>}
            </div>
            <div className={`fld ${errors.phone ? 'err' : ''}`}>
              <label htmlFor="f-phone">{c.phoneLabel}</label>
              {/* Phone numbers always read left-to-right, including in Arabic. */}
              <div className="phone-row" dir="ltr">
                <div className="sel"><select name="code" aria-label={c.codeLabel} defaultValue={c.codes[0][0]}>{c.codes.map(([v, l]) => <option key={l} value={v}>{l}</option>)}</select></div>
                <input id="f-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel-national" placeholder={c.phonePlaceholder} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'e-phone' : undefined} onBlur={blurCheck('phone')} onInput={() => errors.phone && setErrors((p) => ({...p, phone: undefined}))} />
              </div>
              {errors.phone && <span className="msg" id="e-phone">{errors.phone}</span>}
            </div>
            <div className="row2">
              <div className="fld"><label htmlFor="f-svc">{c.serviceLabel}</label><div className="sel"><select id="f-svc" name="service" defaultValue=""><option value="">{c.servicePlaceholder}</option>{c.services.map((s, i) => <option key={s} value={SERVICES[i] ?? s}>{s}</option>)}</select></div></div>
              <div className="fld"><label htmlFor="f-ind">{c.industryLabel}</label><div className="sel"><select id="f-ind" name="industry" defaultValue=""><option value="">{c.industryPlaceholder}</option>{c.industries.map((s, i) => <option key={s} value={INDUSTRIES[i] ?? s}>{s}</option>)}</select></div></div>
            </div>
            <div className="fld"><label htmlFor="f-desc">{c.descLabel}</label><textarea id="f-desc" name="description" rows={3} placeholder={c.descPlaceholder} /></div>
            <label className={`consent-check ${errors.consent ? 'err' : ''}`}>
              <input type="checkbox" name="consent" aria-invalid={!!errors.consent} onChange={() => setErrors((p) => ({...p, consent: undefined}))} />
              <span>{fill(c.consent, {privacy})}</span>
            </label>
            <input type="text" name="company_site" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />
            <button className="btn btn--primary btn--block" type="submit" aria-busy={state === 'sending'}>
              {state === 'sending' ? (<><span className="spin" aria-hidden="true" />{c.sending}</>) : (<>{c.submit} <Icon name="arrowUpRight" size={18} /></>)}
            </button>
            <p className="status-line" role="status">
              {state === 'sent' && <>{c.done} {mail}.</>}
              {state === 'failed' && fill(c.failed, {email: mail, whatsapp: <a href={wa} target="_blank" rel="noopener">{c.failedWa}</a>})}
              {errors.consent && (state === 'idle' || state === 'failed') && errors.consent}
            </p>
          </form>
        </div>

        <footer className="foot">
          <div className="foot__brand">
            <Logo size={26} />
            <p>{f.tagline}</p>
            <ul className="foot__contact">
              <li><Icon name="mapPin" size={16} /><a href={brand.mapUrl} target="_blank" rel="noopener">{f.address}</a></li>
              <li><Icon name="phone" size={16} /><a href={`tel:${brand.tel}`} dir="ltr">{brand.phone}</a></li>
              <li><Icon name="mail" size={16} /><a href={`mailto:${brand.email}`}>{brand.email}</a></li>
            </ul>
          </div>
          <div className="foot__cols">
            <div>
              <h4>{f.navTitle}</h4>
              <ul>
                <li><a href="#top">{t.common.homeShort}</a></li>
                {t.nav.slice(0, 3).map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}
                <li><a href="#faq">{t.faq.eyebrow}</a></li>
              </ul>
            </div>
            <div>
              <h4>{f.companyTitle}</h4>
              <ul>
                <li><a href="#engage">{f.engagement}</a></li>
                <li><a href="#contact">{f.contactUs}</a></li>
              </ul>
            </div>
            <div>
              <h4>{f.legalTitle}</h4>
              <ul>
                <li><a href="/terms" hrefLang="en">{t.common.terms}</a></li>
                <li><a href="/privacy" hrefLang="en">{t.common.privacy}</a></li>
                <li><a href="#cookie-settings">{t.common.cookies}</a></li>
              </ul>
            </div>
            <div>
              <h4>{f.followTitle}</h4>
              <ul>
                {brand.social.map((s) => (
                  <li key={s.name}><a href={s.href} target="_blank" rel="noopener"><span style={{display: 'inline-flex', gap: 8, alignItems: 'center'}}><Social name={s.icon} />{s.name}</span></a></li>
                ))}
              </ul>
            </div>
          </div>
        </footer>
        <div className="copy"><span>© {new Date().getFullYear()} EC4YOU. {t.common.rights}</span><svg width="60" height="8" viewBox="0 0 60 8" aria-hidden="true"><circle cx="4" cy="4" r="3.5" fill="#FF6633" /><rect x="14" y="1.5" width="20" height="5" fill="#FF6633" /><circle cx="44" cy="4" r="3.5" fill="#FF6633" /></svg></div>
      </div>
    </section>
  );
}
