'use client';
import {useEffect, useRef, useState, type CSSProperties} from 'react';
import {fmt} from '@/i18n/config';
import {useI18n} from '@/i18n/I18nProvider';
import {useReveals} from '@/hooks/useReveals';
import {prefersReducedMotion} from '@/hooks/useReducedMotion';
import {Icon} from '../Icon';

/**
 * Each card keeps its own tilted shape as it moves: the white face is skewed and
 * an orange plate peeks out from behind it at a different corner per card.
 */
const SHAPES = [
  {sk: '5deg', px: '-12px', py: '-12px'},
  {sk: '-5deg', px: '12px', py: '-12px'},
  {sk: '5deg', px: '-12px', py: '14px'},
];

/**
 * Testimonials carousel (sample content). The active card sits large in the
 * centre with its neighbours smaller on either side; dots, a click on a side
 * card or a swipe moves it. It advances on its own while on screen, except
 * when hovered, focused or with reduced motion.
 */
export function Testimonials() {
  const ref = useReveals<HTMLElement>();
  const {locale, t} = useI18n();
  const reviews = t.reviews;
  const n = reviews.items.length;
  const [active, setActive] = useState(Math.min(1, n - 1));
  const [paused, setPaused] = useState(false);
  const startX = useRef<number | null>(null);
  // Right-to-left pages: the next card comes in from the left.
  const dir = locale === 'ar' ? -1 : 1;
  const go = (step: number) => setActive((a) => (a + step + n) % n);

  useEffect(() => {
    if (paused || n < 2 || prefersReducedMotion()) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), {threshold: 0.4});
    if (ref.current) io.observe(ref.current);
    const id = window.setInterval(() => visible && go(1), 6000);
    return () => { clearInterval(id); io.disconnect(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, n, ref]);

  return (
    <section id="reviews" ref={ref} className="sec" aria-labelledby="rev-title">
      <div className="wrap">
        <div className="head head--center" data-reveal>
          <div><span className="eyebrow">{reviews.eyebrow}</span><h2 className="h2" id="rev-title">{reviews.heading}</h2></div>
        </div>

        <div
          className="tsl"
          data-reveal
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onPointerDown={(e) => { startX.current = e.clientX; }}
          onPointerUp={(e) => {
            if (startX.current === null) return;
            const dx = e.clientX - startX.current;
            startX.current = null;
            if (Math.abs(dx) > 50) go(dx < 0 ? dir : -dir);
          }}
        >
          {reviews.items.map((r, i) => {
            // Signed distance from the active card, wrapped: -1 left, 0 centre, 1 right.
            const half = Math.floor(n / 2);
            const o = ((i - active + n + half) % n) - half;
            const shape = SHAPES[i % SHAPES.length];
            const style = {'--o': o * dir, '--sk': shape.sk, '--px': shape.px, '--py': shape.py} as CSSProperties;
            return (
              <figure key={i} className={`tcard ${o === 0 ? 'on' : Math.abs(o) === 1 ? 'side' : 'off'}`} style={style} onClick={() => o !== 0 && setActive(i)}>
                <span className="tcard__plate" aria-hidden="true" />
                <span className="tcard__face" aria-hidden="true" />
                <span className="tcard__av" aria-hidden="true" style={{background: `linear-gradient(135deg, ${r.tint[0]}, ${r.tint[1]})`}}><Icon name="user" size={34} /></span>
                <figcaption><b>{r.role}</b><span>{r.tag}</span></figcaption>
                <span className="tcard__mark" aria-hidden="true">”</span>
                <blockquote>{r.quote.replace(/^[“«"]\s*|\s*[”»"]$/g, '')}</blockquote>
                <span className="tcard__stars" role="img" aria-label={fmt(reviews.stars, {n: r.stars})}>
                  {Array.from({length: 5}, (_, s) => <Icon key={s} name="star" size={14} fill="currentColor" style={{opacity: s < r.stars ? 1 : 0.2}} />)}
                </span>
              </figure>
            );
          })}
        </div>

        <div className="tdots" role="group" aria-label={reviews.eyebrow}>
          {reviews.items.map((_, i) => (
            <button key={i} aria-label={fmt(reviews.show, {n: i + 1})} aria-current={i === active ? 'true' : undefined} onClick={() => setActive(i)} />
          ))}
        </div>
        <p className="note" style={{textAlign: 'center'}}>{reviews.note}</p>
      </div>
    </section>
  );
}
