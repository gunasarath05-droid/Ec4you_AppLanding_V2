'use client';
import {useEffect, useState} from 'react';
import {services} from '@/content';
import {useReveals} from '@/hooks/useReveals';
import {prefersReducedMotion} from '@/hooks/useReducedMotion';
import {Icon} from '../Icon';

/**
 * What we build: a 2 + 3 bento of services, each with an original EC4YOU
 * line illustration, beside a phone whose screen shows the app for the
 * active service. Hover / focus / tap a card to switch; it also cycles
 * slowly on its own while the section is on screen.
 */

const INK = '#0B0B0C';
const SIDE = '#E4E4E7';
const O = '#FF6633';

// Original line illustrations (2.5D: white face, grey depth, orange accent).
const ART: React.ReactNode[] = [
  // Custom mobile apps — two phones
  <svg key="0" viewBox="0 0 240 170" aria-hidden="true">
    <g transform="translate(118 18) skewY(-10)" strokeWidth="1.6" stroke={INK}>
      <rect x="7" y="7" width="70" height="124" rx="13" fill={SIDE} /><rect width="70" height="124" rx="13" fill="#fff" />
      <rect x="6" y="9" width="58" height="106" rx="8" fill="#FAFAFA" strokeWidth="1" /><rect x="24" y="13" width="22" height="5" rx="2.5" fill={INK} stroke="none" />
      <rect x="12" y="30" width="46" height="26" rx="5" fill={O} stroke="none" /><rect x="12" y="62" width="46" height="8" rx="3" fill={SIDE} stroke="none" /><rect x="12" y="74" width="30" height="8" rx="3" fill={SIDE} stroke="none" />
    </g>
    <g transform="translate(56 40) skewY(-10)" strokeWidth="1.6" stroke={INK}>
      <rect x="7" y="7" width="62" height="110" rx="12" fill={SIDE} /><rect width="62" height="110" rx="12" fill="#fff" />
      <rect x="6" y="8" width="50" height="94" rx="7" fill="#FAFAFA" strokeWidth="1" />
      <circle cx="31" cy="44" r="13" fill="none" stroke={O} strokeWidth="2.5" /><path d="M25 44l4 4 8-8" stroke={O} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <rect x="12" y="70" width="38" height="7" rx="3" fill={SIDE} stroke="none" />
    </g>
  </svg>,
  // UI/UX — stacked design screens + cursor
  <svg key="1" viewBox="0 0 240 170" aria-hidden="true">
    <g strokeWidth="1.6" stroke={INK}>
      <g transform="translate(70 70) skewY(-12)"><rect x="6" y="6" width="130" height="80" rx="10" fill={SIDE} /><rect width="130" height="80" rx="10" fill="#fff" /></g>
      <g transform="translate(86 44) skewY(-12)"><rect x="6" y="6" width="130" height="80" rx="10" fill={SIDE} /><rect width="130" height="80" rx="10" fill="#fff" />
        <circle cx="24" cy="24" r="10" fill={O} stroke="none" /><rect x="42" y="18" width="62" height="6" rx="3" fill={SIDE} stroke="none" /><rect x="42" y="28" width="40" height="6" rx="3" fill={SIDE} stroke="none" />
        <rect x="14" y="46" width="48" height="22" rx="5" fill="none" strokeDasharray="4 3" /><rect x="68" y="46" width="48" height="22" rx="5" fill="#FFF1EC" stroke={O} />
      </g>
      <path d="M190 112l0 30 8-8 6 13 6-3-6-12 11-1z" fill="#fff" strokeLinejoin="round" />
    </g>
  </svg>,
  // AI apps & agents — chip with sparkle
  <svg key="2" viewBox="0 0 240 170" aria-hidden="true">
    <g transform="translate(76 40) skewY(-12)" strokeWidth="1.6" stroke={INK}>
      {[14, 34, 54, 74].map((v) => <g key={v}><line x1={v} y1="-10" x2={v} y2="0" /><line x1={v} y1="88" x2={v} y2="98" /><line x1="-10" y1={v} x2="0" y2={v} /><line x1="88" y1={v} x2="98" y2={v} /></g>)}
      <rect x="7" y="7" width="88" height="88" rx="14" fill={SIDE} /><rect width="88" height="88" rx="14" fill="#fff" />
      <rect x="16" y="16" width="56" height="56" rx="10" fill="#FAFAFA" />
      <path d="M44 26c2 10 6 14 16 16-10 2-14 6-16 16-2-10-6-14-16-16 10-2 14-6 16-16z" fill={O} stroke="none" />
    </g>
  </svg>,
  // CRM & enterprise — dashboard with bars and people
  <svg key="3" viewBox="0 0 240 170" aria-hidden="true">
    <g transform="translate(60 40) skewY(-12)" strokeWidth="1.6" stroke={INK}>
      <rect x="7" y="7" width="140" height="92" rx="10" fill={SIDE} /><rect width="140" height="92" rx="10" fill="#fff" />
      <line x1="0" y1="20" x2="140" y2="20" strokeWidth="1" /><circle cx="12" cy="10" r="3" fill={O} stroke="none" />
      {[[16, 34], [34, 24], [52, 40], [88, 30]].map(([x, h]) => <rect key={x} x={x} y={80 - h} width="12" height={h} rx="3" fill={SIDE} stroke="none" />)}
      <rect x="70" y="30" width="12" height="50" rx="3" fill={O} stroke="none" />
      <circle cx="118" cy="40" r="8" fill="#fff" /><circle cx="118" cy="64" r="8" fill="#FFF1EC" stroke={O} />
    </g>
  </svg>,
  // E-commerce & industry — shopping bag with tag
  <svg key="4" viewBox="0 0 240 170" aria-hidden="true">
    <g transform="translate(84 36) skewY(-10)" strokeWidth="1.6" stroke={INK}>
      <path d="M26 24c0-16 8-24 22-24s22 8 22 24" fill="none" strokeWidth="2" />
      <rect x="7" y="22" width="86" height="92" rx="10" fill={SIDE} /><rect y="16" width="86" height="92" rx="10" fill="#fff" />
      <circle cx="26" cy="34" r="3" fill={INK} /><circle cx="60" cy="34" r="3" fill={INK} />
      <g transform="translate(30 56)"><path d="M0 8L8 0h22v22H8z" fill={O} stroke="none" /><circle cx="9" cy="11" r="2.5" fill="#fff" stroke="none" /></g>
    </g>
  </svg>,
];

