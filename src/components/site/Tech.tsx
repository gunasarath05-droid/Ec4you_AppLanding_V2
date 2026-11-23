'use client';
import type {IconName} from '../Icon';
import {useI18n} from '@/i18n/I18nProvider';
import {useReveals} from '@/hooks/useReveals';
import {Icon} from '../Icon';

/** Product names stay in English in every language. */
const ITEMS: [string, IconName][] = [['Flutter', 'smartphone'], ['React Native', 'atom'], ['Node.js', 'server'], ['Firebase', 'flame'], ['AWS', 'cloud']];

export function Tech() {
  const ref = useReveals<HTMLElement>();
  const t = useI18n().t.tech;
  return (
    <section id="technology" ref={ref} className="sec sec--alt" aria-labelledby="tech-title">
      <div className="wrap">
        <div className="head" data-reveal>
          <div><span className="eyebrow">{t.eyebrow}</span><h2 className="h2" id="tech-title">{t.heading}</h2></div>
          <p className="lead">{t.body}</p>
        </div>
        <ul className="tiles">
          {ITEMS.map(([name, ic], i) => (
            <li key={name} className="tile" data-reveal="scale" style={{transitionDelay: `${i * 60}ms`}}>
              <small>0{i + 1}</small>
              <span className="tile__ico"><Icon name={ic} size={40} /></span>
              <b>{name}</b>
            </li>
          ))}
        </ul>
        <p className="note">{t.note}</p>
      </div>
    </section>
  );
}
