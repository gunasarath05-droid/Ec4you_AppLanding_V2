'use client';
import {useEffect, useRef, useState, type CSSProperties} from 'react';
import {useI18n} from '@/i18n/I18nProvider';
import {useReveals} from '@/hooks/useReveals';
import {onFrame} from '@/lib/scroll';
import {prefersReducedMotion} from '@/hooks/useReducedMotion';
import {Icon} from '../Icon';
import {LogoMark} from '../Logo';

/**
 * Dark contrast section: EC4YOU vs a typical agency. It opens from an inset
 * card to full width as it scrolls in (data-expand, see Motion.tsx); then the
 * comparison plays out with the scroll: row by row, the EC4YOU point lights up
 * in orange while the matching typical-agency point is struck through.
 * Phones switch columns with a toggle.
 */
export function Difference() {
  const ref = useReveals<HTMLElement>();
  const table = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState<'us' | 'them'>('us');
  const {t} = useI18n();
  const compare = t.compare;
  const rows = compare.rows.length;
  const [lit, setLit] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) { setLit(rows); return; }
    let last = -1;
    return onFrame(() => {
      const el = table.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      // Rows light as the table passes from 85% to ~35% of the viewport height.
      const p = (innerHeight * 0.85 - r.top) / Math.max(1, r.height * 0.75);
      const n = Math.max(0, Math.min(rows, Math.ceil(p * rows)));
      if (n !== last) { last = n; setLit(n); }
    });
  }, [rows]);

  const state = (i: number) => (i < lit ? 'lit' : '');

  return (
    <section id="compare" ref={ref} className="sec sec--dark expand diff-sec" data-expand aria-labelledby="diff-title">
      <span className="diff-sec__glow" aria-hidden="true" />
      <div className="wrap diff">
        <div className="diff__intro" data-reveal>
          <span className="eyebrow">{compare.eyebrow}</span>
          <h2 className="h2" id="diff-title">{compare.heading}</h2>
          <p className="lead">{compare.lead}</p>
          <p className="diff__score" aria-hidden="true"><b>{lit}</b>/{rows}</p>
          <a className="btn btn--primary" href="#contact">{t.common.startProject} <Icon name="arrowUpRight" size={18} /></a>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 16}} data-reveal>
          <div className="toggle" role="group" aria-label={compare.group}>
            <button aria-pressed={show === 'us'} onClick={() => setShow('us')}><LogoMark size={16} />{compare.us}</button>
            <button aria-pressed={show === 'them'} onClick={() => setShow('them')}>{compare.them}</button>
          </div>
          <div className="diff__table" data-show={show} ref={table} style={{'--rows': rows} as CSSProperties}>
            <div className="diff__col diff__col--us">
              <h3><LogoMark size={22} />{compare.us}</h3>
              <ul>{compare.rows.map(([us], i) => <li key={us} className={state(i)}><span className="tick"><Icon name="check" size={13} /></span>{us}</li>)}</ul>
            </div>
            <span className="diff__vs" aria-hidden="true">VS</span>
            <div className="diff__col diff__col--them">
              <h3>{compare.them}</h3>
              <ul>{compare.rows.map(([, them], i) => <li key={them} className={state(i)}><Icon name="x" size={16} /><span><span className="strike">{them}</span></span></li>)}</ul>
            </div>
          </div>
          <a className="btn btn--primary btn--block diff__mobile-cta" href="#contact">{t.common.startProject} <Icon name="arrowUpRight" size={18} /></a>
        </div>
      </div>
    </section>
  );
}
