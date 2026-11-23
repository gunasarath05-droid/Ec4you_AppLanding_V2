'use client';
import {work} from '@/content';
import {useReveals} from '@/hooks/useReveals';
import {Icon} from '../Icon';

/** Two case-study cards (sample content until real projects are supplied). */
export function Work() {
  const ref = useReveals<HTMLElement>();
  const [a, b] = work.items;
  return (
    <section id="work" ref={ref} className="sec" aria-labelledby="work-title">
      <div className="wrap">
        <div className="head" data-reveal>
          <div><span className="eyebrow">{work.eyebrow}</span><h2 className="h2" id="work-title">Apps we’ve shipped</h2></div>
          <a className="link" href="#contact" style={{color: 'var(--ink)'}}>Discuss your project <Icon name="arrowUpRight" size={18} color="#FF6633" /></a>
        </div>
        <div className="cases swipe">
          <article className="case" data-reveal="left">
            <div className="case__img">
              <span className="case__year">{a.tag}</span>
              <div className="case__phone" aria-hidden="true" data-speed="-0.07"><div>
                <span className="small" style={{fontSize: 9}}>Your care</span>
                <b style={{fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14}}>Book a visit</b>
                <div className="days"><span><small>Mon</small>12</span><span className="on"><small>Tue</small>13</span><span><small>Wed</small>14</span></div>
                <div className="mrow" style={{fontWeight: 400}}>10:30 AM · Available</div>
                <div className="mrow" style={{fontWeight: 400}}>11:15 AM · Available</div>
                <div style={{marginTop: 'auto', background: 'var(--ink)', color: '#fff', textAlign: 'center', borderRadius: 999, padding: '9px 0', fontWeight: 600}}>Confirm booking</div>
              </div></div>
            </div>
            <div className="case__body"><h3 className="h3">{a.title}</h3><div className="chips">{a.facts.map((f) => <span key={f} className="chip">{f}</span>)}</div></div>
          </article>
          <article className="case" data-reveal="right" style={{transitionDelay: '90ms'}}>
            <div className="case__img case__img--dark">
              <span className="case__year">{b.tag}</span>
              <div className="case__phone" aria-hidden="true" data-speed="-0.07"><div>
                <span className="small" style={{fontSize: 9}}>Dubai Marina</span>
                <b style={{fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14}}>New leads</b>
                <div className="mrow" style={{display: 'flex', gap: 8, alignItems: 'center'}}><i style={{width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,#FF6633,#FFB547)'}} />Sample buyer<span className="badge" style={{marginLeft: 'auto', fontSize: 8, padding: '2px 6px'}}>HOT</span></div>
                <div className="mrow" style={{display: 'flex', gap: 8, alignItems: 'center'}}><i style={{width: 22, height: 22, borderRadius: '50%', background: 'var(--line)'}} />Sample tenant</div>
                <div className="mrow" style={{fontWeight: 600}}>Viewings this week
                  <svg viewBox="0 0 130 44" height="40" style={{display: 'block', marginTop: 6}}><g fill="#E4E4E7"><rect x="0" y="22" width="14" height="22" rx="3" /><rect x="19" y="14" width="14" height="30" rx="3" /><rect x="38" y="26" width="14" height="18" rx="3" /><rect x="76" y="18" width="14" height="26" rx="3" /><rect x="95" y="28" width="14" height="16" rx="3" /><rect x="114" y="20" width="14" height="24" rx="3" /></g><rect x="57" y="4" width="14" height="40" rx="3" fill="#FF6633" /></svg>
                </div>
              </div></div>
            </div>
            <div className="case__body"><h3 className="h3">{b.title}</h3><div className="chips">{b.facts.map((f) => <span key={f} className="chip">{f}</span>)}</div></div>
          </article>
        </div>
        <p className="note">Sample projects — replace with real case studies and measured results before launch.</p>
      </div>
    </section>
  );
}
