'use client';
import {useState} from 'react';
import {useI18n} from '@/i18n/I18nProvider';
import {useReveals} from '@/hooks/useReveals';
import {Icon} from '../Icon';
import {LogoMark} from '../Logo';

/** Dark contrast section: EC4YOU vs a typical agency. Phones switch columns with a toggle. */
export function Difference() {
  const ref = useReveals<HTMLElement>();
  const [show, setShow] = useState<'us' | 'them'>('us');
  const {t} = useI18n();
  const compare = t.compare;
  return (
    <section id="compare" ref={ref} className="sec sec--dark expand" data-expand aria-labelledby="diff-title">
      <div className="wrap diff">
        <div className="diff__intro" data-reveal>
          <span className="eyebrow">{compare.eyebrow}</span>
          <h2 className="h2" id="diff-title">{compare.heading}</h2>
          <p className="lead">{compare.lead}</p>
          <a className="btn btn--primary" href="#contact">{t.common.startProject} <Icon name="arrowUpRight" size={18} /></a>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 16}} data-reveal>
          <div className="toggle" role="group" aria-label={compare.group}>
            <button aria-pressed={show === 'us'} onClick={() => setShow('us')}><LogoMark size={16} />{compare.us}</button>
            <button aria-pressed={show === 'them'} onClick={() => setShow('them')}>{compare.them}</button>
          </div>
          <div className="diff__table" data-show={show}>
            <div className="diff__col diff__col--us">
              <h3><LogoMark size={22} />{compare.us}</h3>
              <ul>{compare.rows.map(([us]) => <li key={us}><span className="tick"><Icon name="check" size={13} /></span>{us}</li>)}</ul>
            </div>
            <div className="diff__col diff__col--them">
              <h3 style={{color: 'var(--muted)', letterSpacing: 0}}>{compare.them}</h3>
              <ul>{compare.rows.map(([, them]) => <li key={them}><Icon name="x" size={16} />{them}</li>)}</ul>
            </div>
          </div>
          <a className="btn btn--primary btn--block diff__mobile-cta" href="#contact">{t.common.startProject} <Icon name="arrowUpRight" size={18} /></a>
        </div>
      </div>
    </section>
  );
}
