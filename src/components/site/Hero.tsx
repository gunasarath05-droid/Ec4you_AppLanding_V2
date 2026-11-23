'use client';
import {useRef, type PointerEvent} from 'react';
import {useI18n} from '@/i18n/I18nProvider';
import {useReveals} from '@/hooks/useReveals';
import {prefersReducedMotion} from '@/hooks/useReducedMotion';
import {track} from '@/lib/track';
import {Icon} from '../Icon';
import {LogoMark} from '../Logo';
import {LogoMarquee} from './Trust';

/**
 * The EC4YOU mark as a 3D object: the logo is stacked in thin layers along the
 * Z axis (darker at the back, brand orange on the face) inside a tilted 3D
 * scene, so its dots and dashes read as extruded blocks. It sways slowly and
 * leans toward the pointer on desktop.
 */
const LAYERS = 14;
const DEPTH = 2; // px between layers
const layerColor = (i: number) => {
  if (i === LAYERS - 1) return '#FF6633';
  const k = i / (LAYERS - 2); // 0 = back, 1 = just behind the face
  const mix = (a: number, b: number) => Math.round(a + (b - a) * k);
  return `rgb(${mix(150, 226)}, ${mix(40, 78)}, ${mix(10, 32)})`;
};

function Mark3D() {
  return (
    <div className="m3d__obj">
      {Array.from({length: LAYERS}, (_, i) => (
        <span key={i} className={`m3d__layer ${i === LAYERS - 1 ? 'm3d__face' : ''}`} style={{transform: `translateZ(${(i * DEPTH).toFixed(1)}px)`, color: layerColor(i)}}>
          <LogoMark size={400} />
        </span>
      ))}
    </div>
  );
}

/**
 * Hero: big headline with a small "latest launch" card beside it; below, the 3D
 * mark on one side and the pitch, two CTAs and the client-logo strip on the other.
 */
export function Hero() {
  const ref = useReveals<HTMLElement>();
  const scene = useRef<HTMLDivElement>(null);
  const {t} = useI18n();
  const hero = t.hero;

  // Lean the mark toward the pointer (desktop only; skipped with reduced motion).
  const tilt = (e: PointerEvent<HTMLDivElement>) => {
    const el = scene.current;
    if (!el || e.pointerType !== 'mouse' || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--tx', (((e.clientX - r.left) / r.width - 0.5) * 16).toFixed(2));
    el.style.setProperty('--ty', (((e.clientY - r.top) / r.height - 0.5) * -12).toFixed(2));
  };
  const reset = () => {
    scene.current?.style.setProperty('--tx', '0');
    scene.current?.style.setProperty('--ty', '0');
  };

  return (
    <section id="top" ref={ref} className="hero" aria-labelledby="hero-title">
      <div className="wrap">
        <div className="hero__top" data-hero-exit>
          <h1 className="hero__title" id="hero-title" data-reveal>{hero.titleA} <span className="accent">{hero.titleAccent}</span> {hero.titleB}</h1>
          <a className="reel" href="#work" data-reveal style={{transitionDelay: '120ms'}}>
            <span className="reel__label">{hero.reel.label}</span>
            <span className="reel__mark" aria-hidden="true"><LogoMark size={170} /></span>
            <span className="reel__body">
              <b>{hero.reel.title}</b>
              <svg viewBox="0 0 160 36" aria-hidden="true"><path d="M0 32 C24 30 38 24 58 21 S92 12 116 9 S146 4 160 2" fill="none" stroke="#FF6633" strokeWidth="2.5" strokeLinecap="round" /></svg>
              <small>{hero.reel.meta}</small>
            </span>
            <span className="reel__go"><Icon name="arrowUpRight" size={18} /><span className="sr-only">{hero.reel.cta}</span></span>
          </a>
        </div>

        <div className="hero__main">
          <div className="hero__visual" ref={scene} onPointerMove={tilt} onPointerLeave={reset} aria-hidden="true" dir="ltr" data-reveal="scale">
            <span className="hero__disc" />
            <span className="hero__glow" />
            <div className="m3d"><Mark3D /></div>
          </div>

          <div className="hero__side">
            <p className="hero__lead" data-reveal>{hero.body}</p>
            <div className="hero__ctas" data-reveal style={{transitionDelay: '80ms'}}>
              <a className="bbtn bbtn--ink" href="#contact" onClick={() => track('cta_click', {location: 'hero'})}>
                {hero.primary}<span className="bbtn__ico"><Icon name="arrowUpRight" size={18} /></span>
              </a>
              <a className="bbtn bbtn--line" href="#work">
                {hero.secondary}<span className="bbtn__ico"><Icon name="arrowUpRight" size={18} /></span>
              </a>
            </div>
            <div className="hero__trust" data-reveal style={{transitionDelay: '160ms'}}>
              <span className="hero__rule" aria-hidden="true"><i /></span>
              <p>/ {t.trust.label}</p>
              <LogoMarquee label={t.trust.aria} scale={0.78} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
