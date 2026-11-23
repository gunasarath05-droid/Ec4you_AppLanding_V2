'use client';
import {useRouter} from 'next/navigation';
import {useRef, useState, type FocusEvent, type FormEvent} from 'react';
import {brand, contact, footer} from '@/content';
import {useReveals} from '@/hooks/useReveals';
import {readAttribution, whatsappUrl} from '@/lib/attribution';
import {track} from '@/lib/track';
import {Icon, Social} from '../Icon';
import {Logo} from '../Logo';
import {WhatsAppGlyph} from '../StickyCta';

type Errors = Partial<Record<'name' | 'phone' | 'consent', string>>;

/**
 * Final CTA + lead form + footer. Posts to /api/lead; on success the visitor
 * goes to /thank-you (which fires the conversion once). If delivery isn't
 * configured, the enquiry is drafted in the visitor's mail app instead.
 */
function mailtoFallback(data: FormData) {
  const subject = encodeURIComponent(`App project enquiry: ${String(data.get('service') || 'General')}`);
  const lines = [`Name: ${data.get('name')}`, `Phone: ${data.get('code')} ${data.get('phone')}`, `Looking for: ${data.get('service') || '—'}`, `Industry: ${data.get('industry') || '—'}`, '', String(data.get('description') || '')];
  window.location.href = `mailto:${brand.email}?subject=${subject}&body=${encodeURIComponent(lines.join('\n'))}`;
}

