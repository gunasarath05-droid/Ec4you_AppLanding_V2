'use client';
import {useEffect, useRef, useState} from 'react';
import {plan} from '@/content';
import {useReveals} from '@/hooks/useReveals';
import {onFrame} from '@/lib/scroll';

/**
 * Our process, told with the EC4YOU mark. The logo's 20 dots and dashes start
 * as grey outlines; each step lights its rows in orange, top to bottom, so the
 * mark is complete when the app launches. The step nearest the middle of the
 * screen is active (no pinning, so it costs no extra scroll); a step can also
 * be chosen directly.
 */

type Shape = {d?: [number, number]; r?: [number, number, number, number]; step: number};
// Measured from the official icon (1100 × 1130), grouped by row into the 4 steps.
const SHAPES: Shape[] = [
  {d: [1006, 26.5], step: 0},
  {r: [186, 216, 181, 51], step: 0}, {d: [519.5, 241.5], step: 0}, {r: [672, 216, 181, 51], step: 0}, {d: [1006, 241.5], step: 0},
  {d: [31.5, 457], step: 1}, {d: [275, 457], step: 1}, {d: [518, 457], step: 1}, {d: [761.5, 457], step: 1}, {r: [914, 431, 181, 52], step: 1},
  {r: [184, 647, 182, 51], step: 2}, {d: [518, 672.5], step: 2}, {r: [671, 647, 181, 51], step: 2}, {r: [914, 647, 181, 51], step: 2},
  {r: [428, 862, 181, 51], step: 2}, {r: [671, 862, 181, 51], step: 2}, {r: [914, 862, 181, 51], step: 2},
  {d: [518, 1103], step: 3}, {d: [761.5, 1103], step: 3}, {r: [914, 1077, 181, 52], step: 3},
];
const GROUPS = [['R&D'], ['UI & UX'], ['Architecture', 'Production'], ['Deployment', 'Testing & QA', 'Handover']];
const CAPTION = ['Understanding the problem', 'Shaping the experience', 'Your product takes shape', 'Complete — and growing'];

export function Approach() {
  const ref = useReveals<HTMLElement>();
  const items = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const last = useRef(-1);
  const manual = useRef(0);

  useEffect(() => onFrame(() => {
    const el = ref.current;
    if (!el || performance.now() < manual.current) return;
    const r = el.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    // Active = the step whose card is closest to 55% of the viewport height.
    let best = 0, bestD = Infinity;
    items.current.forEach((li, i) => {
      if (!li) return;
      const b = li.getBoundingClientRect();
      const d = Math.abs(b.top + b.height / 2 - innerHeight * 0.55);
      if (d < bestD) { bestD = d; best = i; }
    });
    if (best !== last.current) { last.current = best; setActive(best); }
  }), [ref]);

  const choose = (i: number) => { manual.current = performance.now() + 1500; last.current = i; setActive(i); };
  const lit = SHAPES.filter((s) => s.step <= active).length;

  return (
    <section id="process" ref={ref} className="sec sec--alt" aria-labelledby="proc-title">
      <div className="wrap">
        <div className="head head--center" data-reveal>
          <div>
            <span className="eyebrow">{plan.eyebrow}</span>
            <h2 className="h2" id="proc-title">From first conversation<br />to App Store launch</h2>
            <p className="lead" style={{maxWidth: 640}}>{plan.note}</p>
          </div>
        </div>

        <div className="proc">
          <div className="proc__mark" data-reveal="left">
            <div className="proc__card">
              <svg viewBox="-40 -40 1180 1210" role="img" aria-label={`EC4YOU mark, ${lit} of 20 parts lit — step ${active + 1} of 4`}>
                {SHAPES.map((s, i) => {
                  const state = s.step < active ? 'done' : s.step === active ? 'now' : 'todo';
                  const delay = {transitionDelay: `${(i % 7) * 60}ms`};
                  return s.d
                    ? <circle key={i} className={`m ${state}`} cx={s.d[0]} cy={s.d[1]} r="26" style={delay} />
                    : <rect key={i} className={`m ${state}`} x={s.r![0]} y={s.r![1]} width={s.r![2]} height={s.r![3]} style={delay} />;
                })}
              </svg>
              <div className="proc__meter" aria-hidden="true"><i style={{width: `${(lit / 20) * 100}%`}} /></div>
              <p className="proc__cap"><b>{String(active + 1).padStart(2, '0')}</b> {CAPTION[active]} <span>{lit}/20</span></p>
            </div>
          </div>

          <ol className="proc__steps">
            {plan.steps.map((s, i) => (
              <li key={s.name} ref={(el) => { items.current[i] = el; }} data-reveal="right" style={{transitionDelay: `${i * 80}ms`}} className={`pstep ${i === active ? 'on' : i < active ? 'done' : ''}`} aria-current={i === active ? 'step' : undefined}>
                <button onClick={() => choose(i)}>
                  <span className="pstep__n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="pstep__body">
                    <b className="h3">{s.name}</b>
                    <span className="pstep__txt">{s.body}</span>
                    <span className="chips">{GROUPS[i].map((g) => <span key={g} className="chip">{g}</span>)}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
