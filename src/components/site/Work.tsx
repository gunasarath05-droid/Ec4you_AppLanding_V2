'use client';
import {useEffect, useRef, type CSSProperties, type ReactNode} from 'react';
import {useI18n} from '@/i18n/I18nProvider';
import {useReveals} from '@/hooks/useReveals';
import {onFrame} from '@/lib/scroll';
import {Icon} from '../Icon';

/** App screens shown on the phone in each project's visual (decorative, English UI). */
const SCREENS: ReactNode[] = [
  <>
    <span className="small" style={{fontSize: 9}}>Your care</span>
    <b style={{fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14}}>Book a visit</b>
    <div className="days"><span><small>Mon</small>12</span><span className="on"><small>Tue</small>13</span><span><small>Wed</small>14</span></div>
    <div className="mrow" style={{fontWeight: 400}}>10:30 AM · Available</div>
    <div className="mrow" style={{fontWeight: 400}}>11:15 AM · Available</div>
    <div style={{marginTop: 'auto', background: 'var(--ink)', color: '#fff', textAlign: 'center', borderRadius: 999, padding: '9px 0', fontWeight: 600}}>Confirm booking</div>
  </>,
  <>
    <span className="small" style={{fontSize: 9}}>Dubai Marina</span>
    <b style={{fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14}}>New leads</b>
    <div className="mrow" style={{display: 'flex', gap: 8, alignItems: 'center'}}><i style={{width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,#FF6633,#FFB547)'}} />Sample buyer<span className="badge" style={{marginLeft: 'auto', fontSize: 8, padding: '2px 6px'}}>HOT</span></div>
    <div className="mrow" style={{display: 'flex', gap: 8, alignItems: 'center'}}><i style={{width: 22, height: 22, borderRadius: '50%', background: 'var(--line)'}} />Sample tenant</div>
    <div className="mrow" style={{fontWeight: 600}}>Viewings this week
      <svg viewBox="0 0 130 44" height="40" style={{display: 'block', marginTop: 6}}><g fill="#E4E4E7"><rect x="0" y="22" width="14" height="22" rx="3" /><rect x="19" y="14" width="14" height="30" rx="3" /><rect x="38" y="26" width="14" height="18" rx="3" /><rect x="76" y="18" width="14" height="26" rx="3" /><rect x="95" y="28" width="14" height="16" rx="3" /><rect x="114" y="20" width="14" height="24" rx="3" /></g><rect x="57" y="4" width="14" height="40" rx="3" fill="#FF6633" /></svg>
    </div>
  </>,
];

/**
 * Case studies (sample content until real projects are supplied). Each is a wide
 * card: a light info panel (client, year, title, three facts) beside a dark panel
 * with a cut corner where the app sits on a tilted phone. Cards alternate sides.
 *
 * On desktop the cards stack while scrolling: each one sticks below the nav and
 * the next slides up over it; the covered card shrinks and dims (--p, 0–1).
 */
export function Work() {
  const ref = useReveals<HTMLElement>();
  const work = useI18n().t.work;
  const list = useRef<HTMLDivElement>(null);

  useEffect(() => onFrame(() => {
    const cards = [...(list.current?.children ?? [])] as HTMLElement[];
    for (let i = 0; i < cards.length; i++) {
      const next = cards[i + 1];
      // How much of this card the next one covers. Measured from the card's top
      // and layout height, so its own shrinking doesn't feed back into it.
      const top = cards[i].getBoundingClientRect().top;
      const p = next ? Math.min(1, Math.max(0, (top + cards[i].offsetHeight - next.getBoundingClientRect().top) / cards[i].offsetHeight)) : 0;
      const v = p.toFixed(3);
      if (cards[i].style.getPropertyValue('--p') !== v) cards[i].style.setProperty('--p', v);
    }
  }), []);

  return (
    <section id="work" ref={ref} className="sec" aria-labelledby="work-title">
      <div className="wrap">
        <div className="head" data-reveal>
          <div><span className="eyebrow">{work.eyebrow}</span><h2 className="h2" id="work-title">{work.heading}</h2></div>
          <a className="link" href="#contact" style={{color: 'var(--ink)'}}>{work.link} <Icon name="arrowUpRight" size={18} color="#FF6633" /></a>
        </div>
        <div className="cases" ref={list}>
          {work.items.map((p, i) => (
            <article key={p.title} className={`case ${i % 2 ? 'case--flip' : ''}`} data-reveal style={{'--i': i} as CSSProperties}>
              <div className="case__info">
                <div className="case__top"><span className="case__client">{p.client}</span><span className="case__year" dir="ltr">/{p.tag}</span></div>
                <h3 className="case__title">{p.title}</h3>
                <div className="case__foot">
                  <span className="case__rule" aria-hidden="true"><i /></span>
                  <dl className="case__stats">
                    {p.facts.map((f, k) => (
                      <div key={f}><dt>{work.labels[k]}</dt><dd>{f}</dd></div>
                    ))}
                  </dl>
                </div>
              </div>
              <div className="case__visual" aria-hidden="true" dir="ltr">
                <span className="case__glow" />
                <div className="case__phone" data-speed="-0.06"><div>{SCREENS[i % SCREENS.length]}</div></div>
              </div>
            </article>
          ))}
        </div>
        <p className="note">{work.note}</p>
      </div>
    </section>
  );
}