// Phone screens, one per service.
function Screen({i}: {i: number}) {
  const S = {
    0: (<><span className="small">Launch control</span><b className="ps__h">Your app is live.</b>
      <div className="ps__hero"><div className="row-between"><span>Release 1.0</span><b>● Approved</b></div><svg viewBox="0 0 200 50"><path d="M0 44 C30 42 50 34 75 30 S120 18 150 14 S185 6 200 3" stroke="#fff" strokeWidth="2.5" fill="none" /></svg><div className="ps__meta"><span>iOS<b>Ready</b></span><span>Android<b>Ready</b></span></div></div>
      <div className="ps__row"><Icon name="shield" size={16} />Security review passed</div><div className="ps__row"><Icon name="sparkles" size={16} color={O} />Store listing ready</div></>),
    1: (<><span className="small">Prototype v3</span><b className="ps__h">Onboarding flow</b>
      <div className="ps__wire"><i className="dot" /><i /><i className="short" /><div><i className="box" /><i className="box on" /></div></div>
      <div className="ps__row"><Icon name="users" size={16} />Usability test · 5 users</div><div className="ps__row"><Icon name="check" size={16} color={O} />Journey map approved</div></>),
    2: (<><span className="small">AI Assistant</span><b className="ps__h">Today’s focus</b>
      <span className="bub-u">Which leads need a call today?</span><span className="bub-a">3 warm leads. Follow-ups drafted for your review.</span>
      <div className="ps__row"><Icon name="mail" size={16} />Follow-ups drafted</div><div className="ps__row"><Icon name="bot" size={16} color={O} />Support agent running</div></>),
    3: (<><span className="small">Sales pipeline</span><b className="ps__h">This quarter</b>
      <div className="ps__bars">{[40, 62, 48, 86, 58].map((h, k) => <i key={k} style={{height: `${h}%`}} className={k === 3 ? 'on' : ''} />)}</div>
      <div className="ps__row"><Icon name="gauge" size={16} color={O} />AI lead score · 92</div><div className="ps__row"><Icon name="wrench" size={16} />AMC renewal reminder sent</div></>),
    4: (<><span className="small">Store</span><b className="ps__h">Today’s orders</b>
      <div className="ps__order"><b>Order #1042</b><span>Paid · 2 items</span></div>
      <div className="ps__row"><Icon name="cart" size={16} color={O} />One-tap checkout</div><div className="ps__row"><Icon name="calendar" size={16} />Tour booked · Saturday</div></>),
  } as Record<number, React.ReactNode>;
  return <>{S[i]}</>;
}

const ALL = [
  {icon: 'smartphone' as const, title: services.main.title, body: services.main.body},
  ...services.items.map((s) => ({icon: s.icon, title: s.title, body: s.body})),
];

export function Services() {
  const ref = useReveals<HTMLElement>();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), {threshold: 0.3});
    if (ref.current) io.observe(ref.current);
    const t = window.setInterval(() => visible && setActive((a) => (a + 1) % ALL.length), 4500);
    return () => { clearInterval(t); io.disconnect(); };
  }, [paused, ref]);

  return (
    <section id="build" ref={ref} className="sec" aria-labelledby="svc-title">
      <div className="wrap">
        <div className="svc-head" data-reveal>
          <div><span className="eyebrow">{services.eyebrow}</span><h2 className="svc-title" id="svc-title">{services.heading}</h2></div>
          <p>{services.intro}</p>
        </div>
        <div className="svc" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <ul className="svc__grid swipe">
            {ALL.map((s, i) => (
              <li key={s.title} className={`svc-card ${i < 2 ? 'svc-card--wide' : ''} ${i === active ? 'on' : ''}`} data-reveal="scale" style={{transitionDelay: `${i * 70}ms`}}>
                <button onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => { setActive(i); setPaused(true); }} aria-pressed={i === active} aria-controls="svc-phone">
                  <span className="svc-card__art" data-speed="-0.05">{ART[i]}</span>
                  <span className="svc-card__txt"><b>{s.title}</b><span>{s.body}</span></span>
                </button>
              </li>
            ))}
          </ul>
          <div className="svc__phone" data-reveal="right" aria-live="polite" id="svc-phone">
            <div className="sphone">
              <div className="sphone__scr">
                <div className="phone__status"><span>9:41</span><i /><Icon name="battery" size={14} /></div>
                <div className="ps" key={active}><Screen i={active} /></div>
                <div className="tabbar"><Icon name="house" size={17} /><Icon name="bars" size={17} /><Icon name="message" size={17} /><Icon name="settings" size={17} /></div>
              </div>
            </div>
            <p className="svc__cap"><Icon name={ALL[active].icon} size={16} />{ALL[active].title}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
