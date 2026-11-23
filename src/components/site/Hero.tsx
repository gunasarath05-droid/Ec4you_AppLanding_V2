'use client';
import {hero} from '@/content';
import {useFitBox} from '@/hooks/useFitBox';
import {useReveals} from '@/hooks/useReveals';
import {track} from '@/lib/track';
import {Icon} from '../Icon';

const DOTS = (
  <svg viewBox="0 0 220 160" aria-hidden="true">
    <g fill="#FF6633">
      <circle cx="8" cy="8" r="4" /><rect x="26" y="5" width="34" height="7" /><circle cx="80" cy="8" r="4" /><rect x="98" y="5" width="34" height="7" /><circle cx="152" cy="8" r="4" />
      <rect x="26" y="45" width="34" height="7" opacity=".5" /><circle cx="80" cy="48" r="4" /><circle cx="116" cy="48" r="4" /><rect x="134" y="45" width="34" height="7" />
      <circle cx="44" cy="88" r="4" opacity=".5" /><rect x="62" y="85" width="34" height="7" /><circle cx="116" cy="88" r="4" /><rect x="134" y="85" width="34" height="7" opacity=".5" />
      <rect x="98" y="125" width="34" height="7" opacity=".5" /><circle cx="152" cy="128" r="4" />
    </g>
  </svg>
);

/** Hero: headline + CTAs on the left; a phone with a live app screen and floating cards on the right. */
export function Hero() {
  // The 600×640 stage composition scales to whatever width it gets.
  const fit = useFitBox<HTMLDivElement>(600, 640, null, true, 0);
  const ref = useReveals<HTMLElement>();
  return (
    <section id="top" ref={ref} className="hero" aria-labelledby="hero-title">
      <div className="wrap hero__grid">
        <div className="hero__copy" data-hero-exit>
          <span className="pill" data-reveal>CUSTOM MOBILE APPS · AI · PRODUCT ENGINEERING</span>
          <h1 className="h1" id="hero-title" data-reveal>We Build Apps That <span className="accent">Move Businesses</span> Forward.</h1>
          <p className="lead" style={{maxWidth: 540}} data-reveal>{hero.body}</p>
          <div className="hero__ctas" data-reveal>
            <a className="btn btn--primary" href="#contact" onClick={() => track('cta_click', {location: 'hero'})}>{hero.primary} <Icon name="arrowUpRight" size={18} /></a>
            <a className="btn btn--outline" href="#work">{hero.secondary}</a>
          </div>
          <div className="facts" data-reveal>
            <span><Icon name="smartphone" size={18} />iOS &amp; Android</span><i />
            <span><Icon name="sparkles" size={18} />AI integrations</span><i />
            <span><Icon name="globe" size={18} />UAE · Canada · Global</span>
          </div>
        </div>

        <div className="fit" ref={fit} aria-hidden="true">
          <div className="stage">
            <div className="stage__bg" />
            <div className="stage__dots" data-speed="-0.08">{DOTS}</div>
            <div className="stage__glow" data-speed="0.06" />
            <div className="phone">
              <div className="phone__scr">
                <div className="phone__status"><span>9:41</span><i /><Icon name="battery" size={14} /></div>
                <div><div className="small">Launch control</div><div style={{fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 22}}>Your app is live.</div></div>
                <div className="launch">
                  <div className="launch__top"><span>Release 1.0</span><b>● Approved</b></div>
                  <svg viewBox="0 0 220 64" height="64"><path d="M0 56 C30 54 50 46 75 42 S120 28 150 24 S200 8 220 4 V64 H0Z" fill="#fff" fillOpacity=".2" /><path d="M0 56 C30 54 50 46 75 42 S120 28 150 24 S200 8 220 4" stroke="#fff" strokeWidth="2.5" fill="none" /></svg>
                  <div className="launch__meta"><div>iOS build<b>Ready</b></div><div>Android build<b>Ready</b></div></div>
                </div>
                <div className="minis">
                  <div className="mini"><Icon name="sparkles" size={16} color="#FF6633" /><span>AI assistant</span>On</div>
                  <div className="mini"><Icon name="shield" size={16} /><span>Security</span>Passed</div>
                </div>
                <div className="tabbar"><Icon name="house" size={17} /><Icon name="bars" size={17} /><Icon name="message" size={17} /><Icon name="settings" size={17} /></div>
              </div>
            </div>
            <div className="fcard fcard--ai" data-speed="-0.1">
              <div style={{display: 'flex', gap: 8, alignItems: 'center'}}><span style={{width: 24, height: 24, borderRadius: 8, background: 'var(--ink)', color: '#fff', display: 'grid', placeItems: 'center'}}><Icon name="bot" size={13} /></span><b>AI Agent</b></div>
              <span className="bub-u">Find leads from this week</span>
              <span className="bub-a">Found 12 warm leads. Follow-ups drafted.</span>
            </div>
            <div className="fcard fcard--orders" data-speed="-0.05">
              <div className="row-between"><b>Orders</b><span className="up">↑ this week</span></div>
              <svg viewBox="0 0 170 56" height="56"><g fill="#E4E4E7"><rect x="2" y="28" width="16" height="28" rx="4" /><rect x="26" y="20" width="16" height="36" rx="4" /><rect x="50" y="34" width="16" height="22" rx="4" /><rect x="74" y="14" width="16" height="42" rx="4" /><rect x="98" y="24" width="16" height="32" rx="4" /><rect x="146" y="16" width="16" height="40" rx="4" /></g><rect x="122" y="4" width="16" height="52" rx="4" fill="#FF6633" /></svg>
            </div>
            <div className="fcard fcard--toast" data-speed="-0.14">
              <span className="okbox"><Icon name="check" size={18} /></span>
              <div><b style={{fontSize: 13}}>Tour booked</b><div className="small">Broker notified instantly</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
