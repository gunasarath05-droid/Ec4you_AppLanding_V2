'use client';
import {useEffect, useRef, type CSSProperties} from 'react';
import {useI18n} from '@/i18n/I18nProvider';
import {onFrame} from '@/lib/scroll';
import {Icon} from '../Icon';

/** 0→1 with a pause at each end, so every panel holds still while centred. */
const HOLD = 0.22;
const settle = (t: number) => {
  const x = Math.min(1, Math.max(0, (t - HOLD) / (1 - 2 * HOLD)));
  return x * x * (3 - 2 * x);
};

/**
 * "Why apps stall?" — a pinned scroll scene. The section is several screens
 * tall; its inner frame sticks to the viewport while you scroll through it.
 * The huge heading stays on the left; the right side is a column of panels
 * (intro + the four problems) that rolls with the scroll: the current panel
 * moves up and out as the next one rises into its place. Positions are written
 * straight to the DOM each frame, so scrolling never re-renders React.
 */
export function Problems() {
  const {t} = useI18n();
  const problems = t.problems;
  const panels = 1 + problems.items.length;
  const scene = useRef<HTMLElement>(null);
  const roll = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastPos = -1;
    return onFrame(() => {
      const el = scene.current;
      const list = roll.current;
      if (!el || !list) return;
      const r = el.getBoundingClientRect();
      const span = el.offsetHeight - innerHeight;
      if (r.bottom < 0 || r.top > innerHeight || span <= 0) return;
      // Scroll progress → panel position (0 … panels-1), with a hold on each panel.
      const x = Math.min(1, Math.max(0, -r.top / span)) * (panels - 1);
      const i = Math.min(panels - 2, Math.floor(x));
      const pos = i + settle(x - i);
      if (Math.abs(pos - lastPos) < 0.0005) return;
      lastPos = pos;
      list.style.transform = `translate3d(0, ${(-pos * 100).toFixed(3)}%, 0)`;
      [...list.children].forEach((c, k) => {
        const d = Math.abs(k - pos);
        (c as HTMLElement).style.opacity = Math.max(0, 1 - d * 0.8).toFixed(3);
      });
    });
  }, [panels]);

  return (
    <section id="problems" ref={scene} className="prob" aria-labelledby="prob-title" style={{'--n': panels} as CSSProperties}>
      <div className="prob__pin">
        <div className="prob__grid-bg" aria-hidden="true" />

        <div className="wrap prob__grid">
          <h2 className="prob__big" id="prob-title">
            <span className="sr-only">{problems.heading}</span>
            <span aria-hidden="true">{problems.big.map((w, i) => <span key={w} className={i === problems.big.length - 1 ? 'accent' : undefined}>{w}</span>)}</span>
          </h2>

          <div className="prob__window">
            <div className="prob__roll" ref={roll}>
              <div className="prob__panel">
                <span className="eyebrow">{problems.eyebrow}</span>
                <h3 className="prob__title">{problems.heading}</h3>
                <p>{problems.intro}</p>
                <a className="link" href="#process">{problems.link} <Icon name="arrowRight" size={16} /></a>
              </div>
              {problems.items.map((it, i) => {
                const n = String(i + 1).padStart(2, '0');
                return (
                  <div key={it.title} className="prob__panel">
                    <span className="prob__ghost" aria-hidden="true">{n}</span>
                    <span className="prob__count">{n} <i>/ {String(problems.items.length).padStart(2, '0')}</i></span>
                    <h3 className="prob__title">{it.title}</h3>
                    <p>{it.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
