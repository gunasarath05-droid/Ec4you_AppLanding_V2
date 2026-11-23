'use client';
import {useRef} from 'react';
import {reviews} from '@/content';
import {useReveals} from '@/hooks/useReveals';
import {Icon} from '../Icon';

/** Three quote cards (sample content). Arrows scroll the row on narrow screens. */
export function Testimonials() {
  const ref = useReveals<HTMLElement>();
  const row = useRef<HTMLDivElement>(null);
  const nudge = (d: number) => row.current?.scrollBy({left: d * row.current.clientWidth * 0.8, behavior: 'smooth'});
  return (
    <section id="reviews" ref={ref} className="sec" aria-labelledby="rev-title">
      <div className="wrap">
        <div className="head" data-reveal>
          <div><span className="eyebrow">{reviews.eyebrow}</span><h2 className="h2" id="rev-title">Built on trust. Designed for impact.</h2></div>
          <div className="arrows">
            <button className="icon-btn" onClick={() => nudge(-1)} aria-label="Previous testimonials"><Icon name="arrowLeft" size={18} /></button>
            <button className="icon-btn" onClick={() => nudge(1)} aria-label="Next testimonials"><Icon name="arrowRight" size={18} /></button>
          </div>
        </div>
        <div className="quotes swipe" ref={row}>
          {reviews.items.slice(0, 3).map((r, i) => (
            <figure key={i} className="quote" data-reveal style={{margin: 0, transitionDelay: `${i * 80}ms`}}>
              <span className="stars" aria-label={`${r.stars} out of 5`}>{Array.from({length: 5}, (_, s) => <Icon key={s} name="star" size={16} fill="currentColor" style={{opacity: s < r.stars ? 1 : 0.2}} />)}</span>
              <blockquote>{r.quote}</blockquote>
              <figcaption className="who"><span className="av" style={{background: `linear-gradient(135deg, ${r.tint[0]}, ${r.tint[1]})`}} /><div><b>Client Name</b><span>{r.role} · {r.tag}</span></div></figcaption>
            </figure>
          ))}
        </div>
        <p className="note">{reviews.note}</p>
      </div>
    </section>
  );
}
