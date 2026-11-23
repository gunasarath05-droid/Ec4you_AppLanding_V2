'use client';
import {techTiles as t} from '@/content';
import {useReveals} from '@/hooks/useReveals';
import {Icon} from '../Icon';

export function Tech() {
  const ref = useReveals<HTMLElement>();
  return (
    <section id="technology" ref={ref} className="sec sec--alt" aria-labelledby="tech-title">
      <div className="wrap">
        <div className="head" data-reveal>
          <div><span className="eyebrow">{t.eyebrow}</span><h2 className="h2" id="tech-title">{t.heading}</h2></div>
          <p className="lead">{t.body}</p>
        </div>
        <ul className="tiles">
          {t.items.map(([name, ic], i) => (
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
