'use client';
import {useI18n} from '@/i18n/I18nProvider';
import {useReveals} from '@/hooks/useReveals';
import {track} from '@/lib/track';
import {Icon} from '../Icon';

/** Three ways to work together. No prices: scope is set after discovery. */
export function Engagement() {
  const ref = useReveals<HTMLElement>();
  const engage = useI18n().t.engage;
  return (
    <section id="engage" ref={ref} className="sec" aria-labelledby="eng-title">
      <div className="wrap">
        <div className="head head--center" data-reveal>
          <div><span className="eyebrow">{engage.eyebrow}</span><h2 className="h2" id="eng-title">{engage.heading}</h2><p className="lead">{engage.note}</p></div>
        </div>
        <ol className="plans swipe">
          {engage.plans.map((p, i) => (
            <li key={p.name} className={`plan ${p.featured ? 'plan--featured' : ''}`} data-reveal="scale" style={{transitionDelay: `${i * 80}ms`}}>
              {p.featured && <span className="badge">{engage.recommended}</span>}
              <h3 className="h3">{p.name}</h3>
              <p className="plan__tag">{p.tag}</p>
              <p className="plan__price">{p.price}</p>
              <ul>{p.points.map((pt) => <li key={pt}><Icon name="check" size={16} />{pt}</li>)}</ul>
              <a className={`btn ${p.featured ? 'btn--primary' : 'btn--outline'}`} style={{alignSelf: 'flex-start'}} href="#contact" onClick={() => track('cta_click', {location: `plan_${i + 1}`})}>{p.cta}</a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