export function Contact() {
  const ref = useReveals<HTMLElement>();
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

  const validate = (f: HTMLFormElement): Errors => {
    const e: Errors = {};
    const d = new FormData(f);
    if (String(d.get('name') ?? '').trim().length < 2) e.name = 'Enter your name';
    if (!/^[\d\s()-]{6,15}$/.test(String(d.get('phone') ?? '').trim())) e.phone = 'Enter a valid number';
    if (!d.get('consent')) e.consent = 'Please accept to continue';
    return e;
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const f = ev.currentTarget;
    const e = validate(f);
    setErrors(e);
    if (Object.keys(e).length) {
      f.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }
    const d = new FormData(f);
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
        router.push('/thank-you');
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

  return (
    <section id="contact" ref={ref} className="sec" aria-labelledby="cta-title">
      <div className="wrap">
        <div className="cta">
          <div className="cta__panel" data-reveal="left">
            <svg className="cta__dots" data-speed="-0.06" viewBox="0 0 220 160" aria-hidden="true"><g fill="#fff"><circle cx="8" cy="8" r="4" /><rect x="26" y="5" width="34" height="7" /><circle cx="80" cy="8" r="4" /><rect x="98" y="5" width="34" height="7" /><circle cx="152" cy="8" r="4" /><rect x="26" y="45" width="34" height="7" opacity=".5" /><circle cx="80" cy="48" r="4" /><circle cx="116" cy="48" r="4" /><rect x="134" y="45" width="34" height="7" /><circle cx="44" cy="88" r="4" opacity=".5" /><rect x="62" y="85" width="34" height="7" /><circle cx="116" cy="88" r="4" /><rect x="98" y="125" width="34" height="7" opacity=".5" /><circle cx="152" cy="128" r="4" /></g></svg>
            <span className="kicker">START YOUR PROJECT</span>
            <h2 id="cta-title">Your next big app starts here.</h2>
            <p>{contact.body}</p>
            <div className="cta__lines">
              <div><Icon name="mail" size={18} />{brand.email}</div>
              <div><WhatsAppGlyph size={18} />WhatsApp {brand.phone}</div>
              <div><Icon name="mapPin" size={18} />UAE · Canada · Global</div>
            </div>
          </div>

          <form className="form" noValidate onSubmit={onSubmit} onFocusCapture={onFirstFocus} data-reveal="right">
            <h3>Tell us about your app</h3>
            <div className={`fld ${errors.name ? 'err' : ''}`}>
              <label htmlFor="f-name">Full name *</label>
              <input id="f-name" name="name" autoComplete="name" placeholder="Your full name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'e-name' : undefined} onBlur={blurCheck('name')} onInput={() => errors.name && setErrors((p) => ({...p, name: undefined}))} />
              {errors.name && <span className="msg" id="e-name">{errors.name}</span>}
            </div>
            <div className={`fld ${errors.phone ? 'err' : ''}`}>
              <label htmlFor="f-phone">Phone number *</label>
              <div className="phone-row">
                <div className="sel"><select name="code" aria-label="Country code" defaultValue="+971">{contact.codes.map(([v, l]) => <option key={v} value={v.replace(' US', '')}>{l}</option>)}</select></div>
                <input id="f-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="50 123 4567" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'e-phone' : undefined} onBlur={blurCheck('phone')} onInput={() => errors.phone && setErrors((p) => ({...p, phone: undefined}))} />
              </div>
              {errors.phone && <span className="msg" id="e-phone">{errors.phone}</span>}
            </div>
            <div className="row2">
              <div className="fld"><label htmlFor="f-svc">What are you looking for?</label><div className="sel"><select id="f-svc" name="service" defaultValue=""><option value="">Select a service</option>{contact.services.map((s) => <option key={s}>{s}</option>)}</select></div></div>
              <div className="fld"><label htmlFor="f-ind">Industry</label><div className="sel"><select id="f-ind" name="industry" defaultValue=""><option value="">Select industry</option>{contact.industries.map((s) => <option key={s}>{s}</option>)}</select></div></div>
            </div>
            <div className="fld"><label htmlFor="f-desc">Project description</label><textarea id="f-desc" name="description" rows={3} placeholder="Tell us about your app idea, business challenge, or project requirements." /></div>
            <label className={`consent-check ${errors.consent ? 'err' : ''}`}>
              <input type="checkbox" name="consent" aria-invalid={!!errors.consent} onChange={() => setErrors((p) => ({...p, consent: undefined}))} />
              <span>I agree to be contacted about my enquiry and accept the <a href="/privacy">Privacy Policy</a>.</span>
            </label>
            <input type="text" name="company_site" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />
            <button className="btn btn--primary btn--block" type="submit" aria-busy={state === 'sending'}>
              {state === 'sending' ? (<><span className="spin" aria-hidden="true" />{contact.sending}</>) : (<>{contact.submit} <Icon name="arrowUpRight" size={18} /></>)}
            </button>
            <p className="status-line" role="status">
              {state === 'sent' && <>{contact.done} <a href={`mailto:${brand.email}`}>{brand.email}</a>.</>}
              {state === 'failed' && <>Sorry — we couldn’t send that. Please email <a href={`mailto:${brand.email}`}>{brand.email}</a> or <a href={whatsappUrl(brand.whatsapp, brand.whatsappText)} target="_blank" rel="noopener">message us on WhatsApp</a>.</>}
              {errors.consent && (state === 'idle' || state === 'failed') && errors.consent}
            </p>
          </form>
        </div>

        <footer className="foot">
          <div className="foot__brand"><Logo size={26} /><p>App-first digital product development for ambitious businesses.</p></div>
          <div className="foot__cols">
            {footer.columns.map((c) => (
              <div key={c.title}>
                <h4>{c.title.toUpperCase()}</h4>
                <ul>{c.links.map(([l, h]) => <li key={l}><a href={h}>{c.title === 'Follow us' ? <span style={{display: 'inline-flex', gap: 8, alignItems: 'center'}}><Social name={l === 'LinkedIn' ? 'linkedin' : l === 'Instagram' ? 'instagram' : 'x'} />{l}</span> : l}</a></li>)}</ul>
              </div>
            ))}
          </div>
        </footer>
        <div className="copy"><span>© {new Date().getFullYear()} EC4YOU. All rights reserved.</span><svg width="60" height="8" viewBox="0 0 60 8" aria-hidden="true"><circle cx="4" cy="4" r="3.5" fill="#FF6633" /><rect x="14" y="1.5" width="20" height="5" fill="#FF6633" /><circle cx="44" cy="4" r="3.5" fill="#FF6633" /></svg></div>
      </div>
    </section>
  );
}
